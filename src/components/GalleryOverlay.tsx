'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface GalleryOverlayProps {
    category: string | null;
    images: string[];
    onClose: () => void;
}

export default function GalleryOverlay({ category, images, onClose }: GalleryOverlayProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Reset index when category changes
    useEffect(() => {
        setCurrentIndex(0);
    }, [category]);

    const nextImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!category) return;
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [category, images.length, onClose]);

    return (
        <AnimatePresence>
            {category && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 cursor-pointer flex items-center justify-center p-4"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors z-[60]"
                        >
                            <X size={32} />
                        </button>

                        {/* Title */}
                        <div className="absolute top-6 left-6 z-[60]">
                            <h2 className="text-white/50 text-sm font-mono uppercase tracking-widest">Gallery</h2>
                            <h1 className="text-white text-2xl font-bold">{category}</h1>
                        </div>

                        {/* Image Container (Native Size) */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-auto h-auto max-w-[95vw] max-h-[90vh] shadow-2xl overflow-hidden group flex items-center justify-center p-2"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative w-full h-full flex items-center justify-center"
                                >
                                    {/* Using standard img tag for untampered native rendering if Next/Image is too aggressive, 
                                        but trying Next/Image with unoptimized first for quality */}
                                    <Image
                                        src={images[currentIndex]}
                                        alt={`${category} ${currentIndex + 1}`}
                                        width={1920}
                                        height={1080}
                                        className="w-auto h-auto max-w-full max-h-[85vh] object-contain"
                                        priority
                                        unoptimized
                                        quality={100}
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation Overlays */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="fixed left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-all z-[70]"
                                    >
                                        <ChevronLeft size={32} />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="fixed right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-all z-[70]"
                                    >
                                        <ChevronRight size={32} />
                                    </button>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
