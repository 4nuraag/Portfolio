'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Video, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import GalleryOverlay from './GalleryOverlay';
import VideoOverlay from './VideoOverlay';
import {
    staggerContainer,
    revealUp,
    revealFade,
    revealScale,
    EASE_PREMIUM,
    useScrollReveal,
} from '@/lib/animations';

// Data Configuration — unchanged
const galleries = [
    {
        id: 'illustration',
        title: 'Illustrations',
        type: 'gallery',
        count: '10 Items',
        cover: './Illustration/PicsArt_05-31-10.01.23.jpg',
        images: [
            './Illustration/main.png',
            './Illustration/final.png',
            './Illustration/finalp.png',
            './Illustration/1.2.png',
            './Illustration/PicsArt_05-31-10.01.23.jpg',
            './Illustration/PicsArt_06-24-01.00.55.jpg',
            './Illustration/Remini2021120312hhhhh4842326.png',
            './Illustration/fgdgfdg.png',
            './Illustration/sega.png',
            './Illustration/var1.png'
        ]
    },
    {
        id: 'lookbooks',
        title: 'Look Books',
        type: 'gallery',
        count: '4 Items',
        cover: './Look Books/PIC03752.jpg',
        images: [
            './Look Books/Desktop - 15.png',
            './Look Books/Frame 35.png',
            './Look Books/Frame 46.png',
            './Look Books/45.png'
        ]
    },
    {
        id: 'mixed-media',
        title: 'Mixed Media',
        type: 'gallery',
        count: '12 Items',
        cover: './Mixed Media/32442.jpg',
        images: [
            './Mixed Media/3 final.png',
            './Mixed Media/1 final.png',
            './Mixed Media/2 final.png',
            './Mixed Media/4 final.png',
            './Mixed Media/5 final.png',
            './Mixed Media/32442.jpg',
            './Mixed Media/PicsArt_06-15-03.02.12.jpg',
            './Mixed Media/PicsArt_10-02-07.32.29.jpg',
            './Mixed Media/PicsArt_10-08-03.15.37.png',
            './Mixed Media/PicsArt_10-29-12.31.46 (1).jpg',
            './Mixed Media/Picsart_23-03-01_12-50-14-325.jpg',
            './Mixed Media/RED_1633534674671.jpeg'
        ]
    },
    {
        id: 'logo',
        title: 'Logos',
        type: 'gallery',
        count: '9 Items',
        cover: './logo/logos.png',
        images: [
            './logo/main.png',
            './logo/3.png',
            './logo/everyrpmsscounts.png',
            './logo/Untitled-2.png',
            './logo/gg.png',
            './logo/main pattern.png',
            './logo/Group 35.png',
            './logo/Group 45.png',
            './logo/Group 10.png'
        ]
    },
    {
        id: 'posters',
        title: 'Posters',
        type: 'gallery',
        count: '16 Items',
        cover: './Posters/222.png',
        images: [
            './Posters/final.png',
            './Posters/razor story.png',
            './Posters/arthur cover 1.png',
            './Posters/aguerooo.png',
            './Posters/em2.png',
            './Posters/12.png',
            './Posters/222.png',
            './Posters/2222.png',
            './Posters/23.png',
            './Posters/34.png',
            './Posters/Picture3.png',
            './Posters/PicsArt_05-31-10.08.45.jpg',
            './Posters/PicsArt_09-02-05.03.24.jpg'
        ]
    },
    {
        id: 'ai',
        title: 'Generative AI',
        type: 'gallery',
        count: '13 Items',
        cover: './Generative AI/flight.png',
        images: [
            './Generative AI/crystals.png',
            './Generative AI/electricity.png',
            './Generative AI/green.png',
            './Generative AI/heat.png',
            './Generative AI/rock.png',
            './Generative AI/water.png',
            './Generative AI/dhanushvk_grove_street_gang_members_posing_with_dancing_cars_st_3da6742c-b52e-48d2-ac27-b32a6896d78e.png',
            './Generative AI/dhanushvkjl_a_1969_Ford_Mustang_Satin_Chrome_Silk_Green_Vinyl_c_d1501c63-778b-4538-93f3-da6badc2648f.png',
            './Generative AI/dhanushvkjl_a_2005_model_BMW_m3_GTR_matte_black_minimalistic_en_ff526fce-61b1-4be1-883d-0037023666ce.png',
            './Generative AI/dhanushvkjl_a_RETRO_computer_setup_table_retro_monitor_retro_fi_4286dccd-17a6-4261-a7ab-ad1bb6923fef.png',
            './Generative AI/Picsart_23-10-14_20-34-24-476.jpg',
            './Generative AI/flight.png',
            './Generative AI/wolf.png'
        ]
    },
    {
        id: 'blender',
        title: 'Blender 3D',
        type: 'gallery',
        count: '12 Items',
        cover: './renders/Screenshot 2025-08-21 220130.png',
        images: [
            './renders/Screenshot 2025-08-21 220130.png',
            './renders/Screenshot 2025-08-21 220808.png',
            './renders/aztec.png',
            './renders/circle.png',
            './renders/darkfor.png',
            './renders/expl.png',
            './renders/guitarfinal.png',
            './renders/light.png',
            './renders/render 1.png',
            './renders/screen size.png',
            './renders/underW.png',
            './renders/untitled.png'
        ]
    },
    {
        id: 'video-1',
        title: '3 months of Blender 3D',
        type: 'video',
        videoId: '0l5WHzrB4kM',
        count: 'Video',
        cover: './renders/darkfor.png',
        images: []
    },
    {
        id: 'video-2',
        title: 'Fabric of Reality',
        type: 'video',
        videoId: 'FXY9jAFIrjY',
        count: 'Video',
        cover: './renders/Screenshot 2025-08-21 220808.png',
        images: []
    }
];

export default function VisualGallery() {
    const [selectedGallery, setSelectedGallery] = useState<{ category: string, images: string[] } | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    // Section reveal
    const { ref: sectionRef, isInView } = useScrollReveal({ amount: 0.08 });

    // Infinite Scroll Setup
    const extendedGalleries = [...galleries, ...galleries, ...galleries];
    const totalItems = galleries.length;

    const [currentIndex, setCurrentIndex] = useState(totalItems);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const displayIndex = currentIndex % totalItems;

    const [gap, setGap] = useState(24);
    const containerRef = useRef<HTMLDivElement>(null);

    // Mobile carousel refs
    const mobileScrollRef = useRef<HTMLDivElement>(null);
    const mobileCardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    const getCardWidth = (item: typeof galleries[0]) => {
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            return window.innerWidth * 0.85;
        }
        return item.type === 'video' ? (500 * 16 / 9) : 400;
    };

    const [scrollOffset, setScrollOffset] = useState(0);

    useEffect(() => {
        const calculateOffset = () => {
            if (typeof window === 'undefined') return;

            const currentGap = window.innerWidth >= 768 ? 32 : 24;
            setGap(currentGap);

            let offset = 0;
            for (let i = 0; i < currentIndex; i++) {
                const item = extendedGalleries[i];
                offset += getCardWidth(item) + currentGap;
            }
            setScrollOffset(offset);
        };

        calculateOffset();
        window.addEventListener('resize', calculateOffset);
        return () => window.removeEventListener('resize', calculateOffset);
    }, [currentIndex, extendedGalleries]);

    // Track mobile viewport
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Track mobile scroll position
    useEffect(() => {
        const container = mobileScrollRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollLeft = container.scrollLeft;
            const containerWidth = container.clientWidth;
            const index = Math.round(scrollLeft / (containerWidth * 0.85 + 24));
            setMobileActiveIndex(Math.min(Math.max(index, 0), galleries.length - 1));
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollMobileToIndex = (index: number) => {
        const card = mobileCardRefs.current[index];
        if (card && mobileScrollRef.current) {
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    };

    const mobileNext = () => {
        const next = Math.min(mobileActiveIndex + 1, galleries.length - 1);
        setMobileActiveIndex(next);
        scrollMobileToIndex(next);
    };

    const mobilePrev = () => {
        const prev = Math.max(mobileActiveIndex - 1, 0);
        setMobileActiveIndex(prev);
        scrollMobileToIndex(prev);
    };

    // Navigation
    const nextSlide = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const prevSlide = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setCurrentIndex((prev) => prev - 1);
        }
    };

    const handleAnimationComplete = () => {
        if (currentIndex >= 2 * totalItems) {
            setIsTransitioning(false);
            setCurrentIndex(currentIndex - totalItems);
        } else if (currentIndex < totalItems) {
            setIsTransitioning(false);
            setCurrentIndex(currentIndex + totalItems);
        } else {
            setIsTransitioning(false);
        }
    };

    return (
        <section className="relative w-full text-foreground py-20 px-6 md:px-16 overflow-hidden" id="visual-gallery">
            <div ref={sectionRef} className="max-w-[1400px] mx-auto">

                {/* =========================================
                    HEADER — Staggered reveal
                    ========================================= */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="flex flex-col justify-center items-center mb-12 relative z-10"
                >
                    <motion.h2
                        variants={revealUp}
                        className="text-4xl md:text-7xl font-bold leading-tight text-center"
                    >
                        <span className="text-foreground whitespace-normal md:whitespace-nowrap">
                            Visual Media Gallery
                        </span>
                    </motion.h2>

                    <motion.div variants={revealFade} className="mt-4">
                        <div className="w-12 h-[1px] bg-primary/50" />
                    </motion.div>
                </motion.div>

                {/* =========================================
                    CAROUSEL — Scale reveal entrance
                    ========================================= */}
                <motion.div
                    variants={revealScale}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="relative group/carousel"
                >
                    {/* Mobile Native Carousel Track */}
                    <div ref={mobileScrollRef} className="flex md:hidden gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-8 px-4 -mx-4 mt-4">
                        {galleries.map((gallery, index) => {
                            const isVideo = gallery.type === 'video';
                            const aspectClass = isVideo ? 'aspect-video' : 'aspect-[4/5]';

                            return (
                                <motion.div
                                    key={`mobile-${gallery.id}-${index}`}
                                    ref={(node: HTMLDivElement | null) => {
                                        mobileCardRefs.current[index] = node;
                                    }}
                                    onClick={() => {
                                        if (isVideo && (gallery as any).videoId) {
                                            setSelectedVideo((gallery as any).videoId);
                                        } else {
                                            setSelectedGallery({ category: gallery.title, images: gallery.images });
                                        }
                                    }}
                                    className={`relative flex-shrink-0 w-[85vw] ${aspectClass} rounded-3xl overflow-hidden cursor-pointer group border border-border bg-muted/20 backdrop-blur-sm snap-center`}
                                >
                                    <div className="absolute inset-0">
                                        <Image
                                            src={gallery.cover}
                                            alt={gallery.title}
                                            fill
                                            className="object-cover opacity-80 transition-all duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                    </div>

                                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                        <h4 className="text-primary text-xs font-bold uppercase tracking-widest mb-2">
                                            {gallery.count}
                                        </h4>
                                        <h3 className="font-bold text-white mb-2 leading-tight text-2xl drop-shadow-md">
                                            {gallery.title}
                                        </h3>
                                        <div className="flex items-center gap-2 text-white/80 text-sm">
                                            <span>{isVideo ? 'Watch Video' : 'View Gallery'}</span>
                                            <ArrowUpRight size={16} />
                                        </div>
                                    </div>

                                    {isVideo && (
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                                                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Desktop Carousel Track */}
                    <div className="hidden md:block relative w-full overflow-visible" ref={containerRef}>
                        <motion.div
                            className="flex gap-6 md:gap-8 items-center"
                            animate={{ x: -scrollOffset }}
                            transition={isTransitioning
                                ? {
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 28,
                                    mass: 0.8,
                                }
                                : { duration: 0 }
                            }
                            onAnimationComplete={handleAnimationComplete}
                            style={{ width: 'max-content' }}
                            onPanEnd={(e, info) => {
                                const swipe = info.offset.x;
                                if (swipe < -50) nextSlide();
                                else if (swipe > 50) prevSlide();
                            }}
                        >
                            {extendedGalleries.map((gallery, index) => {
                                const isVideo = gallery.type === 'video';
                                const aspectClass = isVideo ? 'aspect-video' : 'aspect-[4/5]';

                                return (
                                    <motion.div
                                        key={`${gallery.id}-${index}`}
                                        onClick={() => {
                                            if (isVideo && (gallery as any).videoId) {
                                                setSelectedVideo((gallery as any).videoId);
                                            } else {
                                                setSelectedGallery({ category: gallery.title, images: gallery.images });
                                            }
                                        }}
                                        className={`relative flex-shrink-0 w-[85vw] md:w-auto md:h-[500px] ${aspectClass} rounded-3xl overflow-hidden cursor-pointer group border border-border bg-muted/20 backdrop-blur-sm`}
                                        whileHover={{ scale: 1.03 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 20,
                                        }}
                                    >
                                        {/* Background Image — premium hover zoom */}
                                        <div className="absolute inset-0">
                                            <Image
                                                src={gallery.cover}
                                                alt={gallery.title}
                                                fill
                                                className="object-cover opacity-80 group-hover:opacity-60 transition-all duration-700 group-hover:scale-110"
                                                style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                        </div>

                                        {/* Content — staggered hover reveal */}
                                        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                                            <div
                                                className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-600"
                                                style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                                            >
                                                <h4
                                                    className="text-primary text-xs font-bold uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                                    style={{ transitionDelay: '50ms' }}
                                                >
                                                    {gallery.count}
                                                </h4>
                                                <h3 className="font-bold text-white mb-2 leading-tight text-3xl drop-shadow-md">
                                                    {gallery.title}
                                                </h3>
                                                <div
                                                    className="flex items-center gap-2 text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                                    style={{ transitionDelay: '150ms' }}
                                                >
                                                    <span>{isVideo ? 'Watch Video' : 'View Gallery'}</span>
                                                    <ArrowUpRight size={16} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Play Button for Videos */}
                                        {isVideo && (
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                <motion.div
                                                    className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30"
                                                    whileHover={{ scale: 1.15 }}
                                                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                                >
                                                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                                                </motion.div>
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* =========================================
                        CONTROLS — Fade in after carousel
                        ========================================= */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8, ease: EASE_PREMIUM, delay: 0.5 }}
                        className="flex justify-center items-center gap-6 mt-12 md:mt-16"
                    >
                        <motion.button
                            onClick={isMobile ? mobilePrev : prevSlide}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            className="w-12 h-12 rounded-full flex items-center justify-center text-foreground hover:bg-primary/20 hover:text-primary transition-colors duration-300"
                            aria-label="Previous gallery"
                        >
                            <ChevronLeft size={28} />
                        </motion.button>

                        <div className="flex gap-3">
                            {galleries.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        if (isMobile) {
                                            setMobileActiveIndex(index);
                                            scrollMobileToIndex(index);
                                        } else {
                                            setIsTransitioning(true);
                                            setCurrentIndex(totalItems + index);
                                        }
                                    }}
                                    className={`h-2 rounded-full transition-all duration-500 ${index === (isMobile ? mobileActiveIndex : displayIndex)
                                        ? 'w-8 bg-primary'
                                        : 'w-2 bg-foreground/20 hover:bg-foreground/40'
                                        }`}
                                    style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                                    aria-label={`Go to gallery ${index + 1}`}
                                />
                            ))}
                        </div>

                        <motion.button
                            onClick={isMobile ? mobileNext : nextSlide}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            className="w-12 h-12 rounded-full flex items-center justify-center text-foreground hover:bg-primary/20 hover:text-primary transition-all duration-300"
                            aria-label="Next gallery"
                        >
                            <ChevronRight size={28} />
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* Overlays */}
                <GalleryOverlay
                    category={selectedGallery?.category ?? null}
                    images={selectedGallery?.images ?? []}
                    onClose={() => setSelectedGallery(null)}
                />
                <VideoOverlay
                    videoId={selectedVideo}
                    onClose={() => setSelectedVideo(null)}
                />
            </div>
        </section>
    );
}
