'use client';

import { useScroll, useTransform, motion, MotionValue, useMotionValueEvent } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Loader from './Loader';

export default function ScrollExperience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [showStickyCTA, setShowStickyCTA] = useState(false);

    // Fake loading simulation since we are using static images
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setIsLoading(false), 500);
                    return 100;
                }
                return prev + 2; // Speed of loading
            });
        }, 20);
        return () => clearInterval(timer);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Show sticky CTA after scrolling past hero
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setShowStickyCTA(latest > 0.15 && latest < 0.9);
    });

    return (
        <>
            {isLoading && <Loader progress={progress} />}

            {/* Permanent Header / CTA */}
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12"
            >
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-white font-bold tracking-widest text-xl cursor-pointer hover:opacity-80 transition-opacity pointer-events-auto"
                >
                    ELECTI
                </button>

                <a
                    href="https://n1313179.alteg.io"
                    target="_blank"
                    rel="noreferrer"
                    className="group relative text-white text-sm font-medium tracking-[0.2em] uppercase border-b border-white/50 hover:border-white transition-all duration-300"
                >
                    <span className="relative z-10">Book Now</span>
                    <span className="absolute inset-0 bg-white/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
            </motion.nav>

            {/* Sticky CTA - appears after scrolling past hero */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                    opacity: showStickyCTA ? 1 : 0,
                    y: showStickyCTA ? 0 : 20,
                    pointerEvents: showStickyCTA ? 'auto' : 'none'
                }}
                transition={{ duration: 0.3 }}
                className="fixed bottom-8 right-6 md:right-12 z-50"
            >
                <a
                    href="https://n1313179.alteg.io"
                    target="_blank"
                    rel="noreferrer"
                    className="group relative px-6 py-3 bg-white text-[#050505] text-sm font-bold tracking-[0.15em] uppercase rounded-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                >
                    <span className="relative z-10">Book Appointment</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </a>
            </motion.div>

            <div ref={containerRef} className="snap-container">
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

function SectionOne({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    // Range: 0.0 - 0.25
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.3], [1.1, 1.3]); // Slight slow zoom
    const y = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

    // Text adjustments
    const textY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

    return (
        <motion.div style={{ opacity, scale, y }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-full h-full">
                <motion.div style={{ scale, y }} className="relative w-full h-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/images/hero.webp"
                        alt="Electi Interior"
                        className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.6]"
                    />
                </motion.div>
                {/* Gradient Overlay for seamless blend */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#050505]" />
                {/* Corner overlay to hide watermark */}
                <div className="absolute bottom-0 right-0 w-40 h-20 bg-gradient-to-tl from-[#050505] via-[#050505]/80 to-transparent" />
            </div>

            <motion.div style={{ opacity: textOpacity, y: textY }} className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-6">
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
        </motion.div>
    );
}

function SectionTwo({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    // Range: 0.25 - 0.50
    const opacity = useTransform(scrollYProgress, [0.2, 0.3, 0.45, 0.55], [0, 1, 1, 0]);
    const x = useTransform(scrollYProgress, [0.2, 0.35], [50, 0]);
    const textBlur = useTransform(scrollYProgress, [0.2, 0.35], [10, 0]);
    const textOpacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
    const imageScale = useTransform(scrollYProgress, [0.2, 0.4], [0.95, 1.05]);

    return (
        <motion.div style={{ opacity }} className="absolute inset-0 flex items-center justify-center pointer-events-none px-6 md:px-24">
            <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-7xl h-full md:h-auto gap-8 md:gap-16 pb-32 md:pb-0">
                {/* Image */}
                <motion.div style={{ x, scale: imageScale }} className="relative w-full md:w-1/2 aspect-[3/4] max-w-[450px] rounded-lg overflow-hidden">
                    <Image
                        src="/images/haircut.png"
                        alt="Professional Haircut"
                        fill
                        className="object-cover"
                    />
                    {/* Subtle overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </motion.div>

                {/* Text */}
                <motion.div
                    style={{ opacity: textOpacity, filter: useTransform(textBlur, (v) => `blur(${v}px)`) }}
                    className="w-full md:w-1/2 flex flex-col justify-center items-start text-left"
                >
                    <div className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-amber-400/80 mb-2 md:mb-4 border-l-2 border-amber-400/50 pl-4 uppercase">
                        Our Craft
                    </div>
                    <h2 className="text-3xl md:text-6xl font-medium text-white mb-4 md:mb-6 leading-tight">
                        Precision Haircut
                    </h2>
                    <p className="text-sm md:text-lg text-white/60 leading-relaxed max-w-md font-light">
                        Every cut is tailored to your unique style. Our master barbers combine classic techniques with modern trends to create your perfect look.
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
}

function SectionThree({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    // Range: 0.50 - 0.75
    const opacity = useTransform(scrollYProgress, [0.45, 0.55, 0.7, 0.8], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0.45, 0.6], [50, 0]);
    const textOpacity = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);
    const imageScale = useTransform(scrollYProgress, [0.45, 0.65], [0.95, 1.05]);

    return (
        <motion.div style={{ opacity }} className="absolute inset-0 flex items-center justify-center pointer-events-none px-6 md:px-24">
            <div className="flex flex-col-reverse md:flex-row items-center justify-center w-full max-w-7xl h-full md:h-auto gap-8 md:gap-16 pb-32 md:pb-0">
                {/* Text */}
                <motion.div
                    style={{ opacity: textOpacity, y }}
                    className="w-full md:w-1/2 flex flex-col justify-center items-end text-right"
                >
                    <div className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-amber-400/80 mb-2 md:mb-4 border-r-2 border-amber-400/50 pr-4 uppercase">
                        The Art of Detail
                    </div>
                    <h2 className="text-3xl md:text-6xl font-medium text-white mb-4 md:mb-6 leading-tight">
                        Beard Grooming
                    </h2>
                    <p className="text-sm md:text-lg text-white/60 leading-relaxed max-w-md font-light">
                        Sharp lines, perfect shape. We sculpt your beard to complement your features, creating a distinguished look that commands attention.
                    </p>
                </motion.div>

                {/* Image */}
                <motion.div style={{ scale: imageScale }} className="relative w-full md:w-1/2 aspect-[3/4] max-w-[450px] rounded-lg overflow-hidden">
                    <Image
                        src="/images/beard.jpg"
                        alt="Professional Beard Grooming"
                        fill
                        className="object-cover"
                    />
                    {/* Subtle overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </motion.div>
            </div>
        </motion.div>
    );
}

function SectionFour({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    // Range: 0.75 - 1.0
    const opacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);
    const scale = useTransform(scrollYProgress, [0.75, 1], [0.8, 1]);
    const logoRotate = useTransform(scrollYProgress, [0.75, 1], [-5, 0]);

    return (
        <motion.div style={{ opacity }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6 text-center">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
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

            <motion.div style={{ scale, rotate: logoRotate }} className="relative w-44 h-44 md:w-64 md:h-64 mb-8 z-20">
                <Image
                    src="/images/logo.png"
                    alt="Electi Logo"
                    fill
                    className="object-contain drop-shadow-[0_0_40px_rgba(217,168,92,0.3)]"
                />
            </motion.div>

            {/* Social Proof */}
            <div className="flex items-center gap-3 mb-6 z-20">
                <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-xs font-bold text-black">★</div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-xs font-bold text-black">★</div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-xs font-bold text-black">★</div>
                </div>
                <p className="text-white/60 text-sm">Trusted by <span className="text-amber-400 font-semibold">500+</span> gentlemen</p>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight leading-tight z-20">
                Experience the Difference
            </h2>
            <p className="text-white/60 text-base md:text-lg mb-4 max-w-md leading-relaxed z-20">
                Let yourself feel what it&apos;s like to be in the hands of true professionals.
            </p>
            <p className="text-white/40 text-sm mb-8 tracking-widest uppercase z-20">
                Korneli Kekelidze St, 8 • Tbilisi
            </p>

            {/* Primary CTA with glow effect */}
            <div className="pointer-events-auto flex flex-col md:flex-row gap-4 items-center mb-4 z-20">
                <a
                    href="https://n1313179.alteg.io"
                    target="_blank"
                    rel="noreferrer"
                    className="group relative px-12 py-5 bg-white text-[#050505] text-sm md:text-base font-bold tracking-[0.2em] uppercase rounded-sm overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
                >
                    <span className="relative z-10">Book Appointment</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </a>
                <a
                    href="tel:+995571705705"
                    className="group px-12 py-5 border border-white/20 text-white text-sm md:text-base font-bold tracking-[0.2em] uppercase rounded-sm transition-all duration-300 hover:border-white/60 hover:bg-white/5"
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
        </motion.div>
    );
}
