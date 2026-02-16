'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import GalleryOverlay from './GalleryOverlay';
import VideoOverlay from './VideoOverlay';

// Data Configuration
const galleries = [
    {
        id: 'illustration',
        title: 'Illustrations',
        type: 'gallery',
        count: '10 Items',
        cover: '/Illustration/PicsArt_05-31-10.01.23.jpg',
        images: [
            '/Illustration/main.png',
            '/Illustration/final.png',
            '/Illustration/finalp.png',
            '/Illustration/1.2.png',
            '/Illustration/PicsArt_05-31-10.01.23.jpg',
            '/Illustration/PicsArt_06-24-01.00.55.jpg',
            '/Illustration/Remini2021120312hhhhh4842326.png',
            '/Illustration/fgdgfdg.png',
            '/Illustration/sega.png',
            '/Illustration/var1.png'
        ]
    },
    {
        id: 'lookbooks',
        title: 'Look Books',
        type: 'gallery',
        count: '4 Items',
        cover: '/Look Books/PIC03752.jpg',
        images: [
            '/Look Books/Desktop - 15.png',
            '/Look Books/Frame 35.png',
            '/Look Books/Frame 46.png',
            '/Look Books/45.png'
        ]
    },

    {
        id: 'mixed-media',
        title: 'Mixed Media',
        type: 'gallery',
        count: '12 Items',
        cover: '/Mixed Media/32442.jpg',
        images: [
            '/Mixed Media/3 final.png',
            '/Mixed Media/1 final.png',
            '/Mixed Media/2 final.png',
            '/Mixed Media/4 final.png',
            '/Mixed Media/5 final.png',
            '/Mixed Media/32442.jpg',
            '/Mixed Media/PicsArt_06-15-03.02.12.jpg',
            '/Mixed Media/PicsArt_10-02-07.32.29.jpg',
            '/Mixed Media/PicsArt_10-08-03.15.37.png',
            '/Mixed Media/PicsArt_10-29-12.31.46 (1).jpg',
            '/Mixed Media/Picsart_23-03-01_12-50-14-325.jpg',
            '/Mixed Media/RED_1633534674671.jpeg'
        ]
    },
    {
        id: 'logo',
        title: 'Logos',
        type: 'gallery',
        count: '9 Items',
        cover: '/logo/logos.png',
        images: [
            '/logo/main.png',
            '/logo/3.png',
            '/logo/everyrpmsscounts.png',
            '/logo/Untitled-2.png',
            '/logo/gg.png',
            '/logo/main pattern.png',
            '/logo/Group 35.png',
            '/logo/Group 45.png',
            '/logo/Group 10.png'
        ]
    },

    {
        id: 'posters',
        title: 'Posters',
        type: 'gallery',
        count: '16 Items',
        cover: '/Posters/222.png',
        images: [
            '/Posters/final.png',
            '/Posters/razor story.png',
            '/Posters/arthur cover 1.png',
            '/Posters/aguerooo.png',
            '/Posters/em2.png',
            '/Posters/12.png',
            '/Posters/222.png',
            '/Posters/2222.png',
            '/Posters/23.png',
            '/Posters/34.png',
            '/Posters/Picture3.png',
            '/Posters/PicsArt_05-31-10.08.45.jpg',
            '/Posters/PicsArt_09-02-05.03.24.jpg'
        ]
    },
    {
        id: 'ai',
        title: 'Generative AI',
        type: 'gallery',
        count: '13 Items',
        cover: '/Generative AI/flight.png',
        images: [
            '/Generative AI/crystals.png',
            '/Generative AI/electricity.png',
            '/Generative AI/green.png',
            '/Generative AI/heat.png',
            '/Generative AI/rock.png',
            '/Generative AI/water.png',
            '/Generative AI/dhanushvk_grove_street_gang_members_posing_with_dancing_cars_st_3da6742c-b52e-48d2-ac27-b32a6896d78e.png',
            '/Generative AI/dhanushvkjl_a_1969_Ford_Mustang_Satin_Chrome_Silk_Green_Vinyl_c_d1501c63-778b-4538-93f3-da6badc2648f.png',
            '/Generative AI/dhanushvkjl_a_2005_model_BMW_m3_GTR_matte_black_minimalistic_en_ff526fce-61b1-4be1-883d-0037023666ce.png',
            '/Generative AI/dhanushvkjl_a_RETRO_computer_setup_table_retro_monitor_retro_fi_4286dccd-17a6-4261-a7ab-ad1bb6923fef.png',
            '/Generative AI/Picsart_23-10-14_20-34-24-476.jpg',
            '/Generative AI/flight.png',
            '/Generative AI/wolf.png'
        ]
    },
    {
        id: 'blender',
        title: 'Blender 3D',
        type: 'gallery',
        count: '12 Items',
        cover: '/renders/Screenshot 2025-08-21 220130.png',
        images: [
            '/renders/Screenshot 2025-08-21 220130.png',
            '/renders/Screenshot 2025-08-21 220808.png',
            '/renders/aztec.png',
            '/renders/circle.png',
            '/renders/darkfor.png',
            '/renders/expl.png',
            '/renders/guitarfinal.png',
            '/renders/light.png',
            '/renders/render 1.png',
            '/renders/screen size.png',
            '/renders/underW.png',
            '/renders/untitled.png'
        ]
    },
    {
        id: 'video-1',
        title: '3 months of Blender 3D',
        type: 'video',
        videoId: '0l5WHzrB4kM',
        count: 'Video',
        cover: '/renders/darkfor.png',
        images: []
    },
    {
        id: 'video-2',
        title: 'Fabric of Reality',
        type: 'video',
        videoId: 'FXY9jAFIrjY',
        count: 'Video',
        cover: '/renders/Screenshot 2025-08-21 220808.png',
        images: []
    }
];

export default function VisualGallery() {
    const [selectedGallery, setSelectedGallery] = useState<{ category: string, images: string[] } | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    // Infinite Scroll Setup
    // We create a triple set of items: [Buffer-Left, Main-Set, Buffer-Right]
    const extendedGalleries = [...galleries, ...galleries, ...galleries];
    const totalItems = galleries.length;

    // Start at the beginning of the middle set
    const [currentIndex, setCurrentIndex] = useState(totalItems);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Helper to calculate mod for dots
    const displayIndex = currentIndex % totalItems;

    const [gap, setGap] = useState(24);
    const containerRef = useRef<HTMLDivElement>(null);

    // Standard card height is 500px (derived from 400px width / 0.8 aspect)
    // We'll compute widths dynamically based on height for desktop
    const getCardWidth = (item: typeof galleries[0]) => {
        // Mobile: 85vw
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            return window.innerWidth * 0.85;
        }
        // Desktop: Fixed height 500px
        // Gallery: 4/5 aspect -> Width = 500 * (4/5) = 400
        // Video: 16/9 aspect -> Width = 500 * (16/9) ~= 888.88
        return item.type === 'video' ? (500 * 16 / 9) : 400;
    };

    const [scrollOffset, setScrollOffset] = useState(0);

    // Calculate scroll offset based on currentIndex
    useEffect(() => {
        const calculateOffset = () => {
            if (typeof window === 'undefined') return;

            const currentGap = window.innerWidth >= 768 ? 32 : 24; // gap-8 or gap-6
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

    // Navigation Logic
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
        }
        else if (currentIndex < totalItems) {
            setIsTransitioning(false);
            setCurrentIndex(currentIndex + totalItems);
        } else {
            setIsTransitioning(false);
        }
    };

    return (
        <section className="relative w-full text-foreground py-20 px-6 md:px-16 overflow-hidden" id="visual-gallery">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <div className="flex justify-center items-center mb-12 relative z-10">
                    <h2 className="text-4xl md:text-7xl font-bold leading-tight text-center">
                        <span className="text-foreground whitespace-normal md:whitespace-nowrap">
                            Visual Media Gallery
                        </span>
                    </h2>
                </div>

                {/* Carousel Container with Buttons */}
                <div className="relative group/carousel">


                    {/* Carousel Track */}
                    <div className="relative w-full overflow-visible" ref={containerRef}>
                        <motion.div
                            className="flex gap-6 md:gap-8 items-center"
                            animate={{ x: -scrollOffset }}
                            transition={isTransitioning
                                ? { type: "spring", stiffness: 300, damping: 30 }
                                : { duration: 0 }
                            }
                            onAnimationComplete={handleAnimationComplete}
                            style={{ width: 'max-content' }}
                        >
                            {extendedGalleries.map((gallery, index) => {
                                const isVideo = gallery.type === 'video';
                                const aspectClass = isVideo ? 'aspect-video' : 'aspect-[4/5]';

                                return (
                                    <motion.div
                                        key={`${gallery.id}-${index}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.05 }}
                                        viewport={{ once: true }}
                                        onClick={() => {
                                            if (isVideo && gallery.videoId) {
                                                setSelectedVideo(gallery.videoId);
                                            } else {
                                                setSelectedGallery({ category: gallery.title, images: gallery.images });
                                            }
                                        }}
                                        className={`relative flex-shrink-0 w-[85vw] md:w-auto md:h-[500px] ${aspectClass} rounded-3xl overflow-hidden cursor-pointer group border border-border bg-muted/20 backdrop-blur-sm`}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        {/* Background Image */}
                                        <div className="absolute inset-0">
                                            <Image
                                                src={gallery.cover}
                                                alt={gallery.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-60"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                        </div>

                                        {/* Content */}
                                        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                <h4 className="text-primary text-xs font-bold uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                                    {gallery.count}
                                                </h4>
                                                <h3 className="font-bold text-white mb-2 leading-tight text-3xl drop-shadow-md">
                                                    {gallery.title}
                                                </h3>
                                                <div className="flex items-center gap-2 text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                                    <span>{isVideo ? 'Watch Video' : 'View Gallery'}</span>
                                                    <ArrowUpRight size={16} />
                                                </div>
                                            </div>
                                        </div>

                                        {isVideo && (
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300">
                                                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* Scroll Indicator & Controls */}
                    <div className="flex justify-center items-center gap-6 mt-12 md:mt-16">
                        <button
                            onClick={prevSlide}
                            className="w-12 h-12 rounded-full flex items-center justify-center text-foreground hover:bg-primary/20 hover:text-primary transition-all duration-300"
                            aria-label="Previous gallery"
                        >
                            <ChevronLeft size={28} />
                        </button>

                        <div className="flex gap-3">
                            {galleries.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setIsTransitioning(true);
                                        setCurrentIndex(totalItems + index);
                                    }}
                                    className={`h-2 rounded-full transition-all duration-300 ${index === displayIndex
                                        ? 'w-8 bg-primary'
                                        : 'w-2 bg-foreground/20 hover:bg-foreground/40'
                                        }`}
                                    aria-label={`Go to gallery ${index + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextSlide}
                            className="w-12 h-12 rounded-full flex items-center justify-center text-foreground hover:bg-primary/20 hover:text-primary transition-all duration-300"
                            aria-label="Next gallery"
                        >
                            <ChevronRight size={28} />
                        </button>
                    </div>
                </div>

                {/* Gallery Overlay */}
                <GalleryOverlay
                    category={selectedGallery?.category ?? null}
                    images={selectedGallery?.images ?? []}
                    onClose={() => setSelectedGallery(null)}
                />

                {/* Video Overlay */}
                <VideoOverlay
                    videoId={selectedVideo}
                    onClose={() => setSelectedVideo(null)}
                />
            </div>
        </section>
    );
}
