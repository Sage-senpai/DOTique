/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getThemePreference, setThemePreference, type ThemePreference } from "../services/preferencesService";

type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
  mode: ThemePreference;
  resolvedTheme: ResolvedTheme;
  setMode: (nextMode: ThemePreference) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
const SYSTEM_THEME_QUERY = "(prefers-color-scheme: dark)";

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia(SYSTEM_THEME_QUERY).matches ? "dark" : "light";
}

function applyThemeToDom(theme: ResolvedTheme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemePreference>("system");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(getSystemTheme());

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const storedMode = await getThemePreference();
        if (!active) return;
        setModeState(storedMode);
        setResolvedTheme(storedMode === "system" ? getSystemTheme() : storedMode);
      } catch (error) {
        console.warn("Failed to restore theme preference:", error);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (mode !== "system") return;

    const mediaQuery = window.matchMedia(SYSTEM_THEME_QUERY);
    const handleChange = (event: MediaQueryListEvent) => {
      setResolvedTheme(event.matches ? "dark" : "light");
    };

    setResolvedTheme(mediaQuery.matches ? "dark" : "light");

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [mode]);

  useEffect(() => {
    if (mode === "system") {
      setResolvedTheme(getSystemTheme());
      return;
    }
    setResolvedTheme(mode);
  }, [mode]);

  useEffect(() => {
    applyThemeToDom(resolvedTheme);
  }, [resolvedTheme]);

  const setMode = useCallback((nextMode: ThemePreference) => {
    setModeState(nextMode);
    setThemePreference(nextMode).catch((error) => {
      console.warn("Failed to persist theme preference:", error);
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setMode(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setMode]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      resolvedTheme,
      setMode,
      toggleTheme,
    }),
    [mode, resolvedTheme, setMode, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
