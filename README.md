# MindTrack Student Wellness

A calming, wellness-focused web application designed for students preparing for **Boards, JEE, NEET, CUET, CAT, GATE, and UPSC**. Track your mood, identify stress triggers, journal your thoughts, and receive AI-powered wellness insights — all in under 60 seconds a day.

## Features

- **Daily Check-In** — Log your mood, stress level, sleep, and study hours with an intuitive, mobile-first interface.
- **Stress Trigger Identification** — Select from common student stressors (mock test scores, family expectations, sleep issues, social comparison, results anxiety) to understand what's weighing on you.
- **Journal Reflection** — Write short reflections that are validated, sanitized, and saved alongside your wellness data.
- **Burnout Risk Calculator** — Automatically computes a burnout score and categorizes risk as Low, Medium, High, or Critical.
- **AI-Powered Insights** — Generates personalized, actionable wellness tips (breathing exercises, sleep recovery, micro-breaks, perspective shifts) based on your specific triggers and scores.
- **Insights Dashboard** — Charts, trends, recent check-ins table, and AI recommendations in one place.
- **Fully Responsive** — Optimized for mobile and desktop with a calming glassmorphism design.
- **Zero Backend Required** — All data persists in `localStorage`, making it instantly demoable without any setup.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite 5**
- **Tailwind CSS** + **shadcn/ui**
- **Recharts** for data visualization
- **Lucide React** for icons
- **React Router** for navigation
- **Zod** for runtime schema validation
- **Vitest** + **React Testing Library** + **jsdom** for tests

## Getting Started

```bash
# Install dependencies
bun install

# Start the dev server
bun run dev
```

The app will be available at `http://localhost:5173` (or the port Vite assigns).

## Testing

```bash
bun run test        # run the full Vitest suite once
bun run test:watch  # watch mode
```

The suite includes **30+ tests** covering:

- **`wellnessStore`** — burnout formula, risk category thresholds, Zod schema validation on `localStorage` reads, text sanitization, and AI insight selection rules.
- **Pages** — mood selection, trigger toggling, journal character limits, and dashboard rendering with sample data.

## Security

- All data read from `localStorage` is validated through **Zod schemas** before use; malformed entries are discarded safely.
- `sanitizeText` strips control characters from all free-text input before storage.
- Journal entries are capped at **4000 characters**; selected triggers are capped at **16** to prevent storage abuse.
- External links use `rel="noopener noreferrer"`.
- No `dangerouslySetInnerHTML`, no third-party tracking, no network calls — all processing is local to the browser.

## Accessibility

- Semantic landmarks: `<main>`, `<nav aria-label="Primary">`, a single `<h1>` per page.
- Mood picker uses `role="radiogroup"`; trigger chips are real `<button>`s with `aria-pressed`.
- Check-in stepper exposes `aria-current="step"` for screen readers.
- All icon-only buttons have `aria-label`s; loading states use `aria-live="polite"` / `role="status"`.
- High-contrast `focus-visible` rings on every interactive element.
- Hero animations respect `prefers-reduced-motion`.

## Project Structure

```
src/
  components/
    AppHeader.tsx           # Top navigation header
    NavLink.tsx             # Accessible nav link with active state
    Stepper.tsx             # Progress stepper for the check-in flow
    ui/                     # shadcn/ui components
  lib/
    wellnessConstants.ts    # Moods, triggers, target exams, input limits
    wellnessStore.ts        # Core wellness logic, Zod schemas, AI insight engine
    utils.ts
  pages/
    Index.tsx               # Landing page with hero and feature cards
    CheckIn.tsx             # Mood + sleep + stress + study hours form
    Triggers.tsx            # Stress trigger selection
    Journal.tsx             # Reflection / journaling page
    Insights.tsx            # Dashboard with charts, history, and AI tips
    NotFound.tsx            # 404 page
  test/
    setup.ts                # jsdom + jest-dom setup
    wellnessStore.test.ts   # Store, formula, validation, and insight tests
    pages.test.tsx          # Component-level interaction tests
```

## How It Works

1. **Landing Page** — Students are introduced to the app and can start a check-in or view a demo dashboard.
2. **Check-In Flow** — A 3-step form captures mood, stress, sleep, study hours, triggers, and a journal entry. All inputs are validated and sanitized before being stored.
3. **Burnout Score** — Calculated as `(stressLevel × 4) + ((8 − sleepHours) × 3) + (studyHours × 2)`, clamped to a non-negative integer.
4. **Insights** — Based on the computed score and selected triggers, personalized coping suggestions are generated client-side.
5. **Dashboard** — All entries are visualized over time with trend charts and a recent check-ins table.

## Demo & Deployment

Browser-based storage means no database or backend configuration is needed — ideal for hackathon demos and instant publishing.

## License

MIT
