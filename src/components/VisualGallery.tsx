'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import Image from 'next/image';
import GalleryOverlay from './GalleryOverlay';
import VideoOverlay from './VideoOverlay';
import {
    staggerContainer,
    revealUp,
    revealFade,
    EASE_PREMIUM,
    useScrollReveal,
} from '@/lib/animations';

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
        cover: './Generative AI/flight.webp',
        images: [
            './Generative AI/crystals.webp',
            './Generative AI/electricity.webp',
            './Generative AI/green.webp',
            './Generative AI/heat.webp',
            './Generative AI/rock.webp',
            './Generative AI/water.webp',
            './Generative AI/grove street.webp',
            './Generative AI/ford mustang.webp',
            './Generative AI/bmw m3.webp',
            './Generative AI/retro minotr.webp',
            './Generative AI/grove street2.webp',
            './Generative AI/flight.webp',
            './Generative AI/wolf.webp'
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

function GalleryItem({
    gallery,
    onClick,
}: {
    gallery: typeof galleries[0];
    onClick: () => void;
}) {
    const isVideo = gallery.type === 'video';

    return (
        <motion.div
            onClick={onClick}
            className="relative flex-shrink-0 w-[240px] md:w-[280px] lg:w-[320px] snap-center cursor-pointer group"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <div className="relative w-full overflow-hidden border border-white/[0.06] group-hover:border-primary/25 transition-colors duration-200 ease-out aspect-[4/5]">
                <Image
                    src={gallery.cover}
                    alt={gallery.title}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-200 ease-out group-hover:scale-[1.06]"
                    style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-200 ease-out">
                            <div className="w-0 h-0 border-t-[6px] md:border-t-[8px] border-t-transparent border-l-[10px] md:border-l-[14px] border-l-white border-b-[6px] md:border-b-[8px] border-b-transparent ml-1" />
                        </div>
                    </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex-1">
                            <h4
                                className="text-white font-bold text-sm md:text-base tracking-tight leading-tight line-clamp-2"
                                style={{ fontFamily: "'Google Sans', system-ui, sans-serif" }}
                            >
                                {gallery.title}
                            </h4>
                        </div>
                        <div className="flex-shrink-0">
                            <span
                                className="px-2 py-0.5 text-[8px] md:text-[9px] uppercase tracking-wider font-semibold text-primary/90 border border-primary/20 bg-black/40 backdrop-blur-sm"
                                style={{ fontFamily: "'Google Sans', system-ui, sans-serif" }}
                            >
                                {gallery.count}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function VisualGallery() {
    const [selectedGallery, setSelectedGallery] = useState<{ category: string, images: string[] } | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const { ref: sectionRef, isInView } = useScrollReveal({ amount: 0.08 });

    // Detect mobile for disabling auto-scroll
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Core references
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Duplicated items specifically for the infinite seamless scroll effect
    const marqueeItems = [...galleries, ...galleries, ...galleries];

    const handleClick = (gallery: typeof galleries[0]) => {
        const isVideo = gallery.type === 'video';
        if (isVideo && (gallery as any).videoId) {
            setSelectedVideo((gallery as any).videoId);
        } else {
            setSelectedGallery({ category: gallery.title, images: gallery.images });
        }
    };

    // Auto-scroll loop mechanics — only runs on desktop
    const scrollSpeed = useRef(0.6); // Base speed
    const currentScroll = useRef(0);

    useAnimationFrame((time, delta) => {
        if (isMobile || !scrollRef.current || isHovered) return;

        // Native width of one full set of items
        const rawWidth = scrollRef.current.scrollWidth / 3;

        currentScroll.current += scrollSpeed.current * (delta / 16.66);

        // Seamless loop jump back when we finish the first set
        if (currentScroll.current >= rawWidth) {
            currentScroll.current -= rawWidth;
            scrollRef.current.scrollLeft = currentScroll.current;
        } else {
            scrollRef.current.scrollLeft = currentScroll.current;
        }
    });

    return (
        <section className="relative w-full text-foreground py-16 md:py-24 overflow-hidden" id="visual-gallery">
            <div ref={sectionRef} className="max-w-[1400px] mx-auto px-4 md:px-16">
                {/* Header */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="mb-10 md:mb-16"
                >
                    <motion.p
                        variants={revealUp}
                        className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary/80 font-medium mb-4"
                        style={{ fontFamily: "'Google Sans', system-ui, sans-serif" }}
                    >
                        Visual Work
                    </motion.p>
                    <motion.h2
                        variants={revealUp}
                        className="text-3xl md:text-5xl lg:text-6xl font-bold leading-none tracking-tight"
                        style={{ fontFamily: "'Google Sans', system-ui, sans-serif" }}
                    >
                        <span className="text-foreground">Visual Media Gallery</span>
                    </motion.h2>
                    <motion.div variants={revealFade} className="mt-6">
                        <div className="w-16 h-[2px] bg-primary/40" />
                    </motion.div>
                </motion.div>
            </div>

            {/* Slider Marquee Container */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, ease: EASE_PREMIUM, delay: 0.3 }}
                className="relative w-full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div
                    ref={scrollRef}
                    className={`flex gap-4 md:gap-6 px-4 md:px-16 overflow-x-auto scrollbar-none pb-8 ${isMobile ? 'snap-x snap-mandatory' : ''
                        }`}
                    style={{
                        scrollBehavior: 'auto',
                        WebkitOverflowScrolling: 'touch',
                    }}
                >
                    {marqueeItems.map((gallery, index) => (
                        <GalleryItem
                            key={`${gallery.id}-${index}`}
                            gallery={gallery}
                            onClick={() => handleClick(gallery)}
                        />
                    ))}
                </div>

                {/* Fade edges */}
                <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-8 md:w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
                <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-8 md:w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />
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
        </section>
    );
}
