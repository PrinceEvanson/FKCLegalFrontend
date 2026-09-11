import React from "react";
import Navbar from "../components/Navbar";
import AfricanDreamSection from "../components/AfricanDreamSection";
import CorePracticeAreas from "../components/CorePracticeAreas";
import OfficesReachStrip from "../components/OfficesReachStrip";


export default function Home() {
    return (
        <div className="min-h-screen bg-fkcBlack text-white pt-20">

            <header className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#121212] to-fkcBlack border-b border-fkcGold/20 text-center overflow-hidden">
                
                <div className="absolute inset-0 bg-gradient-to-b from-fkcBlack/80 via-fkcBlack/60 to-fkcBlack"></div>
                <div className="max-w-4xl mx-auto space-y-4 relative z-10">
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
                        Excellence in Legal Practice & Corporate Advisory
                    </h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
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