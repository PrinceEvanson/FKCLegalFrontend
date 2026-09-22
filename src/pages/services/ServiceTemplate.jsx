import React from "react";
import { useParams, Link } from "react-router-dom";
import { servicesData } from "../../data/servicesData";
import { CheckCircle2, ArrowLeft, ChevronRight, ShieldCheck } from "lucide-react";

export default function ServiceTemplate() {
    const { slug } = useParams();
    const service = servicesData[slug];

    if (!service) {
        return (
            <div className="min-h-[70vh] bg-white dark:bg-fkcBlack text-gray-900 dark:text-white flex flex-col items-center justify-center text-center px-4 transition-colors duration-300">
                <h1 className="text-3xl font-bold text-fkcDarkGold dark:text-fkcGold mb-4">Service Not Found</h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">The requested legal practice area could not be located.</p>
                <Link to="/services" className="px-6 py-2.5 rounded-full bg-fkcDarkGold dark:bg-fkcGold text-white dark:text-fkcBlack font-bold text-xs uppercase hover:bg-gray-900 dark:hover:bg-white transition cursor-pointer">
                    Back to Services
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-fkcBlack text-gray-900 dark:text-white transition-colors duration-300 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

                {/* Back Link */}
                <div>
                    <Link to="/services" className="inline-flex items-center gap-2 text-fkcDarkGold dark:text-fkcGold text-xs uppercase font-bold tracking-wider hover:text-gray-900 dark:hover:text-white transition">
                        <ArrowLeft size={16} />
                        <span>Back to All Services</span>
                    </Link>
                </div>

                {/* Service Header */}
                <div className="space-y-4 border-b border-gray-200 dark:border-fkcGold/20 pb-8">
                    <span className="text-xs uppercase font-bold tracking-widest text-fkcDarkGold dark:text-fkcGold bg-fkcGold/10 px-3 py-1 rounded-full border border-gray-200 dark:border-fkcGold/20 inline-block">
                        At Your Service
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white font-serif">
                        {service.title}
                    </h1>
                    <p className="text-fkcDarkGold dark:text-fkcGold text-sm sm:text-base font-medium leading-relaxed">
                        {service.subtitle}
                    </p>
                </div>

                {/* Overview Section */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight font-serif">Overview</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed font-light">
                        {service.description}
                    </p>
                </div>

                {/* Key Offerings & Scope */}
                <div className="space-y-6 pt-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight font-serif">Key Offerings & Scope</h3>
                    <div className="grid grid-cols-1 gap-4">
                        {service.offerings.map((offering, idx) => (
                            <div key={idx} className="bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-fkcGold/20 rounded-xl p-5 space-y-2 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 size={18} className="text-fkcDarkGold dark:text-fkcGold flex-shrink-0 mt-0.5" />
                                    <h4 className="text-base font-bold text-gray-900 dark:text-white">{offering.title}</h4>
                                </div>
                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed pl-7 font-light">
                                    {offering.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stylish Bottom Redirection CTA Banner */}
                <div className="mt-16 p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-[#121212] dark:via-[#1a1a1a] dark:to-[#121212] border border-fkcGold/40 text-center space-y-6 shadow-2xl relative overflow-hidden">
                    <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-fkcGold/10 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="w-12 h-12 mx-auto rounded-2xl bg-fkcGold/10 border border-fkcGold/30 flex items-center justify-center text-fkcGold">
                        <ShieldCheck size={26} />
                    </div>

                    <div className="space-y-2 max-w-xl mx-auto">
                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                            Ready to secure expert legal assistance in {service.title}?
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                            Connect directly with our seasoned legal team to discuss your requirements, review strategic options, and initiate counsel.
                        </p>
                    </div>

                    <div className="pt-2">
                        <Link
                            to="/contact"
                            state={{ service: service.title }}
                            className="inline-flex items-center gap-2 px-8 py-3.5 bg-fkcGold text-fkcBlack font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:bg-white transition-all duration-300 cursor-pointer"
                        >
                            <span>Acquire Assistance</span>
                            <ChevronRight size={16} />
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}