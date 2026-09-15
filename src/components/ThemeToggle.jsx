import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-[#1a1a1a] border border-gray-300 dark:border-fkcGold/20 text-gray-800 dark:text-fkcGold hover:bg-fkcGold hover:text-black transition duration-200 shadow-sm"
            aria-label="Toggle Theme"
        >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
}