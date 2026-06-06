import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "@/components/AppHeader";
import { Stepper } from "@/components/Stepper";
import { getDraft, setDraft } from "@/lib/wellnessStore";
import { ArrowRight, Check } from "lucide-react";

const TRIGGERS = [
  { t: "Exam Pressure", e: "📚" },
  { t: "Family Expectations", e: "👨‍👩‍👧" },
  { t: "Mock Test Scores", e: "📊" },
  { t: "Lack of Preparation", e: "⏳" },
  { t: "Results Anxiety", e: "📮" },
  { t: "Social Comparison", e: "📱" },
  { t: "Sleep Issues", e: "🌙" },
  { t: "Financial Concerns", e: "💸" },
];

const Triggers = () => {
  const nav = useNavigate();
  const d = getDraft();
  const [selected, setSelected] = useState<string[]>(d.triggers || []);

  const toggle = (t: string) =>
    setSelected((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));

  const next = () => {
    setDraft({ triggers: selected });
    nav("/journal");
  };

  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Stepper current={2} />
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">What's weighing on you?</h1>
          <p className="text-muted-foreground">Select any that resonate. Naming it is half of taming it.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 animate-slide-up">
          {TRIGGERS.map((tr) => {
            const active = selected.includes(tr.t);
            return (
              <button
                key={tr.t}
                onClick={() => toggle(tr.t)}
                className={`relative rounded-2xl p-5 text-left transition-all border-2
                  ${active ? "border-primary bg-gradient-primary text-primary-foreground shadow-glow scale-[1.02]" : "border-transparent glass hover:bg-white/80"}`}
              >
                <div className="text-3xl mb-2">{tr.e}</div>
                <div className="font-semibold text-sm leading-tight">{tr.t}</div>
                {active && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/30 grid place-items-center">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => nav("/check-in")}
            className="px-6 py-4 rounded-2xl glass font-semibold hover:bg-white/80 transition-colors"
          >
            Back
          </button>
          <button
            onClick={next}
            className="flex-1 inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-[1.01] transition-transform"
          >
            Continue ({selected.length} selected) <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default Triggers;
