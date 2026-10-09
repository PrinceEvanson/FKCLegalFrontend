import React, { createContext, useContext, useLayoutEffect, useState } from "react";

const ThemeContext = createContext();

const STORAGE_KEY = "fkc_theme";

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        try {
            return localStorage.getItem(STORAGE_KEY) === "dark" ? "dark" : "light";
        } catch {
            return "light";
        }
    });

    useLayoutEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);

    const toggleTheme = () => {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch { }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);