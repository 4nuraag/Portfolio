'use client';

import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const SplineCard = dynamic(() => import('./SplineCard'), { ssr: false });


const tags = [
    "Illustration",
    "Logo Design",
    "Vector Art",
    "Branding",
    "3D Design",
    "Mixed Media",
    "Generative AI Art",
    "Typography",
    "Flyers & Posters"
];

export default function GraphicsSection() {
    return (
        <section id="graphics-section" className="w-full bg-background text-foreground pt-8 pb-12 md:pb-20 px-6 md:px-16 flex items-center justify-center min-h-[80vh]">
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">

                {/* Left Column: Content */}
                <div className="space-y-8 md:space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-7xl font-bold leading-tight">
                            <span className="bg-gradient-to-br from-white via-zinc-200 to-zinc-600 bg-clip-text text-transparent whitespace-normal">
                                Exploring Visual Directions
                            </span>
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-muted-foreground text-base md:text-xl leading-relaxed max-w-xl"
                    >
                        A mix of visual studies and applied design work.
                        <br />
                        Focused on composition, mood, and visual consistency.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap gap-2 md:gap-3"
                    >
                        {tags.map((tag, index) => (
                            <div
                                key={index}
                                className="px-4 py-2 md:px-5 md:py-2.5 rounded-none border border-border bg-muted/50 backdrop-blur-sm text-xs md:text-base text-foreground/80 hover:bg-muted hover:border-border transition-all duration-300 cursor-default"
                            >
                                {tag}
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Right Column: Unique Animation Element (Geometric Orbit) */}
                {/* Right Column: Spline-style Visual Element */}
                <div className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center">
                    <SplineCard />
                </div>
            </div>
        </section>
    );
}
