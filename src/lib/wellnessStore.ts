export type Mood = "Happy" | "Good" | "Neutral" | "Stressed" | "Burned Out";

export interface MoodEntry {
  mood: Mood;
  stressLevel: number;
  sleepHours: number;
  studyHours: number;
  triggers: string[];
  journal: string;
  burnoutScore: number;
  createdAt: string;
}

const KEY = "mindtrack_entries_v1";
const DRAFT = "mindtrack_draft_v1";

export function calcBurnout(stressLevel: number, sleepHours: number, studyHours: number) {
  return Math.max(0, Math.round(stressLevel * 4 + (8 - sleepHours) * 3 + studyHours * 2));
}

export function burnoutCategory(score: number): "Low" | "Medium" | "High" | "Critical" {
  if (score <= 30) return "Low";
  if (score <= 60) return "Medium";
  if (score <= 80) return "High";
  return "Critical";
}

export function getEntries(): MoodEntry[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveEntry(entry: MoodEntry) {
  const all = getEntries();
  all.push(entry);
  localStorage.setItem(KEY, JSON.stringify(all));
}

export type Draft = Partial<MoodEntry>;
export function getDraft(): Draft {
  try {
    return JSON.parse(sessionStorage.getItem(DRAFT) || "{}");
  } catch {
    return {};
  }
}
export function setDraft(patch: Draft) {
  const next = { ...getDraft(), ...patch };
  sessionStorage.setItem(DRAFT, JSON.stringify(next));
}
export function clearDraft() {
  sessionStorage.removeItem(DRAFT);
}

export function generateInsights(entry: MoodEntry): { title: string; body: string; icon: string }[] {
  const out: { title: string; body: string; icon: string }[] = [];
  const cat = burnoutCategory(entry.burnoutScore);

  if (entry.stressLevel >= 7) {
    out.push({
      icon: "🌬️",
      title: "Try a 4-7-8 breathing exercise",
      body: "Inhale for 4s, hold for 7s, exhale for 8s. Repeat 4 cycles to lower your heart rate and quiet the racing thoughts before your next study session.",
    });
  }
  if (entry.sleepHours < 6) {
    out.push({
      icon: "🌙",
      title: "Prioritize sleep recovery tonight",
      body: `You logged only ${entry.sleepHours}h of sleep. Aim for 7-8 hours tonight. Dim screens 45 minutes before bed and try a short body-scan meditation.`,
    });
  }
  if (entry.studyHours > 10) {
    out.push({
      icon: "⏸️",
      title: "Build in micro-breaks",
      body: `${entry.studyHours}h of study is intense. Use the 50/10 rule — 50 minutes focused, 10 minutes off-screen. Walk, stretch, hydrate.`,
    });
  }
  if (entry.triggers.includes("Results Anxiety") || entry.triggers.includes("Mock Test Scores")) {
    out.push({
      icon: "💙",
      title: "Mock scores are data, not destiny",
      body: "A single mock doesn't define your rank. Identify 2 weak topics, dedicate this week to them, and re-test. Progress > perfection.",
    });
  }
  if (entry.triggers.includes("Family Expectations") || entry.triggers.includes("Social Comparison")) {
    out.push({
      icon: "🪞",
      title: "Run your own race",
      body: "Comparison steals focus. Write down one thing YOU improved this week. Share progress, not pressure, with family.",
    });
  }
  if (entry.triggers.includes("Sleep Issues")) {
    out.push({
      icon: "🍵",
      title: "Wind-down ritual",
      body: "Cut caffeine after 4pm, try chamomile tea, and journal one sentence before bed to offload tomorrow's worries.",
    });
  }
  if (cat === "Critical" || cat === "High") {
    out.push({
      icon: "🤝",
      title: "Reach out — you don't have to do this alone",
      body: "Talk to a friend, mentor, or counselor today. iCall (9152987821) offers free confidential support for students in India.",
    });
  }
  if (entry.journal && entry.journal.length > 40) {
    out.push({
      icon: "📓",
      title: "Your reflection matters",
      body: "Writing it out is a real coping skill. Re-read this entry next week to notice patterns and progress.",
    });
  }
  if (out.length === 0) {
    out.push({
      icon: "✨",
      title: "You're doing great",
      body: "Your wellness markers look balanced today. Keep your routine, stay hydrated, and celebrate the small wins.",
    });
  }
  return out.slice(0, 4);
}

export function encouragement(score: number): string {
  if (score <= 30) return "You're balancing study and self-care beautifully. Keep this rhythm — it's your superpower. 🌿";
  if (score <= 60) return "You're carrying real weight and still showing up. That's strength. Take one gentle step today. 💚";
  if (score <= 80) return "This is hard, and you're allowed to slow down. Rest is part of preparation, not a setback. 🤍";
  return "Please be kind to yourself today. Talk to someone you trust. You are more than any exam. You matter. 💙";
}
