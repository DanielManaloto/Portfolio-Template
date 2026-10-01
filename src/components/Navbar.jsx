import { useState, useEffect } from "react";
import CircleBadge from "./CircleBadge";

import content from "../content.json";
const navbar = content.navbar;

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

function ThemeToggle() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };
  return (
    <button
      onClick={toggleTheme}
      id="theme"
      type="button"
      aria-label={
        theme === "light" ? "Switch to dark mode" : "Switch to light mode"
      }
      className="grid h-11 w-11 shrink-0 place-items-center rounded border-0 p-0 hover:bg-border hover:brightness-100"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
        <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M10 2a8 8 0 0 1 0 16z" fill="currentColor" />
      </svg>
    </button>
  );
}

function Navbar() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    navItems.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1));
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label="Main"
      className="fixed top-0 left-0 z-50 w-full border-b border-border bg-background/90 px-5 backdrop-blur-md sm:px-55"
    >
      <div className="mx-auto flex min-h-15 w-full items-center justify-between gap-3">
        {/* Brand: badge only on small screens, badge + name from 561px up */}
        <a
          href="#home"
          aria-label={`${navbar.name}, back to top`}
          className="flex min-h-11 shrink-0 items-center gap-2.5 text-lg font-bold text-foreground"
        >
          <CircleBadge
            text={navbar.circleBadge}
            size={40}
            circleColor="foreground"
            fontSize="80"
          />
          <span className="max-[560px]:hidden">{navbar.name}</span>
        </a>

        {/* Links stay inline at every width (no hamburger) */}
        <ul className="m-0 flex list-none items-center gap-0.5 p-0">
          {navItems.map((item) => {
            const isActive = activeId === item.href.slice(1);
            return (
              <li key={item.name}>
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex min-h-11 items-center border-b-2 px-[7px] text-[15px] transition-colors duration-200 hover:text-foreground min-[561px]:px-2.5 min-[561px]:text-base ${
                    isActive
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted-foreground"
                  }`}
                >
                  {item.name}
                </a>
              </li>
            );
          })}
        </ul>

        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar;