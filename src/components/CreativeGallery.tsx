"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

interface Category {
    id: string;
    title: string;
    image: string;
    span: string; // CSS class for grid span
}

const categories: Category[] = [
    { id: "illustrations", title: "Illustrations", image: "/gallery/illustrations.png", span: "md:col-span-2 md:row-span-2" },
    { id: "logos", title: "Logos", image: "/gallery/logos.png", span: "md:col-span-1 md:row-span-1" },
    { id: "ai", title: "Generative AI", image: "/gallery/ai.png", span: "md:col-span-1 md:row-span-1" },
    { id: "branding", title: "Branding", image: "/gallery/branding.png", span: "md:col-span-1 md:row-span-2" },
    { id: "typography", title: "Typography", image: "/gallery/typography.png", span: "md:col-span-1 md:row-span-1" },
    { id: "photography", title: "Photography", image: "/gallery/photography.png", span: "md:col-span-2 md:row-span-1" },
];

export default function CreativeGallery() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const selectedCategory = categories.find((c) => c.id === selectedId);

    return (
        <section className="w-full py-24 bg-background">
            <div className="container mx-auto px-4 md:px-8">
                <h2 className="text-3xl md:text-5xl font-bold mb-12 text-foreground text-center md:text-left">
                    Creative Gallery
                </h2>

                {/* Masonry Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
                    {categories.map((item, index) => (
                        <motion.div
                            layoutId={`card-${item.id}`}
                            key={item.id}
                            className={`relative group overflow-hidden rounded-2xl cursor-pointer ${item.span} bg-foreground/5`}
                            onClick={() => setSelectedId(item.id)}
                            whileHover={{ scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white">
                                <ZoomIn className="w-8 h-8 mb-2" />
                                <span className="text-xl font-medium">{item.title}</span>
                            </div>
                            <div className="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-black/80 to-transparent md:hidden">
                                <span className="text-white font-medium">{item.title}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Lightbox */}
                <AnimatePresence>
                    {selectedId && selectedCategory && (
                        <motion.div
                            layoutId={`lightbox-${selectedId}`} // unique id
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <button
                                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-50 p-2 rounded-full bg-white/10"
                                onClick={() => setSelectedId(null)}
                            >
                                <X size={24} />
                            </button>

                            <motion.div
                                layoutId={`card-${selectedId}`}
                                className="relative w-full max-w-5xl aspect-video md:aspect-[16/9] lg:aspect-[2/1] rounded-3xl overflow-hidden bg-background"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Image
                                    src={selectedCategory.image}
                                    alt={selectedCategory.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />

                                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                                    <h3 className="text-3xl font-bold text-white mb-2">{selectedCategory.title}</h3>
                                    <p className="text-white/80">
                                        A curated selection of my best work in {selectedCategory.title.toLowerCase()}.
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
