import React, { useCallback, useEffect, useRef, useState } from "react";
import { ThumbsUp, ThumbsDown, MessageSquare, Send } from "lucide-react";

const API_URL = (import.meta.env.VITE_API_URL || "https://fkclegalbackend.onrender.com").replace(/\/+$/, "");
const POLL_MS = 5000;
const VOTER_KEY = "fkc_voter_id";
const EMPTY = { likes: 0, dislikes: 0, my_vote: null, comments: [] };

function getVoterId() {
    try {
        let id = localStorage.getItem(VOTER_KEY);
        if (!id) {
            id = (window.crypto && window.crypto.randomUUID)
                ? window.crypto.randomUUID()
                : Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
            localStorage.setItem(VOTER_KEY, id);
        }
        return id;
    } catch {
        return Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
    }
}

function timeAgo(iso) {
    const seconds = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
    if (seconds < 45) return "just now";
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.round(minutes / 60);
    if (hours < 24) return `${hours} hr ago`;
    return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function errorText(data, fallback) {
    if (!data || typeof data !== "object") return fallback;
    if (typeof data.error === "string") return data.error;
    if (typeof data.detail === "string") return data.detail;
    const first = Object.values(data).flat()[0];
    return typeof first === "string" ? first : fallback;
}

export default function ArticleEngagement({ slug }) {
    const voterId = useRef(getVoterId()).current;
    const [data, setData] = useState(EMPTY);
    const [loaded, setLoaded] = useState(false);
    const [live, setLive] = useState(true);
    const [voting, setVoting] = useState(false);
    const [voteError, setVoteError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [posting, setPosting] = useState(false);
    const [formError, setFormError] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [text, setText] = useState("");
    const [website, setWebsite] = useState("");
    const [, setTick] = useState(0);

    const changes = useRef(0);
    const inFlight = useRef(false);
    const timer = useRef(null);

    const load = useCallback(async () => {
        if (inFlight.current) return;
        inFlight.current = true;
        const startedAt = changes.current;
        try {
            const res = await fetch(`${API_URL}/api/blog/${slug}/engagement/?voter=${voterId}`, { cache: "no-store" });
            if (!res.ok) throw new Error("bad status");
            const next = await res.json();
            if (startedAt === changes.current) setData(next);
            setLoaded(true);
            setLive(true);
        } catch {
            setLive(false);
        } finally {
            inFlight.current = false;
        }
    }, [slug, voterId]);

    useEffect(() => {
        let stopped = false;
        const schedule = () => {
            if (stopped) return;
            timer.current = setTimeout(async () => {
                if (!document.hidden) await load();
                schedule();
            }, POLL_MS);
        };
        const onVisible = () => {
            if (!document.hidden) load();
        };
        load();
        schedule();
        document.addEventListener("visibilitychange", onVisible);
        window.addEventListener("online", onVisible);
        const clock = setInterval(() => setTick((t) => t + 1), 30000);
        return () => {
            stopped = true;
            clearTimeout(timer.current);
            clearInterval(clock);
            document.removeEventListener("visibilitychange", onVisible);
            window.removeEventListener("online", onVisible);
        };
    }, [load]);

    const handleVote = async (type) => {
        if (voting) return;
        const next = data.my_vote === type ? "none" : type;
        const previous = data;
        const optimistic = { ...data, my_vote: next === "none" ? null : next };
        if (previous.my_vote === "like") optimistic.likes = Math.max(0, previous.likes - 1);
        if (previous.my_vote === "dislike") optimistic.dislikes = Math.max(0, previous.dislikes - 1);
        if (next === "like") optimistic.likes += 1;
        if (next === "dislike") optimistic.dislikes += 1;

        changes.current += 1;
        setData(optimistic);
        setVoting(true);
        setVoteError("");
        try {
            const res = await fetch(`${API_URL}/api/blog/${slug}/vote/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ voter_id: voterId, vote: next })
            });
            const body = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(errorText(body, "Could not save your vote."));
            changes.current += 1;
            setData(body);
            setLive(true);
        } catch (err) {
            changes.current += 1;
            setData(previous);
            setVoteError(err instanceof TypeError ? "Could not reach the server. Please try again." : err.message);
        } finally {
            setVoting(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (posting || !name.trim() || !email.trim() || !text.trim()) return;
        setPosting(true);
        setFormError("");
        try {
            const res = await fetch(`${API_URL}/api/blog/${slug}/comments/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name.trim(), email: email.trim(), text: text.trim(), voter_id: voterId, website })
            });
            const body = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(res.status === 429 ? "You are commenting too quickly. Please try again later." : errorText(body, "Could not post your comment."));
            changes.current += 1;
            if (Array.isArray(body.comments)) setData(body);
            else load();
            setName("");
            setEmail("");
            setText("");
            setShowForm(false);
        } catch (err) {
            setFormError(err instanceof TypeError ? "Could not reach the server. Please try again." : err.message);
        } finally {
            setPosting(false);
        }
    };

    const inputClass = "w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-fkcGold/30 text-gray-900 dark:text-white focus:outline-none focus:border-fkcGold";

    return (
        <div className="pt-6 border-t border-gray-200 dark:border-fkcGold/20 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => handleVote("like")}
                        disabled={voting}
                        aria-pressed={data.my_vote === "like"}
                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition border cursor-pointer disabled:opacity-70 ${data.my_vote === "like" ? "bg-fkcDarkGold dark:bg-fkcGold text-white dark:text-fkcBlack border-fkcDarkGold" : "bg-gray-100 dark:bg-fkcGold/10 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-fkcGold/20 hover:border-fkcGold"}`}
                    >
                        <ThumbsUp size={15} /> <span>{data.likes}</span>
                    </button>
                    <button
                        onClick={() => handleVote("dislike")}
                        disabled={voting}
                        aria-pressed={data.my_vote === "dislike"}
                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition border cursor-pointer disabled:opacity-70 ${data.my_vote === "dislike" ? "bg-red-600 text-white border-red-600" : "bg-gray-100 dark:bg-fkcGold/10 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-fkcGold/20 hover:border-red-500"}`}
                    >
                        <ThumbsDown size={15} /> <span>{data.dislikes}</span>
                    </button>
                    <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400" title={live ? "Updates automatically every few seconds" : "Connection lost, retrying"}>
                        <span className={`inline-block w-2 h-2 rounded-full ${live ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}></span>
                        {live ? "Live" : "Reconnecting"}
                    </span>
                </div>
                <button
                    onClick={() => setShowForm(prev => !prev)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-fkcDarkGold dark:bg-fkcGold text-white dark:text-fkcBlack font-bold text-xs uppercase tracking-wider transition hover:opacity-90 shadow cursor-pointer"
                >
                    <MessageSquare size={15} /> {showForm ? "Cancel Comment" : "Leave a Comment"}
                </button>
            </div>

            {voteError && <p className="text-xs text-red-600 dark:text-red-400">{voteError}</p>}

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-fkcGold/30 rounded-2xl p-6 space-y-4 shadow-lg">
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white">Leave your feedback or comment</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
                            <input type="text" required maxLength={80} value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" className={inputClass} />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Your Email <span className="font-normal text-gray-400">(never shown publicly)</span></label>
                            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" className={inputClass} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Comment</label>
                        <textarea required rows={3} maxLength={1000} value={text} onChange={e => setText(e.target.value)} placeholder="Write your thoughts here..." className={inputClass}></textarea>
                        <div className="text-right text-[10px] text-gray-400 mt-1">{text.length}/1000</div>
                    </div>
                    <input
                        type="text"
                        name="website"
                        value={website}
                        onChange={e => setWebsite(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
                    />
                    {formError && <p className="text-xs text-red-600 dark:text-red-400">{formError}</p>}
                    <button
                        type="submit"
                        disabled={posting}
                        className="px-5 py-2.5 rounded-xl bg-fkcDarkGold dark:bg-fkcGold text-white dark:text-fkcBlack font-bold text-xs uppercase tracking-wider transition hover:opacity-90 flex items-center gap-2 cursor-pointer shadow disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        <Send size={14} /> {posting ? "Posting..." : "Submit Comment"}
                    </button>
                </form>
            )}

            {!loaded && data.comments.length === 0 && (
                <p className="text-xs text-gray-500 dark:text-gray-400">Loading reactions and comments...</p>
            )}

            {data.comments.length > 0 && (
                <div className="space-y-4 pt-4">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Comments ({data.comments.length})</h4>
                    <div className="space-y-3">
                        {data.comments.map((c) => (
                            <div key={c.id} className="bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-fkcGold/20 rounded-xl p-4 space-y-1">
                                <div className="flex items-center justify-between text-xs gap-3">
                                    <span className="font-bold text-gray-900 dark:text-white">{c.name}</span>
                                    <span className="text-gray-400 text-[10px] whitespace-nowrap">{timeAgo(c.created_at)}</span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-300 whitespace-pre-wrap break-words">{c.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}