"use client";

import React from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface Render {
    id: string;
    image: string;
}

const renders: Render[] = [
    { id: "spheres", image: "/renders/glass_spheres.png" },
    { id: "metal", image: "/renders/liquid_metal.png" },
    { id: "city", image: "/renders/cyberpunk_city.png" },
    { id: "geometry", image: "/renders/geometry.png" },
    { id: "cloth", image: "/renders/cloth.png" },
    { id: "texture", image: "/renders/texture.png" },
];

export default function VideoShowcase() {
    return (
        <section className="w-full py-24 bg-background">
            <div className="container mx-auto px-4 md:px-8">
                <h2 className="text-3xl md:text-5xl font-bold mb-12 text-foreground text-center md:text-left">
                    3D Animation & Motion
                </h2>

                {/* Video Embeds Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    <div className="group relative w-full aspect-video rounded-3xl overflow-hidden bg-black">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white/50 text-sm">Video Payload Wrapper</span>
                        </div>
                        {/* Placeholder for Video 1 */}
                        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/50 group-hover:bg-zinc-900/30 transition-colors cursor-pointer">
                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Play className="fill-white text-white ml-1" />
                            </div>
                        </div>
                        <div className="absolute bottom-6 left-6">
                            <h3 className="text-xl font-bold text-white">Fabric of Reality</h3>
                            <p className="text-white/70 text-sm">Concept Art</p>
                        </div>
                    </div>

                    <div className="group relative w-full aspect-video rounded-3xl overflow-hidden bg-black">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white/50 text-sm">Video Payload Wrapper</span>
                        </div>
                        {/* Placeholder for Video 2 */}
                        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/50 group-hover:bg-zinc-900/30 transition-colors cursor-pointer">
                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Play className="fill-white text-white ml-1" />
                            </div>
                        </div>
                        <div className="absolute bottom-6 left-6">
                            <h3 className="text-xl font-bold text-white">Blender Compilation</h3>
                            <p className="text-white/70 text-sm">2024 Reel</p>
                        </div>
                    </div>
                </div>

                {/* 3D Render Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                    {renders.map((item) => (
                        <div
                            key={item.id}
                            className="relative aspect-square rounded-2xl overflow-hidden hover:scale-95 transition-transform duration-300 cursor-zoom-in"
                        >
                            <Image
                                src={item.image}
                                alt="3D Abstract Render"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 50vw, 33vw"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
