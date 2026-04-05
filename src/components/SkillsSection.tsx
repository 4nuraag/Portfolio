'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import {
    staggerContainer,
    revealUp,
    revealFade,
    revealScale,
    useScrollReveal,
} from '@/lib/animations';

// next/dynamic with ssr: false is the only reliable way to use R3F in Next.js.
// React.lazy doesn't prevent Next.js from evaluating the module during static export,
// which causes Html (from drei) to crash on document access.
const SkillsGlobeScene = dynamic(() => import('./SkillsGlobeScene'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center w-full h-full">
            <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-32 h-32 rounded-full border border-foreground/10"
            />
        </div>
    ),
});

export default function SkillsSection() {
    const { theme } = useTheme();
    const effectiveTheme = theme === 'light' ? 'light' : 'dark';

    const [isMobile, setIsMobile] = useState(false);

    const { ref: sectionRef, isInView: sectionVisible } = useScrollReveal({
        amount: 0.1,
        margin: "0px 0px -100px 0px",
    });

    const { ref: globeRef, isInView: globeVisible } = useScrollReveal({
        amount: 0.05,
        once: true,
    });

    // Only mount the heavy Canvas after it scrolls into view
    const [canvasMounted, setCanvasMounted] = useState(false);
    useEffect(() => {
        if (globeVisible && !canvasMounted) {
            const timer = setTimeout(() => setCanvasMounted(true), 300);
            return () => clearTimeout(timer);
        }
    }, [globeVisible, canvasMounted]);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section
            id="skills-section"
            className="w-full min-h-[80vh] text-foreground py-16 md:py-24 px-6 md:px-16 flex items-center justify-center overflow-hidden relative"
        >
            {/* Top Fade Gradient for seamless transition */}
            <div className="absolute top-0 left-0 w-full h-24 md:h-32 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />

            <div
                ref={sectionRef}
                className="max-w-7xl w-full flex flex-col items-center justify-center gap-12 md:gap-16"
            >
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={sectionVisible ? "visible" : "hidden"}
                    className="z-10 text-center space-y-6 md:space-y-8 mt-8"
                >
                    <motion.div variants={revealUp}>
                        <h2 className="text-4xl md:text-7xl font-bold leading-tight">
                            <span className="text-foreground whitespace-nowrap">
                                Skills
                            </span>
                        </h2>
                    </motion.div>

                    <motion.div
                        variants={revealFade}
                        className="flex justify-center"
                    >
                        <div className="w-12 h-[1px] bg-primary/60" />
                    </motion.div>

                    <motion.p
                        variants={revealUp}
                        className="text-muted-foreground text-sm md:text-lg leading-relaxed max-w-xl mx-auto text-center md:whitespace-nowrap"
                    >
                        Bridging the gap between creative design and technical implementation.
                    </motion.p>
                </motion.div>

                <motion.div
                    ref={globeRef}
                    variants={revealScale}
                    initial="hidden"
                    animate={sectionVisible ? "visible" : "hidden"}
                    className="relative h-[500px] md:h-[600px] w-full max-w-[800px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-visible z-0"
                >
                    {canvasMounted ? (
                        <SkillsGlobeScene theme={effectiveTheme} isMobile={isMobile} />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full">
                            <motion.div
                                animate={{
                                    opacity: [0.15, 0.3, 0.15],
                                    scale: [0.95, 1, 0.95],
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="w-48 h-48 md:w-64 md:h-64 rounded-full border border-foreground/10"
                            />
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
