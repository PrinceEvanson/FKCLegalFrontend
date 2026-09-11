import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Users, BookOpen, ShieldCheck, ArrowRight, CheckCircle2, PhoneCall, ChevronLeft, ChevronRight } from "lucide-react";

export default function FkcLegalFoundation() {
    const programs = [
        {
            title: "Menstrual Dignity Drives (Mukuru Kwa Njenga)",
            focus: "Dignity kits + rights education",
            outcome: "Attendance & confidence improved",
            icon: <Heart className="text-fkcGold" size={24} />
        },
        {
            title: "Youth Mentorship & Career Clinics",
            focus: "Coaching, CV reviews, mock interviews",
            outcome: "Employability uplift",
            icon: <Users className="text-fkcGold" size={24} />
        },
        {
            title: "Community Legal Awareness",
            focus: "Documentation, rights, and access to services",
            outcome: "Fewer barriers to essentials",
            icon: <BookOpen className="text-fkcGold" size={24} />
        },
        {
            title: "Targeted Pro Bono",
            focus: "Focused legal assistance where it changes lives",
            outcome: "Justice within reach",
            icon: <ShieldCheck className="text-fkcGold" size={24} />
        }
    ];

    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev === 0 ? 1 : 0));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setActiveSlide((prev) => (prev === 0 ? 1 : 0));
    };

    const prevSlide = () => {
        setActiveSlide((prev) => (prev === 0 ? 1 : 0));
    };

    return (
        <div className="min-h-screen bg-fkcBlack text-white">
            <div className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#121212] to-fkcBlack border-b border-fkcGold/20 text-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none"
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-fkcBlack/80 via-fkcBlack/60 to-fkcBlack"></div>
                <div className="max-w-4xl mx-auto space-y-4 relative z-10">
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
                        FKC Legal Foundation (CSR)
                    </h1>
                    <p className="text-fkcGold font-mono text-sm sm:text-base tracking-wide">
                        Law in Service of Dignity
                    </p>
                    <p className="text-gray-300 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed pt-2">
                        CSR isn't a checkbox for us—it's a pillar. Through the Foundation we invest in dignity, youth opportunity, and community legal awareness.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

                <div className="space-y-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                            Our Programs
                        </h2>
                        <p className="text-gray-400 text-sm max-w-xl mx-auto">
                            Action-driven initiatives creating tangible impact and lasting community uplift.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {programs.map((prog, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-b from-[#1a1a1a] via-[#161616] to-[#121212] border border-fkcGold/20 hover:border-fkcGold/50 rounded-3xl p-8 space-y-6 transition-all duration-300 shadow-xl relative overflow-hidden group"
                            >
                                <div className="absolute top-0 left-0 right-0 h-1 bg-fkcGold/30 group-hover:bg-fkcGold transition-all"></div>
                                <div className="flex items-center justify-between">
                                    <div className="w-12 h-12 rounded-2xl bg-fkcGold/10 border border-fkcGold/30 flex items-center justify-center text-fkcGold">
                                        {prog.icon}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-white tracking-tight">
                                        {prog.title}
                                    </h3>
                                    <p className="text-gray-300 text-sm font-medium">
                                        <span className="text-fkcGold font-semibold">Focus:</span> {prog.focus}
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-fkcGold/10 flex items-center gap-2 text-xs font-semibold text-gray-200">
                                    <CheckCircle2 size={16} className="text-fkcGold shrink-0" />
                                    <span>{prog.outcome}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    <div className="overflow-hidden rounded-3xl border border-fkcGold/30 bg-gradient-to-br from-[#121212] via-[#161616] to-[#1a1a1a] shadow-2xl relative min-h-[340px] sm:min-h-[320px] flex items-center justify-center p-8 sm:p-12">
                        <div className="absolute inset-0 bg-fkcGold/5 blur-3xl pointer-events-none"></div>

                        <div className={`absolute inset-0 flex flex-col items-center justify-center p-8 sm:p-12 text-center transition-all duration-700 ease-in-out ${activeSlide === 0 ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 -translate-x-8 pointer-events-none"}`}>
                            <div className="space-y-6 max-w-2xl mx-auto w-full">
                                <span className="text-xs uppercase tracking-widest font-mono text-fkcGold">Our Core Philosophy</span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                                    Values That Drive Us
                                </h2>
                                <p className="text-gray-200 text-base sm:text-lg italic leading-relaxed bg-fkcBlack/40 p-6 rounded-2xl border border-fkcGold/20">
                                    "We are client-focused, partnership-oriented, long-term, excellent—and we just happen to be lawyers."
                                </p>
                            </div>
                        </div>

                        <div className={`absolute inset-0 flex flex-col items-center justify-center p-8 sm:p-12 text-center transition-all duration-700 ease-in-out ${activeSlide === 1 ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 translate-x-8 pointer-events-none"}`}>
                            <div className="space-y-6 max-w-2xl mx-auto w-full">
                                <span className="text-xs uppercase tracking-widest font-mono text-fkcGold">
                                    Get Involved
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                                    How Partners Can Help
                                </h2>
                                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                                    Sponsor a drive, co-host a clinic, or fund a legal-awareness series. Let's build dignity together.
                                </p>
                                <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                                    <Link
                                        to="/contact-us"
                                        className="inline-flex items-center gap-2 bg-fkcGold hover:bg-fkcGold/90 text-fkcBlack font-bold px-8 py-3.5 rounded-full transition shadow-lg text-sm"
                                    >
                                        Partner With Us <ArrowRight size={18} />
                                    </Link>
                                    <a
                                        href="tel:+254700000000"
                                        className="inline-flex items-center gap-2 bg-fkcBlack hover:bg-[#1a1a1a] text-fkcGold border border-fkcGold/40 font-bold px-8 py-3.5 rounded-full transition text-sm"
                                    >
                                        <PhoneCall size={16} /> Call Now
                                    </a>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-fkcBlack/80 border border-fkcGold/30 flex items-center justify-center text-fkcGold hover:bg-fkcGold hover:text-fkcBlack transition z-20 cursor-pointer"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-fkcBlack/80 border border-fkcGold/30 flex items-center justify-center text-fkcGold hover:bg-fkcGold hover:text-fkcBlack transition z-20 cursor-pointer"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    <div className="flex justify-center gap-2 mt-4">
                        <button
                            onClick={() => setActiveSlide(0)}
                            className={`w-3 h-3 rounded-full transition-all cursor-pointer ${activeSlide === 0 ? "bg-fkcGold w-6" : "bg-fkcGold/30"}`}
                        />
                        <button
                            onClick={() => setActiveSlide(1)}
                            className={`w-3 h-3 rounded-full transition-all cursor-pointer ${activeSlide === 1 ? "bg-fkcGold w-6" : "bg-fkcGold/30"}`}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}