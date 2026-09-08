import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const goldIcon = L.divIcon({
    className: "custom-gold-marker",
    html: `<div style="background-color: #d4af37; width: 18px; height: 18px; border-radius: 50%; border: 2px solid #000; box-shadow: 0 0 12px #d4af37;"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
});

function MapViewController({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom, { animate: true });
    }, [center, zoom, map]);
    return null;
}

export default function OfficesReachStrip() {
    const slides = [
        {
            title: "Kenya",
            subtitle: "Kenyan Offices",
            content: "Nairobi (Kilimani, Westlands, Karen, Spring Valley) • Malindi • Dubai Liaison Office (coming soon).",
            coords: [1.2921, 36.8219],
            zoom: 5,
        },
        {
            title: "South Africa",
            subtitle: "Collaboration Office",
            content: "Strategic legal and corporate collaboration hub providing regional support.",
            coords: [-30.5595, 22.9375],
            zoom: 4,
        },
        {
            title: "Nigeria",
            subtitle: "Collaboration Office",
            content: "Partner network facilitating West African corporate advisory and regulatory services.",
            coords: [9.082, 8.6753],
            zoom: 5,
        },
        {
            title: "DRC Congo",
            subtitle: "Collaboration Office",
            content: "On-the-ground support for natural resources, mining, and corporate legal needs.",
            coords: [-4.0383, 21.7587],
            zoom: 4,
        },
        {
            title: "Angola",
            subtitle: "Collaboration Office",
            content: "Cross-border legal advisory and regulatory navigation.",
            coords: [-11.2027, 17.8739],
            zoom: 5,
        },
        {
            title: "Tanzania",
            subtitle: "Collaboration Office",
            content: "Comprehensive services covering Mainland & Zanzibar commercial operations.",
            coords: [-6.369, 34.8888],
            zoom: 5,
        },
        {
            title: "Zambia",
            subtitle: "Collaboration Office",
            content: "Corporate compliance, commercial transactions, and advisory networks.",
            coords: [-13.1339, 27.8493],
            zoom: 5,
        },
        {
            title: "Uganda",
            subtitle: "Collaboration Office",
            content: "East African community legal framework and dispute resolution support.",
            coords: [1.3733, 32.2903],
            zoom: 6,
        },
        {
            title: "Ethiopia",
            subtitle: "Collaboration Office",
            content: "Investment advisory and regulatory compliance support in Addis Ababa and beyond.",
            coords: [9.145, 40.4897],
            zoom: 5,
        },
        {
            title: "Ghana",
            subtitle: "Collaboration Office",
            content: "West African trade, investment, and corporate legal assistance.",
            coords: [7.9465, -1.0232],
            zoom: 6,
        },
        {
            title: "South Sudan",
            subtitle: "Collaboration Office",
            content: "Emerging market advisory, infrastructure, and energy legal support.",
            coords: [6.877, 31.307],
            zoom: 5,
        },
        {
            title: "Somalia",
            subtitle: "Collaboration Office",
            content: "Institutional capacity building and commercial legal advisory.",
            coords: [5.1521, 46.1996],
            zoom: 5,
        },
        {
            title: "Turkey",
            subtitle: "International Collaboration",
            content: "Bridging Middle East, Eurasian, and African commercial corridors.",
            coords: [38.9637, 35.2433],
            zoom: 5,
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

    const activeSlide = slides[currentIndex];

    return (
        <section className="bg-fkcBlack py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto bg-gradient-to-br from-[#121212] via-[#161616] to-[#1a1a1a] border border-fkcGold/20 rounded-3xl p-6 sm:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                <div className="lg:col-span-5 space-y-8 flex flex-col justify-between h-full">
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs uppercase tracking-[0.2em] text-fkcGold font-semibold">Offices & Reach Strip</span>
                            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400 bg-black/40 px-3 py-1 rounded-full border border-fkcGold/10">
                                <span className="text-fkcGold">{currentIndex + 1}</span> / <span>{slides.length}</span>
                            </div>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Our Regional Presence & Network</h2>
                    </div>

                    <div className="bg-black/40 border border-fkcGold/20 rounded-2xl p-6 sm:p-8 space-y-4 min-h-[180px] flex flex-col justify-center backdrop-blur-sm relative overflow-hidden shadow-inner">
                        <div className="absolute top-0 left-0 w-1 h-full bg-fkcGold"></div>
                        <div>
                            <span className="inline-block px-3 py-1 rounded-full bg-fkcGold/10 text-fkcGold text-xs font-semibold tracking-wide uppercase mb-3 border border-fkcGold/20">
                                {activeSlide.subtitle}
                            </span>
                            <h3 className="text-2xl font-bold text-white tracking-tight">{activeSlide.title}</h3>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            {activeSlide.content}
                        </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <div className="flex gap-1.5 overflow-x-auto max-w-[240px] sm:max-w-xs py-1 scrollbar-none">
                            {slides.map((s, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === idx ? "w-8 bg-fkcGold shadow-[0_0_8px_rgba(212,175,55,0.5)]" : "w-1.5 bg-gray-800 hover:bg-gray-600"}`}
                                    aria-label={s.title}
                                />
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={prevSlide}
                                className="p-2.5 rounded-xl bg-black/60 border border-fkcGold/30 text-fkcGold hover:bg-fkcGold hover:text-fkcBlack transition-all shadow-sm"
                                aria-label="Previous Slide"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="p-2.5 rounded-xl bg-black/60 border border-fkcGold/30 text-fkcGold hover:bg-fkcGold hover:text-fkcBlack transition-all shadow-sm"
                                aria-label="Next Slide"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-7 relative flex justify-center items-center bg-[#0a0a0a] border border-fkcGold/20 rounded-2xl overflow-hidden h-[460px] shadow-2xl">
                    <div className="w-full h-full z-10 [&_.leaflet-layer]:invert [&_.leaflet-layer]:hue-rotate-180 [&_.leaflet-layer]:brightness-95 [&_.leaflet-layer]:contrast-125">
                        <MapContainer
                            center={activeSlide.coords}
                            zoom={activeSlide.zoom}
                            scrollWheelZoom={false}
                            dragging={true}
                            zoomControl={false}
                            attributionControl={false}
                            className="w-full h-full"
                        >
                            <MapViewController center={activeSlide.coords} zoom={activeSlide.zoom} />

                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                maxZoom={19}
                            />

                            {slides.map((slide, idx) => (
                                <Marker
                                    key={idx}
                                    position={slide.coords}
                                    icon={goldIcon}
                                    eventHandlers={{
                                        click: () => setCurrentIndex(idx),
                                    }}
                                />
                            ))}
                        </MapContainer>
                    </div>

                    <div className="absolute bottom-4 left-4 z-20 bg-black/80 border border-fkcGold/30 px-3.5 py-2 rounded-xl text-xs text-gray-300 backdrop-blur-md flex items-center gap-2.5 shadow-lg pointer-events-none">
                        <span className="w-2.5 h-2.5 rounded-full bg-fkcGold animate-pulse"></span>
                        <span>Displayed Region: <strong className="text-fkcGold font-semibold">{activeSlide.title}</strong></span>
                    </div>
                </div>

            </div>
        </section>
    );
}