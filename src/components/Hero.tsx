'use client';

import React, { useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import DecryptedText from './DecryptedText';

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

const ROLES = ['Creative Technologist', 'UI/UX Designer', 'Web Application Developer'];

function CyclingDecryptedText() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [triggerKey, setTriggerKey] = useState(0);

    const handleAnimationComplete = useCallback(() => {
        // Wait 2.5s after decryption finishes, then switch to next role
        const timeout = setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % ROLES.length);
            setTriggerKey((prev) => prev + 1);
        }, 2500);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <DecryptedText
            key={triggerKey}
            text={ROLES[currentIndex]}
            speed={40}
            maxIterations={15}
            sequential={true}
            revealDirection="start"
            animateOn="view"
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
            className="decrypted-char-revealed"
            encryptedClassName="decrypted-char-encrypted"
            parentClassName="decrypted-text-parent"
            onAnimationComplete={handleAnimationComplete}
        />
    );
}

export default function Hero() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(contentRef, { once: true });

    // Parallax scroll — image moves slower, content moves faster
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 30,
        restDelta: 0.001,
    });

    // Background moves up slowly (parallax)
    // Scale starts at 1.08 so there's bleed room for y movement without exposing edges
    const bgY = useTransform(smoothProgress, [0, 1], ['0%', '8%']);
    const bgScale = useTransform(smoothProgress, [0, 1], [1.08, 1.18]);

    // Content fades and moves up faster
    const contentY = useTransform(smoothProgress, [0, 1], ['0%', '-20%']);
    const contentOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);

    // Overlay darkens as you scroll
    const overlayOpacity = useTransform(smoothProgress, [0, 0.8], [0.3, 0.85]);

    // Stagger container for choreographed entrance
    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.4,
            },
        },
    };

    const fadeUp = {
        hidden: {
            opacity: 0,
            y: 50,
            filter: 'blur(10px)',
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 1.4,
                ease: PREMIUM_EASE,
            },
        },
    };

    const fadeIn = {
        hidden: {
            opacity: 0,
            filter: 'blur(8px)',
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            transition: {
                duration: 1.0,
                ease: PREMIUM_EASE,
                delay: 1.2,
            },
        },
    };

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="relative h-screen w-full overflow-hidden"
        >
            {/* =========================================
                PARALLAX BACKGROUND VIDEO
                ========================================= */}
            <motion.div
                className="absolute inset-0 w-full h-full overflow-hidden"
                style={{ y: bgY, scale: bgScale }}
            >
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: '80% center' }}
                >
                    <source src={process.env.NODE_ENV === 'production' ? '/Portfolio/hero_bg_video.mp4' : '/hero_bg_video.mp4'} type="video/mp4" />
                </video>
            </motion.div>

            {/* =========================================
                DARK GRADIENT OVERLAYS
                — Cinematic vignette + bottom gradient
                ========================================= */}
            {/* Overall dark overlay that deepens on scroll */}
            <motion.div
                className="absolute inset-0 bg-black/30 z-[1]"
                style={{ opacity: overlayOpacity }}
            />

            {/* Dark overlay on top of video for text legibility */}
            <div
                className="absolute inset-0 bg-black/45 z-[1] pointer-events-none"
            />

            {/* Bottom gradient — smooth blend to dark background */}
            <div
                className="absolute bottom-0 left-0 w-full h-[45%] z-[2] pointer-events-none"
                style={{
                    background: 'linear-gradient(to top, #0a0a0a 0%, #0a0a0a 8%, rgba(10,10,10,0.85) 25%, rgba(10,10,10,0.4) 50%, transparent 100%)',
                }}
            />

            {/* Side vignette — cinematic feel */}
            <div
                className="absolute inset-0 z-[2] pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 50%, rgba(10,10,10,0.6) 100%)',
                }}
            />

            {/* =========================================
                CONTENT — Bottom-right editorial layout
                (matching reference image)
                ========================================= */}
            <motion.div
                ref={contentRef}
                className="absolute inset-0 z-10 flex flex-col justify-end px-4 md:px-16 pb-28 md:pb-24"
                style={{ y: contentY, opacity: contentOpacity }}
            >
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="max-w-[1400px] w-full mx-auto flex flex-col items-end"
                >
                    {/* Name — Large editorial headline, right-aligned */}
                    <motion.div variants={fadeUp} className="overflow-hidden">
                        <h1
                            className="hero-title font-bold text-white uppercase leading-[0.9] text-right"
                            style={{
                                fontFamily: "'Google Sans', system-ui, sans-serif",
                                fontSize: 'clamp(3rem, 7vw, 6rem)',
                                letterSpacing: '-0.03em',
                                textShadow: '0 4px 30px rgba(0,0,0,0.5)',
                            }}
                        >
                            <span className="hidden md:inline">ANURAAG VINOD KUMAR</span>
                            <span className="md:hidden">ANURAAG V K</span>
                        </h1>
                    </motion.div>

                    {/* Accent line */}
                    <motion.div variants={fadeUp} className="mt-4 md:mt-5 flex justify-end w-full">
                        <div className="w-16 md:w-24 h-[2px] bg-primary/60" />
                    </motion.div>

                    {/* Cycling DecryptedText roles */}
                    <motion.div
                        variants={fadeUp}
                        className="mt-4 md:mt-5 flex justify-end w-full h-8 md:h-10"
                    >
                        <div
                            className="text-white/70 text-sm md:text-base font-light tracking-[0.2em] uppercase text-right"
                            style={{ fontFamily: "'Google Sans', system-ui, sans-serif" }}
                        >
                            <CyclingDecryptedText />
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* =========================================
                "PORTFOLIO" label — top left
                ========================================= */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 1.0, ease: PREMIUM_EASE, delay: 0.6 }}
                className="absolute top-8 left-4 md:top-12 md:left-16 z-10"
            >
                <span
                    className="text-white font-bold text-xl md:text-2xl tracking-tight"
                    style={{
                        fontFamily: "'Google Sans', system-ui, sans-serif",
                        textShadow: '0 2px 20px rgba(0,0,0,0.4)',
                    }}
                >
                    Portfolio
                </span>
            </motion.div>

            {/* =========================================
                SCROLL INDICATOR — Bouncing arrow
                ========================================= */}
            <motion.div
                variants={fadeIn}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-10"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="flex flex-col items-center gap-2 text-white/40"
                >
                    <span
                        className="text-[9px] uppercase tracking-[0.3em] font-medium"
                        style={{ fontFamily: "'Google Sans', system-ui, sans-serif" }}
                    >
                        Scroll
                    </span>
                    <ChevronDown size={16} strokeWidth={1.5} />
                </motion.div>
            </motion.div>
        </section>
    );
}
