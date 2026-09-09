import React from "react";
import { Link } from "react-router-dom";
import {
    Building2,
    Briefcase,
    Scale,
    Gavel,
    Users,
    Lightbulb,
    Coins,
    ShieldCheck,
    FileText,
    Globe,
    Truck,
    ArrowRight
} from "lucide-react";

export default function CorePracticeAreas() {
    const practices = [
        {
            title: "Commercial Property",
            description: "Comprehensive legal guidance on real estate transactions, leasing, and development.",
            icon: Building2,
            path: "/services/commercial-property"
        },
        {
            title: "Corporate Services",
            description: "Advising businesses on incorporation, governance, restructuring, and compliance.",
            icon: Briefcase,
            path: "/services/corporate-services"
        },
        {
            title: "Dispute Resolution",
            description: "Strategic litigation support and advocacy to protect commercial interests.",
            icon: Scale,
            path: "/services/dispute-resolution"
        },
        {
            title: "International Arbitration And Mediation",
            description: "Resolving cross-border disputes efficiently through alternative mechanisms.",
            icon: Gavel,
            path: "/services/international-arbitration-and-mediation"
        },
        {
            title: "Employment And Benefits",
            description: "Navigating labor laws, contracts, executive compensation, and workplace policies.",
            icon: Users,
            path: "/services/employment-and-benefits"
        },
        {
            title: "Intellectual Property",
            description: "Securing, managing, and defending trademarks, patents, and proprietary rights.",
            icon: Lightbulb,
            path: "/services/intellectual-property"
        },
        {
            title: "Finance",
            description: "Structuring complex financial transactions, debt restructuring, and banking compliance.",
            icon: Coins,
            path: "/services/finance"
        },
        {
            title: "Financial Services Regulation",
            description: "Guiding financial institutions through evolving regulatory frameworks and licensing.",
            icon: ShieldCheck,
            path: "/services/financial-services-regulation"
        },
        {
            title: "Tax",
            description: "Strategic tax planning, dispute resolution, and compliance across jurisdictions.",
            icon: FileText,
            path: "/services/tax"
        },
        {
            title: "Immigration",
            description: "Seamless work permits, residency applications, and global mobility advisory.",
            icon: Globe,
            path: "/services/immigration"
        },
        {
            title: "Shipping And Logistics",
            description: "Maritime law, transport regulations, and cross-border logistics compliance.",
            icon: Truck,
            path: "/services/shipping-and-logistics"
        }
    ];

    return (
        <section className="bg-fkcBlack py-20 px-4 sm:px-6 lg:px-8 border-t border-fkcGold/10">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <div className="inline-block px-3.5 py-1.5 rounded-full bg-fkcGold/10 border border-fkcGold/20 text-fkcGold text-xs font-semibold tracking-widest uppercase">
                        Expertise
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                        Core Practice Areas
                    </h2>
                    <p className="text-gray-300 text-sm sm:text-base">
                        Delivering specialized legal solutions tailored to drive your enterprise forward across complex regulatory landscapes.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {practices.map((practice, index) => {
                        const IconComponent = practice.icon;
                        return (
                            <Link
                                key={index}
                                to={practice.path}
                                className="bg-gradient-to-br from-[#121212] via-[#161616] to-[#1a1a1a] border border-fkcGold/20 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-fkcGold hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)] group"
                            >
                                <div className="space-y-4">
                                    <div className="w-12 h-12 rounded-xl bg-fkcGold/10 border border-fkcGold/20 flex items-center justify-center text-fkcGold group-hover:bg-fkcGold group-hover:text-fkcBlack transition-colors duration-300">
                                        <IconComponent size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-fkcGold transition-colors">
                                        {practice.title}
                                    </h3>
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        {practice.description}
                                    </p>
                                </div>
                                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-fkcGold">
                                    <span>Explore Service</span>
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}