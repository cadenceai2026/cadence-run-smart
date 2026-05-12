import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Cadence — AI running coach for Strava" },
      {
        name: "description",
        content:
          "Cadence turns your Strava activity data into clear insights and smarter weekly training decisions. Built for runners who want clarity, not noise.",
      },
      { property: "og:title", content: "Cadence — AI running coach for Strava" },
      {
        property: "og:description",
        content: "Turn Strava data into better training decisions with AI.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/30 selection:text-accent-foreground">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-border">
        <div className="flex items-center gap-10">
          <span className="text-lg font-bold tracking-tight">CADENCE</span>
          <div className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
            <a href="#insights" className="hover:text-accent transition-colors">Insights</a>
            <a href="#method" className="hover:text-accent transition-colors">Method</a>
            <a href="#privacy" className="hover:text-accent transition-colors">Privacy</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="hidden sm:inline text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-accent text-accent-foreground text-sm font-semibold rounded-md hover:brightness-110 transition-all"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[11px] font-mono mb-7 uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              AI Coaching · Live
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
              Turn Strava data into{" "}
              <span className="text-accent">better training.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-9 max-w-lg">
              Cadence analyzes your real activity history to identify patterns, volume gaps,
              and intensity shifts. No generic plans. No social noise. Just clear weekly
              guidance built on the runs you already do.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-md hover:brightness-110 transition-all">
                Connect Strava
              </button>
              <button className="px-6 py-3 border border-border text-foreground font-medium rounded-md hover:bg-surface transition-colors">
                See sample insights
              </button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              <Stat label="Activities analyzed" value="2.4M+" />
              <Stat label="Avg. runner pace gain" value="+3.8%" />
              <Stat label="Privacy" value="Strict" />
            </div>
          </div>

          <CoachCard />
        </div>

        {/* Insights */}
        <section id="insights" className="mt-32">
          <SectionLabel index="01" title="What Cadence does" />
          <div className="grid md:grid-cols-3 gap-px bg-border mt-10 border border-border rounded-xl overflow-hidden">
            <FeatureCell
              kicker="Volume"
              title="See your real load"
              body="Weekly mileage, intensity distribution, and rolling fatigue — surfaced in a single chart so you stop guessing."
            />
            <FeatureCell
              kicker="Pattern"
              title="Find what's working"
              body="Cadence detects which sessions actually moved your aerobic engine forward — and which ones just added junk miles."
            />
            <FeatureCell
              kicker="Decision"
              title="Plan the next week"
              body="Get a short, opinionated brief on how to structure the next 7 days based on your last 90."
            />
          </div>
        </section>

        {/* Sample data panel */}
        <section className="mt-24 grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 bg-surface border border-border rounded-xl p-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] mb-1">
                  Last 12 weeks
                </p>
                <h3 className="text-xl font-semibold">Weekly volume</h3>
              </div>
              <div className="text-right">
                <p className="text-2xl font-mono font-semibold">42.8<span className="text-muted-foreground text-sm ml-1">km</span></p>
                <p className="text-[11px] font-mono text-accent">+6.4% vs avg</p>
              </div>
            </div>
            <BarChart />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <MetricRow label="Aerobic efficiency" value="+12.4%" trend="up" />
            <MetricRow label="Fatigue index" value="Moderate" trend="flat" />
            <MetricRow label="Consistency" value="92 / 100" trend="up" />
            <MetricRow label="Long run drift" value="−4.0%" trend="up" />
          </div>
        </section>

        {/* Who it's for */}
        <section id="method" className="mt-32">
          <SectionLabel index="02" title="Who it's for" />
          <div className="grid md:grid-cols-2 gap-10 mt-10 max-w-4xl">
            <Audience
              title="Runners without a coach"
              body="You train 3–6 times a week, you log everything, but no one is reading the data with you."
            />
            <Audience
              title="Data-aware athletes"
              body="You know your zones and your splits. You want interpretation, not another dashboard."
            />
            <Audience
              title="Sustainable improvers"
              body="You're done with viral 12-week plans. You want decisions that compound over months."
            />
            <Audience
              title="Privacy-first users"
              body="No social feed, no kudos, no public profile. Cadence reads your data and tells only you."
            />
          </div>
        </section>

        {/* Differentiators */}
        <section id="privacy" className="mt-32">
          <SectionLabel index="03" title="Why Cadence is different" />
          <div className="grid md:grid-cols-3 gap-12 mt-10">
            <Diff
              kicker="Logic first"
              title="Data, not motivation"
              body="No streak nudges. No 'keep going!' notifications. We tell you why your threshold pace is stalling."
            />
            <Diff
              kicker="Zero social"
              title="Pure privacy"
              body="No likes, no comments, no leaderboards. Your training is yours — Cadence is a tool, not a feed."
            />
            <Diff
              kicker="Adaptive"
              title="Built for real life"
              body="Cadence reads what you actually ran, not what a static plan said you should run on Tuesday."
            />
          </div>
        </section>

        {/* CTA */}
        <section className="mt-32 pt-20 border-t border-border text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
            Stop guessing your training.
          </h2>
          <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
            Connect your Strava in under a minute. Cadence analyzes your last 90 days and
            sends your first weekly brief immediately.
          </p>
          <button className="px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-md hover:brightness-110 transition-all">
            Connect Strava → Get my analysis
          </button>
          <p className="mt-4 text-[11px] font-mono text-muted-foreground uppercase tracking-widest">
            Read-only access · Revoke anytime
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
          <span>© 2026 Cadence</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Strava API</a>
            <a href="#" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xl font-mono font-semibold text-foreground">{value}</p>
      <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mt-1">
        {label}
      </p>
    </div>
  );
}

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="text-[10px] font-mono text-accent uppercase tracking-[0.25em]">
        / {index}
      </span>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
    </div>
  );
}

function FeatureCell({ kicker, title, body }: { kicker: string; title: string; body: string }) {
  return (
    <div className="bg-background p-8 hover:bg-surface transition-colors">
      <p className="text-[10px] font-mono text-accent uppercase tracking-[0.2em] mb-4">
        {kicker}
      </p>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}

function Diff({ kicker, title, body }: { kicker: string; title: string; body: string }) {
  return (
    <div>
      <p className="text-[10px] font-mono text-accent uppercase tracking-[0.25em] mb-4">
        {kicker}
      </p>
      <h4 className="text-xl font-semibold mb-3">{title}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}

function Audience({ title, body }: { title: string; body: string }) {
  return (
    <div className="border-l border-border pl-5">
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}

function MetricRow({ label, value, trend }: { label: string; value: string; trend: "up" | "flat" | "down" }) {
  const color =
    trend === "up" ? "text-accent" : trend === "down" ? "text-destructive" : "text-muted-foreground";
  return (
    <div className="flex items-center justify-between bg-surface border border-border rounded-lg px-5 py-4">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`text-sm font-mono font-semibold ${color}`}>{value}</span>
    </div>
  );
}

function CoachCard() {
  return (
    <div className="relative">
      <div className="bg-surface border border-border rounded-xl p-6 shadow-2xl relative z-10">
        <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/10 grid place-items-center">
              <span className="text-accent font-mono text-xs font-semibold">AI</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Weekly Coach Brief</h3>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono">
                Updated · Today, 08:42
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-accent uppercase tracking-widest px-2 py-1 border border-accent/30 rounded">
            Optimal load
          </span>
        </div>

        <div className="space-y-5">
          <div className="p-4 rounded-lg bg-background border border-border">
            <p className="text-sm text-foreground/90 leading-relaxed">
              <span className="text-accent font-semibold">Observation · </span>
              Aerobic decoupling on runs over 90 minutes dropped 4% this month. Your engine
              is getting stronger, but zone 2 HR drifts in the final 3km.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-lg bg-background border border-border">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono mb-1">
                Aerobic eff.
              </p>
              <p className="text-2xl font-mono font-semibold">+12.4%</p>
            </div>
            <div className="p-4 rounded-lg bg-background border border-border">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono mb-1">
                Fatigue
              </p>
              <p className="text-2xl font-mono font-semibold">Moderate</p>
            </div>
          </div>

          <LineChart />

          <div className="flex items-center justify-between pt-2">
            <p className="text-[11px] text-muted-foreground">Next focus</p>
            <p className="text-[11px] font-mono text-accent">2× tempo · 1× long Z2</p>
          </div>
        </div>
      </div>
      <div className="absolute -z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-accent/15 blur-[120px] rounded-full" />
    </div>
  );
}

function BarChart() {
  const bars = [42, 55, 38, 60, 48, 70, 52, 64, 75, 58, 82, 68];
  const max = Math.max(...bars);
  return (
    <div className="flex items-end gap-2 h-40">
      {bars.map((v, i) => {
        const isPeak = v === max;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <div
              className={`w-full rounded-t-sm transition-all ${
                isPeak ? "bg-accent" : "bg-surface-elevated"
              }`}
              style={{ height: `${(v / max) * 100}%` }}
            />
            <span className="text-[9px] font-mono text-muted-foreground">
              W{i + 1}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function LineChart() {
  // Simple SVG sparkline
  const points = [20, 28, 24, 35, 30, 42, 38, 50, 46, 58, 54, 64];
  const w = 280;
  const h = 70;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / (max - min)) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div className="bg-background border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
          12-week trend
        </p>
        <p className="text-[10px] font-mono text-accent">↗ trending up</p>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-16" preserveAspectRatio="none">
        <defs>
          <linearGradient id="cad-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.88 0.16 200)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="oklch(0.88 0.16 200)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={`${path} L${w},${h} L0,${h} Z`}
          fill="url(#cad-fill)"
        />
        <path
          d={path}
          fill="none"
          stroke="oklch(0.88 0.16 200)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
