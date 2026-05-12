import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual } from "crypto";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const Route = createFileRoute("/api/public/stripe/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env.STRIPE_WEBHOOK_SECRET;
        if (!secret) {
          return new Response("Webhook secret not configured", { status: 500 });
        }

        const sigHeader = request.headers.get("stripe-signature");
        const body = await request.text();

        if (!sigHeader || !verifyStripeSignature(body, sigHeader, secret)) {
          return new Response("Invalid signature", { status: 401 });
        }

        let event: StripeEvent;
        try {
          event = JSON.parse(body) as StripeEvent;
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        try {
          await handleEvent(event);
        } catch (err) {
          console.error("[stripe webhook] handler error", err);
          return new Response("Handler error", { status: 500 });
        }

        return new Response(JSON.stringify({ received: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});

interface StripeEvent {
  id: string;
  type: string;
  data: { object: Record<string, unknown> };
}

function verifyStripeSignature(payload: string, header: string, secret: string): boolean {
  const parts = Object.fromEntries(
    header.split(",").map((kv) => kv.split("=") as [string, string])
  );
  const t = parts.t;
  const v1 = parts.v1;
  if (!t || !v1) return false;

  // Reject events older than 5 minutes
  const ts = Number(t);
  if (Number.isNaN(ts) || Math.abs(Date.now() / 1000 - ts) > 300) return false;

  const expected = createHmac("sha256", secret)
    .update(`${t}.${payload}`)
    .digest("hex");

  const a = Buffer.from(expected, "hex");
  const b = Buffer.from(v1, "hex");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

async function handleEvent(event: StripeEvent) {
  const obj = event.data.object as Record<string, unknown>;

  switch (event.type) {
    case "checkout.session.completed": {
      const userId =
        ((obj.metadata as Record<string, string> | undefined)?.user_id) ||
        (obj.client_reference_id as string | undefined);
      const customerId = obj.customer as string | undefined;
      const subscriptionId = obj.subscription as string | undefined;
      if (!userId || !customerId) return;

      await supabaseAdmin.from("subscriptions").upsert(
        {
          user_id: userId,
          stripe_customer_id: customerId,
          stripe_subscription_id: subscriptionId ?? null,
          status: "active",
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );
      break;
    }

    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const userId = (obj.metadata as Record<string, string> | undefined)?.user_id;
      const customerId = obj.customer as string | undefined;
      if (!userId && !customerId) return;

      const items = obj.items as { data?: Array<{ price?: { id?: string } }> } | undefined;
      const priceId = items?.data?.[0]?.price?.id ?? null;

      const periodEnd = obj.current_period_end as number | undefined;
      const trialEnd = obj.trial_end as number | undefined;

      const update = {
        stripe_customer_id: customerId ?? null,
        stripe_subscription_id: obj.id as string,
        status: obj.status as string,
        price_id: priceId,
        cancel_at_period_end: Boolean(obj.cancel_at_period_end),
        current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
        trial_end: trialEnd ? new Date(trialEnd * 1000).toISOString() : null,
        updated_at: new Date().toISOString(),
      };

      if (userId) {
        await supabaseAdmin
          .from("subscriptions")
          .upsert({ user_id: userId, ...update }, { onConflict: "user_id" });
      } else if (customerId) {
        await supabaseAdmin
          .from("subscriptions")
          .update(update)
          .eq("stripe_customer_id", customerId);
      }
      break;
    }

    default:
      // ignore
      break;
  }
}
