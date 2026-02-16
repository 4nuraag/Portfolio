'use client';

import React from 'react';
import { motion } from 'framer-motion';

const tags = [
    "Figma",
    "Prompt Engineering",
    "Component-based UI",
    "Design Systems",
    "Accessibility",
    "Responsiveness",
    "Dashboard Design",
    "Power BI & Tableau",
    "User-Centric Insights"
];

export default function DesignPhilosophy() {
    return (
        <section id="design-philosophy" className="w-full min-h-screen text-foreground py-16 md:py-24 px-6 md:px-16 flex items-center justify-center overflow-hidden relative">
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
                {/* Left Column: Typography & Tags */}
                <div className="space-y-8 md:space-y-12 z-10 order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-7xl font-bold leading-tight">
                            <span className="text-foreground whitespace-normal md:whitespace-nowrap">
                                Idea to Interface
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
                        A mix of UI, systems, and interaction-focused projects.
                        <br />
                        Designed with an emphasis on logic, accessibility, and real-world use.
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

                {/* Right Column: Venn Diagram */}
                <div className="relative h-[350px] md:h-[500px] w-full flex items-center justify-center order-1 lg:order-2 scale-75 md:scale-100 origin-center">
                    <div className="relative w-[300px] md:w-[400px] h-[300px] md:h-[400px]">
                        {/* Circle 1: UI/UX (Teal - Top Left) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="absolute top-0 left-0 w-48 md:w-64 h-48 md:h-64 rounded-full mix-blend-screen flex items-center justify-center"
                            style={{
                                background: 'radial-gradient(circle, rgba(20,184,166,0.8) 0%, rgba(13,148,136,0.1) 70%, transparent 100%)',
                                boxShadow: '0 0 60px rgba(20,184,166,0.3)'
                            }}
                        >
                            <span className="text-xl md:text-2xl font-bold text-white drop-shadow-lg z-10">UI/UX</span>
                        </motion.div>

                        {/* Circle 2: Data (Purple - Top Right) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 rounded-full mix-blend-screen flex items-center justify-center"
                            style={{
                                background: 'radial-gradient(circle, rgba(168,85,247,0.8) 0%, rgba(147,51,234,0.1) 70%, transparent 100%)',
                                boxShadow: '0 0 60px rgba(168,85,247,0.3)'
                            }}
                        >
                            <span className="text-xl md:text-2xl font-bold text-white drop-shadow-lg z-10">Data</span>
                        </motion.div>

                        {/* Circle 3: Web (Red - Bottom) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            viewport={{ once: true }}
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 md:w-64 h-48 md:h-64 rounded-full mix-blend-screen flex items-center justify-center"
                            style={{
                                background: 'radial-gradient(circle, rgba(220,38,38,0.8) 0%, rgba(185,28,28,0.1) 70%, transparent 100%)',
                                boxShadow: '0 0 60px rgba(220,38,38,0.3)'
                            }}
                        >
                            <span className="text-xl md:text-2xl font-bold text-white drop-shadow-lg z-10">Web</span>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
