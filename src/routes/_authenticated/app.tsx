import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/app")({
  component: AppHome,
  head: () => ({ meta: [{ title: "Dashboard — Cadence" }] }),
});

function AppHome() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-border">
        <Link to="/" className="text-lg font-bold tracking-tight">
          CADENCE
        </Link>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            {email}
          </span>
          <button
            onClick={signOut}
            className="px-3 py-1.5 border border-border rounded-md text-xs font-medium hover:bg-surface transition-colors"
          >
            Sign out
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 md:px-10 py-16">
        <p className="text-[10px] font-mono text-accent uppercase tracking-[0.25em] mb-3">
          / Welcome
        </p>
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          You're in.
        </h1>
        <p className="text-muted-foreground max-w-lg mb-10">
          Next, connect your Strava account so Cadence can analyze your activity history
          and generate your first weekly coach brief.
        </p>

        <div className="bg-surface border border-border rounded-xl p-8 max-w-lg">
          <h2 className="text-lg font-semibold mb-2">Connect Strava</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Read-only access · revoke anytime in Strava settings.
          </p>
          <button className="px-5 py-2.5 bg-accent text-accent-foreground font-semibold rounded-md hover:brightness-110 transition-all">
            Connect Strava
          </button>
          <p className="mt-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            Setup pending — wiring next
          </p>
        </div>
      </main>
    </div>
  );
}
