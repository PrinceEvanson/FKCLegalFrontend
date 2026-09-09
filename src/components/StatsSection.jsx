import React, { useState, useEffect, useRef } from "react";
import { FolderGit2, Landmark, Scale, Gavel } from "lucide-react";

export default function StatsSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [counts, setCounts] = useState([0, 0, 0, 0]);
    const ref = useRef(null);

    const stats = [
        { end: 500, icon: <FolderGit2 size={36} />, label: "Number of Projects" },
        { end: 200, icon: <Landmark size={36} />, label: "Court Cases Solved" },
        { end: 200, icon: <Scale size={36} />, label: "Number of Clients" },
        { end: 10, icon: <Gavel size={36} />, label: "Professional Attorney" }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!isVisible) return;
        setActiveIndex(0);
    }, [isVisible]);

    useEffect(() => {
        if (activeIndex < 0 || activeIndex >= stats.length) return;

        const target = stats[activeIndex].end;
        const duration = 1200;
        let startTime = null;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentVal = Math.floor(progress * target);

            setCounts((prev) => {
                const next = [...prev];
                next[activeIndex] = currentVal;
                return next;
            });

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                setActiveIndex((prev) => prev + 1);
            }
        };

        requestAnimationFrame(step);
    }, [activeIndex]);

    return (
        <div ref={ref} className="relative bg-[#121212] border-y border-fkcGold/20 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="absolute inset-0 opacity-15 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2000&q=80')` }}></div>
            <div className="absolute inset-0 bg-gradient-to-r from-fkcBlack via-fkcBlack/90 to-fkcBlack"></div>

            <div className="relative max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                {stats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-center p-6 space-y-3 border-b sm:border-b-0 sm:border-r border-fkcGold/20 last:border-r-0">
                        <div className="text-fkcGold mb-1">
                            {stat.icon}
                        </div>
                        <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                            {counts[idx]}
                        </span>
                        <span className="text-xs uppercase font-bold tracking-wider text-gray-400">{stat.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}