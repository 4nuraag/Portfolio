'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import GridDistortion from './GridDistortion';
import LiquidEther from '@/components/LiquidEther';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Instead of fading the heavy background OUT, we fade a black overlay IN.
    // This is much cheaper for the GPU.
    const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

    return (
        <section id="hero" ref={containerRef} className="relative h-[150vh] w-full">
            <div className="sticky top-0 h-screen w-full overflow-hidden will-change-transform">
                {/* Background Layer */}
                <div className="absolute inset-0 w-full h-full">
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
                            colors={['#FFFFFF', '#45A6FF', '#E3F2FD']} // White, Blue, Light Blue
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

                    {/* 3. Bottom Gradient Blend (Static) */}
                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10" />

                    {/* 4. Scroll Fade Overlay (Cheaper than fading the container) */}
                    <motion.div
                        style={{ opacity: overlayOpacity }}
                        className="absolute inset-0 bg-background z-20 pointer-events-none will-change-opacity"
                    />
                </div>

                {/* Content Layer - Scrolls naturally */}
                <div className="relative z-30 h-full w-full pointer-events-none">
                    {/* Top Left: Portfolio Label */}
                    <div className="absolute top-8 left-8 pointer-events-auto">
                        <h2 className="text-2xl md:text-3xl font-medium text-white/90 tracking-wide">
                            Portfolio
                        </h2>
                    </div>

                    {/* Bottom Right: Name & Roles */}
                    <div className="absolute bottom-32 md:bottom-16 right-8 md:right-16 text-right space-y-2 pointer-events-auto">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <h1 className="text-5xl md:text-7xl font-semibold text-white tracking-tight uppercase drop-shadow-lg">
                                ANURAAG VINOD KUMAR
                            </h1>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
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
                    </div>
                </div>
            </div>
        </section>
    );
}
