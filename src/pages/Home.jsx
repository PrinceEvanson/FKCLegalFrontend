import React from "react";
import Navbar from "../components/Navbar";
import AfricanDreamSection from "../components/AfricanDreamSection";
import CorePracticeAreas from "../components/CorePracticeAreas";
import OfficesReachStrip from "../components/OfficesReachStrip";

export default function Home() {
    return (
        <div className="min-h-screen bg-fkcBlack text-white pt-20">

            <header className="py-20 px-4 text-center max-w-4xl mx-auto">
                <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
                    Excellence in Legal Practice & Corporate Advisory
                </h1>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                    Delivering strategic legal solutions, regulatory compliance, and cross-border advisory across Africa and international corridors.
                </p>
            </header>

            <AfricanDreamSection />

            <OfficesReachStrip />

            <CorePracticeAreas />

        </div>
    );
}