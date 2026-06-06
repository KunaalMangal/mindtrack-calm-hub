import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CheckIn from "@/pages/CheckIn";
import Triggers from "@/pages/Triggers";
import Journal from "@/pages/Journal";
import Insights from "@/pages/Insights";
import { getDraft, getEntries, saveEntry, type MoodEntry } from "@/lib/wellnessStore";

const renderAt = (ui: React.ReactNode, route = "/") =>
  render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);

describe("CheckIn page", () => {
  it("renders the heading and mood radio group", () => {
    renderAt(<CheckIn />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/how are you feeling/i);
    expect(screen.getByRole("radiogroup", { name: /mood/i })).toBeInTheDocument();
  });

  it("disables Continue until a mood is picked", () => {
    renderAt(<CheckIn />);
    const cont = screen.getByRole("button", { name: /continue/i });
    expect(cont).toBeDisabled();
    fireEvent.click(screen.getByRole("radio", { name: "Good" }));
    expect(cont).not.toBeDisabled();
  });

  it("persists draft when continuing", () => {
    renderAt(<CheckIn />);
    fireEvent.click(screen.getByRole("radio", { name: "Happy" }));
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));
    expect(getDraft().mood).toBe("Happy");
  });
});

describe("Triggers page", () => {
  it("toggles a trigger via aria-pressed", () => {
    renderAt(<Triggers />);
    const btn = screen.getByRole("button", { name: "Exam Pressure" });
    expect(btn).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(btn);
    expect(btn).toHaveAttribute("aria-pressed", "true");
  });

  it("saves selected triggers to draft on continue", () => {
    renderAt(<Triggers />);
    fireEvent.click(screen.getByRole("button", { name: "Sleep Issues" }));
    fireEvent.click(screen.getByRole("button", { name: /continue \(1 selected\)/i }));
    expect(getDraft().triggers).toEqual(["Sleep Issues"]);
  });
});

describe("Journal page", () => {
  it("enforces the max character limit", () => {
    renderAt(<Journal />);
    const ta = screen.getByLabelText(/reflection journal/i) as HTMLTextAreaElement;
    fireEvent.change(ta, { target: { value: "x".repeat(5000) } });
    expect(ta.value.length).toBeLessThanOrEqual(4000);
  });
});

describe("Insights page", () => {
  it("shows demo banner when there are no entries", () => {
    renderAt(<Insights />);
    expect(screen.getByText(/demo snapshot/i)).toBeInTheDocument();
  });

  it("renders a real entry from storage", () => {
    const e: MoodEntry = {
      mood: "Good",
      stressLevel: 4,
      sleepHours: 7,
      studyHours: 5,
      triggers: ["Exam Pressure"],
      journal: "today was steady",
      burnoutScore: 29,
      createdAt: new Date().toISOString(),
    };
    saveEntry(e);
    expect(getEntries()).toHaveLength(1);
    renderAt(<Insights />);
    expect(screen.queryByText(/demo snapshot/i)).not.toBeInTheDocument();
    expect(screen.getByText("29")).toBeInTheDocument();
    expect(screen.getByText(/Low risk/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /recent check-ins/i })).toBeInTheDocument();
  });
});
