import React from "react";
import { Globe, Building, Handshake, CheckCircle } from "lucide-react";

export default function WhoWeHelpCards() {
    const cards = [
        {
            title: "Global Investors (FDI & Market Entry)",
            icon: Globe,
            subtitle: "Expanding into Kenya or Africa",
            outcome: "Smooth market entry with reduced risk",
            points: [
                "Company setup & licenses",
                "Tax & banking support",
                "Visas & local partners",
                "Corporate governance"
            ]
        },
        {
            title: "Kenyan Founders & Enterprises",
            icon: Building,
            subtitle: "Building and scaling a sustainable business",
            outcome: "Strong legal foundation and operational compliance",
            points: [
                "Structuring & real estate",
                "Intellectual property protection",
                "HR & employment compliance",
                "Tax planning",
                "Dispute prevention"
            ]
        },
        {
            title: "NGOs, Donors & Partners",
            icon: Handshake,
            subtitle: "Driving impact and managing cross-border projects",
            outcome: "Compliance, accountability, and risk mitigation",
            points: [
                "Frameworks & agreements",
                "Regulatory compliance",
                "IP & data protection",
                "Cross-border risk management"
            ]
        }
    ];

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-fkcBlack transition-colors duration-300">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {cards.map((card, idx) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={idx}
                            className="bg-gray-50 dark:bg-gradient-to-br dark:from-[#121212] dark:via-[#161616] dark:to-[#1a1a1a] border border-gray-200 dark:border-fkcGold/20 rounded-2xl p-8 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-fkcDarkGold dark:hover:border-fkcGold hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)] group"
                        >
                            <div className="space-y-6">
                                <div className="w-14 h-14 rounded-xl bg-fkcGold/10 border border-gray-200 dark:border-fkcGold/20 flex items-center justify-center text-fkcDarkGold dark:text-fkcGold mx-auto group-hover:bg-fkcDarkGold dark:group-hover:bg-fkcGold group-hover:text-white dark:group-hover:text-fkcBlack transition-colors duration-300">
                                    <Icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center tracking-tight group-hover:text-fkcDarkGold dark:group-hover:text-fkcGold transition-colors">
                                    {card.title}
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 text-center italic">
                                    {card.subtitle}
                                </p>
                                <div className="p-3 rounded-lg bg-fkcGold/5 border border-gray-200 dark:border-fkcGold/10 text-xs text-fkcDarkGold dark:text-fkcGold font-medium text-center">
                                    Outcome: {card.outcome}
                                </div>
                                <ul className="space-y-2.5 pt-2">
                                    {card.points.map((point, pIdx) => (
                                        <li key={pIdx} className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                                            <CheckCircle size={14} className="text-fkcDarkGold dark:text-fkcGold mr-2 flex-shrink-0" />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}