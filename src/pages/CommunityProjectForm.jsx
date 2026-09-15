import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, CheckCircle2 } from "lucide-react";

export default function CommunityProjectForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        statement: ""
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const submissionPayload = {
            type: "Community Project Proposal",
            ...formData,
            timestamp: new Date().toISOString()
        };
        console.log("Submitting to Admin Dashboard:", submissionPayload);
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-fkcBlack text-gray-900 dark:text-white transition-colors duration-300 py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
            <div className="max-w-xl mx-auto w-full space-y-8 pt-10">
                <Link to="/who-we-help" className="inline-flex items-center text-xs text-fkcDarkGold dark:text-fkcGold hover:underline gap-1.5 font-medium">
                    <ArrowLeft size={14} /> Back
                </Link>

                <div className="space-y-2 text-center">
                    <span className="text-xs uppercase font-bold tracking-widest text-fkcDarkGold dark:text-fkcGold bg-fkcGold/10 px-3 py-1 rounded-full border border-gray-200 dark:border-fkcGold/20 inline-block">
                        Community Outreach
                    </span>
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Propose a Community Project</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                        Share your community initiative proposal with our foundation team.
                    </p>
                </div>

                {submitted ? (
                    <div className="bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-fkcGold/30 rounded-2xl p-8 text-center space-y-4 shadow-xl">
                        <CheckCircle2 size={48} className="text-fkcDarkGold dark:text-fkcGold mx-auto" />
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Proposal Submitted</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                            Thank you! Your community service proposal has been recorded and we will get back to you via email. Please check your Inbox (and Spam folder) for our response.
                        </p>
                        <button
                            onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", statement: "" }); }}
                            className="mt-4 px-6 py-2.5 rounded-full bg-fkcDarkGold dark:bg-fkcGold text-white dark:text-fkcBlack font-bold text-xs uppercase hover:bg-gray-900 dark:hover:bg-white transition"
                        >
                            Submit Another Proposal
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
                                placeholder="Enter your name or organization name"
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
                                Statement of the Community Service
                            </label>
                            <textarea
                                required
                                rows={4}
                                value={formData.statement}
                                onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                                placeholder="Provide a detailed statement/overview of the proposed community project..."
                                className="w-full bg-white dark:bg-black/60 border border-gray-300 dark:border-fkcGold/30 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-fkcDarkGold dark:focus:border-fkcGold transition resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3.5 rounded-full bg-fkcDarkGold dark:bg-fkcGold text-white dark:text-fkcBlack font-bold text-xs uppercase tracking-wider hover:bg-gray-900 dark:hover:bg-white transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <Send size={16} />
                            <span>Submit Project Proposal</span>
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}