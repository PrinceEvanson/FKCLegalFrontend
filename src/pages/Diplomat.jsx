import React, { useState } from "react";
import { Shield, CheckCircle2, Globe, FileText, Landmark, Users, ChevronDown, PhoneCall, Send } from "lucide-react";
import diplomaticflagsImg from "../assets/diplomaticfags.png";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const inputClass =
    "w-full bg-white dark:bg-[#181818] border border-gray-300 dark:border-fkcGold/20 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-fkcDarkGold dark:focus:border-fkcGold transition";
const labelClass = "block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300";

const EMPTY_FORM = {
    clientName: "",
    email: "",
    number: "",
    diplomaticStatus: "",
    mission: "",
    serviceCriteria: "",
    message: ""
};

export default function Diplomat() {
    const [openFaq, setOpenFaq] = useState(null);
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

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
            icon: <Globe className="text-fkcDarkGold dark:text-fkcGold" size={24} />,
            title: "Immigration & Status",
            description: "Residence and work permits, special passes, dependent passes, timely renewals, and smooth exits."
        },
        {
            icon: <Landmark className="text-fkcDarkGold dark:text-fkcGold" size={24} />,
            title: "Banking & Documentation",
            description: "Accounts compatible with diplomatic status; affidavits, notarisation, certifications, translations, and authentications."
        },
        {
            icon: <Shield className="text-fkcDarkGold dark:text-fkcGold" size={24} />,
            title: "Privileges & Immunities",
            description: "Onboarding to host-state expectations; seamless coordination with Ministry of Foreign Affairs and mission protocols."
        },
        {
            icon: <Users className="text-fkcDarkGold dark:text-fkcGold" size={24} />,
            title: "Family & Lifestyle",
            description: "Assistance with school transfers, residential lease reviews, and compliant household staff contracts."
        },
        {
            icon: <FileText className="text-fkcDarkGold dark:text-fkcGold" size={24} />,
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        // Field names here must match the DiplomatInquiry model on the backend.
        const payload = {
            name: formData.clientName.trim(),
            email: formData.email.trim(),
            number: formData.number.trim(),
            diplomatic_status: formData.diplomaticStatus,
            mission_or_country: formData.mission.trim(),
            subject: formData.serviceCriteria,
            message: formData.message.trim()
        };

        try {
            const response = await fetch(`${API_URL}/api/diplomat/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                const errorData = await response.json().catch(() => ({}));
                console.error("Diplomat request failed:", errorData);
                const firstError = Object.values(errorData).flat()[0];
                setError(typeof firstError === "string" ? firstError : "We could not send your request. Please check your details and try again.");
            }
        } catch (err) {
            console.error("Network error:", err);
            setError("Could not connect to the server. Please try again shortly.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-fkcBlack text-gray-900 dark:text-white transition-colors duration-300">
            <div className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gradient-to-b dark:from-[#121212] dark:to-fkcBlack border-b border-gray-200 dark:border-fkcGold/20 text-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-90 pointer-events-none"
                    style={{ backgroundImage: `url(${diplomaticflagsImg})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white dark:from-fkcBlack/80 dark:via-fkcBlack/60 dark:to-fkcBlack"></div>
                <div className="max-w-4xl mx-auto space-y-6 relative z-10">
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
                        Diplomat & Ex-Diplomat <br />
                        <span className="text-fkcDarkGold dark:text-fkcGold">Legal Support</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
                        Arriving with diplomatic status shouldn't mean administrative headaches. We tailor legal onboarding and day-to-day support for diplomats and former diplomats living and working in Kenya.
                    </p>

                    <div className="text-center pt-8">
                        <a
                            href="#request-form"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-fkcDarkGold dark:bg-fkcGold text-white dark:text-fkcBlack font-bold text-xs uppercase tracking-wider hover:bg-gray-900 dark:hover:bg-white transition shadow-2xl"
                        >
                            <PhoneCall size={16} />
                            <span>Get Visa & Permit Support</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
                <div className="space-y-8">
                    <div className="border-b border-gray-200 dark:border-fkcGold/20 pb-4">
                        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Outcome Band</h2>
                        <p className="text-xs text-fkcDarkGold dark:text-fkcGold mt-1">What you achieve with our specialized diplomatic support</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {outcomes.map((item, idx) => (
                            <div key={idx} className="bg-gray-50 dark:bg-gradient-to-br dark:from-[#121212] dark:via-[#161616] dark:to-[#1a1a1a] border border-gray-200 dark:border-fkcGold/20 rounded-2xl p-6 space-y-3 shadow-xl hover:border-fkcDarkGold dark:hover:border-fkcGold transition">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="text-fkcDarkGold dark:text-fkcGold shrink-0" size={20} />
                                    <h3 className="text-fkcDarkGold dark:text-fkcGold font-bold text-lg">{item.title}</h3>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed pl-8">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="border-b border-gray-200 dark:border-fkcGold/20 pb-4">
                        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Services</h2>
                        <p className="text-xs text-fkcDarkGold dark:text-fkcGold mt-1">Comprehensive advisory crafted for diplomatic missions and personnel</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((srv, idx) => (
                            <div key={idx} className="bg-gray-50 dark:bg-gradient-to-br dark:from-[#121212] dark:via-[#161616] dark:to-[#1a1a1a] border border-gray-200 dark:border-fkcGold/20 rounded-2xl p-6 space-y-4 shadow-xl hover:border-fkcDarkGold dark:hover:border-fkcGold transition flex flex-col justify-between">
                                <div className="space-y-3">
                                    <div className="w-12 h-12 rounded-xl bg-fkcGold/10 border border-gray-200 dark:border-fkcGold/20 flex items-center justify-center">
                                        {srv.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{srv.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                                        {srv.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-8 max-w-4xl mx-auto">
                    <div className="border-b border-gray-200 dark:border-fkcGold/20 pb-4 text-center">
                        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Frequently Asked Questions</h2>
                        <p className="text-xs text-fkcDarkGold dark:text-fkcGold mt-1">Quick answers regarding our diplomatic advisory workflow</p>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-fkcGold/20 rounded-2xl overflow-hidden shadow-lg transition">
                                <button
                                    onClick={() => toggleFaq(idx)}
                                    className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-sm sm:text-base text-gray-900 dark:text-white hover:text-fkcDarkGold dark:hover:text-fkcGold transition cursor-pointer"
                                >
                                    <span>{faq.q}</span>
                                    <ChevronDown size={18} className={`text-fkcDarkGold dark:text-fkcGold transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
                                </button>
                                {openFaq === idx && (
                                    <div className="px-6 pb-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed border-t border-gray-200 dark:border-fkcGold/10 pt-3">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div id="request-form" className="max-w-3xl mx-auto bg-gray-50 dark:bg-gradient-to-br dark:from-[#121212] dark:via-[#161616] dark:to-[#1a1a1a] border border-gray-200 dark:border-fkcGold/30 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8 scroll-mt-24">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Request Diplomat Legal Support</h2>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Complete the form below and our specialized team will reach out promptly.</p>
                    </div>

                    {submitted ? (
                        <div className="bg-fkcGold/10 border border-gray-200 dark:border-fkcGold/30 rounded-2xl p-8 text-center space-y-3">
                            <h3 className="text-fkcDarkGold dark:text-fkcGold font-bold text-lg">Request Received Successfully</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Thank you, {formData.clientName}. Our diplomatic advisory team will contact you shortly via your email
                                ({formData.email}).</p>
                            <button
                                onClick={() => {
                                    setSubmitted(false);
                                    setFormData(EMPTY_FORM);
                                }}
                                className="mt-2 bg-fkcDarkGold dark:bg-fkcGold text-white dark:text-fkcBlack font-bold px-6 py-2.5 rounded-full text-xs hover:bg-gray-900 dark:hover:bg-white transition shadow cursor-pointer"
                            >
                                Submit Another Request
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className={labelClass}>Client Name</label>
                                <input
                                    type="text"
                                    name="clientName"
                                    required
                                    value={formData.clientName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name or title"
                                    className={inputClass}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className={labelClass}>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="name@mission.org or personal email"
                                        className={inputClass}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className={labelClass}>Phone Number (optional)</label>
                                    <input
                                        type="text"
                                        name="number"
                                        value={formData.number}
                                        onChange={handleChange}
                                        placeholder="+254 7xx xxx xxx"
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className={labelClass}>Diplomatic Status (optional)</label>
                                    <select
                                        name="diplomaticStatus"
                                        value={formData.diplomaticStatus}
                                        onChange={handleChange}
                                        className={inputClass}
                                    >
                                        <option value="">Select status...</option>
                                        <option value="Serving Diplomat">Serving Diplomat</option>
                                        <option value="Former Diplomat">Former Diplomat</option>
                                        <option value="Dependant">Dependant / Family Member</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className={labelClass}>Mission / Country (optional)</label>
                                    <input
                                        type="text"
                                        name="mission"
                                        value={formData.mission}
                                        onChange={handleChange}
                                        placeholder="e.g. Embassy of ..."
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className={labelClass}>Criteria of Service</label>
                                <select
                                    name="serviceCriteria"
                                    required
                                    value={formData.serviceCriteria}
                                    onChange={handleChange}
                                    className={inputClass}
                                >
                                    <option value="" disabled>Select diplomatic service...</option>
                                    {services.map((srv, idx) => (
                                        <option key={idx} value={srv.title} className="bg-white dark:bg-[#181818] text-gray-900 dark:text-white">
                                            {srv.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className={labelClass}>Details / Message</label>
                                <textarea
                                    name="message"
                                    rows="4"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Share details regarding your timeline, mission, or specific requirements..."
                                    className={`${inputClass} resize-none`}
                                ></textarea>
                            </div>

                            {error && (
                                <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>
                            )}

                            <div className="text-center pt-2">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-fkcDarkGold dark:bg-fkcGold text-white dark:text-fkcBlack font-bold text-xs uppercase tracking-wider hover:bg-gray-900 dark:hover:bg-white transition shadow-2xl cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    <Send size={16} />
                                    <span>{submitting ? "Sending..." : "Submit Request"}</span>
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}