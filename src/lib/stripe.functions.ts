import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const STRIPE_API = "https://api.stripe.com/v1";

function form(obj: Record<string, string>) {
  return new URLSearchParams(obj).toString();
}

async function stripeFetch(path: string, body: Record<string, string>) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not configured");

  const res = await fetch(`${STRIPE_API}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form(body),
  });
  const json = (await res.json()) as Record<string, unknown>;
  if (!res.ok) {
    const msg =
      (json.error as { message?: string } | undefined)?.message ??
      `Stripe error ${res.status}`;
    throw new Error(msg);
  }
  return json;
}

export const createCheckoutSession = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { priceId?: string }) => input)
  .handler(async ({ data, context }) => {
    const { userId, claims } = context;
    const priceId = data.priceId || process.env.STRIPE_PRICE_ID;
    if (!priceId) throw new Error("Missing Stripe price ID");

    const origin = process.env.PUBLIC_APP_URL || "https://cadence.app";
    const email = (claims as { email?: string }).email;

    const session = await stripeFetch("/checkout/sessions", {
      mode: "subscription",
      "line_items[0][price]": priceId,
      "line_items[0][quantity]": "1",
      success_url: `${origin}/app?checkout=success`,
      cancel_url: `${origin}/pricing?checkout=cancelled`,
      client_reference_id: userId,
      "metadata[user_id]": userId,
      "subscription_data[metadata][user_id]": userId,
      ...(email ? { customer_email: email } : {}),
      allow_promotion_codes: "true",
    });

    return { url: session.url as string };
  });

export const createBillingPortalSession = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase } = context;
    const { data: sub } = await supabase
      .from("subscriptions")
      .select("stripe_customer_id")
      .maybeSingle();

    if (!sub?.stripe_customer_id) {
      throw new Error("No active subscription found");
    }

    const origin = process.env.PUBLIC_APP_URL || "https://cadence.app";
    const portal = await stripeFetch("/billing_portal/sessions", {
      customer: sub.stripe_customer_id,
      return_url: `${origin}/app`,
    });

    return { url: portal.url as string };
  });
