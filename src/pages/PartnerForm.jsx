import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, CheckCircle2 } from "lucide-react";

const API_URL = (import.meta.env.VITE_API_URL || "https://fkclegalbackend.onrender.com").replace(/\/+$/, "");

export default function PartnerForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        reason: ""
    });
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        const payload = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            message: formData.reason.trim()
        };

        try {
            const response = await fetch(`${API_URL}/api/foundation/partner/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                setSubmitted(true);
            } else {
                const errorData = await response.json().catch(() => ({}));
                const firstError = Object.values(errorData).flat()[0];
                setError(typeof firstError === "string" ? firstError : "We could not send your request. Please check your details and try again.");
            }
        } catch {
            setError("Could not connect to the server. Please try again shortly.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-fkcBlack text-gray-900 dark:text-white transition-colors duration-300 py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
            <div className="max-w-xl mx-auto w-full space-y-8 pt-10">
                <Link to="/who-we-help" className="inline-flex items-center text-xs text-fkcDarkGold dark:text-fkcGold hover:underline gap-1.5 font-medium">
                    <ArrowLeft size={14} /> Back
                </Link>

                <div className="space-y-2 text-center">
                    <span className="text-xs uppercase font-bold tracking-widest text-fkcDarkGold dark:text-fkcGold bg-fkcGold/10 px-3 py-1 rounded-full border border-gray-200 dark:border-fkcGold/20 inline-block">
                        Partnership Portal
                    </span>
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Partner with FKC Legal</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                        Fill in your details to explore collaboration and partnership opportunities with our foundation.
                    </p>
                </div>

                {submitted ? (
                    <div className="bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-fkcGold/30 rounded-2xl p-8 text-center space-y-4 shadow-xl">
                        <CheckCircle2 size={48} className="text-fkcDarkGold dark:text-fkcGold mx-auto" />
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Application Received</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                            Thank you for reaching out. Your partnership request has been recorded and we will get back to you via email. Please check your Inbox (and Spam folder) for our response.
                        </p>
                        <button
                            onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", reason: "" }); }}
                            className="mt-4 px-6 py-2.5 rounded-full bg-fkcDarkGold dark:bg-fkcGold text-white dark:text-fkcBlack font-bold text-xs uppercase hover:bg-gray-900 dark:hover:bg-white transition cursor-pointer"
                        >
                            Submit Another Request
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-fkcGold/20 rounded-2xl p-8 space-y-6 shadow-xl">
                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                Company / Individual Name
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Enter your name or company name"
                                className="w-full bg-white dark:bg-black/60 border border-gray-300 dark:border-fkcGold/30 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-fkcDarkGold dark:focus:border-fkcGold transition"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="name@example.com"
                                className="w-full bg-white dark:bg-black/60 border border-gray-300 dark:border-fkcGold/30 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-fkcDarkGold dark:focus:border-fkcGold transition"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                Reason for Partnership
                            </label>
                            <textarea
                                required
                                minLength={10}
                                rows={4}
                                value={formData.reason}
                                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                placeholder="Describe your motivation and goals for partnering with FKC Legal..."
                                className="w-full bg-white dark:bg-black/60 border border-gray-300 dark:border-fkcGold/30 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-fkcDarkGold dark:focus:border-fkcGold transition resize-none"
                            />
                        </div>

                        {error && <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>}

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full py-3.5 rounded-full bg-fkcDarkGold dark:bg-fkcGold text-white dark:text-fkcBlack font-bold text-xs uppercase tracking-wider hover:bg-gray-900 dark:hover:bg-white transition shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            <Send size={16} />
                            <span>{submitting ? "Sending..." : "Submit Partnership Request"}</span>
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}