'use client';

import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { MousePointer2, Palette, Layers, Hexagon, Box } from 'lucide-react';

export default function SplineCard() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    // Track which image is active (null = none)
    const [activeImage, setActiveImage] = useState<string | null>(null);

    const images = [
        '/Untitled-2.png', // Digital Art
        '/3 final.png',    // Mixed Media
        '/Screenshot 2025-08-21 220130.png' // 3D
    ];

    // Smooth spring physics for the tilt - tuned for continuous smooth response
    const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        // Calculate normalized position -1 to 1
        const xPct = (clientX - left) / width - 0.5;
        const yPct = (clientY - top) / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    }

    // ... [rest of handlers]
    function handleMouseLeave() {
        x.set(0);
        y.set(0);
        setActiveImage(null);
    }

    // Transform mapping for 3D rotation - slightly exaggerated range
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [20, -20]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);

    // Parallax offsets for layers
    const backgroundX = useTransform(mouseX, [-0.5, 0.5], [25, -25]);
    const backgroundY = useTransform(mouseY, [-0.5, 0.5], [25, -25]);
    const foregroundX = useTransform(mouseX, [-0.5, 0.5], [-40, 40]);
    const foregroundY = useTransform(mouseY, [-0.5, 0.5], [-40, 40]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-full h-full flex items-center justify-center perspective-1000 z-10"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* 3D Scene Container */}
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative w-full max-w-[320px] h-[400px] md:w-[400px] md:h-[500px]"
            >
                {/* ... [Background Orbs code which is unchanged] ... */}
                {/* Large Glowing Orb (Purple) */}
                <motion.div
                    style={{ x: backgroundX, y: backgroundY, z: -50 }}
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute -top-20 -left-20 w-64 h-64 bg-purple-600 rounded-full blur-[80px] opacity-40 mix-blend-screen"
                />

                {/* Cyan Orb (Bottom Right) */}
                <motion.div
                    style={{ x: backgroundX, y: backgroundY, z: -50 }}
                    animate={{
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 7, repeat: Infinity, delay: 1 }}
                    className="absolute -bottom-10 -right-10 w-56 h-56 bg-cyan-500 rounded-full blur-[80px] opacity-30 mix-blend-screen"
                />

                {/* Decorative Ring */}
                <motion.div
                    style={{ x: backgroundX, y: backgroundY, z: -20, rotateZ: 45 }}
                    animate={{ rotateZ: [45, 225] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-10 right-10 w-40 h-40 border-4 border-white/5 rounded-full blur-sm"
                />


                {/* --- Main Glass Card --- */}
                <motion.div
                    style={{ z: 0 }}
                    className="absolute inset-0 rounded-none border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col justify-between p-8"
                >
                    {/* Persistent Background Images - Rendered but hidden to prevent decode stutter */}
                    <div className="absolute inset-0 z-[-1] rounded-none overflow-hidden">
                        {images.map((imgSrc) => (
                            <div
                                key={imgSrc}
                                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-in-out will-change-[opacity] ${activeImage === imgSrc ? 'opacity-100' : 'opacity-0'}`}
                                style={{ backgroundImage: `url('${imgSrc}')` }}
                            >
                                <div className="absolute inset-0 bg-black/60" /> {/* Dimmer */}
                            </div>
                        ))}
                    </div>

                    {/* Glossy Reflection Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />

                    {/* Content */}
                    <div className="relative z-10 space-y-2 pointer-events-none h-full flex flex-col justify-between">
                        {/* Empty container to maintain layout structure if needed, or just spacers */}
                        <div />
                    </div>
                </motion.div>


                {/* --- Foreground Floating Elements (Pop out) --- */}

                {/* 1. Floating Pill: "Digital Art" (Interactive) */}
                <motion.div
                    style={{ x: foregroundX, y: foregroundY, z: 60 }}
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    onMouseEnter={() => setActiveImage('/Untitled-2.png')}
                    onMouseLeave={() => setActiveImage(null)}
                    className={`absolute top-4 right-4 md:top-20 md:-right-24 w-auto px-4 h-10 md:px-6 md:h-16 rounded-none backdrop-blur-xl border shadow-xl flex items-center justify-center gap-2 md:gap-3 cursor-pointer transition-all duration-300 ${activeImage === '/Untitled-2.png' ? 'bg-violet-500/20 border-violet-500/50 scale-105' : 'bg-black/60 border-white/10'}`}
                >
                    <Palette className={`w-4 h-4 md:w-5 md:h-5 pointer-events-none ${activeImage === '/Untitled-2.png' ? 'text-white' : 'text-violet-400'}`} />
                    <span className={`text-xs md:text-sm font-semibold whitespace-nowrap pointer-events-none ${activeImage === '/Untitled-2.png' ? 'text-white' : 'text-violet-200'}`}>Digital Art</span>
                </motion.div>

                {/* 2. Floating Pill: "Mixed Media" */}
                <motion.div
                    style={{ x: foregroundX, y: foregroundY, z: 80 }}
                    animate={{ y: [10, -10, 10] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    onMouseEnter={() => setActiveImage('/3 final.png')}
                    onMouseLeave={() => setActiveImage(null)}
                    className={`absolute bottom-20 left-4 md:bottom-32 md:-left-12 w-auto px-4 h-10 md:px-6 md:h-16 rounded-none backdrop-blur-xl border shadow-xl flex items-center justify-center gap-2 md:gap-3 cursor-pointer transition-all duration-300 ${activeImage === '/3 final.png' ? 'bg-cyan-500/20 border-cyan-500/50 scale-105' : 'bg-black/60 border-white/10'}`}
                >
                    <Layers className={`w-4 h-4 md:w-5 md:h-5 pointer-events-none ${activeImage === '/3 final.png' ? 'text-white' : 'text-cyan-400'}`} />
                    <span className={`text-xs md:text-sm font-semibold whitespace-nowrap pointer-events-none ${activeImage === '/3 final.png' ? 'text-white' : 'text-cyan-200'}`}>Mixed Media</span>
                </motion.div>

                {/* 3. Floating Pill: "3D" (Interactive - NEW) */}
                <motion.div
                    style={{ x: foregroundX, y: foregroundY, z: 70 }}
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    onMouseEnter={() => setActiveImage('/Screenshot 2025-08-21 220130.png')}
                    onMouseLeave={() => setActiveImage(null)}
                    className={`absolute bottom-4 right-4 md:bottom-10 md:-right-8 w-auto px-4 h-10 md:px-6 md:h-16 rounded-none backdrop-blur-xl border shadow-xl flex items-center justify-center gap-2 md:gap-3 cursor-pointer transition-all duration-300 ${activeImage === '/Screenshot 2025-08-21 220130.png' ? 'bg-pink-500/20 border-pink-500/50 scale-105' : 'bg-black/60 border-white/10'}`}
                >
                    <Box className={`w-4 h-4 md:w-5 md:h-5 pointer-events-none ${activeImage === '/Screenshot 2025-08-21 220130.png' ? 'text-white' : 'text-pink-400'}`} />
                    <span className={`text-xs md:text-sm font-semibold whitespace-nowrap pointer-events-none ${activeImage === '/Screenshot 2025-08-21 220130.png' ? 'text-white' : 'text-pink-200'}`}>3D</span>
                </motion.div>

                {/* Floating 3D Shape (CSS Only) - REMOVED */}

            </motion.div>
        </motion.div>
    );
}
