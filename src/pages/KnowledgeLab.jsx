import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, ArrowRight, Calendar, User, ArrowLeft, Search, ChevronLeft, ChevronRight, Zap, ShieldCheck, Users } from "lucide-react";
import knowledgeBooksImg from "../assets/knowlegdebooks.png";
import danielleImg from "../assets/danielle.png";
import pawiImg from "../assets/pawi.png";
import wamaeImg from "../assets/wamae.png";
import mwanjaImg from "../assets/mwanja.png";
import ortnerImg from "../assets/ortner.png";
import ireriImg from "../assets/ireri.png";
import nyutuImg from "../assets/nyutu.png";
import blogPosts from "../data/blog";
import ArticleEngagement from "../components/ArticleEngagement";

const FOOTNOTE = /(\[[ivxlc]+\])/i;
const renderText = (text) => text.split(FOOTNOTE).map((part, i) =>
    FOOTNOTE.test(part)
        ? <sup key={i} className="text-fkcDarkGold dark:text-fkcGold font-semibold">{part.slice(1, -1)}</sup>
        : part
);

const AUTHOR_IMAGES = [
    { match: "danielle", img: danielleImg },
    { match: "pawi", img: pawiImg },
    { match: "wamae", img: wamaeImg },
    { match: "mwanja", img: mwanjaImg },
    { match: "ortner", img: ortnerImg },
    { match: "ireri", img: ireriImg },
    { match: "nyutu", img: nyutuImg },
];

const getAuthorImage = (authorName) => {
    if (!authorName) return danielleImg;
    const lower = authorName.toLowerCase();
    const found = AUTHOR_IMAGES.find(a => lower.includes(a.match));
    return found ? found.img : danielleImg;
};

const LEAVE_DURATION = 260;
const UNLOCK_DELAY = 700;

const OUTCOMES = [
    {
        title: "Faster decisions",
        icon: Zap,
        text: "Simple frameworks and fewer unknowns to accelerate your commercial objectives."
    },
    {
        title: "Fewer mistakes",
        icon: ShieldCheck,
        text: "Proactive guidance to avoid common regulatory traps and compliance penalties."
    },
    {
        title: "Prepared teams",
        icon: Users,
        text: "Shareable checklists and actionable how-tos designed for modern enterprise teams."
    }
];

// Time each outcome stays on screen before the slideshow advances on its own.
const OUTCOME_INTERVAL = 5000;

function OutcomeSlideshow() {
    const [index, setIndex] = useState(0);

    // Re-armed every time the slide changes, so a manual click restarts the full interval.
    useEffect(() => {
        const timer = setTimeout(() => {
            setIndex(prev => (prev + 1) % OUTCOMES.length);
        }, OUTCOME_INTERVAL);
        return () => clearTimeout(timer);
    }, [index]);

    const goPrev = () => setIndex(prev => (prev - 1 + OUTCOMES.length) % OUTCOMES.length);
    const goNext = () => setIndex(prev => (prev + 1) % OUTCOMES.length);

    const arrowClass = "shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-white dark:bg-fkcBlack border border-gray-300 dark:border-fkcGold/30 text-fkcDarkGold dark:text-fkcGold shadow hover:bg-fkcGold/10 hover:border-fkcGold hover:-translate-y-0.5 hover:shadow-lg active:scale-95 transition-all duration-300 cursor-pointer";

    return (
        <div>
            <div className="flex items-center gap-3 sm:gap-5">
                <button onClick={goPrev} aria-label="Previous outcome" className={arrowClass}>
                    <ChevronLeft size={20} />
                </button>

                <div className="flex-1 overflow-hidden rounded-2xl">
                    <div
                        className="flex transition-transform duration-700 ease-out motion-reduce:transition-none"
                        style={{ transform: `translateX(-${index * 100}%)` }}
                    >
                        {OUTCOMES.map((outcome, i) => {
                            const Icon = outcome.icon;
                            return (
                                <div key={outcome.title} className="w-full shrink-0 px-1 py-2" aria-hidden={i !== index}>
                                    <div className="bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-fkcGold/20 rounded-2xl p-8 sm:p-10 space-y-3 shadow-lg min-h-[200px] flex flex-col items-center justify-center text-center">
                                        <div className="flex items-center justify-center gap-3 text-fkcDarkGold dark:text-fkcGold font-bold text-xl sm:text-2xl">
                                            <Icon size={28} className="shrink-0" />
                                            <span>{outcome.title}</span>
                                        </div>
                                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">{outcome.text}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <button onClick={goNext} aria-label="Next outcome" className={arrowClass}>
                    <ChevronRight size={20} />
                </button>
            </div>

            <div className="flex items-center justify-center gap-2 pt-6">
                {OUTCOMES.map((outcome, i) => (
                    <button
                        key={outcome.title}
                        onClick={() => setIndex(i)}
                        aria-label={`Go to outcome ${i + 1}`}
                        className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${i === index
                            ? "w-8 bg-fkcDarkGold dark:bg-fkcGold"
                            : "w-2.5 bg-gray-300 dark:bg-fkcGold/30 hover:bg-fkcGold/60"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}

export default function KnowledgeLab() {
    const [selectedBlogCategory, setSelectedBlogCategory] = useState("ALL");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedBlogPost, setSelectedBlogPost] = useState(null);
    const [hoveredSlug, setHoveredSlug] = useState(null);
    const [previewSlug, setPreviewSlug] = useState(null);
    const [pageDirection, setPageDirection] = useState("next");
    const [isLeaving, setIsLeaving] = useState(false);
    const [lockedHeight, setLockedHeight] = useState(0);
    const hoverTimerRef = useRef(null);
    const pageGridRef = useRef(null);
    const pageTimerRef = useRef(null);
    const unlockTimerRef = useRef(null);

    const blogsPerPage = 4;

    useEffect(() => () => {
        clearTimeout(pageTimerRef.current);
        clearTimeout(unlockTimerRef.current);
    }, []);

    const openArticle = (blog) => {
        if (!blog.fullContent) return;
        setSelectedBlogPost(blog);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const closeArticle = () => {
        setSelectedBlogPost(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleMouseEnter = (blog) => {
        setHoveredSlug(blog.slug);
        if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = setTimeout(() => {
            setPreviewSlug(blog.slug);
        }, 2000);
    };

    const handleMouseLeave = () => {
        setHoveredSlug(null);
        setPreviewSlug(null);
        if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };

    const changePage = (page) => {
        clearTimeout(pageTimerRef.current);
        clearTimeout(unlockTimerRef.current);
        setIsLeaving(false);
        setLockedHeight(0);
        setCurrentPage(page);
    };

    const featuredResources = [
        {
            title: "Kenya Market Entry: A 30-Day Checklist (FDI)",
            category: "FDI",
            description: "Step-by-step regulatory roadmap for foreign investors entering the East African market."
        },
        {
            title: "Embassy Documents 101",
            category: "IMMIGRATION",
            description: "Affidavits, notarisation, certifications, and translations made simple and compliant."
        },
        {
            title: "Avoiding IP Pitfalls When Expanding to East Africa",
            category: "IP",
            description: "Safeguarding your trademarks, patents, and proprietary assets across borders."
        },
        {
            title: "KRA Essentials for New Operators",
            category: "TAX",
            description: "Navigating VAT, PAYE, withholding tax, and Tax Compliance Certificates (TCC) efficiently."
        },
        {
            title: "Employment Law in 5 Decisions",
            category: "DISPUTES",
            description: "Offers, workplace policies, exits, dispute handling, and statutory compliance."
        }
    ];

    const blogCategories = ["ALL", "ATTORNEYS", "BUSINESS LAW", "LEGAL ADVICE", "LEGAL TALKS", "REAL ESTATE"];

    const uniqueBlogPosts = blogPosts
        .filter((blog, index, self) => index === self.findIndex((b) => b.slug === blog.slug))
        .filter(blog => {
            const author = blog.author || blog.fullContent?.author || "";
            return !author.toLowerCase().includes("fkc legal team");
        });

    const matchesSearch = (blog) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();

        if (blog.title?.toLowerCase().includes(q)) return true;
        if (blog.description?.toLowerCase().includes(q)) return true;
        if (blog.author?.toLowerCase().includes(q)) return true;
        if (blog.category?.toLowerCase().includes(q)) return true;

        const fc = blog.fullContent;
        if (fc) {
            if (fc.headline?.toLowerCase().includes(q)) return true;
            if (fc.subtitle?.toLowerCase().includes(q)) return true;
            if (fc.tags?.some(tag => tag.toLowerCase().includes(q))) return true;
            if (fc.sections?.some(sec =>
                sec.subheading?.toLowerCase().includes(q) ||
                sec.paragraphs?.some(p => p.toLowerCase().includes(q))
            )) return true;
            if (fc.faqs?.some(faq =>
                faq.q?.toLowerCase().includes(q) || faq.a?.toLowerCase().includes(q)
            )) return true;
        }

        return false;
    };

    const filteredBlogs = uniqueBlogPosts.filter(blog => {
        const matchesCat = selectedBlogCategory === "ALL" || (blog.categories || [blog.category]).includes(selectedBlogCategory);
        const matchesQuery = matchesSearch(blog);
        return matchesCat && matchesQuery;
    });

    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage) || 1;
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const canPrev = currentPage > 1;
    const canNext = currentPage < totalPages;

    const goToPage = (target, direction) => {
        if (isLeaving || target < 1 || target > totalPages || target === currentPage) return;
        clearTimeout(unlockTimerRef.current);
        setLockedHeight(pageGridRef.current ? pageGridRef.current.offsetHeight : 0);
        setPageDirection(direction);
        setIsLeaving(true);
        pageTimerRef.current = setTimeout(() => {
            setCurrentPage(target);
            setIsLeaving(false);
            unlockTimerRef.current = setTimeout(() => setLockedHeight(0), UNLOCK_DELAY);
        }, LEAVE_DURATION);
    };

    const pageAnimationClass = isLeaving
        ? (pageDirection === "next" ? "page-out-left" : "page-out-right")
        : (pageDirection === "next" ? "page-in-right" : "page-in-left");

    const otherArticles = uniqueBlogPosts.filter(b => b.slug !== selectedBlogPost?.slug).slice(0, 4);

    const currentAuthorName = selectedBlogPost?.fullContent?.author || selectedBlogPost?.author || "Danielle Muli";
    const currentAuthorImg = getAuthorImage(currentAuthorName);

    return (
        <div className="min-h-screen bg-white dark:bg-fkcBlack text-gray-900 dark:text-white transition-colors duration-300 flex flex-col justify-between">
            <style>{`
                @keyframes slideInFromLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                .animate-slide-in {
                    animation: slideInFromLeft 1.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .animate-preview-img {
                    animation: slideInFromLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
                }
                .animate-preview-text {
                    animation: slideInFromLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
                }
                @keyframes pulseGlow {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                }
                .animate-pulse-glow {
                    animation: pulseGlow 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                @keyframes pageInFromRight {
                    from {
                        opacity: 0;
                        transform: translateX(60px) scale(0.97);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0) scale(1);
                    }
                }
                @keyframes pageInFromLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-60px) scale(0.97);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0) scale(1);
                    }
                }
                @keyframes pageOutToLeft {
                    from {
                        opacity: 1;
                        transform: translateX(0) scale(1);
                    }
                    to {
                        opacity: 0;
                        transform: translateX(-60px) scale(0.97);
                    }
                }
                @keyframes pageOutToRight {
                    from {
                        opacity: 1;
                        transform: translateX(0) scale(1);
                    }
                    to {
                        opacity: 0;
                        transform: translateX(60px) scale(0.97);
                    }
                }
                @keyframes pageCountPop {
                    from {
                        opacity: 0;
                        transform: translateY(8px) scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                .page-in-right {
                    animation: pageInFromRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) backwards;
                }
                .page-in-left {
                    animation: pageInFromLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1) backwards;
                }
                .page-out-left {
                    animation: pageOutToLeft 0.24s ease-in forwards;
                }
                .page-out-right {
                    animation: pageOutToRight 0.24s ease-in forwards;
                }
                .page-count-pop {
                    animation: pageCountPop 0.35s ease-out both;
                }
                @media (prefers-reduced-motion: reduce) {
                    .page-in-right,
                    .page-in-left,
                    .page-out-left,
                    .page-out-right,
                    .page-count-pop {
                        animation: none;
                    }
                }
            `}</style>

            <div>
                {selectedBlogPost ? (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 space-y-8">
                        <button
                            onClick={closeArticle}
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-fkcDarkGold dark:text-fkcGold hover:opacity-80 transition cursor-pointer"
                        >
                            <ArrowLeft size={14} /> Back to Knowledge Lab
                        </button>

                        <div className="lg:hidden bg-gray-50 dark:bg-[#121212] p-6 rounded-2xl border border-gray-200 dark:border-fkcGold/20 shadow-lg flex flex-col items-center text-center space-y-4 mb-8">
                            <img src={currentAuthorImg} alt={currentAuthorName} className="w-36 h-36 rounded-2xl object-cover border-2 border-fkcGold shadow-md" />
                            <div className="space-y-1">
                                <h4 className="font-bold text-base text-gray-900 dark:text-white">{currentAuthorName}</h4>
                                <p className="text-xs font-semibold text-fkcDarkGold dark:text-fkcGold uppercase tracking-wider">About Author</p>
                                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                                    Legal expert and contributor specializing in corporate law, compliance, and regulatory frameworks across East Africa.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4 border-b border-gray-200 dark:border-fkcGold/20 pb-6 max-w-4xl">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-fkcDarkGold dark:text-fkcGold bg-fkcGold/10 px-2.5 py-1 rounded-full border border-gray-200 dark:border-fkcGold/20 inline-block">
                                {selectedBlogPost.fullContent.category}
                            </span>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
                                {selectedBlogPost.fullContent.headline}
                            </h1>
                            {selectedBlogPost.fullContent.subtitle && (
                                <p className="text-base sm:text-lg font-semibold text-fkcDarkGold dark:text-fkcGold leading-snug">
                                    {selectedBlogPost.fullContent.subtitle}
                                </p>
                            )}
                            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 pt-2">
                                <span className="flex items-center gap-1.5 font-medium text-gray-700 dark:text-gray-300">
                                    <User size={14} className="text-fkcDarkGold dark:text-fkcGold" /> By: {currentAuthorName}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Calendar size={14} /> {selectedBlogPost.fullContent.date}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
                            <div className="lg:col-span-8 space-y-8 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                {selectedBlogPost.fullContent.sections.map((sec, idx) => (
                                    <div key={idx} className="space-y-4">
                                        {sec.subheading && (
                                            <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight pt-2">
                                                {sec.subheading}
                                            </h2>
                                        )}
                                        {sec.paragraphs.map((p, pIdx) => (
                                            <p key={pIdx}>{renderText(p)}</p>
                                        ))}
                                    </div>
                                ))}

                                {selectedBlogPost.fullContent.faqs && selectedBlogPost.fullContent.faqs.length > 0 && (
                                    <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-fkcGold/20">
                                        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                                            Frequently Asked Questions
                                        </h2>
                                        <div className="space-y-6">
                                            {selectedBlogPost.fullContent.faqs.map((faq, fIdx) => (
                                                <div key={fIdx} className="bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-fkcGold/20 rounded-xl p-6 space-y-2 shadow-sm">
                                                    <h3 className="font-bold text-gray-900 dark:text-white text-base">{faq.q}</h3>
                                                    <p className="text-xs text-gray-600 dark:text-gray-300">{faq.a}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {selectedBlogPost.fullContent.conclusion && (
                                    <div className="bg-gradient-to-br from-[#211a0d] via-[#47391b] to-[#211a0d] border border-fkcGold/40 rounded-2xl p-8 text-white space-y-4 shadow-xl">
                                        <h3 className="text-xl font-extrabold text-fkcGold">Summary & Key Takeaways</h3>
                                        {selectedBlogPost.fullContent.conclusion.split('\n').map((para, cIdx) => (
                                            <p key={cIdx} className="text-xs sm:text-sm text-amber-100 leading-relaxed">
                                                {para}
                                            </p>
                                        ))}
                                    </div>
                                )}

                                {selectedBlogPost.fullContent.references && selectedBlogPost.fullContent.references.length > 0 && (
                                    <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-fkcGold/20">
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white pt-4">References</h3>
                                        {selectedBlogPost.fullContent.references.map((ref, rIdx) => (
                                            <p key={rIdx} className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed break-words">
                                                {renderText(ref)}
                                            </p>
                                        ))}
                                    </div>
                                )}

                                {selectedBlogPost.fullContent.legalSources && (
                                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium italic pt-2">
                                        {selectedBlogPost.fullContent.legalSources}
                                    </div>
                                )}

                                <ArticleEngagement
                                    key={selectedBlogPost.slug}
                                    slug={selectedBlogPost.slug}
                                    seed={selectedBlogPost.engagement}
                                />

                                {selectedBlogPost.fullContent.tags && selectedBlogPost.fullContent.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200 dark:border-fkcGold/20">
                                        <span className="text-xs font-bold text-gray-900 dark:text-white self-center mr-2">Tags:</span>
                                        {selectedBlogPost.fullContent.tags.map((tag, tIdx) => (
                                            <span key={tIdx} className="text-[11px] font-medium bg-gray-100 dark:bg-fkcGold/10 text-fkcDarkGold dark:text-fkcGold px-3 py-1 rounded-full border border-gray-200 dark:border-fkcGold/20">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="hidden lg:block lg:col-span-4 sticky top-28 space-y-6">
                                <div className="bg-gray-50 dark:bg-[#121212] p-8 rounded-3xl border border-gray-200 dark:border-fkcGold/30 shadow-2xl flex flex-col items-center text-center space-y-5">
                                    <img src={currentAuthorImg} alt={currentAuthorName} className="w-48 h-48 rounded-2xl object-cover border-2 border-fkcGold shadow-xl" />
                                    <div className="space-y-2">
                                        <h4 className="font-extrabold text-xl text-gray-900 dark:text-white">{currentAuthorName}</h4>
                                        <p className="text-xs font-bold text-fkcDarkGold dark:text-fkcGold uppercase tracking-wider">About Author</p>
                                        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                                            Legal expert and contributor specializing in corporate law, compliance, and regulatory frameworks across East Africa.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-16 pb-12 space-y-6 border-t border-gray-200 dark:border-fkcGold/20">
                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Other Available Articles</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {otherArticles.map((blog) => {
                                    const cardAuthor = blog.author || blog.fullContent?.author || "Danielle Muli";
                                    const cardAuthorImg = getAuthorImage(cardAuthor);
                                    return (
                                        <div
                                            key={blog.slug}
                                            onClick={() => openArticle(blog)}
                                            onMouseEnter={() => handleMouseEnter(blog)}
                                            onMouseLeave={handleMouseLeave}
                                            className={`relative bg-gray-50 dark:bg-gradient-to-br dark:from-[#121212] dark:via-[#161616] dark:to-[#1a1a1a] border border-gray-200 dark:border-fkcGold/20 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-lg hover:border-fkcGold transition group ${blog.fullContent ? "cursor-pointer" : ""}`}
                                        >
                                            {previewSlug === blog.slug ? (
                                                <div className="absolute inset-0 bg-white dark:bg-[#161616] p-6 rounded-2xl z-10 flex flex-col justify-between overflow-y-auto border border-fkcGold shadow-2xl">
                                                    <div className="flex gap-4 items-start">
                                                        <img src={cardAuthorImg} alt={cardAuthor} className="animate-preview-img w-16 h-16 rounded-xl object-cover border border-fkcGold shrink-0 shadow" />
                                                        <div className="animate-preview-text space-y-2">
                                                            <span className="text-[10px] uppercase font-bold tracking-widest text-fkcDarkGold dark:text-fkcGold bg-fkcGold/10 px-2.5 py-1 rounded-full border border-gray-200 dark:border-fkcGold/20">
                                                                Preview
                                                            </span>
                                                            <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-snug">
                                                                {blog.fullContent?.headline || blog.title}
                                                            </h4>
                                                            <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-4">
                                                                {blog.fullContent?.sections?.[0]?.paragraphs?.[0] || blog.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <span className="animate-preview-text text-xs font-bold text-fkcDarkGold dark:text-fkcGold">Click to read full article</span>
                                                </div>
                                            ) : null}
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[10px] uppercase font-bold tracking-widest text-fkcDarkGold dark:text-fkcGold bg-fkcGold/10 px-2.5 py-1 rounded-full border border-gray-200 dark:border-fkcGold/20">
                                                        {blog.category}
                                                    </span>
                                                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                                        <span className="flex items-center gap-1"><Calendar size={12} /> {blog.date}</span>
                                                    </div>
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-fkcGold transition leading-snug">
                                                    {blog.title}
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                                                    {blog.description}
                                                </p>
                                            </div>
                                            <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-xs">
                                                <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 font-medium">
                                                    <User size={13} className="text-fkcDarkGold dark:text-fkcGold" /> By {cardAuthor}
                                                </span>
                                                <span className="text-fkcDarkGold dark:text-fkcGold font-bold flex items-center gap-1 group-hover:text-fkcGold group-hover:translate-x-1 transition">
                                                    Read Article <ArrowRight size={14} />
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gradient-to-b dark:from-[#121212] dark:to-fkcBlack border-b border-gray-200 dark:border-fkcGold/20 text-center overflow-hidden">
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-80 dark:opacity-100 pointer-events-none"
                                style={{ backgroundImage: `url(${knowledgeBooksImg})` }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white dark:from-fkcBlack/80 dark:via-fkcBlack/60 dark:to-fkcBlack"></div>
                            <div className="max-w-4xl mx-auto space-y-4 relative z-10">
                                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                                    Knowledge Lab
                                </h1>
                                <p className="text-fkcDarkGold dark:text-fkcGold text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
                                    Clear, practical resources for decision-makers. Articles, guides, checklists, and explainers—no jargon walls, just answers you can use today.
                                </p>
                            </div>
                        </div>

                        <div className="w-full bg-gradient-to-r from-[#211a0d] via-[#47391b] to-[#211a0d] border-y border-fkcGold/40 py-4 px-4 sm:px-8 lg:px-12 shadow-2xl mb-12 relative z-20 overflow-hidden">
                            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-3.5 animate-slide-in">
                                    <div className="w-10 h-10 rounded-xl bg-fkcBlack text-fkcGold border border-fkcGold/60 flex items-center justify-center shrink-0 shadow-lg">
                                        <GraduationCap size={22} className="animate-bounce" />
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 text-center sm:text-left">
                                        <span className="text-xs sm:text-sm font-extrabold text-white tracking-wide">
                                            FKC Legal Academy:
                                        </span>
                                        <span className="text-xs sm:text-sm font-semibold text-amber-100 animate-pulse-glow tracking-wide">
                                            Elevate your team's compliance standards and legal literacy.
                                        </span>
                                    </div>
                                </div>
                                <Link
                                    to="/academy"
                                    className="px-5 py-2.5 rounded-xl bg-white hover:bg-fkcGold text-fkcBlack font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-fkcGold/50 flex items-center gap-2 group shrink-0 border border-fkcGold/40"
                                >
                                    <span>Explore Academy</span>
                                    <ArrowRight size={15} className="transform group-hover:translate-x-1.5 transition-transform" />
                                </Link>
                            </div>
                        </div>

                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                            <div className="space-y-6 mb-16">
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 dark:border-fkcGold/20 pb-4">
                                    <div>
                                        <span className="text-[10px] uppercase font-bold tracking-widest text-fkcDarkGold dark:text-fkcGold bg-fkcGold/10 px-2.5 py-1 rounded-full border border-gray-200 dark:border-fkcGold/20 inline-block mb-2">
                                            Legal Insights & Talks
                                        </span>
                                        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">FKC Legal Blog</h2>
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                        <Search size={16} />
                                    </div>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value);
                                            changePage(1);
                                        }}
                                        placeholder="Search articles by author, keywords, or questions..."
                                        className="w-full pl-10 pr-10 py-3 text-xs sm:text-sm rounded-xl bg-gray-50 dark:bg-[#121212] border border-gray-300 dark:border-fkcGold/30 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-fkcGold transition shadow-inner"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => {
                                                setSearchQuery("");
                                                changePage(1);
                                            }}
                                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
                                        >
                                            Clear
                                        </button>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2 pt-2">
                                    {blogCategories.map((cat, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => {
                                                setSelectedBlogCategory(cat);
                                                changePage(1);
                                            }}
                                            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition cursor-pointer border ${selectedBlogCategory === cat
                                                ? "bg-fkcDarkGold dark:bg-fkcGold text-white dark:text-fkcBlack border-fkcDarkGold dark:border-fkcGold shadow"
                                                : "bg-white dark:bg-fkcBlack border-gray-300 dark:border-fkcGold/30 text-fkcDarkGold dark:text-fkcGold hover:bg-fkcGold/10 hover:border-fkcGold"
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>

                                <div
                                    ref={pageGridRef}
                                    style={{ minHeight: lockedHeight }}
                                    className="transition-[min-height] duration-500 ease-out"
                                >
                                    <div key={currentPage} className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                        {currentBlogs.map((blog, index) => {
                                            const cardAuthor = blog.author || blog.fullContent?.author || "Danielle Muli";
                                            const cardAuthorImg = getAuthorImage(cardAuthor);
                                            return (
                                                <div
                                                    key={blog.slug}
                                                    onClick={() => openArticle(blog)}
                                                    onMouseEnter={() => handleMouseEnter(blog)}
                                                    onMouseLeave={handleMouseLeave}
                                                    style={{ animationDelay: isLeaving ? "0ms" : `${index * 90}ms` }}
                                                    className={`relative bg-gray-50 dark:bg-gradient-to-br dark:from-[#121212] dark:via-[#161616] dark:to-[#1a1a1a] border border-gray-200 dark:border-fkcGold/20 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-lg hover:border-fkcGold transition group ${blog.fullContent ? "cursor-pointer" : ""} ${pageAnimationClass}`}
                                                >
                                                    {previewSlug === blog.slug ? (
                                                        <div className="absolute inset-0 bg-white dark:bg-[#161616] p-6 rounded-2xl z-10 flex flex-col justify-between overflow-y-auto border border-fkcGold shadow-2xl">
                                                            <div className="flex gap-4 items-start">
                                                                <img src={cardAuthorImg} alt={cardAuthor} className="animate-preview-img w-16 h-16 rounded-xl object-cover border border-fkcGold shrink-0 shadow" />
                                                                <div className="animate-preview-text space-y-2">
                                                                    <div className="text-[10px] uppercase font-bold tracking-widest text-fkcDarkGold dark:text-fkcGold bg-fkcGold/10 px-2.5 py-1 rounded-full border border-gray-200 dark:border-fkcGold/20">
                                                                        Preview
                                                                    </div>
                                                                    <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-snug">
                                                                        {blog.fullContent?.headline || blog.title}
                                                                    </h4>
                                                                    <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-4">
                                                                        {blog.fullContent?.sections?.[0]?.paragraphs?.[0] || blog.description}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <span className="animate-preview-text text-xs font-bold text-fkcDarkGold dark:text-fkcGold">Click to read full article</span>
                                                        </div>
                                                    ) : null}
                                                    <div className="space-y-3">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-[10px] uppercase font-bold tracking-widest text-fkcDarkGold dark:text-fkcGold bg-fkcGold/10 px-2.5 py-1 rounded-full border border-gray-200 dark:border-fkcGold/20">
                                                                {blog.category}
                                                            </span>
                                                            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                                                <span className="flex items-center gap-1"><Calendar size={12} /> {blog.date}</span>
                                                            </div>
                                                        </div>
                                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-fkcGold transition leading-snug">
                                                            {blog.title}
                                                        </h3>
                                                        <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                                                            {blog.description}
                                                        </p>
                                                    </div>
                                                    <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-xs">
                                                        <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 font-medium">
                                                            <User size={13} className="text-fkcDarkGold dark:text-fkcGold" /> By {cardAuthor}
                                                        </span>
                                                        <span className="text-fkcDarkGold dark:text-fkcGold font-bold flex items-center gap-1 group-hover:text-fkcGold group-hover:translate-x-1 transition">
                                                            Read Article <ArrowRight size={14} />
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        {currentBlogs.length === 0 && (
                                            <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400 text-sm">
                                                No blog posts found matching your criteria.
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {totalPages > 1 && (
                                    <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-fkcGold/20">
                                        <button
                                            onClick={() => goToPage(currentPage - 1, "prev")}
                                            disabled={!canPrev}
                                            className={`group flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-white dark:bg-fkcBlack border border-gray-300 dark:border-fkcGold/30 text-fkcDarkGold dark:text-fkcGold shadow transition-all duration-300 ease-out disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer ${canPrev ? "hover:bg-fkcGold/10 hover:border-fkcGold hover:-translate-y-0.5 hover:shadow-lg active:scale-95" : ""}`}
                                        >
                                            <ChevronLeft size={15} className={`transition-transform duration-300 ${canPrev ? "group-hover:-translate-x-1" : ""}`} /> Previous
                                        </button>
                                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                                            Page{" "}
                                            <span key={currentPage} className="page-count-pop inline-block font-extrabold text-fkcDarkGold dark:text-fkcGold">
                                                {currentPage}
                                            </span>{" "}
                                            of {totalPages}
                                        </span>
                                        <button
                                            onClick={() => goToPage(currentPage + 1, "next")}
                                            disabled={!canNext}
                                            className={`group flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-white dark:bg-fkcBlack border border-gray-300 dark:border-fkcGold/30 text-fkcDarkGold dark:text-fkcGold shadow transition-all duration-300 ease-out disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer ${canNext ? "hover:bg-fkcGold/10 hover:border-fkcGold hover:-translate-y-0.5 hover:shadow-lg active:scale-95" : ""}`}
                                        >
                                            Next <ChevronRight size={15} className={`transition-transform duration-300 ${canNext ? "group-hover:translate-x-1" : ""}`} />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-12 mb-16">
                                <div className="border-b border-gray-200 dark:border-fkcGold/20 pb-4 flex justify-between items-end">
                                    <div>
                                        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Featured Resources</h2>
                                        <p className="text-xs text-fkcDarkGold dark:text-fkcGold mt-1">Essential reading and tools curated by our legal experts</p>
                                    </div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Showing {featuredResources.length} results</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {featuredResources.map((resource, idx) => (
                                        <div key={idx} className="bg-gray-50 dark:bg-gradient-to-br dark:from-[#121212] dark:via-[#161616] dark:to-[#1a1a1a] border border-gray-200 dark:border-fkcGold/20 rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-xl hover:border-fkcGold transition">
                                            <div className="space-y-3">
                                                <span className="text-[10px] uppercase font-bold tracking-widest text-fkcDarkGold dark:text-fkcGold bg-fkcGold/10 px-2.5 py-1 rounded-full border border-gray-200 dark:border-fkcGold/20 inline-block">
                                                    {resource.category}
                                                </span>
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">{resource.title}</h3>
                                                <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                                                    {resource.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-12 mb-16">
                                <div className="border-b border-gray-200 dark:border-fkcGold/20 pb-4">
                                    <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Outcome</h2>
                                    <p className="text-xs text-fkcDarkGold dark:text-fkcGold mt-1">What you achieve with our practical legal insights</p>
                                </div>
                                <OutcomeSlideshow />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}