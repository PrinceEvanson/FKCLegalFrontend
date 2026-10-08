import React, { useState } from "react";
import { ThumbsUp, ThumbsDown, MessageSquare, Send } from "lucide-react";

const STORAGE_KEY = "fkc_blog_engagement";

function readAll() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
        return {};
    }
}

function save(slug, value) {
    try {
        const all = readAll();
        all[slug] = value;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    } catch {
        // storage unavailable: the reaction still works for this page view
    }
}

/**
 * Thumbs up/down + comments for ONE article.
 * Render it with key={slug} so every article gets its own separate state.
 * `seed` = { likes, dislikes, comments } starting values from the article's data file.
 */
export default function ArticleEngagement({ slug, seed }) {
    const [state, setState] = useState(() => readAll()[slug] || {
        likes: seed?.likes ?? 0,
        dislikes: seed?.dislikes ?? 0,
        vote: null, // 'like' | 'dislike' | null
        comments: seed?.comments ?? []
    });
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [text, setText] = useState("");

    const commit = (next) => {
        setState(next);
        save(slug, next);
    };

    const handleVote = (type) => {
        if (state.vote === type) return;
        const next = { ...state, vote: type };
        if (type === "like") {
            next.likes = state.likes + 1;
            if (state.vote === "dislike") next.dislikes = Math.max(0, state.dislikes - 1);
        } else {
            next.dislikes = state.dislikes + 1;
            if (state.vote === "like") next.likes = Math.max(0, state.likes - 1);
        }
        commit(next);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !text.trim()) return;
        const date = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        commit({ ...state, comments: [{ name: name.trim(), text: text.trim(), date }, ...state.comments] });
        setName("");
        setEmail("");
        setText("");
        setShowForm(false);
    };

    return (
        <div className="pt-6 border-t border-gray-200 dark:border-fkcGold/20 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => handleVote("like")}
                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition border cursor-pointer ${state.vote === "like" ? "bg-fkcDarkGold dark:bg-fkcGold text-white dark:text-fkcBlack border-fkcDarkGold" : "bg-gray-100 dark:bg-fkcGold/10 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-fkcGold/20 hover:border-fkcGold"}`}
                    >
                        <ThumbsUp size={15} /> <span>{state.likes}</span>
                    </button>
                    <button
                        onClick={() => handleVote("dislike")}
                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition border cursor-pointer ${state.vote === "dislike" ? "bg-red-600 text-white border-red-600" : "bg-gray-100 dark:bg-fkcGold/10 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-fkcGold/20 hover:border-red-500"}`}
                    >
                        <ThumbsDown size={15} /> <span>{state.dislikes}</span>
                    </button>
                </div>
                <button
                    onClick={() => setShowForm(prev => !prev)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-fkcDarkGold dark:bg-fkcGold text-white dark:text-fkcBlack font-bold text-xs uppercase tracking-wider transition hover:opacity-90 shadow cursor-pointer"
                >
                    <MessageSquare size={15} /> {showForm ? "Cancel Comment" : "Leave a Comment"}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-fkcGold/30 rounded-2xl p-6 space-y-4 shadow-lg">
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white">Leave your feedback or comment</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Enter your name"
                                className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-fkcGold/30 text-gray-900 dark:text-white focus:outline-none focus:border-fkcGold"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Your Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-fkcGold/30 text-gray-900 dark:text-white focus:outline-none focus:border-fkcGold"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Comment</label>
                        <textarea
                            required
                            rows={3}
                            value={text}
                            onChange={e => setText(e.target.value)}
                            placeholder="Write your thoughts here..."
                            className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-fkcGold/30 text-gray-900 dark:text-white focus:outline-none focus:border-fkcGold"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-fkcDarkGold dark:bg-fkcGold text-white dark:text-fkcBlack font-bold text-xs uppercase tracking-wider transition hover:opacity-90 flex items-center gap-2 cursor-pointer shadow"
                    >
                        <Send size={14} /> Submit Comment
                    </button>
                </form>
            )}

            {state.comments.length > 0 && (
                <div className="space-y-4 pt-4">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Comments ({state.comments.length})</h4>
                    <div className="space-y-3">
                        {state.comments.map((c, idx) => (
                            <div key={idx} className="bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-fkcGold/20 rounded-xl p-4 space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="font-bold text-gray-900 dark:text-white">{c.name}</span>
                                    <span className="text-gray-400 text-[10px]">{c.date}</span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-300">{c.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}