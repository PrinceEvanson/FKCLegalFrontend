import React from "react";
import Navbar from "../components/Navbar";
import AfricanDreamSection from "../components/AfricanDreamSection";
import CorePracticeAreas from "../components/CorePracticeAreas";
import OfficesReachStrip from "../components/OfficesReachStrip";
import LadyJustice from "../assets/LadyJustice.png";

export default function Home() {
    return (
        <div className="min-h-screen bg-fkcBlack text-white">

            <header className="relative min-h-[95vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#121212] to-fkcBlack border-b border-fkcGold/20 text-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-95 pointer-events-none"
                    style={{ backgroundImage: `url(${LadyJustice})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-fkcBlack/80 via-fkcBlack/65 to-fkcBlack"></div>
                <div className="max-w-5xl mx-auto space-y-6 relative z-10 py-20">
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
                        Excellence in Legal Practice & Corporate Advisory
                    </h1>
                    <p className="text-fkcGold font-mono text-sm sm:text-base tracking-wide">
                        Delivering strategic legal solutions, regulatory compliance, and cross-border advisory across Africa and international corridors.
                    </p>
                </div>
            </header>

            <AfricanDreamSection />

            <OfficesReachStrip />

            <CorePracticeAreas />

        </div>
    );
}