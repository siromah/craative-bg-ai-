import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

const STORAGE_KEY = 'ailabs_theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function isTheme(value: string | null): value is Theme {
  return value === 'light' || value === 'dark';
}

function getSystemTheme(): Theme {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return 'dark';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  try {
    const savedTheme = window.localStorage.getItem(STORAGE_KEY);
    if (isTheme(savedTheme)) {
      return savedTheme;
    }
  } catch {
    return getSystemTheme();
  }

  return getSystemTheme();
}

function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;

  root.classList.remove('light', 'dark');
  root.classList.add(theme);
  root.setAttribute('data-theme', theme);
  root.style.colorScheme = theme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);

    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore storage errors, for example private browsing restrictions.
    }
  }, [theme]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemChange = () => {
      try {
        const savedTheme = window.localStorage.getItem(STORAGE_KEY);
        if (isTheme(savedTheme)) {
          return;
        }
      } catch {
        // If localStorage is unavailable, still follow system preference.
      }

      setTheme(mediaQuery.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme: () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark')),
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
