import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, GraduationCap, Users, Award, CheckCircle2, ArrowRight } from "lucide-react";
import careerImg from "../assets/career.png";

export default function CareerOpportunities() {
    return (
        <div className="min-h-screen bg-fkcBlack text-white">
            <div className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#121212] to-fkcBlack border-b border-fkcGold/20 text-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-60 pointer-events-none"
                    style={{ backgroundImage: `url(${careerImg})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-fkcBlack/70 via-fkcBlack/50 to-fkcBlack"></div>
                <div className="max-w-4xl mx-auto space-y-4 relative z-10">
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
                        Career Opportunities
                    </h1>
                    <p className="text-fkcGold font-semibold text-base sm:text-lg tracking-wide uppercase">
                        FKC Legal & Company Advocates
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
                <div className="text-center space-y-3">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight underline-decoration-fkcGold/50 underline-offset-8 leading-tight">
                        What We Offer
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="bg-gradient-to-br from-[#121212] via-[#161616] to-[#1a1a1a] border border-fkcGold/20 rounded-3xl p-8 shadow-xl hover:border-fkcGold/50 transition flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                            <div className="w-14 h-14 rounded-2xl bg-fkcGold/10 border border-fkcGold/20 flex items-center justify-center text-fkcGold">
                                <Briefcase size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-white tracking-tight">Experienced Hires</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                At FKC Legal Advocates, we pride ourselves on building a team of dynamic professionals dedicated to excellence and innovation. Joining our firm means becoming part of a collaborative environment where your expertise will thrive, and your career will grow. Experienced lawyers at FKC Legal enjoy opportunities to work on high-profile cases, engage with diverse clients, and contribute to shaping the future of business law in Kenya and beyond. We provide the tools, resources, and support you need to make a meaningful impact.
                            </p>
                        </div>
                        <div className="space-y-3 pt-4 border-t border-fkcGold/10">
                            <h4 className="text-sm font-bold text-fkcGold uppercase tracking-wider">Why Join Us?</h4>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="text-fkcGold shrink-0 mt-0.5" size={16} />
                                    <span className="text-xs text-gray-300">Work on challenging, impactful legal matters.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="text-fkcGold shrink-0 mt-0.5" size={16} />
                                    <span className="text-xs text-gray-300">Collaborate with seasoned professionals in a supportive environment.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="text-fkcGold shrink-0 mt-0.5" size={16} />
                                    <span className="text-xs text-gray-300">Advance your career with opportunities for leadership and specialization.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#121212] via-[#161616] to-[#1a1a1a] border border-fkcGold/20 rounded-3xl p-8 shadow-xl hover:border-fkcGold/50 transition flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                            <div className="w-14 h-14 rounded-2xl bg-fkcGold/10 border border-fkcGold/20 flex items-center justify-center text-fkcGold">
                                <GraduationCap size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-white tracking-tight">Law Graduates</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                At FKC Legal Advocates, we are committed to nurturing the next generation of legal professionals. Our graduate programs are designed to provide young lawyers with the foundational skills, exposure, and mentorship they need to succeed. From hands-on experience in diverse legal matters to guidance from industry leaders, we equip you with the tools to build a successful and fulfilling legal career.
                            </p>
                        </div>
                        <div className="space-y-3 pt-4 border-t border-fkcGold/10">
                            <h4 className="text-sm font-bold text-fkcGold uppercase tracking-wider">What We Offer:</h4>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="text-fkcGold shrink-0 mt-0.5" size={16} />
                                    <span className="text-xs text-gray-300">Comprehensive training in various areas of law.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="text-fkcGold shrink-0 mt-0.5" size={16} />
                                    <span className="text-xs text-gray-300">Real-world exposure to complex legal scenarios.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="text-fkcGold shrink-0 mt-0.5" size={16} />
                                    <span className="text-xs text-gray-300">Mentorship from experienced professionals.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#121212] via-[#161616] to-[#1a1a1a] border border-fkcGold/20 rounded-3xl p-8 shadow-xl hover:border-fkcGold/50 transition flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                            <div className="w-14 h-14 rounded-2xl bg-fkcGold/10 border border-fkcGold/20 flex items-center justify-center text-fkcGold">
                                <Users size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-white tracking-tight">Mentorship Program</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                The journey to becoming a successful legal professional starts with the right guidance. At FKC Legal Advocates, our mentorship program connects upcoming legal minds with experienced practitioners who provide valuable insights into the legal field. Whether it's navigating the challenges of law school, transitioning into practice, or growing in your career, our mentors are here to support your personal and professional growth.
                            </p>
                        </div>
                        <div className="space-y-3 pt-4 border-t border-fkcGold/10">
                            <h4 className="text-sm font-bold text-fkcGold uppercase tracking-wider">Program Highlights:</h4>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="text-fkcGold shrink-0 mt-0.5" size={16} />
                                    <span className="text-xs text-gray-300">Personalized guidance and career advice.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="text-fkcGold shrink-0 mt-0.5" size={16} />
                                    <span className="text-xs text-gray-300">Exposure to real-world legal challenges.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="text-fkcGold shrink-0 mt-0.5" size={16} />
                                    <span className="text-xs text-gray-300">A supportive network for lifelong professional development.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-[#121212] via-[#161616] to-[#1a1a1a] border border-fkcGold/30 rounded-3xl p-8 sm:p-12 shadow-2xl text-center max-w-4xl mx-auto space-y-6">
                    <div className="w-16 h-16 rounded-2xl bg-fkcGold/10 border border-fkcGold/20 flex items-center justify-center mx-auto text-fkcGold">
                        <Award size={32} />
                    </div>
                    <h3 className="text-3xl font-extrabold text-white tracking-tight">
                        Why FKC Legal Advocates?
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                        At FKC Legal, we are more than just a law firm—we are a community of forward-thinking professionals driven by a shared vision of excellence. Whether you are an experienced hire, a law graduate, or an aspiring mentee, we offer a platform to grow, innovate, and make an impact.
                    </p>
                    <div className="pt-2">
                        <Link
                            to="/contact-us"
                            className="inline-flex items-center gap-2 bg-fkcGold hover:bg-fkcGold/90 text-fkcBlack font-bold px-8 py-3.5 rounded-full transition shadow-lg"
                        >
                            Get in Touch <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}