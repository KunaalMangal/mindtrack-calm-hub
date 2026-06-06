import { Check } from "lucide-react";

const steps = [
  { n: 1, label: "Mood", paths: ["/check-in"] },
  { n: 2, label: "Triggers", paths: ["/triggers"] },
  { n: 3, label: "Reflect", paths: ["/journal"] },
  { n: 4, label: "Insights", paths: ["/insights"] },
];

export const Stepper = ({ current }: { current: 1 | 2 | 3 | 4 }) => (
  <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
    {steps.map((s, i) => {
      const done = current > s.n;
      const active = current === s.n;
      return (
        <div key={s.n} className="flex items-center gap-2 sm:gap-4">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`w-9 h-9 rounded-full grid place-items-center font-semibold text-sm transition-all
              ${active ? "bg-gradient-primary text-primary-foreground shadow-glow scale-110" : ""}
              ${done ? "bg-primary/15 text-primary" : ""}
              ${!active && !done ? "bg-white/60 text-muted-foreground border border-border" : ""}`}
            >
              {done ? <Check className="w-4 h-4" /> : s.n}
            </div>
            <span className={`text-[11px] uppercase tracking-wider ${active ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`h-0.5 w-6 sm:w-12 rounded-full ${current > s.n ? "bg-primary" : "bg-border"}`} />
          )}
        </div>
      );
    })}
  </div>
);
