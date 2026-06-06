import type { Mood } from "./wellnessStore";

export const MOODS: { mood: Mood; emoji: string; label: string; tint: string }[] = [
  { mood: "Happy", emoji: "😄", label: "Happy", tint: "from-amber-200 to-orange-200" },
  { mood: "Good", emoji: "🙂", label: "Good", tint: "from-emerald-200 to-teal-200" },
  { mood: "Neutral", emoji: "😐", label: "Neutral", tint: "from-slate-200 to-slate-300" },
  { mood: "Stressed", emoji: "😣", label: "Stressed", tint: "from-rose-200 to-pink-200" },
  { mood: "Burned Out", emoji: "😵‍💫", label: "Burned Out", tint: "from-red-200 to-rose-300" },
];

export const MOOD_EMOJI: Record<Mood, string> = {
  Happy: "😄",
  Good: "🙂",
  Neutral: "😐",
  Stressed: "😣",
  "Burned Out": "😵‍💫",
};

export const MOOD_TO_SCORE: Record<Mood, number> = {
  Happy: 9,
  Good: 7,
  Neutral: 5,
  Stressed: 3,
  "Burned Out": 1,
};

export const TRIGGERS: { t: string; e: string }[] = [
  { t: "Exam Pressure", e: "📚" },
  { t: "Family Expectations", e: "👨‍👩‍👧" },
  { t: "Mock Test Scores", e: "📊" },
  { t: "Lack of Preparation", e: "⏳" },
  { t: "Results Anxiety", e: "📮" },
  { t: "Social Comparison", e: "📱" },
  { t: "Sleep Issues", e: "🌙" },
  { t: "Financial Concerns", e: "💸" },
];

export const TRIGGER_NAMES = TRIGGERS.map((t) => t.t);

export const TARGET_EXAMS = [
  "Boards",
  "JEE",
  "NEET",
  "CUET",
  "CAT",
  "GATE",
  "UPSC",
] as const;

export const JOURNAL_MAX = 4000;
export const TRIGGERS_MAX = 16;
