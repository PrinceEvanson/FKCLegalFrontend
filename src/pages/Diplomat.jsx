import React, { useState } from "react";
import { Shield, CheckCircle2, Globe, FileText, Landmark, Users, ChevronDown, PhoneCall, Send } from "lucide-react";
import diplomaticflagsImg from "../assets/diplomaticfags.png";

export default function Diplomat() {
    const [openFaq, setOpenFaq] = useState(null);
    const [formData, setFormData] = useState({
        clientName: "",
        email: "",
        serviceCriteria: "",
        message: ""
    });
    const [submitted, setSubmitted] = useState(false);

    const outcomes = [
        {
            title: "Seamless Entry",
            description: "Permits and special passes issued correctly and on schedule."
        },
        {
            title: "Practical Life Setup",
            description: "Banking and documentation that fully recognises diplomatic status."
        },
        {
            title: "Confidence & Compliance",
            description: "Privileges and immunities oriented with zero regulatory missteps."
        }
    ];

    const services = [
        {
            icon: <Globe className="text-fkcGold" size={24} />,
            title: "Immigration & Status",
            description: "Residence and work permits, special passes, dependent passes, timely renewals, and smooth exits."
        },
        {
            icon: <Landmark className="text-fkcGold" size={24} />,
            title: "Banking & Documentation",
            description: "Accounts compatible with diplomatic status; affidavits, notarisation, certifications, translations, and authentications."
        },
        {
            icon: <Shield className="text-fkcGold" size={24} />,
            title: "Privileges & Immunities",
            description: "Onboarding to host-state expectations; seamless coordination with Ministry of Foreign Affairs and mission protocols."
        },
        {
            icon: <Users className="text-fkcGold" size={24} />,
            title: "Family & Lifestyle",
            description: "Assistance with school transfers, residential lease reviews, and compliant household staff contracts."
        },
        {
            icon: <FileText className="text-fkcGold" size={24} />,
            title: "Tax & Records",
            description: "KRA guidance where applicable and meticulous record-keeping for smooth transitions in and out of station."
        }
    ];

    const faqs = [
        {
            q: "Do you coordinate with missions and ministries?",
            a: "Yes. Our team liaises directly and sequences steps meticulously with relevant diplomatic missions and government ministries to avoid procedural delays."
        },
        {
            q: "Can you assist at short notice?",
            a: "Absolutely. We are equipped to triage urgent diplomatic arrivals and postings, stabilising your status and documentation fast."
        }
    ];

    const toggleFaq = (idx) => {
        setOpenFaq(openFaq === idx ? null : idx);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

    };

    return (
        <div className="min-h-screen bg-fkcBlack text-white">
            <div className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#121212] to-fkcBlack border-b border-fkcGold/20 text-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none"
                    style={{ backgroundImage: `url(${diplomaticflagsImg})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-fkcBlack/80 via-fkcBlack/60 to-fkcBlack"></div>
                <div className="max-w-4xl mx-auto space-y-6 relative z-10">
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
                        Diplomat & Ex-Diplomat <br />
                        <span className="text-fkcGold">Legal Support</span>
                    </h1>
                    <p className="text-gray-300 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
                        Arriving with diplomatic status shouldn't mean administrative headaches. We tailor legal onboarding and day-to-day support for diplomats and former diplomats living and working in Kenya.
                    </p>

                    <div className="text-center pt-8">
                        <a
                            href="#request-form"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-fkcGold text-fkcBlack font-bold text-xs uppercase tracking-wider hover:bg-white transition shadow-2xl"
                        >
                            <PhoneCall size={16} />
                            <span>Get Visa & Permit Support</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
                <div className="space-y-8">
                    <div className="border-b border-fkcGold/20 pb-4">
                        <h2 className="text-2xl font-extrabold text-white tracking-tight">Outcome Band</h2>
                        <p className="text-xs text-fkcGold mt-1">What you achieve with our specialized diplomatic support</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {outcomes.map((item, idx) => (
                            <div key={idx} className="bg-gradient-to-br from-[#121212] via-[#161616] to-[#1a1a1a] border border-fkcGold/20 rounded-2xl p-6 space-y-3 shadow-xl hover:border-fkcGold transition">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="text-fkcGold shrink-0" size={20} />
                                    <h3 className="text-fkcGold font-bold text-lg">{item.title}</h3>
                                </div>
                                <p className="text-sm text-gray-300 leading-relaxed pl-8">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="border-b border-fkcGold/20 pb-4">
                        <h2 className="text-2xl font-extrabold text-white tracking-tight">Services</h2>
                        <p className="text-xs text-fkcGold mt-1">Comprehensive advisory crafted for diplomatic missions and personnel</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((srv, idx) => (
                            <div key={idx} className="bg-gradient-to-br from-[#121212] via-[#161616] to-[#1a1a1a] border border-fkcGold/20 rounded-2xl p-6 space-y-4 shadow-xl hover:border-fkcGold transition flex flex-col justify-between">
                                <div className="space-y-3">
                                    <div className="w-12 h-12 rounded-xl bg-fkcGold/10 border border-fkcGold/20 flex items-center justify-center">
                                        {srv.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-white">{srv.title}</h3>
                                    <p className="text-gray-400 text-xs leading-relaxed">
                                        {srv.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-8 max-w-4xl mx-auto">
                    <div className="border-b border-fkcGold/20 pb-4 text-center">
                        <h2 className="text-2xl font-extrabold text-white tracking-tight">Frequently Asked Questions</h2>
                        <p className="text-xs text-fkcGold mt-1">Quick answers regarding our diplomatic advisory workflow</p>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="bg-[#121212] border border-fkcGold/20 rounded-2xl overflow-hidden shadow-lg transition">
                                <button
                                    onClick={() => toggleFaq(idx)}
                                    className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-sm sm:text-base text-white hover:text-fkcGold transition cursor-pointer"
                                >
                                    <span>{faq.q}</span>
                                    <ChevronDown size={18} className={`text-fkcGold transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
                                </button>
                                {openFaq === idx && (
                                    <div className="px-6 pb-4 text-gray-300 text-xs sm:text-sm leading-relaxed border-t border-fkcGold/10 pt-3">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div id="request-form" className="max-w-3xl mx-auto bg-gradient-to-br from-[#121212] via-[#161616] to-[#1a1a1a] border border-fkcGold/30 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8 scroll-mt-24">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Request Diplomat Legal Support</h2>
                        <p className="text-xs text-gray-400">Complete the form below and our specialized team will reach out promptly.</p>
                    </div>

                    {submitted ? (
                        <div className="bg-fkcGold/10 border border-fkcGold/30 rounded-2xl p-8 text-center space-y-3">
                            <h3 className="text-fkcGold font-bold text-lg">Request Received Successfully</h3>
                            <p className="text-gray-300 text-xs sm:text-sm">Thank you, {formData.clientName}. Our diplomatic advisory team will contact you shortly via your email
                                ({formData.email}).</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300">Client Name</label>
                                <input
                                    type="text"
                                    name="clientName"
                                    required
                                    value={formData.clientName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name or title"
                                    className="w-full bg-[#181818] border border-fkcGold/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-fkcGold transition"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="name@mission.org or personal email"
                                    className="w-full bg-[#181818] border border-fkcGold/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-fkcGold transition"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300">Criteria of Service</label>
                                <select
                                    name="serviceCriteria"
                                    required
                                    value={formData.serviceCriteria}
                                    onChange={handleChange}
                                    className="w-full bg-[#181818] border border-fkcGold/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-fkcGold transition"
                                >
                                    <option value="" disabled>Select diplomatic service...</option>
                                    {services.map((srv, idx) => (
                                        <option key={idx} value={srv.title} className="bg-[#181818] text-white">
                                            {srv.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300">Details / Message</label>
                                <textarea
                                    name="message"
                                    rows="4"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Share details regarding your timeline, mission, or specific requirements..."
                                    className="w-full bg-[#181818] border border-fkcGold/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-fkcGold transition resize-none"
                                ></textarea>
                            </div>

                            <div className="text-center pt-2">
                                <button
                                    type="submit"
                                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-fkcGold text-fkcBlack font-bold text-xs uppercase tracking-wider hover:bg-white transition shadow-2xl cursor-pointer"
                                >
                                    <Send size={16} />
                                    <span>Submit Request</span>
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}