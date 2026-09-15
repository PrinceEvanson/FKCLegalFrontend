import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ServiceRequest() {
    const { serviceName } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", details: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-fkcBlack text-gray-900 dark:text-white transition-colors duration-300 py-12 px-4 flex flex-col justify-center items-center">
            <div className="max-w-xl w-full bg-gray-50 dark:bg-fkcBlue/10 border border-gray-200 dark:border-fkcGold/30 p-8 rounded-xl shadow-2xl">
                <h1 className="text-2xl font-bold text-fkcDarkGold dark:text-fkcGold mb-2 uppercase">Request Assistance</h1>
                <p className="text-gray-600 dark:text-gray-400 text-xs mb-6">Service: <span className="text-gray-900 dark:text-white font-semibold capitalize">{serviceName || "General Consultation"}</span></p>

                {submitted ? (
                    <div className="bg-fkcGold/10 dark:bg-fkcGold/20 border border-fkcDarkGold dark:border-fkcGold text-fkcDarkGold dark:text-fkcGold p-4 rounded text-center text-sm font-medium">
                        Thank you! Your request has been received. Our legal team will reach out to you shortly.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-white dark:bg-fkcBlack border border-gray-300 dark:border-gray-700 rounded p-2 text-sm text-gray-900 dark:text-white focus:border-fkcDarkGold dark:focus:border-fkcGold outline-none transition"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Enter your full name"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                            <input
                                type="email"
                                required
                                className="w-full bg-white dark:bg-fkcBlack border border-gray-300 dark:border-gray-700 rounded p-2 text-sm text-gray-900 dark:text-white focus:border-fkcDarkGold dark:focus:border-fkcGold outline-none transition"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="name@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-white dark:bg-fkcBlack border border-gray-300 dark:border-gray-700 rounded p-2 text-sm text-gray-900 dark:text-white focus:border-fkcDarkGold dark:focus:border-fkcGold outline-none transition"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="+254 700 000 000"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">How can we assist you?</label>
                            <textarea
                                rows="4"
                                required
                                className="w-full bg-white dark:bg-fkcBlack border border-gray-300 dark:border-gray-700 rounded p-2 text-sm text-gray-900 dark:text-white focus:border-fkcDarkGold dark:focus:border-fkcGold outline-none transition resize-none"
                                value={formData.details}
                                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                                placeholder="Describe your legal matter or requirements..."
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-fkcDarkGold dark:bg-fkcGold text-white dark:text-fkcBlack font-bold py-2.5 rounded hover:bg-gray-900 dark:hover:bg-white transition text-sm shadow-md cursor-pointer"
                        >
                            Submit Request
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}