import React from "react";
import Navbar from "../components/Navbar";
import WhoWeHelpHeader from "../components/WhoWeHelpHeader";
import WhoWeHelpCards from "../components/WhoWeHelpCards";
import StatsSection from "../components/StatsSection";
import FoundationProgramsSection from "../components/FoundationProgramsSection";

export default function Help() {
    return (
        <div className="min-h-screen bg-fkcBlack text-white">
            <WhoWeHelpHeader />
            <WhoWeHelpCards />
            <FoundationProgramsSection />
            <StatsSection />
        </div>
    );
}