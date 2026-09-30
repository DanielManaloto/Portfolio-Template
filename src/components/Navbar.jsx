import { useState, useEffect } from "react";
import CircleBadge from "./CircleBadge";

import content from "../content.json";
const navbar = content.navbar;

const navItems = [
  { name: "Hero", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
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
    >
      {" "}
      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
        {" "}
        <circle
          cx="10"
          cy="10"
          r="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />{" "}
        <path d="M10 2a8 8 0 0 1 0 16z" fill="currentColor" />{" "}
      </svg>{" "}
    </button>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 z-50 w-full border-b border-white/10 backdrop-blur-md
    sm:px-55 px-5"
    >
      <div className="mx-auto flex h-16 w-full items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2 text-xl font-bold text-foreground"
          onClick={() => setIsOpen(false)}
        >
          <CircleBadge text={navbar.CircleBadge} size={40} circleColor="foreground" fontSize="80" />
          {navbar.name}
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-foreground transition-colors duration-200 hover:text-gray-500"
            >
              {item.name}
            </a>
          ))}

          <ThemeToggle />
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className="p-2 text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-white/10 bg-black/95 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-gray-300 transition-colors duration-200 hover:text-white"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
