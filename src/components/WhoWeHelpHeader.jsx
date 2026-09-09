import React from "react";

export default function WhoWeHelpHeader() {
    return (
        <div className="relative bg-fkcBlack py-24 px-4 text-center overflow-hidden border-b border-fkcGold/20">
            <div className="max-w-4xl mx-auto space-y-4 relative z-10">
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
                    Who We Help
                </h1>
                <p className="text-fkcGold text-sm sm:text-base font-semibold tracking-wide uppercase">
                    FKC Legal & Company Advocates
                </p>
                <div className="w-12 h-1 bg-fkcGold mx-auto rounded-full mt-2"></div>

            </div>
        </div>
    );
}