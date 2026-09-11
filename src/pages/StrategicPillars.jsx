import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Globe, Home, Users, Heart, ArrowRight, CheckCircle2, Sparkles, Compass } from "lucide-react";
import pillarsHeroImg from "../assets/pillarshero.png";

export default function StrategicPillars() {
    const [activeTab, setActiveTab] = useState(0);

    const pillarIconSvg = (
        <svg className="w-16 h-16 sm:w-20 sm:h-20 text-fkcGold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3h18v2H3z" />
            <path d="M5 5h14v2H5z" />
            <path d="M7 7c0 1.5 1 2 2 2s2-.5 2-2" />
            <path d="M13 7c0 1.5 1 2 2 2s2-.5 2-2" />
            <path d="M7 9v10" />
            <path d="M10 9v10" />
            <path d="M14 9v10" />
            <path d="M17 9v10" />
            <path d="M6 9h12v10H6z" />
            <path d="M4 19h16v2H4z" />
            <path d="M2 21h20v2H2z" />
        </svg>
    );

    const pillars = [
        {
            id: 1,
            title: "Foreign Direct Investment (FDI)",
            subtitle: "Pillar 1",
            icon: <Globe className="text-fkcGold" size={24} />,
            unlocks: "Seamless market entry & cross-border scale.",
            outcomes: [
                "Predictable timelines",
                "Smooth licensing",
                "Day-one compliance",
                "Bankable structures"
            ],
            imagined: "Your entity is formed, sector approvals secured, tax & banking in place, and your first teammate lands with the right permit—no red-tape drama."
        },
        {
            id: 2,
            title: "Domestic Investment Legal Support",
            subtitle: "Pillar 2",
            icon: <Home className="text-fkcGold" size={24} />,
            unlocks: "Safer growth inside Kenya.",
            outcomes: [
                "Clean shareholding",
                "Solid contracts",
                "Protected IP",
                "Risk-aware tax and employment"
            ],
            imagined: "You sign confidently—clean titles, fair terms, fewer disputes."
        },
        {
            id: 3,
            title: "Strategic Partnerships",
            subtitle: "Pillar 3",
            icon: <Users className="text-fkcGold" size={24} />,
            unlocks: "Collaborations that work—clear roles, fair risk, durable outcomes.",
            outcomes: [
                "Governance that actually functions",
                "IP respected",
                "Money accounted for",
                "Reporting easy"
            ],
            imagined: "Your partnership scales without confusion or conflict."
        },
        {
            id: 4,
            title: "CSR & Social Impact",
            subtitle: "Pillar 4",
            icon: <Heart className="text-fkcGold" size={24} />,
            unlocks: "Law in service of dignity and opportunity.",
            outcomes: [
                "Restored dignity",
                "Youth employability",
                "Community legal understanding"
            ],
            imagined: "Growth that lifts communities around you."
        }
    ];

    return (
        <div className="min-h-screen bg-fkcBlack text-white">
            <div className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#121212] to-fkcBlack border-b border-fkcGold/20 text-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none"
                    style={{ backgroundImage: `url(${pillarsHeroImg})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-fkcBlack/80 via-fkcBlack/60 to-fkcBlack"></div>
                <div className="max-w-4xl mx-auto space-y-4 relative z-10">
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
                        Creating Value That Moves <span className="text-fkcGold">Your Mission Forward</span>
                    </h1>
                    <p className="text-gray-300 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
                        Four pillars guide how we create value—so your legal work actually moves your mission forward. Select a pillar below to explore our strategic impact.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 text-center">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Our Pillars of Strategic Impact
                </h2>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {pillars.map((pillar, index) => {
                        const isActive = activeTab === index;
                        return (
                            <button
                                key={pillar.id}
                                onClick={() => setActiveTab(index)}
                                className={`relative text-left p-6 rounded-3xl transition-all duration-500 flex flex-col justify-between border group overflow-hidden min-h-[190px] ${isActive
                                        ? "bg-gradient-to-b from-[#1a1a1a] via-[#161616] to-[#121212] border-fkcGold shadow-2xl shadow-fkcGold/10 scale-[1.02]"
                                        : "bg-[#121212]/60 border-fkcGold/20 hover:border-fkcGold/50 hover:bg-[#161616]"
                                    }`}
                            >
                                <div className={`absolute top-0 left-0 right-0 h-1.5 transition-all ${isActive ? "bg-fkcGold" : "bg-fkcGold/20 group-hover:bg-fkcGold/50"}`} />

                                {!isActive ? (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center transition-all duration-300 bg-gradient-to-b from-[#121212] to-[#181818]">
                                        <div className="flex items-center justify-center text-fkcGold group-hover:scale-110 transition-transform duration-300">
                                            {pillarIconSvg}
                                        </div>
                                        <div className="absolute inset-0 bg-fkcBlack/85 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span className="text-xs font-mono tracking-widest text-fkcGold uppercase font-semibold">
                                                Click to Uncover
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4 relative z-10">
                                        <div className="flex items-center justify-between">
                                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center border bg-fkcGold/20 border-fkcGold text-fkcGold">
                                                {pillar.icon}
                                            </div>
                                            <span className="text-xs font-mono tracking-widest px-2.5 py-1 rounded-md uppercase bg-fkcGold text-fkcBlack font-bold">
                                                {pillar.subtitle}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-white tracking-tight">
                                            {pillar.title}
                                        </h3>
                                    </div>
                                )}

                                {isActive && (
                                    <div className="pt-4 mt-4 border-t border-fkcGold/10 flex items-center justify-between text-xs font-semibold text-fkcGold relative z-10">
                                        <span>Viewing Pillar</span>
                                        <ArrowRight size={14} className="translate-x-1" />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-4 flex flex-col items-center justify-center bg-gradient-to-b from-[#1a1a1a] via-[#161616] to-[#121212] border border-fkcGold/30 rounded-3xl p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-fkcGold/5 blur-2xl pointer-events-none"></div>
                        <div className="w-20 h-20 rounded-2xl bg-fkcGold/10 border border-fkcGold/30 flex items-center justify-center text-fkcGold shadow-inner relative z-10">
                            <svg className="w-10 h-10 text-fkcGold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 3h18v2H3z" />
                                <path d="M5 5h14v2H5z" />
                                <path d="M7 7c0 1.5 1 2 2 2s2-.5 2-2" />
                                <path d="M13 7c0 1.5 1 2 2 2s2-.5 2-2" />
                                <path d="M7 9v10" />
                                <path d="M10 9v10" />
                                <path d="M14 9v10" />
                                <path d="M17 9v10" />
                                <path d="M6 9h12v10H6z" />
                                <path d="M4 19h16v2H4z" />
                                <path d="M2 21h20v2H2z" />
                            </svg>
                        </div>
                        <div className="space-y-2 relative z-10">
                            <span className="text-xs uppercase font-mono tracking-widest text-fkcGold">Architectural Strength</span>
                            <h3 className="text-xl font-bold text-white">The Foundation of Success</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Built to support your enterprise growth with stability, clarity, and uncompromised legal standards.
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-8 bg-gradient-to-br from-[#121212] via-[#161616] to-[#1a1a1a] border border-fkcGold/30 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden transition-all duration-500">
                        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-fkcGold/5 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start relative z-10">

                            <div className="lg:col-span-1 space-y-4 border-b lg:border-b-0 lg:border-r border-fkcGold/20 pb-6 lg:pb-0 lg:pr-8">
                                <span className="text-xs uppercase tracking-widest font-mono text-fkcGold bg-fkcGold/10 px-3 py-1.5 rounded-lg border border-fkcGold/20 inline-block">
                                    {pillars[activeTab].subtitle}
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                                    {pillars[activeTab].title}
                                </h2>
                                <div className="space-y-2 pt-2">
                                    <h4 className="text-xs font-bold text-fkcGold uppercase tracking-wider">What it unlocks:</h4>
                                    <p className="text-gray-200 text-sm font-medium leading-relaxed bg-fkcBlack/40 p-4 rounded-2xl border border-fkcGold/10">
                                        {pillars[activeTab].unlocks}
                                    </p>
                                </div>
                            </div>

                            <div className="lg:col-span-2 space-y-8">
                                <div className="space-y-4">
                                    <h4 className="text-sm font-bold text-fkcGold uppercase tracking-wider flex items-center gap-2">
                                        <Sparkles size={16} /> We focus on outcomes:
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {pillars[activeTab].outcomes.map((outcome, idx) => (
                                            <div key={idx} className="flex items-start gap-3 bg-fkcBlack/60 border border-fkcGold/10 p-3.5 rounded-xl">
                                                <CheckCircle2 className="text-fkcGold shrink-0 mt-0.5" size={16} />
                                                <span className="text-xs sm:text-sm text-gray-200 font-medium">{outcome}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-fkcGold/10">
                                    <h4 className="text-sm font-bold text-fkcGold uppercase tracking-wider flex items-center gap-2">
                                        <Compass size={16} /> Imagine this:
                                    </h4>
                                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed italic bg-gradient-to-r from-fkcGold/10 to-transparent p-5 rounded-2xl border-l-4 border-fkcGold">
                                        "{pillars[activeTab].imagined}"
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="text-center pt-8 space-y-4">
                    <p className="text-gray-400 text-sm">Ready to put our strategic pillars to work for your business?</p>
                    <Link
                        to="/contact-us"
                        className="inline-flex items-center gap-2 bg-fkcGold hover:bg-fkcGold/90 text-fkcBlack font-bold px-8 py-3.5 rounded-full transition shadow-lg text-sm"
                    >
                        Schedule a Consultation <ArrowRight size={18} />
                    </Link>
                </div>

            </div>
        </div>
    );
}