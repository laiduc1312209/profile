import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Sparkles, Palette } from 'lucide-react';

export const THEMES = [
  { id: 'light', label: 'Light', icon: Sun },
  { id: 'violet-dark', label: 'Violet Dark', icon: Sparkles },
  { id: 'dark', label: 'Dark', icon: Moon },
  { id: 'violet-light', label: 'Violet Light', icon: Palette },
];

export default function ThemeSwitcher({ currentTheme, onThemeChange }) {
  const activeThemeObj = THEMES.find((t) => t.id === currentTheme) || THEMES[0];
  const ActiveIcon = activeThemeObj.icon;

  const handleNextTheme = () => {
    const currentIndex = THEMES.findIndex((t) => t.id === currentTheme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    onThemeChange(THEMES[nextIndex].id);
  };

  return (
    <button
      type="button"
      onClick={handleNextTheme}
      title={`Current theme: ${activeThemeObj.label} (Click to switch)`}
      className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[var(--topbar-text)] bg-[var(--topbar-bg)] border border-[var(--topbar-border)] backdrop-blur-md hover:border-[var(--topbar-hover-border)] transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
    >
      <motion.div
        key={currentTheme}
        initial={{ rotate: -60, scale: 0.7, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex items-center justify-center text-[var(--text-accent)]"
      >
        <ActiveIcon className="w-3.5 h-3.5" />
      </motion.div>
      <span className="font-mono text-xs">
        {activeThemeObj.label}
      </span>
    </button>
  );
}
