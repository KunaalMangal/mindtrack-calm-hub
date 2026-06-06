import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "@/components/AppHeader";
import { Stepper } from "@/components/Stepper";
import { setDraft, getDraft, type Mood } from "@/lib/wellnessStore";
import { ArrowRight, Moon, BookOpen } from "lucide-react";

const moods: { mood: Mood; emoji: string; label: string; tint: string }[] = [
  { mood: "Happy", emoji: "😄", label: "Happy", tint: "from-amber-200 to-orange-200" },
  { mood: "Good", emoji: "🙂", label: "Good", tint: "from-emerald-200 to-teal-200" },
  { mood: "Neutral", emoji: "😐", label: "Neutral", tint: "from-slate-200 to-slate-300" },
  { mood: "Stressed", emoji: "😣", label: "Stressed", tint: "from-rose-200 to-pink-200" },
  { mood: "Burned Out", emoji: "😵‍💫", label: "Burned Out", tint: "from-red-200 to-rose-300" },
];

const CheckIn = () => {
  const nav = useNavigate();
  const d = getDraft();
  const [mood, setMood] = useState<Mood | undefined>(d.mood as Mood);
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

        <div className="glass-strong rounded-3xl p-6 sm:p-8 mb-6 animate-slide-up">
          <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Your mood</label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4">
            {moods.map((m) => {
              const active = mood === m.mood;
              return (
                <button
                  key={m.mood}
                  onClick={() => setMood(m.mood)}
                  className={`group rounded-2xl p-4 text-center transition-all border-2
                    ${active ? "border-primary bg-gradient-to-br " + m.tint + " shadow-glow scale-105" : "border-transparent bg-white/60 hover:bg-white"}`}
                >
                  <div className="text-4xl mb-1 group-hover:scale-110 transition-transform">{m.emoji}</div>
                  <div className="text-xs font-semibold">{m.label}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="glass-strong rounded-3xl p-6 sm:p-8 mb-6">
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Stress level</label>
            <div className="text-2xl font-bold text-gradient">{stress}/10</div>
          </div>
          <input
            type="range" min={1} max={10} value={stress}
            onChange={(e) => setStress(+e.target.value)}
            className="w-full h-2 rounded-full appearance-none bg-gradient-to-r from-emerald-300 via-amber-300 to-rose-400 accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Calm</span><span>Overwhelmed</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div className="glass-strong rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-3"><Moon className="w-4 h-4 text-primary" /><label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Sleep hours</label></div>
            <input
              type="number" min={0} max={24} step={0.5} value={sleep}
              onChange={(e) => setSleep(+e.target.value)}
              className="w-full text-4xl font-bold bg-transparent outline-none focus:text-primary transition-colors"
            />
            <div className="text-xs text-muted-foreground">last night</div>
          </div>
          <div className="glass-strong rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-3"><BookOpen className="w-4 h-4 text-primary" /><label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Study hours</label></div>
            <input
              type="number" min={0} max={24} step={0.5} value={study}
              onChange={(e) => setStudy(+e.target.value)}
              className="w-full text-4xl font-bold bg-transparent outline-none focus:text-primary transition-colors"
            />
            <div className="text-xs text-muted-foreground">today so far</div>
          </div>
        </div>

        <button
          onClick={next}
          disabled={!mood}
          className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-[1.01] active:scale-[0.99] transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          Continue <ArrowRight className="w-4 h-4" />
        </button>
      </main>
    </div>
  );
};

export default CheckIn;
