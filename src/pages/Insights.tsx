import { useMemo } from "react";
import { Link } from "react-router-dom";
import { AppHeader } from "@/components/AppHeader";
import { Stepper } from "@/components/Stepper";
import {
  burnoutCategory,
  encouragement,
  generateInsights,
  getEntries,
  type MoodEntry,
} from "@/lib/wellnessStore";
import { MOOD_EMOJI, MOOD_TO_SCORE } from "@/lib/wellnessConstants";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Activity, BookOpen, Brain, Moon, RefreshCcw, Sparkles, TrendingDown, Heart, Info } from "lucide-react";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SAMPLE_HISTORY = [
  { day: "Mon", mood: 7, burnout: 32 },
  { day: "Tue", mood: 5, burnout: 48 },
  { day: "Wed", mood: 6, burnout: 42 },
  { day: "Thu", mood: 4, burnout: 65 },
  { day: "Fri", mood: 5, burnout: 58 },
  { day: "Sat", mood: 7, burnout: 35 },
  { day: "Sun", mood: 8, burnout: 28 },
];

const catColor = (c: string) =>
  c === "Low" ? "text-emerald-700 bg-emerald-100" :
  c === "Medium" ? "text-amber-700 bg-amber-100" :
  c === "High" ? "text-orange-700 bg-orange-100" :
  "text-rose-700 bg-rose-100";

const catGradient = (c: string) =>
  c === "Low" ? "from-emerald-400 to-teal-500" :
  c === "Medium" ? "from-amber-400 to-orange-500" :
  c === "High" ? "from-orange-500 to-rose-500" :
  "from-rose-500 to-red-600";

const Insights = () => {
  const entries = getEntries();

  const demoEntry: MoodEntry = {
    mood: "Stressed",
    stressLevel: 7,
    sleepHours: 5.5,
    studyHours: 9,
    triggers: ["Exam Pressure", "Mock Test Scores", "Sleep Issues"],
    journal: "Today felt heavy. The mock test didn't go as expected and I'm second-guessing my prep strategy. Trying to stay focused.",
    burnoutScore: 7 * 4 + (8 - 5.5) * 3 + 9 * 2,
    createdAt: new Date().toISOString(),
  };

  const entry = entries[entries.length - 1] || demoEntry;
  const isDemo = entries.length === 0;
  const cat = burnoutCategory(entry.burnoutScore);
  const insights = useMemo(() => generateInsights(entry), [entry]);

  const chartData = useMemo(() => {
    const recent = entries.slice(-7);
    if (recent.length < 2) return SAMPLE_HISTORY;
    return recent.map((e) => ({
      day: new Date(e.createdAt).toLocaleDateString("en", { weekday: "short" }),
      mood: MOOD_TO_SCORE[e.mood] ?? 5,
      burnout: e.burnoutScore,
    }));
  }, [entries]);

  const recent = entries.slice(-5).reverse();

  return (
    <div className="min-h-screen pb-16">
      <AppHeader />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Stepper current={4} />

        {isDemo && (
          <div role="status" className="glass rounded-2xl px-5 py-3 mb-6 text-sm text-center text-muted-foreground">
            ✨ Showing a demo snapshot. <Link to="/check-in" className="text-primary font-semibold underline">Start your own check-in</Link> to see your real data.
          </div>
        )}

        <div className="flex flex-wrap items-end justify-between gap-4 mb-8 animate-fade-in">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
              {new Date(entry.createdAt).toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric" })}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold">Your wellness snapshot</h1>
          </div>
          <Link
            to="/check-in"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass font-semibold hover:bg-white/80 transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <RefreshCcw className="w-4 h-4" aria-hidden="true" /> New check-in
          </Link>
        </div>

        {/* Top stat row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 animate-slide-up">
          <StatCard icon={<span aria-hidden="true" className="text-2xl">{MOOD_EMOJI[entry.mood]}</span>} label="Current mood" value={entry.mood} tint="bg-gradient-warm" />
          <StatCard icon={<Activity className="w-5 h-5 text-rose-600" aria-hidden="true" />} label="Stress level" value={`${entry.stressLevel}/10`} tint="bg-rose-100" />
          <StatCard icon={<Moon className="w-5 h-5 text-indigo-600" aria-hidden="true" />} label="Sleep" value={`${entry.sleepHours}h`} tint="bg-gradient-calm" />
          <StatCard icon={<BookOpen className="w-5 h-5 text-primary" aria-hidden="true" />} label="Study" value={`${entry.studyHours}h`} tint="bg-primary/10" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Burnout card */}
          <div className="lg:col-span-1 glass-strong rounded-3xl p-6 relative overflow-hidden">
            <div aria-hidden="true" className={`absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br ${catGradient(cat)} opacity-20 blur-2xl`} />
            <div className="flex items-center gap-2 mb-3 text-xs uppercase tracking-widest text-muted-foreground">
              <Brain className="w-4 h-4" aria-hidden="true" /> Burnout risk score
              <TooltipProvider delayDuration={150}>
                <UITooltip>
                  <TooltipTrigger asChild>
                    <button type="button" aria-label="How burnout is calculated" className="ml-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
                      <Info className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs text-xs">
                    burnoutScore = (stressLevel × 4) + ((8 − sleepHours) × 3) + (studyHours × 2)
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <div aria-label={`Burnout score ${entry.burnoutScore} out of 100`} className={`text-6xl font-bold bg-gradient-to-br ${catGradient(cat)} bg-clip-text text-transparent`}>
                {entry.burnoutScore}
              </div>
              <div className="text-muted-foreground">/ 100</div>
            </div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${catColor(cat)}`}>
              {cat} risk
            </span>
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.min(100, entry.burnoutScore)}
              aria-label="Burnout risk meter"
              className="mt-5 h-3 rounded-full bg-muted overflow-hidden"
            >
              <div
                className={`h-full bg-gradient-to-r ${catGradient(cat)} transition-all`}
                style={{ width: `${Math.min(100, entry.burnoutScore)}%` }}
              />
            </div>
            <div aria-hidden="true" className="flex justify-between text-[10px] text-muted-foreground mt-1">
              <span>Low</span><span>Medium</span><span>High</span><span>Critical</span>
            </div>
            <div className="mt-5 p-4 rounded-2xl bg-gradient-calm">
              <div className="flex items-start gap-2">
                <Heart className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-sm leading-relaxed">{encouragement(entry.burnoutScore)}</p>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="lg:col-span-2 glass-strong rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">7-day trend</div>
                <h2 className="text-xl font-bold">Mood vs burnout</h2>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5"><span aria-hidden="true" className="w-2.5 h-2.5 rounded-full bg-primary" /> Mood</span>
                <span className="flex items-center gap-1.5"><span aria-hidden="true" className="w-2.5 h-2.5 rounded-full bg-rose-400" /> Burnout</span>
              </div>
            </div>
            <div className="h-64 -ml-4" role="img" aria-label="7-day mood and burnout trend chart">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(173 58% 45%)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="hsl(173 58% 45%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(0 75% 65%)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="hsl(0 75% 65%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip contentStyle={{ background: "white", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                  <Area type="monotone" dataKey="mood" stroke="hsl(173 58% 45%)" strokeWidth={2.5} fill="url(#g1)" />
                  <Area type="monotone" dataKey="burnout" stroke="hsl(0 75% 65%)" strokeWidth={2.5} fill="url(#g2)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Triggers */}
        <div className="glass-strong rounded-3xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4 text-xs uppercase tracking-widest text-muted-foreground">
            <TrendingDown className="w-4 h-4" aria-hidden="true" /> Stress triggers today
          </div>
          {entry.triggers.length === 0 ? (
            <p className="text-sm text-muted-foreground">No triggers selected — a calm day. 🌿</p>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {entry.triggers.map((t) => (
                <li key={t} className="px-4 py-2 rounded-full bg-gradient-to-r from-rose-100 to-orange-100 text-sm font-medium border border-rose-200/50">
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* AI Insights */}
        <section aria-labelledby="ai-insights-heading" className="mb-6">
          <div className="flex items-center gap-2 mb-4 px-2">
            <div aria-hidden="true" className="w-8 h-8 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <h2 id="ai-insights-heading" className="text-2xl font-bold">AI Wellness Suggestions</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {insights.map((ins, i) => (
              <article key={i} className="glass-strong rounded-3xl p-6 hover:-translate-y-1 transition-transform motion-reduce:transform-none">
                <div aria-hidden="true" className="text-3xl mb-2">{ins.icon}</div>
                <h3 className="font-bold text-lg mb-2">{ins.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{ins.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Journal echo */}
        {entry.journal && (
          <div className="glass-strong rounded-3xl p-6 mb-6">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Your reflection</div>
            <p className="text-base leading-relaxed italic text-foreground/80">"{entry.journal}"</p>
          </div>
        )}

        {/* Recent entries table */}
        {recent.length > 0 && (
          <section aria-labelledby="recent-heading" className="glass-strong rounded-3xl p-6">
            <h2 id="recent-heading" className="text-xl font-bold mb-4">Recent check-ins</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <caption className="sr-only">Your last {recent.length} wellness check-ins</caption>
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th scope="col" className="py-2 pr-3">Date</th>
                    <th scope="col" className="py-2 pr-3">Mood</th>
                    <th scope="col" className="py-2 pr-3">Stress</th>
                    <th scope="col" className="py-2 pr-3">Sleep</th>
                    <th scope="col" className="py-2 pr-3">Study</th>
                    <th scope="col" className="py-2 pr-3">Burnout</th>
                    <th scope="col" className="py-2 pr-3">Triggers</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((e) => (
                    <tr key={e.createdAt} className="border-t border-border/50">
                      <td className="py-2 pr-3 whitespace-nowrap">{new Date(e.createdAt).toLocaleDateString()}</td>
                      <td className="py-2 pr-3">{MOOD_EMOJI[e.mood]} {e.mood}</td>
                      <td className="py-2 pr-3">{e.stressLevel}/10</td>
                      <td className="py-2 pr-3">{e.sleepHours}h</td>
                      <td className="py-2 pr-3">{e.studyHours}h</td>
                      <td className="py-2 pr-3 font-semibold">{e.burnoutScore}</td>
                      <td className="py-2 pr-3 text-muted-foreground">{e.triggers.slice(0, 3).join(", ") || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

const StatCard = ({ icon, label, value, tint }: { icon: React.ReactNode; label: string; value: string; tint: string }) => (
  <div className="glass-strong rounded-3xl p-5">
    <div className={`w-10 h-10 rounded-xl ${tint} grid place-items-center mb-3`}>{icon}</div>
    <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    <div className="text-2xl font-bold mt-0.5">{value}</div>
  </div>
);

export default Insights;
