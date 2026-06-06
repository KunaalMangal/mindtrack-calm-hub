import { describe, it, expect } from "vitest";
import {
  calcBurnout,
  burnoutCategory,
  encouragement,
  generateInsights,
  getEntries,
  saveEntry,
  getDraft,
  setDraft,
  clearDraft,
  type MoodEntry,
} from "@/lib/wellnessStore";

const baseEntry: MoodEntry = {
  mood: "Neutral",
  stressLevel: 5,
  sleepHours: 7,
  studyHours: 6,
  triggers: [],
  journal: "",
  burnoutScore: 0,
  createdAt: new Date().toISOString(),
};

describe("calcBurnout", () => {
  it("matches the spec formula", () => {
    // 5*4 + (8-7)*3 + 6*2 = 20 + 3 + 12 = 35
    expect(calcBurnout(5, 7, 6)).toBe(35);
  });
  it("never goes below 0", () => {
    expect(calcBurnout(0, 12, 0)).toBeGreaterThanOrEqual(0);
  });
  it("rounds the result", () => {
    expect(Number.isInteger(calcBurnout(3, 5.5, 4))).toBe(true);
  });
});

describe("burnoutCategory thresholds", () => {
  it("Low at <=30", () => expect(burnoutCategory(30)).toBe("Low"));
  it("Medium at 31-60", () => {
    expect(burnoutCategory(31)).toBe("Medium");
    expect(burnoutCategory(60)).toBe("Medium");
  });
  it("High at 61-80", () => expect(burnoutCategory(75)).toBe("High"));
  it("Critical above 80", () => expect(burnoutCategory(95)).toBe("Critical"));
});

describe("encouragement copy varies by score", () => {
  it("returns different copy per band", () => {
    const a = encouragement(10);
    const b = encouragement(50);
    const c = encouragement(75);
    const d = encouragement(95);
    expect(new Set([a, b, c, d]).size).toBe(4);
  });
});

describe("getEntries / saveEntry", () => {
  it("returns [] when storage is empty", () => {
    expect(getEntries()).toEqual([]);
  });
  it("returns [] when storage is corrupt", () => {
    localStorage.setItem("mindtrack_entries_v1", "not json{");
    expect(getEntries()).toEqual([]);
  });
  it("drops malformed entries via schema validation", () => {
    localStorage.setItem(
      "mindtrack_entries_v1",
      JSON.stringify([{ junk: true }, { ...baseEntry, mood: "BadMood" }]),
    );
    expect(getEntries()).toEqual([]);
  });
  it("persists a valid entry", () => {
    saveEntry({ ...baseEntry, burnoutScore: 42 });
    const all = getEntries();
    expect(all).toHaveLength(1);
    expect(all[0].burnoutScore).toBe(42);
  });
  it("sanitizes journal and caps triggers", () => {
    const evil = "hi\x00\x01there";
    saveEntry({
      ...baseEntry,
      journal: evil,
      triggers: Array.from({ length: 50 }, (_, i) => `t${i}`),
    });
    const [e] = getEntries();
    expect(e.journal).toBe("hithere");
    expect(e.triggers.length).toBeLessThanOrEqual(16);
  });
});

describe("draft session storage", () => {
  it("round-trips a partial draft", () => {
    setDraft({ mood: "Good", stressLevel: 3 });
    expect(getDraft()).toMatchObject({ mood: "Good", stressLevel: 3 });
  });
  it("clears the draft", () => {
    setDraft({ mood: "Good" });
    clearDraft();
    expect(getDraft()).toEqual({});
  });
  it("returns {} on corrupt session data", () => {
    sessionStorage.setItem("mindtrack_draft_v1", "{broken");
    expect(getDraft()).toEqual({});
  });
});

describe("generateInsights rules", () => {
  it("recommends breathing when stress is high", () => {
    const out = generateInsights({ ...baseEntry, stressLevel: 8, burnoutScore: 40 });
    expect(out.some((i) => i.title.includes("breathing"))).toBe(true);
  });
  it("recommends sleep recovery when sleep < 6", () => {
    const out = generateInsights({ ...baseEntry, sleepHours: 4, burnoutScore: 40 });
    expect(out.some((i) => i.title.toLowerCase().includes("sleep"))).toBe(true);
  });
  it("recommends micro-breaks for long study sessions", () => {
    const out = generateInsights({ ...baseEntry, studyHours: 12, burnoutScore: 40 });
    expect(out.some((i) => i.title.toLowerCase().includes("micro-breaks"))).toBe(true);
  });
  it("adds helpline insight when category is Critical", () => {
    const out = generateInsights({ ...baseEntry, burnoutScore: 95 });
    expect(out.some((i) => i.body.includes("iCall"))).toBe(true);
  });
  it("falls back to positive message when nothing flagged", () => {
    const out = generateInsights({ ...baseEntry, burnoutScore: 10 });
    expect(out[0].title).toMatch(/great/i);
  });
  it("caps at 4 insights", () => {
    const out = generateInsights({
      ...baseEntry,
      stressLevel: 9,
      sleepHours: 3,
      studyHours: 13,
      triggers: ["Mock Test Scores", "Family Expectations", "Sleep Issues"],
      journal: "a really long journal entry ".repeat(5),
      burnoutScore: 95,
    });
    expect(out.length).toBeLessThanOrEqual(4);
  });
});
