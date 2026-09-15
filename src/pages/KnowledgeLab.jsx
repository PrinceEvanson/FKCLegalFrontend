import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Award, ArrowRight, BookOpen } from "lucide-react";
import knowledgeBooksImg from "../assets/knowlegdebooks.png";

export default function KnowledgeLab() {
    const [selectedCategory, setSelectedCategory] = useState("ALL");

    const featuredResources = [
        {
            title: "Kenya Market Entry: A 30-Day Checklist (FDI)",
            category: "FDI",
            description: "Step-by-step regulatory roadmap for foreign investors entering the East African market."
        },
        {
            title: "Embassy Documents 101",
            category: "IMMIGRATION",
            description: "Affidavits, notarisation, certifications, and translations made simple and compliant."
        },
        {
            title: "Avoiding IP Pitfalls When Expanding to East Africa",
            category: "IP",
            description: "Safeguarding your trademarks, patents, and proprietary assets across borders."
        },
        {
            title: "KRA Essentials for New Operators",
            category: "TAX",
            description: "Navigating VAT, PAYE, withholding tax, and Tax Compliance Certificates (TCC) efficiently."
        },
        {
            title: "Employment Law in 5 Decisions",
            category: "DISPUTES",
            description: "Offers, workplace policies, exits, dispute handling, and statutory compliance."
        }
    ];

    const categories = ["ALL", "FDI", "IMMIGRATION", "TAX", "IP", "DISPUTES", "REAL ESTATE", "PARTNERSHIPS"];

    const filteredResources = selectedCategory === "ALL"
        ? featuredResources
        : featuredResources.filter(item => item.category === selectedCategory);

    return (
        <div className="min-h-screen bg-white dark:bg-fkcBlack text-gray-900 dark:text-white transition-colors duration-300">
            <div className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gradient-to-b dark:from-[#121212] dark:to-fkcBlack border-b border-gray-200 dark:border-fkcGold/20 text-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-80 dark:opacity-100 pointer-events-none"
                    style={{ backgroundImage: `url(${knowledgeBooksImg})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white dark:from-fkcBlack/80 dark:via-fkcBlack/60 dark:to-fkcBlack"></div>
                <div className="max-w-4xl mx-auto space-y-4 relative z-10">

                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Knowledge Lab
                    </h1>
                    <p className="text-fkcDarkGold dark:text-fkcGold text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
                        Clear, practical resources for decision-makers. Articles, guides, checklists, and explainers—no jargon walls, just answers you can use today.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="space-y-6 mb-16">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Categories Filter</h2>
                    <div className="flex flex-wrap gap-3">
                        {categories.map((cat, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer border ${selectedCategory === cat
                                    ? "bg-fkcDarkGold dark:bg-fkcGold text-white dark:text-fkcBlack border-fkcDarkGold dark:border-fkcGold shadow-lg"
                                    : "bg-white dark:bg-fkcBlack border-gray-300 dark:border-fkcGold/30 text-fkcDarkGold dark:text-fkcGold hover:bg-gray-100 dark:hover:bg-fkcGold/10"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-12 mb-16">
                    <div className="border-b border-gray-200 dark:border-fkcGold/20 pb-4 flex justify-between items-end">
                        <div>
                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Featured Resources</h2>
                            <p className="text-xs text-fkcDarkGold dark:text-fkcGold mt-1">Essential reading and tools curated by our legal experts</p>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Showing {filteredResources.length} results</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredResources.map((resource, idx) => (
                            <div key={idx} className="bg-gray-50 dark:bg-gradient-to-br dark:from-[#121212] dark:via-[#161616] dark:to-[#1a1a1a] border border-gray-200 dark:border-fkcGold/20 rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-xl hover:border-fkcDarkGold dark:hover:border-fkcGold transition">
                                <div className="space-y-3">
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-fkcDarkGold dark:text-fkcGold bg-fkcGold/10 px-2.5 py-1 rounded-full border border-gray-200 dark:border-fkcGold/20 inline-block">
                                        {resource.category}
                                    </span>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">{resource.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                                        {resource.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {filteredResources.length === 0 && (
                            <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400 text-sm">
                                No resources found for this category.
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-12 mb-16">
                    <div className="border-b border-gray-200 dark:border-fkcGold/20 pb-4">
                        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Outcome</h2>
                        <p className="text-xs text-fkcDarkGold dark:text-fkcGold mt-1">What you achieve with our practical legal insights</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-fkcGold/20 rounded-2xl p-6 space-y-3 shadow-lg">
                            <div className="text-fkcDarkGold dark:text-fkcGold font-bold text-lg">Faster decisions</div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">Simple frameworks and fewer unknowns to accelerate your commercial objectives.</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-fkcGold/20 rounded-2xl p-6 space-y-3 shadow-lg">
                            <div className="text-fkcDarkGold dark:text-fkcGold font-bold text-lg">Fewer mistakes</div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">Proactive guidance to avoid common regulatory traps and compliance penalties.</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-fkcGold/20 rounded-2xl p-6 space-y-3 shadow-lg">
                            <div className="text-fkcDarkGold dark:text-fkcGold font-bold text-lg">Prepared teams</div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">Shareable checklists and actionable how-tos designed for modern enterprise teams.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gradient-to-r dark:from-[#121212] dark:via-[#181818] dark:to-[#121212] border border-gray-200 dark:border-fkcGold/30 rounded-2xl p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-4 max-w-2xl">
                        <div className="w-12 h-12 rounded-xl bg-fkcGold/10 border border-gray-200 dark:border-fkcGold/20 flex items-center justify-center text-fkcDarkGold dark:text-fkcGold">
                            <GraduationCap size={26} />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">FKC Legal Academy</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                            Elevate your team's legal literacy and corporate compliance standards through our specialized training programs, masterclasses, and executive workshops.
                        </p>
                    </div>
                    <Link
                        to="/academy"
                        className="px-8 py-4 rounded-full bg-fkcDarkGold dark:bg-fkcGold text-white dark:text-fkcBlack font-bold text-xs uppercase tracking-wider hover:bg-gray-900 dark:hover:bg-white transition shadow-xl flex items-center gap-2 whitespace-nowrap"
                    >
                        <span>Explore Academy</span>
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
}