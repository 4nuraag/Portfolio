'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import {
    staggerContainer,
    revealUp,
    revealFade,
    revealScale,
    useScrollReveal,
} from '@/lib/animations';

const SkillsGlobeScene = dynamic(() => import('./SkillsGlobeScene'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center w-full h-full">
            <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-32 h-32 border border-primary/10"
            />
        </div>
    ),
});

export default function SkillsSection() {
    const [isMobile, setIsMobile] = useState(false);

    const { ref: sectionRef, isInView: sectionVisible } = useScrollReveal({
        amount: 0.1,
        margin: "0px 0px -100px 0px",
    });

    const { ref: globeRef } = useScrollReveal({
        amount: 0.05,
        once: true,
    });

    const [canvasMounted, setCanvasMounted] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setCanvasMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section
            id="skills-section"
            className="w-full min-h-[80vh] text-foreground py-16 md:py-24 px-4 md:px-16 flex items-center justify-center overflow-hidden relative"
        >
            <div
                ref={sectionRef}
                className="max-w-7xl w-full flex flex-col items-center justify-center gap-12 md:gap-16"
            >
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={sectionVisible ? "visible" : "hidden"}
                    className="z-10 text-center space-y-6 md:space-y-8"
                >
                    <motion.div variants={revealUp}>
                        <h2
                            className="text-3xl md:text-5xl lg:text-6xl font-bold leading-none tracking-tight"
                            style={{ fontFamily: "'Google Sans', system-ui, sans-serif" }}
                        >
                            Skills
                        </h2>
                    </motion.div>

                    <motion.div
                        variants={revealFade}
                        className="flex justify-center"
                    >
                        <div className="w-16 h-[2px] bg-primary/40" />
                    </motion.div>

                    <motion.p
                        variants={revealUp}
                        className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.1em] md:tracking-[0.2em] text-muted-foreground font-medium text-center mt-2"
                        style={{ fontFamily: "'Google Sans', system-ui, sans-serif" }}
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
                        <SkillsGlobeScene theme="dark" isMobile={isMobile} />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full">
                            <motion.div
                                animate={{
                                    opacity: [0.15, 0.3, 0.15],
                                    scale: [0.95, 1, 0.95],
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="w-48 h-48 md:w-64 md:h-64 border border-primary/10"
                            />
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
