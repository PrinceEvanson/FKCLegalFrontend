import React from "react";
import { Link } from "react-router-dom";
import { Globe, Zap, Compass, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import OutreachHero from "../assets/Outreach.png";

export default function GlobalFootprint() {
    return (
        <div className="min-h-screen bg-white dark:bg-fkcBlack text-gray-900 dark:text-white transition-colors duration-300">
            <div className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gradient-to-b dark:from-[#121212] dark:to-fkcBlack border-b border-gray-200 dark:border-fkcGold/20 text-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-80 dark:opacity-100 pointer-events-none"
                    style={{ backgroundImage: `url(${OutreachHero})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white dark:from-fkcBlack/85 dark:via-fkcBlack/70 dark:to-fkcBlack"></div>
                <div className="max-w-4xl mx-auto space-y-4 relative z-10">

                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
                        Our Global Footprint <span className="text-fkcDarkGold dark:text-fkcGold">—</span> Clients on Every Continent
                    </h1>
                    <p className="text-fkcDarkGold dark:text-fkcGold font-mono text-sm sm:text-base tracking-wide">
                        FKC Legal & Company Advocates
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        Clients on Every Continent
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                        We've supported clients from every continent to enter and grow across Africa. That reach means faster starts, fewer surprises, and a team that speaks both local reality and international standards.
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="text-center">
                        <span className="text-xs uppercase tracking-[0.2em] text-fkcDarkGold dark:text-fkcGold font-semibold bg-fkcGold/10 px-4 py-1.5 rounded-full border border-gray-200 dark:border-fkcGold/20">
                            Outcome Band
                        </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-gray-50 dark:bg-gradient-to-b dark:from-[#1a1a1a] dark:via-[#161616] dark:to-[#121212] border border-gray-200 dark:border-fkcGold/20 rounded-2xl p-6 space-y-4 shadow-xl hover:border-fkcDarkGold dark:hover:border-fkcGold/50 transition-all">
                            <div className="w-10 h-10 rounded-xl bg-fkcGold/10 border border-gray-200 dark:border-fkcGold/30 flex items-center justify-center text-fkcDarkGold dark:text-fkcGold">
                                <Zap size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Faster starts</h3>
                            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 size={14} className="text-fkcDarkGold dark:text-fkcGold shrink-0" />
                                    <span>realistic timelines</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 size={14} className="text-fkcDarkGold dark:text-fkcGold shrink-0" />
                                    <span>zero bureaucracy shocks</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gray-50 dark:bg-gradient-to-b dark:from-[#1a1a1a] dark:via-[#161616] dark:to-[#121212] border border-gray-200 dark:border-fkcGold/20 rounded-2xl p-6 space-y-4 shadow-xl hover:border-fkcDarkGold dark:hover:border-fkcGold/50 transition-all">
                            <div className="w-10 h-10 rounded-xl bg-fkcGold/10 border border-gray-200 dark:border-fkcGold/30 flex items-center justify-center text-fkcDarkGold dark:text-fkcGold">
                                <Compass size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Local certainty</h3>
                            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 size={14} className="text-fkcDarkGold dark:text-fkcGold shrink-0" />
                                    <span>Regulator liaison</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 size={14} className="text-fkcDarkGold dark:text-fkcGold shrink-0" />
                                    <span>On-the-ground documentation</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gray-50 dark:bg-gradient-to-b dark:from-[#1a1a1a] dark:via-[#161616] dark:to-[#121212] border border-gray-200 dark:border-fkcGold/20 rounded-2xl p-6 space-y-4 shadow-xl hover:border-fkcDarkGold dark:hover:border-fkcGold/50 transition-all">
                            <div className="w-10 h-10 rounded-xl bg-fkcGold/10 border border-gray-200 dark:border-fkcGold/30 flex items-center justify-center text-fkcDarkGold dark:text-fkcGold">
                                <Globe size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Cross-border fluency</h3>
                            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 size={14} className="text-fkcDarkGold dark:text-fkcGold shrink-0" />
                                    <span>Visas, permits, certifications</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 size={14} className="text-fkcDarkGold dark:text-fkcGold shrink-0" />
                                    <span>Embassy-ready documents</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gray-50 dark:bg-gradient-to-b dark:from-[#1a1a1a] dark:via-[#161616] dark:to-[#121212] border border-gray-200 dark:border-fkcGold/20 rounded-2xl p-6 space-y-4 shadow-xl hover:border-fkcDarkGold dark:hover:border-fkcGold/50 transition-all">
                            <div className="w-10 h-10 rounded-xl bg-fkcGold/10 border border-gray-200 dark:border-fkcGold/30 flex items-center justify-center text-fkcDarkGold dark:text-fkcGold">
                                <ShieldCheck size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Risk managed</h3>
                            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 size={14} className="text-fkcDarkGold dark:text-fkcGold shrink-0" />
                                    <span>Aligned structures, contracts</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 size={14} className="text-fkcDarkGold dark:text-fkcGold shrink-0" />
                                    <span>Governance & compliance</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gradient-to-br dark:from-[#121212] dark:via-[#161616] dark:to-[#1a1a1a] border border-gray-200 dark:border-fkcGold/30 rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-2xl">
                    <span className="text-xs uppercase tracking-widest font-mono text-fkcDarkGold dark:text-fkcGold">Strategic Advantage</span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        What this means for you
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
                        Expanding into a new country isn't about forms—it's about momentum. Our cross-continent experience helps you keep that momentum: we prepare what regulators expect, set credible timelines, coordinate local counsel, and surface blind spots early so your launch day happens on schedule.
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="text-center">
                        <span className="text-xs uppercase tracking-[0.2em] text-fkcDarkGold dark:text-fkcGold font-semibold bg-fkcGold/10 px-4 py-1.5 rounded-full border border-gray-200 dark:border-fkcGold/20">
                            Mini Cases
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-50 dark:bg-gradient-to-br dark:from-[#121212] dark:via-[#161616] dark:to-[#1a1a1a] border border-gray-200 dark:border-fkcGold/20 rounded-2xl p-6 space-y-3 shadow-xl">
                            <span className="text-xs font-mono text-fkcDarkGold dark:text-fkcGold uppercase">Tech Rollout</span>
                            <h4 className="text-base font-bold text-gray-900 dark:text-white">Europe → Kenya</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                Licenses sequenced, tax IDs issued, first two hires permitted—go-live in 6 weeks.
                            </p>
                        </div>

                        <div className="bg-gray-50 dark:bg-gradient-to-br dark:from-[#121212] dark:via-[#161616] dark:to-[#1a1a1a] border border-gray-200 dark:border-fkcGold/20 rounded-2xl p-6 space-y-3 shadow-xl">
                            <span className="text-xs font-mono text-fkcDarkGold dark:text-fkcGold uppercase">Consumer Brand</span>
                            <h4 className="text-base font-bold text-gray-900 dark:text-white">GCC → EAC</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                Entity + banking + IP protection + distributor contracts—first shipment cleared cleanly.
                            </p>
                        </div>

                        <div className="bg-gray-50 dark:bg-gradient-to-br dark:from-[#121212] dark:via-[#161616] dark:to-[#1a1a1a] border border-gray-200 dark:border-fkcGold/20 rounded-2xl p-6 space-y-3 shadow-xl">
                            <span className="text-xs font-mono text-fkcDarkGold dark:text-fkcGold uppercase">Impact Fund</span>
                            <h4 className="text-base font-bold text-gray-900 dark:text-white">US/EU → EA</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                Structuring + governance + cross-border tax hygiene—LP confidence unlocked.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="text-center pt-8">
                    <Link
                        to="/contact-us"
                        className="inline-flex items-center gap-2 bg-fkcDarkGold dark:bg-fkcGold hover:bg-gray-900 dark:hover:bg-fkcGold/90 text-white dark:text-fkcBlack font-bold px-8 py-3.5 rounded-full transition shadow-lg text-sm"
                    >
                        Start Your Expansion <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </div>
    );
}