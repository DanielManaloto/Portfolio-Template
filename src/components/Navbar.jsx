import { useState } from "react";
import CircleBadge from './CircleBadge';

const navItems = [
  { name: "Hero", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/10 backdrop-blur-md
    sm:px-55 px-5">
      <div className="mx-auto flex h-16 w-full items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2 text-xl font-bold text-gray-900"
          onClick={() => setIsOpen(false)}
        >
          <CircleBadge size={40} fontSize="80"/>
          Daniel Manaloto
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-900 transition-colors duration-200 hover:text-gray-500"
            >
              {item.name}
            </a>
          ))}
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