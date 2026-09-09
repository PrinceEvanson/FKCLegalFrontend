import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Shield, Target, Compass, Award, CheckCircle2, ArrowRight, FolderGit2, Landmark, Scale, Gavel } from "lucide-react";

export default function AboutUs() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [counts, setCounts] = useState([0, 0, 0, 0]);
    const ref = useRef(null);

    const stats = [
        { end: 500, icon: <FolderGit2 size={36} />, label: "Number of Projects" },
        { end: 200, icon: <Landmark size={36} />, label: "Court Cases Solved" },
        { end: 200, icon: <Scale size={36} />, label: "Number of Clients" },
        { end: 10, icon: <Gavel size={36} />, label: "Professional Attorney" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev === 0 ? 1 : 0));
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!isVisible) return;
        setActiveIndex(0);
    }, [isVisible]);

    useEffect(() => {
        if (activeIndex < 0 || activeIndex >= stats.length) return;

        const target = stats[activeIndex].end;
        const duration = 1200;
        let startTime = null;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentVal = Math.floor(progress * target);

            setCounts((prev) => {
                const next = [...prev];
                next[activeIndex] = currentVal;
                return next;
            });

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                setActiveIndex((prev) => prev + 1);
            }
        };

        requestAnimationFrame(step);
    }, [activeIndex]);

    return (
        <div className="min-h-screen bg-fkcBlack text-white">
            <div className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#121212] to-fkcBlack border-b border-fkcGold/20 text-center">
                <div className="max-w-4xl mx-auto space-y-4">
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
                        About Us
                    </h1>
                    <p className="text-fkcGold font-semibold text-base sm:text-lg tracking-wide uppercase">
                        FKC Legal & Company Advocates
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
                    <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
                        <div className="bg-gradient-to-br from-[#121212] via-[#161616] to-[#1a1a1a] border border-fkcGold/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden text-center space-y-4">
                            <div className="absolute -right-10 -bottom-10 opacity-10 text-fkcGold pointer-events-none">
                                <Award size={180} />
                            </div>
                            <div className="w-16 h-16 rounded-2xl bg-fkcGold/10 border border-fkcGold/20 flex items-center justify-center mx-auto text-fkcGold">
                                <Award size={32} />
                            </div>
                            <h3 className="text-2xl font-extrabold text-white tracking-tight">Successfully Providing Legal Solution</h3>
                            <div className="text-4xl font-black text-fkcGold tracking-wider">For 3 Years</div>
                            <p className="text-xs text-gray-400">Trusted advisory partner for foreign businesses, investors, and diplomatic missions in Kenya and across Africa.</p>
                        </div>
                    </div>

                    <div className="lg:col-span-7 space-y-6">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                            Who We Are & Our African Dream
                        </h2>
                        <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                            <p>
                                Welcome to FKC Legal & Company Advocates, where we transform challenges into opportunities for businesses looking to thrive in Africa. Rooted in Kenya and inspired by the limitless potential of this great continent, we are more than just a law firm; we are strategic partners in your investment journey.
                            </p>
                            <p>
                                Our African Dream is simple yet powerful: to pave the way for seamless, impactful investments across Africa. We believe that investing in Africa is not just a financial decision but a transformative act—one that fosters growth, creates opportunities, and builds stronger communities.
                            </p>
                        </div>

                        <div className="space-y-4 pt-4">
                            <h3 className="text-xl font-bold text-white">Our Commitment</h3>
                            <p className="text-xs sm:text-sm text-gray-400">
                                At FKC Legal, our clients are more than just cases; they are partners in growth. We are committed to:
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="text-fkcGold shrink-0 mt-1" size={18} />
                                    <span className="text-sm text-gray-300">Simplifying the investment process to make Africa accessible and rewarding.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="text-fkcGold shrink-0 mt-1" size={18} />
                                    <span className="text-sm text-gray-300">Delivering legal solutions tailored to each client's unique goals.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="text-fkcGold shrink-0 mt-1" size={18} />
                                    <span className="text-sm text-gray-300">Building enduring relationships based on trust, respect and excellence.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-br from-[#121212] via-[#161616] to-[#1a1a1a] border border-fkcGold/20 rounded-3xl p-8 shadow-xl hover:border-fkcGold transition h-[320px] flex flex-col justify-center overflow-hidden relative">
                        <div className={`space-y-4 absolute inset-8 flex flex-col justify-center transition-all duration-[3000ms] ease-in-out transform ${currentIndex === 0 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-16 pointer-events-none"}`}>
                            <div className="w-12 h-12 rounded-xl bg-fkcGold/10 border border-fkcGold/20 flex items-center justify-center text-fkcGold shrink-0">
                                <Target size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Our Vision</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                To be the premier legal powerhouse empowering sustainable business growth and cross-border investment throughout the African continent.
                            </p>
                        </div>
                        <div className={`space-y-4 absolute inset-8 flex flex-col justify-center transition-all duration-[3000ms] ease-in-out transform ${currentIndex === 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16 pointer-events-none"}`}>
                            <div className="w-12 h-12 rounded-xl bg-fkcGold/10 border border-fkcGold/20 flex items-center justify-center text-fkcGold shrink-0">
                                <Shield size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Our Value Statement</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                We believe in the power of collaboration, creativity, and integrity. These values drive everything we do, from crafting innovative legal strategies to walking with our clients every step of the way.
                            </p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#121212] via-[#161616] to-[#1a1a1a] border border-fkcGold/20 rounded-3xl p-8 shadow-xl hover:border-fkcGold transition h-[320px] flex flex-col justify-center overflow-hidden relative">
                        <div className={`space-y-4 absolute inset-8 flex flex-col justify-center transition-all duration-[3000ms] ease-in-out transform ${currentIndex === 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16 pointer-events-none"}`}>
                            <div className="w-12 h-12 rounded-xl bg-fkcGold/10 border border-fkcGold/20 flex items-center justify-center text-fkcGold shrink-0">
                                <Compass size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Our Mission</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                To deliver rigorous, innovative, and client-centric legal advisory that removes regulatory friction and ensures seamless operational success for our partners.
                            </p>
                        </div>
                        <div className={`space-y-4 absolute inset-8 flex flex-col justify-center transition-all duration-[3000ms] ease-in-out transform ${currentIndex === 1 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-16 pointer-events-none"}`}>
                            <div className="w-12 h-12 rounded-xl bg-fkcGold/10 border border-fkcGold/20 flex items-center justify-center text-fkcGold shrink-0">
                                <Award size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Our Purpose</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                FKC Legal & Company Advocates exists to break down barriers to investment in Africa, creating a path for businesses to succeed while contributing to the continent's growth. We are here to ensure your investment journey is not just profitable but dignified and impactful, leaving a legacy of transformation for generations to come.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-[#121212] via-[#161616] to-[#1a1a1a] border border-fkcGold/30 rounded-3xl p-8 sm:p-12 shadow-2xl">
                    <div className="space-y-6 max-w-4xl mx-auto text-center lg:text-left">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                            About the Founder
                        </h2>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                            <strong className="text-white">Franklin Cheluget</strong>, the visionary behind FKC Legal & Company Advocates, is a seasoned Advocate of the High Court of Kenya with a passion for making Africa the investment destination of choice. With a Master's degree in International Dispute Resolution from Queen Mary University of London, Franklin brings world-class expertise to every client interaction.
                        </p>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                            His practice focuses on guiding foreign businesses and investors through the intricacies of setup, operationalization, and dispute management. Known for his innovative, client-centric approach, Franklin ensures that investors can navigate Africa's legal and regulatory landscape with clarity and confidence.
                        </p>
                    </div>
                </div>

                <div ref={ref} className="relative bg-[#121212] border border-fkcGold/20 rounded-3xl py-16 px-4 sm:px-6 lg:px-8 overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 opacity-15 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2000&q=80')` }}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-fkcBlack via-fkcBlack/90 to-fkcBlack"></div>

                    <div className="relative max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="flex flex-col items-center justify-center p-6 space-y-3 border-b sm:border-b-0 sm:border-r border-fkcGold/20 last:border-r-0">
                                <div className="text-fkcGold mb-1">
                                    {stat.icon}
                                </div>
                                <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                                    {counts[idx]}
                                </span>
                                <span className="text-xs uppercase font-bold tracking-wider text-gray-400">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}