import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Sign in — Cadence" },
      { name: "description", content: "Sign in to your Cadence account." },
    ],
  }),
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    navigate({ to: "/app" });
  };

  const handleGoogle = async () => {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/app` },
    });
    if (error) setError(error.message);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="px-6 md:px-10 py-5 border-b border-border">
        <Link to="/" className="text-lg font-bold tracking-tight">
          CADENCE
        </Link>
      </header>

      <main className="flex-1 grid place-items-center px-6 py-16">
        <div className="w-full max-w-sm">
          <p className="text-[10px] font-mono text-accent uppercase tracking-[0.25em] mb-3">
            / Sign in
          </p>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back.</h1>
          <p className="text-sm text-muted-foreground mb-8">
            Sign in to view your training analysis.
          </p>

          <button
            onClick={handleGoogle}
            className="w-full px-4 py-3 mb-3 border border-border rounded-md bg-surface hover:bg-surface-elevated text-sm font-medium transition-colors flex items-center justify-center gap-3"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              or email
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-3">
            <FieldInput
              type="email"
              label="Email"
              value={email}
              onChange={setEmail}
              autoComplete="email"
              required
            />
            <FieldInput
              type="password"
              label="Password"
              value={password}
              onChange={setPassword}
              autoComplete="current-password"
              required
            />

            {error && (
              <p className="text-xs text-destructive font-mono">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-accent text-accent-foreground font-semibold rounded-md hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-sm text-muted-foreground text-center">
            New to Cadence?{" "}
            <Link to="/signup" className="text-accent hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

function FieldInput({
  type,
  label,
  value,
  onChange,
  autoComplete,
  required,
}: {
  type: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1.5 block">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        required={required}
        className="w-full px-3 py-2.5 bg-surface border border-border rounded-md text-sm text-foreground focus:outline-none focus:border-accent transition-colors"
      />
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A10.99 10.99 0 0 0 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18A10.99 10.99 0 0 0 1 12c0 1.78.43 3.46 1.18 4.94l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
    </svg>
  );
}
