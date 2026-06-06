import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "@/components/AppHeader";
import { Stepper } from "@/components/Stepper";
import { setDraft, getDraft, type Mood } from "@/lib/wellnessStore";
import { MOODS } from "@/lib/wellnessConstants";
import { ArrowRight, Moon, BookOpen } from "lucide-react";

const CheckIn = () => {
  const nav = useNavigate();
  const d = getDraft();
  const [mood, setMood] = useState<Mood | undefined>(d.mood as Mood | undefined);
  const [stress, setStress] = useState<number>(d.stressLevel ?? 5);
  const [sleep, setSleep] = useState<number>(d.sleepHours ?? 7);
  const [study, setStudy] = useState<number>(d.studyHours ?? 6);

  const next = () => {
    if (!mood) return;
    setDraft({ mood, stressLevel: stress, sleepHours: sleep, studyHours: study });
    nav("/triggers");
  };

  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Stepper current={1} />
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">How are you feeling today?</h1>
          <p className="text-muted-foreground">A quick check-in to understand your wellness.</p>
        </div>

        <fieldset className="glass-strong rounded-3xl p-6 sm:p-8 mb-6 animate-slide-up border-0">
          <legend className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Your mood</legend>
          <div role="radiogroup" aria-label="Mood" className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4">
            {MOODS.map((m) => {
              const active = mood === m.mood;
              return (
                <button
                  key={m.mood}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  aria-label={m.label}
                  onClick={() => setMood(m.mood)}
                  className={`group rounded-2xl p-4 text-center transition-all border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                    ${active ? "border-primary bg-gradient-to-br " + m.tint + " shadow-glow scale-105" : "border-transparent bg-white/60 hover:bg-white"}`}
                >
                  <div aria-hidden="true" className="text-4xl mb-1 group-hover:scale-110 transition-transform">{m.emoji}</div>
                  <div className="text-xs font-semibold">{m.label}</div>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="glass-strong rounded-3xl p-6 sm:p-8 mb-6">
          <div className="flex items-center justify-between mb-4">
            <label htmlFor="stress-range" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Stress level</label>
            <div className="text-2xl font-bold text-gradient" aria-hidden="true">{stress}/10</div>
          </div>
          <input
            id="stress-range"
            type="range" min={1} max={10} value={stress}
            aria-valuemin={1} aria-valuemax={10} aria-valuenow={stress}
            aria-valuetext={`${stress} out of 10`}
            onChange={(e) => setStress(+e.target.value)}
            className="w-full h-2 rounded-full appearance-none bg-gradient-to-r from-emerald-300 via-amber-300 to-rose-400 accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Calm</span><span>Overwhelmed</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div className="glass-strong rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Moon className="w-4 h-4 text-primary" aria-hidden="true" />
              <label htmlFor="sleep-hours" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Sleep hours</label>
            </div>
            <input
              id="sleep-hours"
              type="number" min={0} max={24} step={0.5} value={sleep}
              onChange={(e) => setSleep(+e.target.value)}
              className="w-full text-4xl font-bold bg-transparent outline-none focus:text-primary focus-visible:ring-2 focus-visible:ring-primary rounded-md transition-colors"
            />
            <div className="text-xs text-muted-foreground">last night</div>
          </div>
          <div className="glass-strong rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-primary" aria-hidden="true" />
              <label htmlFor="study-hours" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Study hours</label>
            </div>
            <input
              id="study-hours"
              type="number" min={0} max={24} step={0.5} value={study}
              onChange={(e) => setStudy(+e.target.value)}
              className="w-full text-4xl font-bold bg-transparent outline-none focus:text-primary focus-visible:ring-2 focus-visible:ring-primary rounded-md transition-colors"
            />
            <div className="text-xs text-muted-foreground">today so far</div>
          </div>
        </div>

        <button
          type="button"
          onClick={next}
          disabled={!mood}
          aria-disabled={!mood}
          className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-[1.01] active:scale-[0.99] transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Continue <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </main>
    </div>
  );
};

export default CheckIn;
