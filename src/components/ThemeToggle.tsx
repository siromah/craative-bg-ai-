import React from 'react';
import { motion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      data-state={isDark ? 'dark' : 'light'}
      className="theme-toggle"
      onClick={toggleTheme}
    >
      <span className="theme-toggle-glow" aria-hidden="true" />

      <motion.span
        className="theme-toggle-thumb"
        aria-hidden="true"
        initial={false}
        animate={{ x: isDark ? 36 : 0 }}
        transition={{
          type: 'spring',
          stiffness: 520,
          damping: 34,
          mass: 0.8,
        }}
      >
        {isDark ? <Moon size={15} strokeWidth={2.5} /> : <Sun size={15} strokeWidth={2.5} />}
      </motion.span>

      <span className="sr-only">{isDark ? 'Dark mode enabled' : 'Light mode enabled'}</span>
    </button>
  );
}

