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
                        className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 cursor-pointer flex flex-col items-center justify-center p-4 md:p-8"
                    >
                        {/* Header */}
                        <div className="w-full max-w-[95vw] flex justify-between items-start mb-4 md:mb-6 shrink-0 z-[60]" onClick={(e) => e.stopPropagation()}>
                            <div>
                                <h2
                                    className="text-primary/60 text-[10px] font-semibold uppercase tracking-[0.2em]"
                                    style={{ fontFamily: "'Google Sans', system-ui, sans-serif" }}
                                >
                                    Gallery
                                </h2>
                                <h1
                                    className="text-white text-2xl font-bold tracking-tight"
                                    style={{ fontFamily: "'Google Sans', system-ui, sans-serif" }}
                                >
                                    {category}
                                </h1>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 -mr-2 text-white/40 hover:text-white transition-colors"
                                aria-label="Close gallery"
                            >
                                <X size={28} />
                            </button>
                        </div>

                        {/* Image */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full h-full min-h-0 shadow-2xl overflow-hidden group flex items-center justify-center"
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
                                    <Image
                                        src={images[currentIndex]}
                                        alt={`${category} — image ${currentIndex + 1} of ${images.length}`}
                                        width={1920}
                                        height={1080}
                                        className="max-w-full max-h-full object-contain"
                                        priority
                                        unoptimized
                                        quality={100}
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Nav */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="fixed left-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 text-white/60 hover:bg-primary hover:text-primary-foreground transition-all z-[70]"
                                        aria-label="Previous image"
                                    >
                                        <ChevronLeft size={28} />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="fixed right-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 text-white/60 hover:bg-primary hover:text-primary-foreground transition-all z-[70]"
                                        aria-label="Next image"
                                    >
                                        <ChevronRight size={28} />
                                    </button>
                                </>
                            )}
                        </motion.div>

                        {/* Counter */}
                        {images.length > 1 && (
                            <div className="mt-4 text-[11px] text-muted-foreground/60 tracking-wider" style={{ fontFamily: "'Google Sans', system-ui, sans-serif" }}>
                                {currentIndex + 1} / {images.length}
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
