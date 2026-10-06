import React, { createContext, useContext, useLayoutEffect, useState } from "react";

const ThemeContext = createContext();

// A theme is only saved once the visitor presses the toggle.
// The old "fkc_theme" key was written automatically on every visit (so it holds "dark"
// for people who never chose it); it is ignored and removed here.
const STORAGE_KEY = "fkc_theme_choice";
const LEGACY_KEY = "fkc_theme";

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        try {
            localStorage.removeItem(LEGACY_KEY);
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved === "light" || saved === "dark") return saved;
        } catch {
            // storage unavailable: fall through to the default
        }
        return "light";
    });

    // Layout effect so the class is applied before paint (no flash for returning dark-mode visitors).
    useLayoutEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);

    const toggleTheme = () => {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch {
            // ignore storage errors; the theme still changes for this session
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);