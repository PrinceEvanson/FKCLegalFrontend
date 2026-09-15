import React from "react";
import { Link } from "react-router-dom";
import { servicesData } from "../../data/servicesData";
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
import ServicesHero from "../../assets/serviceshero.png";

export default function ServicesIndex() {
    const serviceIcons = {
        "commercial-property": Building2,
        "corporate-services": Briefcase,
        "dispute-resolution": Scale,
        "international-arbitration-and-mediation": Gavel,
        "employment-and-benefits": Users,
        "intellectual-property": Lightbulb,
        "finance": Coins,
        "financial-services-regulation": ShieldCheck,
        "tax": FileText,
        "immigration": Globe,
        "shipping-and-logistics": Truck
    };

    return (
        <div className="min-h-screen bg-white dark:bg-fkcBlack text-gray-900 dark:text-white transition-colors duration-300">
            <div className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gradient-to-b dark:from-[#121212] dark:to-fkcBlack border-b border-gray-200 dark:border-fkcGold/20 text-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-80 dark:opacity-100 pointer-events-none"
                    style={{ backgroundImage: `url(${ServicesHero})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white dark:from-fkcBlack/85 dark:via-fkcBlack/70 dark:to-fkcBlack"></div>
                <div className="max-w-4xl mx-auto space-y-4 relative z-10">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        At Your Service!
                    </h1>
                    <p className="text-fkcDarkGold dark:text-fkcGold text-sm sm:text-base font-medium max-w-2xl mx-auto">
                        Explore our comprehensive range of specialized legal practice areas designed to protect and advance your commercial and personal interests.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(servicesData).map(([slug, service]) => {
                    const IconComponent = serviceIcons[slug] || ShieldCheck;
                    return (
                        <div
                            key={slug}
                            className="bg-gray-50 dark:bg-gradient-to-br dark:from-[#121212] dark:via-[#161616] dark:to-[#1a1a1a] border border-gray-200 dark:border-fkcGold/20 rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-fkcDarkGold dark:hover:border-fkcGold hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)] group"
                        >
                            <div className="space-y-3">
                                <div className="w-12 h-12 rounded-xl bg-fkcGold/10 border border-gray-200 dark:border-fkcGold/20 flex items-center justify-center text-fkcDarkGold dark:text-fkcGold group-hover:bg-fkcDarkGold dark:group-hover:bg-fkcGold group-hover:text-white dark:group-hover:text-fkcBlack transition-colors duration-300">
                                    <IconComponent size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-fkcDarkGold dark:group-hover:text-fkcGold transition-colors">{service.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                            <Link
                                to={`/services/${slug}`}
                                className="inline-flex items-center gap-2 text-fkcDarkGold dark:text-fkcGold font-bold text-xs uppercase tracking-wider group-hover:text-gray-900 dark:group-hover:text-white transition-colors"
                            >
                                <span>Explore Service </span>
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}