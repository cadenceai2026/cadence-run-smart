import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { createCheckoutSession } from "@/lib/stripe.functions";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
  head: () => ({
    meta: [
      { title: "Pricing — Cadence" },
      {
        name: "description",
        content: "Simple pricing for serious runners. Start with a 14-day trial.",
      },
    ],
  }),
});

function PricingPage() {
  const checkout = useServerFn(createCheckoutSession);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subscribe = async () => {
    setError(null);
    setLoading(true);
    try {
      const { url } = await checkout({ data: {} });
      window.location.href = url;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not start checkout";
      setError(msg);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-border">
        <Link to="/" className="text-lg font-bold tracking-tight">
          CADENCE
        </Link>
        <Link
          to="/login"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Sign in
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] font-mono text-accent uppercase tracking-[0.25em] mb-3">
          / Pricing
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
          One plan. Built for runners.
        </h1>
        <p className="text-muted-foreground max-w-xl mb-12">
          Cadence is free to try for 14 days. Cancel any time from your billing portal.
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
          <PlanCard kind="trial" />
          <PlanCard kind="pro" loading={loading} onSubscribe={subscribe} />
        </div>

        {error && (
          <p className="mt-6 text-xs font-mono text-destructive">{error}</p>
        )}

        <p className="mt-12 text-xs font-mono text-muted-foreground">
          Secure payments by Stripe · No card required for trial
        </p>
      </main>
    </div>
  );
}

function PlanCard({
  kind,
  loading,
  onSubscribe,
}: {
  kind: "trial" | "pro";
  loading?: boolean;
  onSubscribe?: () => void;
}) {
  if (kind === "trial") {
    return (
      <div className="bg-surface border border-border rounded-xl p-8">
        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-3">
          Free
        </p>
        <h2 className="text-2xl font-bold mb-1">Trial</h2>
        <p className="text-3xl font-bold tracking-tight mb-6">
          $0 <span className="text-sm font-normal text-muted-foreground">/ 14 days</span>
        </p>
        <ul className="space-y-2.5 text-sm text-muted-foreground mb-8">
          <Bullet>Full Strava sync</Bullet>
          <Bullet>Weekly coach brief</Bullet>
          <Bullet>All training insights</Bullet>
        </ul>
        <Link
          to="/signup"
          className="block text-center w-full px-4 py-2.5 border border-border rounded-md text-sm font-medium hover:bg-surface-elevated transition-colors"
        >
          Start free trial
        </Link>
      </div>
    );
  }
  return (
    <div className="bg-surface border border-accent rounded-xl p-8 relative">
      <span className="absolute -top-2 right-6 text-[10px] font-mono bg-accent text-accent-foreground px-2 py-0.5 rounded uppercase tracking-widest">
        Pro
      </span>
      <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-3">
        Subscription
      </p>
      <h2 className="text-2xl font-bold mb-1">Cadence Pro</h2>
      <p className="text-3xl font-bold tracking-tight mb-6">
        $12 <span className="text-sm font-normal text-muted-foreground">/ month</span>
      </p>
      <ul className="space-y-2.5 text-sm text-muted-foreground mb-8">
        <Bullet>Everything in Trial</Bullet>
        <Bullet>Unlimited AI coach briefs</Bullet>
        <Bullet>Long-term trend analysis</Bullet>
        <Bullet>Priority sync &amp; support</Bullet>
      </ul>
      <button
        onClick={onSubscribe}
        disabled={loading}
        className="w-full px-4 py-2.5 bg-accent text-accent-foreground font-semibold rounded-md hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Redirecting…" : "Subscribe"}
      </button>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="text-accent mt-0.5">→</span>
      <span>{children}</span>
    </li>
  );
}
