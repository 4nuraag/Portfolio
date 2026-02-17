'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface Project {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    skills: string;
    tools: string;
    image: string;
    link?: string;
}

interface ProjectOverlayProps {
    project: Project | null;
    onClose: () => void;
}

export default function ProjectOverlay({ project, onClose }: ProjectOverlayProps) {
    return (
        <AnimatePresence>
            {project && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 cursor-pointer"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="fixed inset-4 md:inset-auto md:top-[10%] md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-5xl md:h-auto md:max-h-[85vh] bg-[#0A0A0A] border border-white/10 rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col"
                    >
                        {/* Header Actions */}
                        <div className="absolute top-4 right-4 z-10 flex gap-2">
                            <button
                                onClick={onClose}
                                className="p-2 rounded-none bg-black/50 hover:bg-white/10 text-white/70 hover:text-white transition-colors border border-white/5"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex flex-col md:flex-row h-full overflow-y-auto md:overflow-hidden">
                            {/* Image Section */}
                            <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-neutral-900">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-transparent to-transparent opacity-60" />
                            </div>

                            {/* Content Section */}
                            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto">
                                <div className="mb-6 md:mb-8">
                                    <h3 className="bg-gradient-to-br from-white via-zinc-200 to-zinc-600 bg-clip-text text-transparent text-sm font-mono uppercase tracking-wider mb-2">
                                        {project.subtitle}
                                    </h3>
                                    <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                                        {project.title}
                                    </h2>
                                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="space-y-6 mt-auto">
                                    {/* Skills */}
                                    <div>
                                        <h4 className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Skills</h4>
                                        <p className="text-gray-200 text-sm">
                                            {project.skills}
                                        </p>
                                    </div>

                                    {/* Tools */}
                                    <div>
                                        <h4 className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Tools</h4>
                                        <p className="text-gray-200 text-sm">
                                            {project.tools}
                                        </p>
                                    </div>

                                    {/* CTA */}
                                    {project.link && (
                                        <div className="pt-6 border-t border-white/10">
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-none hover:bg-gray-200 transition-colors"
                                            >
                                                <span>View Project</span>
                                                <ExternalLink size={16} />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
