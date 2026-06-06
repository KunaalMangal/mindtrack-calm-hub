import { Link, useLocation } from "react-router-dom";
import { Sparkles } from "lucide-react";

export const AppHeader = () => {
  const loc = useLocation();
  const isLanding = loc.pathname === "/";
  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="container mx-auto px-4 py-4">
        <div className="glass rounded-2xl px-5 py-3 flex items-center justify-between">
          <Link to="/" aria-label="MindTrack home" className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl">
            <div className="w-9 h-9 rounded-xl bg-gradient-primary grid place-items-center shadow-glow group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-primary-foreground" aria-hidden="true" />
            </div>
            <div className="leading-tight">
              <div className="font-bold text-foreground">MindTrack</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Student Wellness</div>
            </div>
          </Link>
          <nav aria-label="Primary" className="hidden sm:flex items-center gap-1 text-sm">
            <Link to="/check-in" className="px-3 py-1.5 rounded-lg hover:bg-white/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Check-In</Link>
            <Link to="/insights" className="px-3 py-1.5 rounded-lg hover:bg-white/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Insights</Link>
          </nav>
          {isLanding && (
            <Link
              to="/check-in"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-semibold shadow-soft hover:shadow-glow transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Start Check-In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
