'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Camera, Palette, Terminal, PenTool, Gamepad2, MapPin, Building2 } from 'lucide-react';
import {
    staggerContainer,
    revealUp,
    revealFade,
    EASE_PREMIUM,
    EASE_OUT_EXPO,
    useScrollReveal,
} from '@/lib/animations';

const experiences = [
    {
        id: 'scheer',
        role: 'Working Student',
        company: 'Scheer - imc',
        type: 'UI/UX • Front End',
        date: 'Nov 25 - Present',
        location: 'Saarbrücken, Germany',
        icon: Building2,
    },
    {
        id: 'caard',
        role: 'Design Intern',
        company: 'CAARD UG',
        type: 'Graphics Designer • Content Creator',
        date: 'Sep 25 - Present',
        location: 'Remote',
        icon: PenTool,
    },
    {
        id: 'uni',
        role: 'Research Assistant',
        company: 'Universität des Saarlandes',
        type: 'Python Developer',
        date: 'Apr 25 - Oct 25',
        location: 'Saarbrücken, Germany',
        icon: GraduationCap,
    },
    {
        id: 'hexaware',
        role: 'Software Engineer',
        company: 'Hexaware Technologies',
        type: 'UI/UX • Full Stack • BAW • Data Analytics',
        date: 'Jan 21 - Feb 24',
        location: 'Chennai, India',
        icon: Terminal,
    },
    {
        id: 'freelance-vis',
        role: 'Visual Media',
        company: 'Freelance',
        type: 'Mixed Media • Content Creation • Generative AI',
        date: 'Jan 18 - Present',
        location: 'Saarbrücken, Germany',
        icon: Palette,
    },
    {
        id: 'freelance-photo',
        role: 'Photographer',
        company: 'Freelance',
        type: '',
        date: 'Jan 15 - Present',
        location: 'Saarbrücken, Germany',
        icon: Camera,
    },
    {
        id: 'planetcricket',
        role: 'Graphics Designer',
        company: 'planetcricket.org',
        type: 'Mod/Patch Developer',
        date: 'Mar 13 - Mar 14',
        location: 'India',
        icon: Gamepad2,
    }
];

const timelineItem = {
    hidden: {
        opacity: 0,
        x: -30,
        filter: 'blur(6px)',
    },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.8,
            ease: EASE_PREMIUM,
            delay: i * 0.1,
        },
    }),
};

export default function Experience() {
    const { ref, isInView } = useScrollReveal({ amount: 0.1 });

    return (
        <section className="relative w-full text-foreground py-16 md:py-24 px-4 md:px-16 overflow-hidden" id="experience">
            <div ref={ref} className="max-w-[900px] mx-auto">
                {/* Header */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="mb-16 md:mb-20"
                >
                    <motion.p
                        variants={revealUp}
                        className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary/80 font-medium mb-4"
                        style={{ fontFamily: "'Google Sans', system-ui, sans-serif" }}
                    >
                        Career Path
                    </motion.p>
                    <motion.h2
                        variants={revealUp}
                        className="text-3xl md:text-5xl lg:text-6xl font-bold leading-none tracking-tight"
                        style={{ fontFamily: "'Google Sans', system-ui, sans-serif" }}
                    >
                        Experience
                    </motion.h2>
                    <motion.div variants={revealFade} className="mt-6">
                        <div className="w-16 h-[2px] bg-primary/40" />
                    </motion.div>
                </motion.div>

                {/* Vertical Timeline */}
                <div className="relative">
                    {/* Glowing vertical line */}
                    <motion.div
                        initial={{ scaleY: 0 }}
                        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                        transition={{ duration: 1.5, ease: EASE_OUT_EXPO, delay: 0.3 }}
                        className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-[1px] origin-top"
                        style={{
                            background: 'linear-gradient(to bottom, rgba(200, 255, 0, 0.4), rgba(200, 255, 0, 0.05))',
                        }}
                    />

                    <div className="flex flex-col gap-0">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                custom={index}
                                variants={timelineItem}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                className="group relative flex items-start gap-6 md:gap-8 py-6 md:py-8"
                            >
                                {/* Timeline dot */}
                                <div className="relative z-10 flex-shrink-0">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#0a0a0a] border border-white/[0.08] flex items-center justify-center group-hover:border-primary/40 group-hover:bg-[#0a0a0a] transition-all duration-200 ease-out relative z-20"
                                        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                                    >
                                        <exp.icon
                                            size={18}
                                            strokeWidth={1.5}
                                            className="text-muted-foreground group-hover:text-primary transition-colors duration-200 ease-out"
                                        />
                                    </div>
                                    {/* Glow behind dot on hover */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out pointer-events-none"
                                        style={{
                                            boxShadow: '0 0 20px rgba(200, 255, 0, 0.15)',
                                        }}
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex-1 flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-8 min-w-0">
                                    <div className="flex-1 min-w-0">
                                        {/* Company — bold */}
                                        <h3
                                            className="text-base md:text-lg font-bold text-foreground group-hover:text-primary/90 transition-colors duration-200 ease-out tracking-tight"
                                            style={{
                                                fontFamily: "'Google Sans', system-ui, sans-serif",
                                                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                                            }}
                                        >
                                            {exp.company}
                                        </h3>

                                        {/* Role — badge style */}
                                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                            <span
                                                className="inline-block px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold text-primary/90 border border-primary/20 bg-primary/5"
                                                style={{ fontFamily: "'Google Sans', system-ui, sans-serif" }}
                                            >
                                                {exp.role}
                                            </span>
                                            {exp.type && (
                                                <span
                                                    className="text-[11px] text-muted-foreground font-medium"
                                                    style={{ fontFamily: "'Google Sans', system-ui, sans-serif" }}
                                                >
                                                    {exp.type}
                                                </span>
                                            )}
                                        </div>

                                        {/* Photographer portfolio link */}
                                        {exp.id === 'freelance-photo' && (
                                            <motion.a
                                                href="https://4nuraag-blend.figma.site/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ x: 4 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                                className="mt-2 inline-flex items-center text-[10px] font-bold text-primary hover:text-foreground transition-colors duration-200 ease-out uppercase tracking-[0.15em]"
                                                style={{ fontFamily: "'Google Sans', system-ui, sans-serif" }}
                                            >
                                                Visit Portfolio →
                                            </motion.a>
                                        )}
                                    </div>

                                    {/* Date & Location — monospace timestamp */}
                                    <div className="flex flex-row md:flex-col items-start md:items-end gap-2 md:gap-1 flex-shrink-0 mt-1 md:mt-0">
                                        <span
                                            className="text-[11px] font-semibold text-primary/70 uppercase tracking-wider"
                                            style={{ fontFamily: "'Google Sans', system-ui, sans-serif" }}
                                        >
                                            {exp.date}
                                        </span>
                                        <div className="flex items-center gap-1 text-muted-foreground/60">
                                            <MapPin size={10} strokeWidth={1.5} />
                                            <span
                                                className="text-[10px] font-medium"
                                                style={{ fontFamily: "'Google Sans', system-ui, sans-serif" }}
                                            >
                                                {exp.location}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
