import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, ShieldCheck, CheckCircle2, Smartphone, CreditCard, Loader2 } from "lucide-react";
import axios from "axios";

export default function Academy() {
    const courses = [
        {
            id: 1,
            title: "Corporate Governance & Board Mastery",
            duration: "4 Weeks",
            level: "Executive",
            price: "Ksh 50,000",
            description: "Designed for directors and senior management on statutory duties under the Companies Act and compliance best practices.",
            requirements: [
                "Minimum 3 years professional or corporate leadership experience",
                "Completed academy application questionnaire",
                "Valid National ID or Passport copy"
            ]
        },
        {
            id: 2,
            title: "Employment Law & Workforce Compliance",
            duration: "2 Weeks",
            level: "HR Professionals",
            price: "Ksh 35,000",
            description: "Mastering Kenyan employment regulations, dispute management, contracts, and lawful restructuring.",
            requirements: [
                "Background in Human Resources, management, or corporate law",
                "Familiarity with standard workplace employment contracts",
                "Valid National ID or Passport copy"
            ]
        },
        {
            id: 3,
            title: "Tax Readiness & KRA Compliance for Startups",
            duration: "3 Weeks",
            level: "Founders & CFOs",
            price: "Ksh 40,000",
            description: "Demystifying corporate tax obligations, transfer pricing basics, and interacting with revenue authorities.",
            requirements: [
                "Founders, startup executives, or finance leads",
                "Access to basic corporate financial records",
                "Valid National ID or Passport copy"
            ]
        },
        {
            id: 4,
            title: "Cross-Border FDI & Market Entry Masterclass",
            duration: "4 Weeks",
            level: "Investors",
            price: "Ksh 60",
            description: "Comprehensive guidance on structuring investments, regulatory approvals, and land ownership rights in East Africa.",
            requirements: [
                "Investors, entrepreneurs, or regional strategists",
                "Intent to expand or invest in East African markets",
                "Valid National ID or Passport copy"
            ]
        }
    ];

    const [selectedCourse, setSelectedCourse] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("mpesa");
    const [formData, setFormData] = useState({ name: "", age: "", email: "", phone: "" });
    const [submitted, setSubmitted] = useState(false);

    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleEnrollClick = (course) => {
        setSelectedCourse(course);
        setSubmitted(false);
        setErrorMessage("");
        window.scrollTo({ top: 400, behavior: "smooth" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (paymentMethod === "mpesa") {
            const cleanPhone = formData.phone.replace(/\s+/g, '');
            const kenyanPhoneRegex = /^(?:(?:(?:\+?254)?(?:7|1))\d{8}|0(?:7|1)\d{8})$/;

            if (!kenyanPhoneRegex.test(cleanPhone)) {
                setErrorMessage("Please enter a valid Kenyan phone number (e.g., 0712345678 or +254712345678).");
                return;
            }
        }

        setLoading(true);
        setLoadingMessage(
            paymentMethod === "mpesa"
                ? "Initiating M-Pesa STK Push... Check your phone."
                : "Processing enrollment..."
        );

        try {
            const payload = {
                full_name: formData.name,
                age: parseInt(formData.age, 10),
                email: formData.email,
                course_title: selectedCourse.title,
                tuition_fee: selectedCourse.price,
                payment_method: paymentMethod,
                mpesa_phone_number: paymentMethod === "mpesa" ? formData.phone : ""
            };

            const response = await axios.post("http://localhost:8000/api/academy-enroll/", payload);

            if (response.data.success) {
                if (paymentMethod === "mpesa" && response.data.checkout_request_id) {
                    const checkoutRequestId = response.data.checkout_request_id;
                    setLoadingMessage("M-Pesa prompt sent! Waiting for your PIN authorization...");

                    let isPolling = true;
                    while (isPolling) {
                        await new Promise((resolve) => setTimeout(resolve, 3000));
                        try {
                            const statusRes = await axios.get(`http://localhost:8000/api/mpesa/status/${checkoutRequestId}/`);
                            const paymentStatus = statusRes.data.payment_status;

                            if (paymentStatus === "Completed") {
                                isPolling = false;
                            } else if (paymentStatus === "Failed") {
                                throw new Error("Payment failed or was cancelled.");
                            }
                        } catch (err) {
                            if (err.message && err.message.includes("Payment failed")) {
                                throw err;
                            }
                        }
                    }
                }
                setSubmitted(true);
            }
        } catch (error) {
            console.error("Enrollment error:", error);
            setErrorMessage(
                error.response?.data?.error ||
                error.message ||
                "Failed to process enrollment. Please check your connection and try again."
            );
        } finally {
            setLoading(false);
            setLoadingMessage("");
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-fkcBlack text-gray-900 dark:text-white transition-colors duration-300">
            <div className="relative py-12 px-4 sm:px-6 lg:px-8 text-center">
                <div className="max-w-4xl mx-auto space-y-4">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-fkcGold/10 border border-gray-200 dark:border-fkcGold/20 flex items-center justify-center text-fkcDarkGold dark:text-fkcGold">
                        <GraduationCap size={28} />
                    </div>
                    <span className="text-xs uppercase font-bold tracking-widest text-fkcDarkGold dark:text-fkcGold bg-fkcGold/10 px-3 py-1 rounded-full border border-gray-200 dark:border-fkcGold/20 inline-block">
                        Executive Education
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        FKC Legal Academy
                    </h1>
                    <p className="text-fkcDarkGold dark:text-fkcGold text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
                        Empowering business leaders, founders, and professionals with practical legal training and compliance masterclasses.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                {selectedCourse && (
                    <div className="mb-16 bg-gray-50 dark:bg-gradient-to-br dark:from-[#121212] dark:via-[#171717] dark:to-[#121212] border-2 border-fkcDarkGold dark:border-fkcGold rounded-3xl p-8 sm:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-6 space-y-6">
                            <div className="flex justify-between items-center">
                                <span className="text-xs uppercase font-bold tracking-widest text-fkcDarkGold dark:text-fkcGold bg-fkcGold/10 px-3 py-1 rounded-full border border-gray-200 dark:border-fkcGold/20">
                                    {selectedCourse.level}
                                </span>
                                <span className="text-sm font-semibold text-gray-500 dark:text-gray-300">{selectedCourse.duration}</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">{selectedCourse.title}</h2>
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                {selectedCourse.description}
                            </p>
                            <div className="bg-white dark:bg-fkcBlack/60 border border-gray-200 dark:border-fkcGold/20 rounded-2xl p-6 space-y-4 shadow-sm">
                                <h4 className="text-sm font-bold text-fkcDarkGold dark:text-fkcGold uppercase tracking-wider">Course Requirements & Prerequisites:</h4>
                                <ul className="space-y-2">
                                    {selectedCourse.requirements.map((req, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300">
                                            <CheckCircle2 size={16} className="text-fkcDarkGold dark:text-fkcGold shrink-0 mt-0.5" />
                                            <span>{req}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="pt-4 border-t border-gray-200 dark:border-fkcGold/10 flex justify-between items-center">
                                    <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold">Tuition Fee</span>
                                    <span className="text-lg font-extrabold text-fkcDarkGold dark:text-fkcGold">{selectedCourse.price}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedCourse(null)}
                                className="text-xs text-gray-500 dark:text-gray-400 hover:text-fkcDarkGold dark:hover:text-fkcGold underline transition cursor-pointer"
                            >
                                ← Choose a different course
                            </button>
                        </div>

                        <div className="lg:col-span-6 bg-white dark:bg-fkcBlack border border-gray-200 dark:border-fkcGold/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-md relative">
                            {loading && (
                                <div className="absolute inset-0 bg-white/95 dark:bg-fkcBlack/95 flex flex-col items-center justify-center z-50 rounded-2xl p-6 text-center backdrop-blur-sm">
                                    <Loader2 className="animate-spin text-fkcDarkGold dark:text-fkcGold w-12 h-12 mb-4" />
                                    <p className="text-gray-900 dark:text-white font-bold text-base">{loadingMessage}</p>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-2">Please keep this window open while the transaction completes.</p>
                                </div>
                            )}

                            {submitted ? (
                                <div className="my-auto py-12 text-center space-y-4">
                                    <div className="w-16 h-16 mx-auto rounded-full bg-fkcGold/20 border border-fkcDarkGold dark:border-fkcGold flex items-center justify-center text-fkcDarkGold dark:text-fkcGold">
                                        <CheckCircle2 size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Enrollment Successful!</h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-xs max-w-sm mx-auto leading-relaxed">
                                        Thank you, {formData.name}. We have received your enrollment and payment details for <span className="text-fkcDarkGold dark:text-fkcGold font-semibold">{selectedCourse.title}</span>. Check your email ({formData.email}) for onboarding instructions.
                                    </p>
                                    <button
                                        onClick={() => { setSubmitted(false); setSelectedCourse(null); }}
                                        className="mt-4 px-6 py-2.5 rounded-full bg-fkcDarkGold dark:bg-fkcGold text-white dark:text-fkcBlack font-bold text-xs uppercase tracking-wider hover:bg-gray-900 dark:hover:bg-white transition cursor-pointer"
                                    >
                                        Back to Academy
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-fkcGold/20 pb-3">Complete Your Enrollment</h3>

                                    {errorMessage && (
                                        <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-500/50 text-red-700 dark:text-red-300 rounded-xl text-xs">
                                            {errorMessage}
                                        </div>
                                    )}

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1">Full Name</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g., Alex Kiprop"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-gray-50 dark:bg-[#121212] border border-gray-300 dark:border-fkcGold/30 rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-fkcDarkGold dark:focus:border-fkcGold"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1">Age</label>
                                                <input
                                                    type="number"
                                                    required
                                                    min="18"
                                                    placeholder="e.g., 28"
                                                    value={formData.age}
                                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                                    className="w-full bg-gray-50 dark:bg-[#121212] border border-gray-300 dark:border-fkcGold/30 rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-fkcDarkGold dark:focus:border-fkcGold"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1">Email Address</label>
                                                <input
                                                    type="email"
                                                    required
                                                    placeholder="alex@example.com"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full bg-gray-50 dark:bg-[#121212] border border-gray-300 dark:border-fkcGold/30 rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-fkcDarkGold dark:focus:border-fkcGold"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-2">Select Payment Method</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setPaymentMethod("mpesa")}
                                                    className={`py-3 px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${paymentMethod === "mpesa"
                                                        ? "bg-fkcDarkGold dark:bg-fkcGold text-white dark:text-fkcBlack border-fkcDarkGold dark:border-fkcGold shadow-md"
                                                        : "bg-gray-50 dark:bg-[#121212] text-gray-700 dark:text-gray-300 border-gray-300 dark:border-fkcGold/30 hover:border-fkcDarkGold dark:hover:border-fkcGold"
                                                        }`}
                                                >
                                                    <Smartphone size={16} />
                                                    <span>M-Pesa</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setPaymentMethod("card")}
                                                    className={`py-3 px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${paymentMethod === "card"
                                                        ? "bg-fkcDarkGold dark:bg-fkcGold text-white dark:text-fkcBlack border-fkcDarkGold dark:border-fkcGold shadow-md"
                                                        : "bg-gray-50 dark:bg-[#121212] text-gray-700 dark:text-gray-300 border-gray-300 dark:border-fkcGold/30 hover:border-fkcDarkGold dark:hover:border-fkcGold"
                                                        }`}
                                                >
                                                    <CreditCard size={16} />
                                                    <span>Credit/Debit Card</span>
                                                </button>
                                            </div>
                                        </div>
                                        {paymentMethod === "mpesa" ? (
                                            <div>
                                                <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1">Phone Number </label>
                                                <input
                                                    type="tel"
                                                    required
                                                    placeholder="0712 345 678 or +254712345678"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className="w-full bg-gray-50 dark:bg-[#121212] border border-gray-300 dark:border-fkcGold/30 rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-fkcDarkGold dark:focus:border-fkcGold"
                                                />
                                            </div>
                                        ) : (
                                            <div>
                                                <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1">Card Details (Mock)</label>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="4000 1234 5678 9010"
                                                    className="w-full bg-gray-50 dark:bg-[#121212] border border-gray-300 dark:border-fkcGold/30 rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-fkcDarkGold dark:focus:border-fkcGold"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-3.5 rounded-full bg-fkcDarkGold dark:bg-fkcGold text-white dark:text-fkcBlack font-bold text-xs uppercase tracking-wider hover:bg-gray-900 dark:hover:bg-white transition shadow-xl disabled:opacity-50 cursor-pointer"
                                    >
                                        Proceed to Pay {selectedCourse.price}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {courses.map((course) => (
                        <div key={course.id} className="bg-gray-50 dark:bg-gradient-to-br dark:from-[#121212] dark:via-[#161616] dark:to-[#1a1a1a] border border-gray-200 dark:border-fkcGold/20 rounded-2xl p-8 flex flex-col justify-between space-y-6 shadow-2xl hover:border-fkcDarkGold dark:hover:border-fkcGold transition">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-fkcDarkGold dark:text-fkcGold bg-fkcGold/10 px-3 py-1 rounded-full border border-gray-200 dark:border-fkcGold/20">
                                        {course.level}
                                    </span>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-semibold text-fkcDarkGold dark:text-fkcGold">{course.price}</span>
                                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{course.duration}</span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{course.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                    {course.description}
                                </p>
                            </div>
                            <div className="pt-4 border-t border-gray-200 dark:border-fkcGold/10 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                    <ShieldCheck size={16} className="text-fkcDarkGold dark:text-fkcGold" />
                                    <span>Certified Program</span>
                                </div>
                                <button
                                    onClick={() => handleEnrollClick(course)}
                                    className="px-5 py-2.5 rounded-full bg-fkcDarkGold dark:bg-fkcGold text-white dark:text-fkcBlack font-bold text-xs uppercase tracking-wider hover:bg-gray-900 dark:hover:bg-white transition shadow-lg cursor-pointer"
                                >
                                    Enroll Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-gray-50 dark:bg-gradient-to-br dark:from-[#121212] dark:to-[#181818] border border-gray-200 dark:border-fkcGold/30 rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">Custom Corporate Training</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                        Need tailored legal training workshops specifically designed for your executive board, legal department, or operational staff? We develop customized curricula to match your corporate risk profile.
                    </p>
                    <div>
                        <Link
                            to="/contact"
                            className="inline-block px-8 py-3.5 rounded-full bg-fkcDarkGold dark:bg-fkcGold text-white dark:text-fkcBlack font-bold text-xs uppercase tracking-wider hover:bg-gray-900 dark:hover:bg-white transition shadow-xl"
                        >
                            Request Custom Training
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}