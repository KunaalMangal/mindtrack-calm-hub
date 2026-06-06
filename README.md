# MindTrack Student Wellness

A calming, wellness-focused web application designed for students preparing for competitive exams like JEE, NEET, CUET, CAT, GATE, and UPSC. Track your mood, identify stress triggers, journal your thoughts, and receive AI-powered wellness insights — all in under 60 seconds a day.

## Features

- **Daily Check-In** — Log your mood, stress level, sleep, and study hours with an intuitive, mobile-first interface.
- **Stress Trigger Identification** — Select from common student stressors (mock test scores, family expectations, sleep issues, social comparison, results anxiety) to understand what's weighing on you.
- **Journal Reflection** — Write short reflections that are saved alongside your wellness data.
- **Burnout Risk Calculator** — Automatically computes a burnout score from your inputs and categorizes risk as Low, Medium, High, or Critical.
- **AI-Powered Insights** — Generates personalized, actionable wellness tips (breathing exercises, sleep recovery, micro-breaks, perspective shifts) based on your specific triggers and scores.
- **Insights Dashboard** — View your wellness history, burnout trends, mood patterns, and AI recommendations in a beautiful, chart-rich dashboard.
- **Fully Responsive** — Optimized for both mobile and desktop with a calming glassmorphism design.
- **Zero Backend Required** — All data persists in `localStorage` and `sessionStorage`, making it instantly demoable without any setup.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite**
- **Tailwind CSS**
- **shadcn/ui** components
- **Recharts** for data visualization
- **Lucide React** for icons
- **React Router** for navigation

## Getting Started

```bash
# Install dependencies
bun install

# Start the dev server
bun run dev
```

The app will be available at `http://localhost:5173` (or the port Vite assigns).

## Project Structure

```
src/
  components/
    AppHeader.tsx         # Top navigation header
    Stepper.tsx           # Progress stepper for the check-in flow
    ui/                   # shadcn/ui components
  lib/
    wellnessStore.ts      # Core wellness logic, localStorage, and AI insight engine
  pages/
    Index.tsx             # Landing page with hero and feature cards
    CheckIn.tsx           # Mood + sleep + stress + study hours form
    Triggers.tsx          # Stress trigger selection
    Journal.tsx           # Reflection / journaling page
    Insights.tsx          # Dashboard with charts, history, and AI tips
    NotFound.tsx          # 404 page
```

## How It Works

1. **Landing Page** — Students are introduced to the app and can start a check-in or view a demo dashboard.
2. **Check-In Flow** — A 3-step form captures mood, stress, sleep, study hours, triggers, and a journal entry.
3. **Burnout Score** — Calculated as `(stressLevel × 4) + ((8 − sleepHours) × 3) + (studyHours × 2)`, then capped at a minimum of 0.
4. **Insights** — Based on the computed score and selected triggers, personalized coping suggestions are generated.
5. **Dashboard** — All entries are visualized over time with trend charts and historical data cards.

## Demo & Deployment

This application is built for instant deployment. Since it uses browser-based storage, no database or backend configuration is needed. It's ideal for hackathon demos and can be published immediately.

## License

MIT
