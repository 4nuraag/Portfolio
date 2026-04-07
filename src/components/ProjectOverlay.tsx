'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface Project {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    skills: string;
    tags?: string[];
    tools: string;
    image: string;
    link?: string;
}

interface ProjectOverlayProps {
    project: Project | null;
    onClose: () => void;
}

export default function ProjectOverlay({ project, onClose }: ProjectOverlayProps) {
    useEffect(() => {
        if (project) {
            document.body.style.overflow = 'hidden';

            const handleHashChange = () => onClose();
            window.addEventListener('hashchange', handleHashChange);

            return () => {
                document.body.style.overflow = 'unset';
                window.removeEventListener('hashchange', handleHashChange);
            };
        }
    }, [project, onClose]);

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
                        className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 cursor-pointer"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="fixed top-4 left-4 right-4 bottom-24 md:inset-auto md:top-[10%] md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-5xl md:h-auto md:max-h-[85vh] bg-[#111111] border border-white/[0.06] shadow-2xl z-50 overflow-hidden flex flex-col"
                    >
                        {/* Close */}
                        <div className="absolute top-4 right-4 z-10 flex gap-2">
                            <button
                                onClick={onClose}
                                className="p-2 bg-black/50 hover:bg-white/10 text-white/70 hover:text-white transition-colors border border-white/[0.06]"
                                aria-label="Close"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex flex-col md:flex-row h-full overflow-y-auto md:overflow-hidden">
                            {/* Image */}
                            <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-[#0a0a0a]">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#111111]/80 via-transparent to-transparent opacity-60" />
                            </div>

                            {/* Content panel */}
                            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto" style={{ minWidth: 0, overflow: 'hidden', flex: 1 }}>
                                <div className="mb-6 md:mb-8">
                                    <h3
                                        className="text-primary/70 text-[10px] uppercase tracking-[0.2em] font-semibold mb-3"
                                        style={{ fontFamily: "'Google Sans', system-ui, sans-serif" }}
                                    >
                                        {project.subtitle}
                                    </h3>
                                    <h2
                                        className="text-3xl md:text-4xl lg:text-[2.8rem] font-bold text-foreground mb-4 tracking-tight"
                                        style={{
                                            fontFamily: "'Google Sans', system-ui, sans-serif",
                                            lineHeight: '1.15',
                                            wordBreak: 'normal',
                                            overflowWrap: 'break-word',
                                            hyphens: 'none',
                                            whiteSpace: 'normal',
                                        }}
                                    >
                                        {project.title}
                                    </h2>
                                    <p
                                        className="text-muted-foreground leading-relaxed text-sm md:text-base"
                                        style={{ fontFamily: "'Google Sans', system-ui, sans-serif" }}
                                    >
                                        {project.description}
                                    </p>
                                </div>

                                <div className="space-y-6 mt-auto">
                                    {/* Tags */}
                                    <div>
                                        <h4 className="text-muted-foreground/50 text-[9px] font-bold uppercase tracking-[0.2em] mb-3" style={{ fontFamily: "'Google Sans', system-ui, sans-serif" }}>
                                            Skills & Technologies
                                        </h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.tags ? project.tags.map(tag => (
                                                <span
                                                    key={tag}
                                                    className="px-2.5 py-1 bg-white/[0.03] border border-white/[0.06] text-[10px] text-muted-foreground uppercase tracking-wider font-medium"
                                                    style={{ fontFamily: "'Google Sans', system-ui, sans-serif" }}
                                                >
                                                    {tag}
                                                </span>
                                            )) : (
                                                <p className="text-muted-foreground text-sm">{project.skills}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    {project.link && (
                                        <div className="pt-6 border-t border-white/[0.06]">
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors duration-200 ease-out text-xs uppercase tracking-wider"
                                                style={{ fontFamily: "'Google Sans', system-ui, sans-serif" }}
                                            >
                                                <span>View Project</span>
                                                <ExternalLink size={14} />
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
