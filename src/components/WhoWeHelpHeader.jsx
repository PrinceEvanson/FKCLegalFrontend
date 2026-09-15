import React from "react";
import helpImg from "../assets/Help.png";

export default function WhoWeHelpHeader() {
    return (
        <div className="relative bg-white dark:bg-fkcBlack py-24 px-4 text-center overflow-hidden border-b border-gray-200 dark:border-fkcGold/20 transition-colors duration-300">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-90 pointer-events-none"
                style={{ backgroundImage: `url(${helpImg})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/70 to-white dark:from-fkcBlack/85 dark:via-fkcBlack/70 dark:to-fkcBlack"></div>
            <div className="max-w-4xl mx-auto space-y-4 relative z-10">
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    Who We Help
                </h1>
                <p className="text-fkcDarkGold dark:text-fkcGold text-sm sm:text-base font-semibold tracking-wide uppercase">
                    FKC Legal & Company Advocates
                </p>
                <div className="w-12 h-1 bg-fkcDarkGold dark:bg-fkcGold mx-auto rounded-full mt-2"></div>
            </div>
        </div>
    );
}