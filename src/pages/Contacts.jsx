import React, { useState } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        number: "",
        subject: "",
        message: ""
    });
    const [submitted, setSubmitted] = useState(false);

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
                <div className="absolute inset-0 opacity-10 bg-cover bg-center pointer-events-none" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80')` }}></div>
                <div className="max-w-4xl mx-auto space-y-4 relative z-10">
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
                        Contact Us
                    </h1>
                    <p className="text-fkcGold font-semibold text-base sm:text-lg tracking-wide uppercase">
                        FKC Legal & Company Advocates
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-5 space-y-8 bg-gradient-to-br from-[#121212] via-[#161616] to-[#1a1a1a] border border-fkcGold/20 rounded-3xl p-8 shadow-xl">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-extrabold text-white tracking-tight">Get in Touch</h2>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Don’t let legal complexities hold you back. Let FKC Legal & Company Advocates guide you to success. Contact us to schedule a consultation or learn more about how we can help your business thrive in Africa.
                            </p>
                        </div>

                        <div className="space-y-6 pt-4 border-t border-fkcGold/10">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-fkcGold/10 border border-fkcGold/20 flex items-center justify-center text-fkcGold shrink-0">
                                    <Mail size={22} />
                                </div>
                                <div>
                                    <h4 className="text-xs uppercase font-bold tracking-wider text-gray-400">Mail Us</h4>
                                    <a href="mailto:jambo@fkclegal.com" className="text-white hover:text-fkcGold transition text-sm font-medium">
                                        jambo@fkclegal.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-fkcGold/10 border border-fkcGold/20 flex items-center justify-center text-fkcGold shrink-0">
                                    <MapPin size={22} />
                                </div>
                                <div>
                                    <h4 className="text-xs uppercase font-bold tracking-wider text-gray-400">Address</h4>
                                    <p className="text-white text-sm font-medium leading-relaxed mt-1">
                                        FKC Legal<br />
                                        3rd Floor, The Promenade<br />
                                        General Mathenge Drive<br />
                                        Westlands, Nairobi, Kenya
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-fkcGold/10 border border-fkcGold/20 flex items-center justify-center text-fkcGold shrink-0">
                                    <Phone size={22} />
                                </div>
                                <div>
                                    <h4 className="text-xs uppercase font-bold tracking-wider text-gray-400">Office Phone</h4>
                                    <a href="tel:+254705932352" className="text-white hover:text-fkcGold transition text-sm font-medium">
                                        +254 (705) 932 352
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 bg-gradient-to-br from-[#121212] via-[#161616] to-[#1a1a1a] border border-fkcGold/20 rounded-3xl p-8 sm:p-10 shadow-xl">
                        {submitted ? (
                            <div className="text-center py-16 space-y-4">
                                <div className="w-16 h-16 rounded-full bg-fkcGold/10 border border-fkcGold/20 flex items-center justify-center mx-auto text-fkcGold">
                                    <CheckCircle2 size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-white">Message Sent Successfully</h3>
                                <p className="text-gray-300 text-sm max-w-md mx-auto">
                                    Thank you for reaching out. Our team will get back to you shortly.
                                </p>
                                <button
                                    onClick={() => {
                                        setSubmitted(false);
                                        setFormData({ name: "", email: "", number: "", subject: "", message: "" });
                                    }}
                                    className="mt-4 bg-fkcGold text-fkcBlack font-bold px-6 py-2.5 rounded-full text-xs hover:bg-white transition shadow"
                                >
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2 text-center sm:text-left">
                                    <h2 className="text-3xl font-extrabold text-white tracking-tight">Send Us Message</h2>
                                    <p className="text-fkcGold text-xs font-semibold uppercase tracking-wider">Ready to move? Just Start, Legally</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-gray-300">Name:</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-[#1a1a1a] border border-fkcGold/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-fkcGold transition"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-gray-300">Email:</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-[#1a1a1a] border border-fkcGold/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-fkcGold transition"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-gray-300">Your Number:</label>
                                        <input
                                            type="text"
                                            name="number"
                                            value={formData.number}
                                            onChange={handleChange}
                                            className="w-full bg-[#1a1a1a] border border-fkcGold/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-fkcGold transition"
                                            placeholder="+254..."
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-gray-300">Subject:</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            required
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full bg-[#1a1a1a] border border-fkcGold/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-fkcGold transition"
                                            placeholder="Subject"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-gray-300">Message:</label>
                                    <textarea
                                        name="message"
                                        rows="5"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full bg-[#1a1a1a] border border-fkcGold/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-fkcGold transition resize-none"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center justify-center gap-2 bg-[#E05A47] hover:bg-[#c94b38] text-white font-bold px-8 py-3.5 rounded-xl transition shadow-lg text-sm w-full sm:w-auto"
                                    >
                                        Send Your Message <Send size={16} />
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}