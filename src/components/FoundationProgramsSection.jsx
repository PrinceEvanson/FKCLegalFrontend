import React from "react";
import { Link } from "react-router-dom";
import { HeartHandshake, ArrowRight } from "lucide-react";

export default function FoundationProgramsSection() {
    const programs = [
        {
            title: "Menstrual Dignity Drives (Mukuru Kwa Njenga)",
            desc: "dignity kits + rights education",
            impact: "attendance & confidence improved"
        },
        {
            title: "Youth Mentorship & Career Clinics",
            desc: "coaching, CV reviews, mock interviews",
            impact: "employability uplift"
        },
        {
            title: "Community Legal Awareness",
            desc: "documentation, rights, and access to services",
            impact: "fewer barriers to essentials"
        },
        {
            title: "Targeted Pro Bono",
            desc: "focused legal assistance where it changes lives",
            impact: "justice within reach"
        }
    ];

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-fkcBlack to-black border-t border-fkcGold/10">
            <div className="max-w-5xl mx-auto space-y-16">

                <div className="text-center space-y-4">
                    <span className="text-xs uppercase font-bold tracking-widest text-fkcGold bg-fkcGold/10 px-3 py-1 rounded-full border border-fkcGold/20 inline-block">
                        FKC LEGAL FOUNDATION (CSR)
                    </span>
                    <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
                        CSR isn't a checkbox for us—it's a <strong className="text-white">pillar</strong>. Through the Foundation we invest in dignity, youth opportunity, and community legal awareness.
                    </p>
                </div>

                <div className="space-y-6 bg-[#121212] border border-fkcGold/20 rounded-2xl p-8 shadow-xl">
                    <h3 className="text-xl font-bold text-white tracking-tight border-b border-fkcGold/10 pb-4">
                        Our Programs
                    </h3>
                    <ul className="space-y-4">
                        {programs.map((prog, idx) => (
                            <li key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0">
                                <span className="font-bold text-white mb-1 sm:mb-0">
                                    • {prog.title}: <span className="font-normal text-gray-300">{prog.desc}</span>
                                </span>
                                <span className="text-fkcGold font-medium whitespace-nowrap">
                                    {prog.impact}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="text-center space-y-3 bg-fkcGold/5 border border-fkcGold/10 rounded-2xl p-6">
                    <h4 className="text-sm uppercase font-bold text-fkcGold tracking-wider">Values</h4>
                    <p className="text-xs sm:text-sm text-gray-300">
                        We are client-focused, partnership-oriented, long-term, excellent—<strong className="text-white">and we just happen to be lawyers.</strong>
                    </p>
                </div>

                <div className="text-center space-y-6 pt-6">
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                        How partners can help
                    </h3>
                    <p className="text-gray-300 text-sm max-w-xl mx-auto">
                        Sponsor a drive, co-host a clinic, or fund a legal-awareness series. Let's build dignity together.
                    </p>
                    <p className="text-xs font-semibold text-fkcGold uppercase tracking-widest">
                        Ready to move? Just Start, Legally.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 pt-4">
                        <Link
                            to="/partner-form"
                            className="px-6 py-3 rounded-full bg-fkcGold text-fkcBlack font-bold text-xs uppercase tracking-wider hover:bg-white transition shadow-lg flex items-center gap-2"
                        >
                            <HeartHandshake size={16} />
                            <span>Partner with the Foundation</span>
                        </Link>
                        <Link
                            to="/community-project-form"
                            className="px-6 py-3 rounded-full border border-fkcGold/40 text-fkcGold font-bold text-xs uppercase tracking-wider hover:bg-fkcGold/10 transition flex items-center gap-2"
                        >
                            <span>Propose a Community Project</span>
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}