import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { servicesData } from "../../data/servicesData";
import { CheckCircle2, Send, ShieldCheck, ArrowLeft } from "lucide-react";

export default function ServiceTemplate() {
    const { slug } = useParams();
    const service = servicesData[slug];

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        message: ""
    });
    const [submitted, setSubmitted] = useState(false);

    if (!service) {
        return (
            <div className="min-h-[70vh] bg-fkcBlack text-white flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-3xl font-bold text-fkcGold mb-4">Service Not Found</h1>
                <p className="text-gray-400 text-sm mb-6">The requested legal practice area could not be located.</p>
                <Link to="/services" className="px-6 py-2.5 rounded-full bg-fkcGold text-fkcBlack font-bold text-xs uppercase">
                    Back to Services
                </Link>
            </div>
        );
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-fkcBlack text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                <Link to="/services" className="inline-flex items-center gap-2 text-fkcGold text-xs uppercase font-bold tracking-wider hover:text-white transition">
                    <ArrowLeft size={16} />
                    <span>Back to All Services</span>
                </Link>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-7 space-y-8">
                    <div className="space-y-4">
                        <span className="text-xs uppercase font-bold tracking-widest text-fkcGold bg-fkcGold/10 px-3 py-1 rounded-full border border-fkcGold/20 inline-block">
                            At Your Service
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                            {service.title}
                        </h1>
                        <p className="text-fkcGold text-sm sm:text-base font-medium">
                            {service.subtitle}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-white tracking-tight">Overview</h2>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                            {service.description}
                        </p>
                    </div>

                    <div className="space-y-6 pt-2">
                        <h3 className="text-lg font-bold text-white tracking-tight">Key Offerings & Scope</h3>
                        <div className="space-y-4">
                            {service.offerings.map((offering, idx) => (
                                <div key={idx} className="bg-[#121212] border border-fkcGold/20 rounded-xl p-5 space-y-2 shadow-md">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 size={18} className="text-fkcGold flex-shrink-0 mt-0.5" />
                                        <h4 className="text-base font-bold text-white">{offering.title}</h4>
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed pl-7">
                                        {offering.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-5">
                    <div className="bg-gradient-to-br from-[#121212] to-[#181818] border border-fkcGold/30 rounded-2xl p-6 sm:p-8 shadow-2xl sticky top-28 space-y-6">
                        <div className="flex items-center gap-3 border-b border-fkcGold/20 pb-4">
                            <div className="w-10 h-10 rounded-xl bg-fkcGold/10 border border-fkcGold/20 flex items-center justify-center text-fkcGold">
                                <ShieldCheck size={22} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">Acquire Assistance</h3>
                                <p className="text-xs text-fkcGold">{service.title}</p>
                            </div>
                        </div>

                        {submitted ? (
                            <div className="bg-fkcGold/10 border border-fkcGold/30 rounded-xl p-6 text-center space-y-3">
                                <h4 className="text-base font-bold text-fkcGold">Request Received Successfully</h4>
                                <p className="text-xs text-gray-300">
                                    Thank you, {formData.fullName}. Our legal team will review your request for {service.title} and reach out shortly.
                                </p>
                                <button
                                    onClick={() => {
                                        setSubmitted(false);
                                        setFormData({ fullName: "", email: "", phone: "", message: "" });
                                    }}
                                    className="mt-2 px-4 py-2 rounded-full bg-fkcGold text-fkcBlack font-bold text-xs uppercase"
                                >
                                    Submit Another Request
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        required
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        className="w-full bg-[#1a1a1a] border border-fkcGold/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-fkcGold"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="name@example.com"
                                        className="w-full bg-[#1a1a1a] border border-fkcGold/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-fkcGold"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+254 700 000 000"
                                        className="w-full bg-[#1a1a1a] border border-fkcGold/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-fkcGold"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Case / Project Details</label>
                                    <textarea
                                        name="message"
                                        rows="3"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Briefly describe your requirements..."
                                        className="w-full bg-[#1a1a1a] border border-fkcGold/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-fkcGold resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3.5 rounded-full bg-fkcGold text-fkcBlack font-bold text-xs uppercase tracking-wider hover:bg-white transition shadow-lg flex items-center justify-center gap-2"
                                >
                                    <span>Submit Request</span>
                                    <Send size={15} />
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}