import { Link } from "react-router-dom";
import { AppHeader } from "@/components/AppHeader";
import { ArrowRight, Brain, HeartPulse, LineChart, Sparkles, Moon, Wind } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <AppHeader />

      {/* Hero */}
      <section className="container mx-auto px-4 pt-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-primary mb-6">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              Built for Boards • JEE • NEET • CUET • CAT • GATE • UPSC
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
              Your mind matters <br />
              <span className="text-gradient">as much as your rank.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Track your mood, decode your stress triggers, and get AI-powered wellness insights tailored for board and competitive exam students. 60 seconds a day.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/check-in"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-transform"
              >
                Start Check-In <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/insights"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl glass font-semibold hover:bg-white/80 transition-colors"
              >
                View Demo Dashboard
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-10 text-sm text-muted-foreground">
              <div><span className="text-2xl font-bold text-foreground">10k+</span><br/>students helped</div>
              <div className="h-10 w-px bg-border" />
              <div><span className="text-2xl font-bold text-foreground">60s</span><br/>daily check-in</div>
              <div className="h-10 w-px bg-border" />
              <div><span className="text-2xl font-bold text-foreground">100%</span><br/>private</div>
            </div>
          </div>

          {/* Floating preview card */}
          <div className="relative animate-fade-in">
            <div className="absolute -top-8 -left-8 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-secondary/40 rounded-full blur-3xl" />
            <div className="relative glass-strong rounded-3xl p-6 shadow-glow animate-float">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Today's wellness</div>
                  <div className="text-2xl font-bold">Feeling balanced</div>
                </div>
                <div className="text-4xl">🙂</div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { l: "Mood", v: "Good", c: "bg-gradient-calm" },
                  { l: "Sleep", v: "7h", c: "bg-gradient-warm" },
                  { l: "Stress", v: "4/10", c: "bg-primary/10" },
                ].map((s) => (
                  <div key={s.l} className={`${s.c} rounded-xl p-3`}>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
                    <div className="font-bold text-foreground">{s.v}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl bg-primary/5 border border-primary/20 p-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-primary grid place-items-center shrink-0">
                    <Sparkles className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-primary mb-1">AI Insight</div>
                    <div className="text-sm">Your sleep is recovering well. Try a 10-min walk before evening study to keep stress low.</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 mt-4">
                {[3,4,2,5,3,2,4].map((h, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className="w-full bg-gradient-primary rounded-md" style={{ height: `${h*8}px` }} />
                    <div className="text-[9px] text-muted-foreground">{["M","T","W","T","F","S","S"][i]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-3">Built for exam season pressure</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Three pillars of student wellness, in one calm dashboard.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: HeartPulse, t: "Mood Tracking", d: "Daily emoji check-ins that turn into beautiful patterns over time so you spot what's really going on.", g: "bg-gradient-warm" },
            { icon: Brain, t: "Stress Awareness", d: "Identify the exact triggers — mock scores, family, sleep — pulling you down and learn to handle them.", g: "bg-gradient-calm" },
            { icon: LineChart, t: "AI Wellness Insights", d: "Personalized burnout score and coping suggestions based on your sleep, study load, and reflections.", g: "bg-primary/10" },
          ].map((b) => (
            <div key={b.t} className="glass rounded-3xl p-7 hover:-translate-y-1 transition-transform">
              <div className={`w-14 h-14 rounded-2xl ${b.g} grid place-items-center mb-5`}>
                <b.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{b.t}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{b.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-4 gap-4">
          {[
            { i: Moon, t: "Sleep tracking" },
            { i: Brain, t: "Burnout score" },
            { i: Wind, t: "Breathing tips" },
            { i: HeartPulse, t: "Mood history" },
          ].map((f) => (
            <div key={f.t} className="glass rounded-2xl p-5 flex items-center gap-3">
              <f.i className="w-5 h-5 text-primary" />
              <span className="font-medium text-sm">{f.t}</span>
            </div>
          ))}
        </div>

        <div className="mt-16 glass-strong rounded-3xl p-10 text-center max-w-3xl mx-auto">
          <div className="text-5xl mb-4">🌱</div>
          <h3 className="text-3xl font-bold mb-3">Ready for today's check-in?</h3>
          <p className="text-muted-foreground mb-6">It takes less than a minute. Your future self will thank you.</p>
          <Link
            to="/check-in"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-[1.02] transition-transform"
          >
            Start Check-In <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <footer className="container mx-auto px-4 pb-8 text-center text-xs text-muted-foreground">
        MindTrack is a wellness companion, not a substitute for professional mental health care.
      </footer>
    </div>
  );
};

export default Index;
