'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Loader from './Loader';

export default function ScrollExperience() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    // Real preloading logic
    useEffect(() => {
        const assetsToPreload = [
            '/images/haircut.webp',
            '/images/beard.webp',
            '/images/final-poster.webp',
        ];

        let loadedCount = 0;

        const preloadImage = (src: string) => {
            return new Promise((resolve, reject) => {
                const img = new window.Image();
                img.src = src;
                img.onload = () => resolve(src);
                img.onerror = () => resolve(src); // Resolve anyway to not block app
            });
        };

        const loadAllAssets = async () => {
            // Start with a small progress to show activity
            setProgress(10);

            const total = assetsToPreload.length;

            // Preload images in parallel but track progress
            const promises = assetsToPreload.map(async (src) => {
                await preloadImage(src);
                loadedCount++;
                setProgress(10 + Math.floor((loadedCount / total) * 90));
            });

            await Promise.all(promises);

            // Ensure we hit 100% and then hide
            setProgress(100);
            setTimeout(() => setIsLoading(false), 500);
        };

        loadAllAssets();
    }, []);

    return (
        <>
            {isLoading && <Loader progress={progress} />}

            {/* Permanent Header / CTA */}
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? -20 : 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center px-6 md:px-12 py-6 pointer-events-none mix-blend-difference"
            >
                <div
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-white font-bold text-xl tracking-widest cursor-pointer pointer-events-auto"
                >
                    ELECTI
                </div>

                <a
                    href="https://n1313179.alteg.io"
                    target="_blank"
                    rel="noreferrer"
                    className="pointer-events-auto group relative px-6 py-2 overflow-hidden rounded-full"
                >
                    <span className="relative z-10 text-white text-xs font-bold tracking-[0.2em] uppercase group-hover:text-black transition-colors duration-300">
                        Book Now
                    </span>
                    <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
            </motion.nav>

            <div className="snap-container">
                {/* SECTION 1: HERO */}
                <section className="snap-section relative bg-[#050505]">
                    <SectionOne />
                </section>

                {/* SECTION 2: HAIRCUT */}
                <section className="snap-section relative bg-[#050505]">
                    <SectionTwo />
                </section>

                {/* SECTION 3: BEARD */}
                <section className="snap-section relative bg-[#050505]">
                    <SectionThree />
                </section>

                {/* SECTION 4: FINAL CTA */}
                <section className="snap-section relative bg-[#050505]">
                    <SectionFour />
                </section>
            </div>
        </>
    );
}

// --- Sub Components for cleaner logic ---

function SectionOne() {
    return (
        <div className="relative w-full h-[100dvh] flex items-center justify-center">
            {/* Video Background */}
            <div className="absolute inset-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="/images/hero-poster.jpg"
                    className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.6]"
                >
                    <source src="/images/hero.mp4" type="video/mp4" />
                </video>
                {/* Gradient Overlay for seamless blend */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#050505]" />
                {/* Corner overlay to hide watermark */}
                <div className="absolute bottom-0 right-0 w-40 h-20 bg-gradient-to-tl from-[#050505] via-[#050505]/80 to-transparent" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative flex flex-col items-center justify-center text-center z-10 px-6 pb-20 md:pb-0"
            >
                <h1 className="text-[10vw] md:text-9xl font-bold tracking-tighter text-white leading-[0.9]">
                    ELECTI
                </h1>
                <div className="flex flex-col items-center mt-8 space-y-4">
                    <p className="text-xl md:text-2xl tracking-wide text-white/90 font-light italic">
                        Not just a haircut. An experience.
                    </p>
                    <p className="text-sm md:text-base tracking-[0.3em] text-white/50 font-light uppercase">
                        Tbilisi, Georgia
                    </p>

                    {/* Quick Access Icons */}
                    <div className="flex items-center gap-6 mt-4 pointer-events-auto">
                        <a
                            href="tel:+995571705705"
                            className="text-white/40 hover:text-amber-400 transition-colors duration-300"
                            title="Call us"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                        </a>
                        <a
                            href="https://maps.app.goo.gl/6HNJDGAamjQK5icb9"
                            target="_blank"
                            rel="noreferrer"
                            className="text-white/40 hover:text-amber-400 transition-colors duration-300"
                            title="Get directions"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                        </a>
                        <a
                            href="https://www.instagram.com/elect1tbilisi/"
                            target="_blank"
                            rel="noreferrer"
                            className="text-white/40 hover:text-amber-400 transition-colors duration-300"
                            title="Instagram"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                        </a>
                    </div>
                </div>

            </motion.div>

            {/* Scroll Indicator - Moved outside of content div to stick to bottom of viewport */}
            <motion.div
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 8, 0] }}
                transition={{
                    opacity: { duration: 1, delay: 1 },
                    y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                }}
            >
                <span className="text-white/40 text-xs tracking-[0.3em] uppercase">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent" />
            </motion.div>
        </div>
    );
}

function SectionTwo() {
    return (
        <div className="relative w-full h-[100dvh] flex items-center justify-center px-6 md:px-24 bg-[#050505]">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row items-center justify-center w-full max-w-7xl gap-8 md:gap-16 pb-32 md:pb-0"
            >
                {/* Image - Static with GPU forcing for persistent rendering */}
                <div className="relative w-full md:w-1/2 h-[40vh] md:h-auto aspect-[3/4] max-w-[450px] rounded-lg overflow-hidden transform-gpu will-change-transform backface-hidden">
                    <Image
                        src="/images/haircut.webp"
                        alt="Professional Haircut"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                    {/* Subtle overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.05 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full md:w-1/2 flex flex-col justify-center items-start text-left"
                >
                    <div className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-amber-400/80 mb-2 md:mb-4 border-l-2 border-amber-400/50 pl-4 uppercase">
                        Our Craft
                    </div>
                    <h2 className="text-3xl md:text-6xl font-medium text-white mb-2 md:mb-6 leading-tight">
                        Precision Haircut
                    </h2>
                    <p className="text-sm md:text-lg text-white/60 leading-relaxed max-w-md font-light">
                        Every cut is tailored to your unique style. Our master barbers combine classic techniques with modern trends to create your perfect look.
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}

function SectionThree() {
    return (
        <div className="relative w-full h-[100dvh] flex items-center justify-center px-6 md:px-24 bg-[#050505]">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col-reverse md:flex-row items-center justify-center w-full max-w-7xl gap-4 md:gap-16 pb-20 md:pb-0"
            >
                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.05 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full md:w-1/2 flex flex-col justify-center items-end text-right"
                >
                    <div className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-amber-400/80 mb-2 md:mb-4 border-r-2 border-amber-400/50 pr-4 uppercase">
                        The Art of Detail
                    </div>
                    <h2 className="text-3xl md:text-6xl font-medium text-white mb-2 md:mb-6 leading-tight">
                        Beard Grooming
                    </h2>
                    <p className="text-sm md:text-lg text-white/60 leading-relaxed max-w-md font-light">
                        Sharp lines, perfect shape. We sculpt your beard to complement your features, creating a distinguished look that commands attention.
                    </p>
                </motion.div>

                {/* Image - Static with GPU forcing for persistent rendering */}
                <div className="relative w-full md:w-1/2 h-[40vh] md:h-auto aspect-[3/4] max-w-[450px] rounded-lg overflow-hidden transform-gpu will-change-transform backface-hidden">
                    <Image
                        src="/images/beard.webp"
                        alt="Professional Beard Grooming"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                    {/* Subtle overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
            </motion.div>
        </div>
    );
}

function SectionFour() {
    return (
        <div className="relative w-full h-[100dvh] flex flex-col items-center justify-center px-6 text-center">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="/images/final-poster.webp"
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
                >
                    <source src="/images/final.mp4" type="video/mp4" />
                </video>
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/50" />
                {/* Corner overlay to hide watermark */}
                <div className="absolute bottom-0 right-0 w-40 h-20 bg-gradient-to-tl from-black via-black/80 to-transparent" />
            </div>

            {/* Ambient glow behind logo */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-[400px] h-[400px] bg-gradient-radial from-amber-500/20 via-amber-500/5 to-transparent blur-[100px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5 }}
                className="relative w-32 h-32 md:w-64 md:h-64 mb-4 md:mb-8 z-20"
            >
                <Image
                    src="/images/logo.webp"
                    alt="Electi Logo"
                    fill
                    className="object-contain drop-shadow-[0_0_40px_rgba(217,168,92,0.3)]"
                    sizes="(max-width: 768px) 50vw, 33vw"
                />
            </motion.div>

            {/* Social Proof - Static for instant visibility */}
            <div className="flex items-center gap-3 mb-4 md:mb-6 z-20">
                <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-xs font-bold text-black">★</div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-xs font-bold text-black">★</div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-xs font-bold text-black">★</div>
                </div>
                <p className="text-white/60 text-sm">Trusted by <span className="text-amber-400 font-semibold">500+</span> gentlemen</p>
            </div>

            <div className="z-20">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-3 tracking-tight leading-tight">
                    Experience the Difference
                </h2>
                <p className="text-white/60 text-sm md:text-lg mb-4 max-w-md leading-relaxed mx-auto px-4">
                    Let yourself feel what it&apos;s like to be in the hands of true professionals.
                </p>
                <p className="text-white/40 text-xs md:text-sm mb-6 md:mb-8 tracking-widest uppercase">
                    Korneli Kekelidze St, 8 • Tbilisi
                </p>
            </div>

            {/* Primary CTA with glow effect - Static for instant visibility */}
            <div className="flex flex-col md:flex-row gap-4 items-center mb-4 z-20 w-full max-w-sm md:max-w-none px-4">
                <a
                    href="https://n1313179.alteg.io"
                    target="_blank"
                    rel="noreferrer"
                    className="group relative w-full md:w-auto px-12 py-4 md:py-5 bg-white text-[#050505] text-sm md:text-base font-bold tracking-[0.2em] uppercase rounded-sm overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
                >
                    <span className="relative z-10">Book Appointment</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </a>
                <a
                    href="tel:+995571705705"
                    className="group w-full md:w-auto px-12 py-4 md:py-5 border border-white/20 text-white text-sm md:text-base font-bold tracking-[0.2em] uppercase rounded-sm transition-all duration-300 hover:border-white/60 hover:bg-white/5"
                >
                    +995 571 705 705
                </a>
            </div>

            {/* Time clarity */}
            <p className="text-white/30 text-xs tracking-wide mb-8 z-20">
                Book in 30 seconds • No account needed
            </p>

            {/* Footer links */}
            <div className="pointer-events-auto flex gap-8 items-center z-20">
                <a
                    href="https://www.instagram.com/elect1tbilisi/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white/40 hover:text-amber-400 transition-colors duration-300 text-sm tracking-[0.2em] uppercase"
                >
                    Instagram
                </a>
                <span className="text-white/20">•</span>
                <a
                    href="https://maps.app.goo.gl/6HNJDGAamjQK5icb9"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white/40 hover:text-amber-400 transition-colors duration-300 text-sm tracking-[0.2em] uppercase"
                >
                    Get Directions
                </a>
            </div>
        </div>
    );
}
