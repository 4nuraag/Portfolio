'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

// =============================================
// LAZY WEBGL COMPONENTS
// Only mount after first paint to avoid blocking initial render
// =============================================
const GridDistortion = React.lazy(() => import('./GridDistortion'));
const LiquidEther = React.lazy(() => import('./LiquidEther'));

// Premium easing curve — matches NINTH° feel
const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;
const EXPO_OUT = [0.19, 1, 0.22, 1] as const;

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(contentRef, { once: true });
    const [webglReady, setWebglReady] = useState(false);

    // Delay WebGL mount until after first meaningful paint
    useEffect(() => {
        const schedule =
            (window as any).requestIdleCallback ||
            ((cb: () => void) => setTimeout(cb, 100));
        const id = schedule(() => setWebglReady(true));
        return () => {
            const cancel = (window as any).cancelIdleCallback || clearTimeout;
            cancel(id);
        };
    }, []);

    // =============================================
    // SCROLL-DRIVEN PARALLAX SYSTEM
    // Different layers move at different speeds
    // creating perceived depth without 3D overhead
    // =============================================
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Smooth spring on scroll progress — removes jitter
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // Background layer: moves SLOWER than scroll (parallax depth)
    const bgY = useTransform(smoothProgress, [0, 1], ['0%', '30%']);
    const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.15]);

    // Content layer: moves FASTER for separation
    const contentY = useTransform(smoothProgress, [0, 1], ['0%', '-20%']);
    const contentOpacity = useTransform(smoothProgress, [0, 0.6], [1, 0]);

    // Portfolio label: subtle independent parallax
    const labelY = useTransform(smoothProgress, [0, 1], ['0%', '-40%']);
    const labelOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);

    // Fade overlay (cheaper than fading the WebGL layers)
    const overlayOpacity = useTransform(smoothProgress, [0, 0.8], [0, 1]);

    // =============================================
    // STAGGERED REVEAL ANIMATIONS
    // Elements arrive in choreographed sequence
    // like a film title card — NINTH° signature move
    // =============================================
    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
            },
        },
    };

    const staggerChild = {
        hidden: {
            opacity: 0,
            y: 60,
            filter: 'blur(10px)',
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 1.2,
                ease: PREMIUM_EASE,
            },
        },
    };

    const labelReveal = {
        hidden: {
            opacity: 0,
            x: -30,
            filter: 'blur(8px)',
        },
        visible: {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 1.0,
                ease: EXPO_OUT,
                delay: 0.1,
            },
        },
    };

    return (
        <section id="hero" ref={containerRef} className="relative h-[150vh] w-full">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* =========================================
                    BACKGROUND LAYER — Parallax depth
                    Moves at 0.3x scroll speed
                    ========================================= */}
                <motion.div
                    style={{ y: bgY, scale: bgScale }}
                    className="absolute inset-0 w-full h-full will-change-transform"
                >
                    {/* WebGL layers — lazy loaded after first paint */}
                    {webglReady ? (
                        <Suspense fallback={
                            <div className="absolute inset-0 bg-background" />
                        }>
                            {/* 1. Grid Distortion (Base Image) */}
                            <GridDistortion
                                imageSrc="./hero-bg.png"
                                grid={10}
                                mouse={0}
                                strength={0}
                                relaxation={0.9}
                                yOffset={-0.15}
                                className="w-full h-full object-cover"
                            />

                            {/* 2. Liquid Ether Effect Overlay */}
                            <div className="absolute inset-0 z-10 opacity-60 mix-blend-screen pointer-events-none will-change-transform">
                                <LiquidEther
                                    colors={['#FFFFFF', '#45A6FF', '#E3F2FD']}
                                    mouseForce={20}
                                    cursorSize={100}
                                    isViscous={false}
                                    viscous={30}
                                    iterationsViscous={32}
                                    iterationsPoisson={32}
                                    resolution={0.5}
                                    dt={0.005}
                                    isBounce={false}
                                    autoDemo={true}
                                    autoSpeed={0.5}
                                    autoIntensity={2.2}
                                    takeoverDuration={0.25}
                                    autoResumeDelay={3000}
                                    autoRampDuration={0.6}
                                    className="w-full h-full pointer-events-auto"
                                />
                            </div>
                        </Suspense>
                    ) : (
                        /* Placeholder while WebGL loads */
                        <div className="absolute inset-0 bg-background" />
                    )}

                    {/* 3. Bottom Gradient Blend — extended for smoother transition */}
                    <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />

                    {/* 4. Scroll Fade Overlay */}
                    <motion.div
                        style={{ opacity: overlayOpacity }}
                        className="absolute inset-0 bg-background z-20 pointer-events-none will-change-opacity"
                    />
                </motion.div>

                {/* =========================================
                    CONTENT LAYER — Moves at 1.2x scroll speed
                    Staggered reveal on mount
                    ========================================= */}
                <motion.div
                    style={{ y: contentY, opacity: contentOpacity }}
                    className="relative z-30 h-full w-full pointer-events-none"
                >
                    {/* Top Left: Portfolio Label — independent parallax */}
                    <motion.div
                        style={{ y: labelY, opacity: labelOpacity }}
                        className="absolute top-8 left-8 pointer-events-auto"
                    >
                        <motion.h2
                            variants={labelReveal}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="text-2xl md:text-3xl font-medium text-white/90 tracking-wide"
                        >
                            Portfolio
                        </motion.h2>
                    </motion.div>

                    {/* Bottom Right: Name & Roles — staggered entrance */}
                    <div
                        ref={contentRef}
                        className="absolute bottom-32 md:bottom-16 left-4 right-4 md:left-auto md:right-16 text-right space-y-2 pointer-events-auto"
                    >
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="space-y-3"
                        >
                            {/* Name — arrives first with blur-to-sharp + slide-up */}
                            <motion.div variants={staggerChild}>
                                <h1
                                    className="font-semibold text-white tracking-tight uppercase drop-shadow-lg whitespace-nowrap w-full"
                                    style={{ fontSize: 'clamp(2rem, 4.8vw, 4.5rem)' }}
                                >
                                    ANURAAG VINOD KUMAR
                                </h1>
                            </motion.div>

                            {/* Decorative line — arrives second */}
                            <motion.div
                                variants={staggerChild}
                                className="flex justify-end"
                            >
                                <div className="w-16 md:w-24 h-[1px] bg-white/40" />
                            </motion.div>

                            {/* Typewriter roles — arrives third */}
                            <motion.div
                                variants={staggerChild}
                                className="text-white/80 text-lg md:text-2xl font-light tracking-wider h-8"
                            >
                                <Typewriter
                                    words={['UI UX Designer', 'Creative Technologist', 'Web Application Developer']}
                                    loop={true}
                                    cursor
                                    cursorStyle='|'
                                    typeSpeed={70}
                                    deleteSpeed={50}
                                    delaySpeed={1000}
                                />
                            </motion.div>


                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
