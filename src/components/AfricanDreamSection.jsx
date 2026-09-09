// src/components/AfricanDreamSection.jsx

import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function AfricanDreamSection() {
    return (
        <section className="bg-fkcBlack py-20 px-4 sm:px-6 lg:px-8 border-t border-fkcGold/10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
                    <div className="inline-block px-3.5 py-1.5 rounded-full bg-fkcGold/10 border border-fkcGold/20 text-fkcGold text-xs font-semibold tracking-widest uppercase">
                        Our Vision
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                        Ready to move? <br />
                        <span className="text-fkcGold">Just Start, Legally.</span>
                    </h2>
                    <p className="text-base text-gray-300 leading-relaxed">
                        Our African Dream is simple yet powerful: to pave the way for seamless, impactful investments across Africa. We believe that investing in Africa is not just a financial decision but a transformative act—one that fosters growth, creates opportunities, and builds stronger communities.
                    </p>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Link
                        to="/academy"
                        className="bg-gradient-to-br from-[#121212] via-[#161616] to-[#1a1a1a] border border-fkcGold/20 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-fkcGold hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)] group"
                    >
                        <div className="space-y-3">
                            <span className="text-xs uppercase tracking-[0.2em] text-fkcGold font-semibold">FKC Legal Academy</span>
                            <h3 className="text-xl font-bold text-white tracking-tight">Training for Confidence</h3>
                            <p className="text-sm text-gray-300 leading-relaxed">
                                Training that turns legal complexity into confident action. Built for clients, lawyers, and law students. NITA accreditation in final stages.
                            </p>
                        </div>
                        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-fkcGold group-hover:text-white transition-colors">
                            <span>Enquire About Training</span>
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>

                    <div className="bg-gradient-to-br from-[#121212] via-[#161616] to-[#1a1a1a] border border-fkcGold/20 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-fkcGold hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)]">
                        <div className="space-y-3">
                            <span className="text-xs uppercase tracking-[0.2em] text-fkcGold font-semibold">Our Strategic Pillars</span>
                            <h3 className="text-xl font-bold text-white tracking-tight">Creating Value</h3>
                            <p className="text-sm text-gray-300 leading-relaxed">
                                Four pillars guide how we create value—so your legal work actually moves your mission forward.
                            </p>
                        </div>
                        <button className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-fkcGold hover:text-white transition-colors group cursor-default">
                            <span>Explore Our Pillars</span>
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="bg-gradient-to-br from-[#121212] via-[#161616] to-[#1a1a1a] border border-fkcGold/20 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-fkcGold hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)]">
                        <div className="space-y-3">
                            <span className="text-xs uppercase tracking-[0.2em] text-fkcGold font-semibold">FKC Legal Foundation</span>
                            <h3 className="text-xl font-bold text-white tracking-tight">CSR as a Pillar</h3>
                            <p className="text-sm text-gray-300 leading-relaxed">
                                CSR isn't a checkbox for us—it's a pillar. Through the Foundation we invest in dignity, youth opportunity, and community legal awareness.
                            </p>
                        </div>
                        <button className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-fkcGold hover:text-white transition-colors group cursor-default">
                            <span>Learn more of our Foundation</span>
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="bg-gradient-to-br from-[#121212] via-[#161616] to-[#1a1a1a] border border-fkcGold/20 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-fkcGold hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)]">
                        <div className="space-y-3">
                            <span className="text-xs uppercase tracking-[0.2em] text-fkcGold font-semibold">Global Footprint</span>
                            <h3 className="text-xl font-bold text-white tracking-tight">Continental Reach</h3>
                            <p className="text-sm text-gray-300 leading-relaxed">
                                We've supported clients from every continent to enter and grow across Africa. That reach means faster starts, fewer surprises, and a team that speaks both local reality and international standards.
                            </p>
                        </div>
                        <button className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-fkcGold hover:text-white transition-colors group cursor-default">
                            <span>Our Global Footprint</span>
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                </div>

            </div>
        </section>
    );
}