import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "@/components/AppHeader";
import { Stepper } from "@/components/Stepper";
import { calcBurnout, clearDraft, getDraft, saveEntry, setDraft, type Mood, type MoodEntry } from "@/lib/wellnessStore";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

const PROMPTS = [
  "Tell us how your day went and what's on your mind.",
  "What's one thing that drained you, and one that lifted you up?",
  "If today had a soundtrack, what song would it be — and why?",
];

const Journal = () => {
  const nav = useNavigate();
  const d = getDraft();
  const [journal, setJournal] = useState(d.journal || "");
  const [loading, setLoading] = useState(false);
  const prompt = PROMPTS[0];

  const submit = () => {
    setDraft({ journal });
    setLoading(true);
    setTimeout(() => {
      const draft = getDraft();
      const stress = draft.stressLevel ?? 5;
      const sleep = draft.sleepHours ?? 7;
      const study = draft.studyHours ?? 6;
      const entry: MoodEntry = {
        mood: (draft.mood as Mood) || "Neutral",
        stressLevel: stress,
        sleepHours: sleep,
        studyHours: study,
        triggers: draft.triggers || [],
        journal: journal,
        burnoutScore: calcBurnout(stress, sleep, study),
        createdAt: new Date().toISOString(),
      };
      saveEntry(entry);
      clearDraft();
      toast.success("Check-in saved", { description: "Your wellness snapshot is ready." });
      nav("/insights");
    }, 900);
  };

  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Stepper current={3} />
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">A moment to reflect</h1>
          <p className="text-muted-foreground">{prompt}</p>
        </div>

        <div className="glass-strong rounded-3xl p-6 sm:p-8 mb-6 animate-slide-up">
          <textarea
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            placeholder="Type as freely as you'd like. This stays on your device."
            rows={9}
            className="w-full bg-transparent outline-none resize-none text-base leading-relaxed placeholder:text-muted-foreground/60"
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground mt-3 pt-3 border-t border-border/50">
            <span>🔒 Private — saved locally only</span>
            <span>{journal.length} chars</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => nav("/triggers")}
            className="px-6 py-4 rounded-2xl glass font-semibold hover:bg-white/80 transition-colors"
            disabled={loading}
          >
            Back
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="flex-1 inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-[1.01] transition-transform disabled:opacity-70"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating insights...</> : <>Get my insights <ArrowRight className="w-4 h-4" /></>}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Journal;
