'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Camera, Palette, Terminal, PenTool, Gamepad2, MapPin, Calendar, Building2 } from 'lucide-react';
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

// =============================================
// TIMELINE ROW ANIMATION
// Each row slides up with staggered delay,
// and the divider line animates its width from 0
// =============================================

const timelineRow = {
    hidden: {
        opacity: 0,
        y: 30,
        filter: 'blur(6px)',
    },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.8,
            ease: EASE_PREMIUM,
            delay: i * 0.08, // Tighter stagger — feels like a cascade
        },
    }),
};

const dividerLine = {
    hidden: {
        scaleX: 0,
        originX: 0,
    },
    visible: (i: number) => ({
        scaleX: 1,
        transition: {
            duration: 0.6,
            ease: EASE_OUT_EXPO,
            delay: i * 0.08 + 0.3, // Slightly after the row appears
        },
    }),
};

export default function Experience() {
    const { ref, isInView } = useScrollReveal({ amount: 0.1 });

    return (
        <section className="relative w-full text-foreground py-16 px-6 md:px-16 overflow-hidden" id="experience">
            <div ref={ref} className="max-w-[900px] mx-auto">
                {/* =========================================
                    HEADER — Staggered reveal
                    ========================================= */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="mb-12 text-center"
                >
                    <motion.h2
                        variants={revealUp}
                        className="text-3xl md:text-5xl font-bold leading-tight mb-4 inline-block relative"
                    >
                        Experience
                    </motion.h2>

                    {/* Accent line under heading */}
                    <motion.div
                        variants={revealFade}
                        className="flex justify-center mt-2"
                    >
                        <div className="w-10 h-[1px] bg-primary/50" />
                    </motion.div>
                </motion.div>

                {/* =========================================
                    TIMELINE ROWS — Cascading stagger
                    Each row arrives 80ms after the previous,
                    with the divider line sweeping in from left
                    ========================================= */}
                <div className="flex flex-col">
                    {experiences.map((exp, index) => (
                        <React.Fragment key={exp.id}>
                            <motion.div
                                custom={index}
                                variants={timelineRow}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                className="group relative flex flex-col md:flex-row items-start md:items-center justify-between py-6"
                            >
                                {/* Left Side: Icon & Details */}
                                <div className="flex items-start gap-5 mb-3 md:mb-0">
                                    {/* Icon — scales on hover with spring physics */}
                                    <motion.div
                                        whileHover={{ scale: 1.15, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                        className="flex items-center justify-center shrink-0 text-foreground/70 group-hover:text-primary transition-colors duration-500"
                                        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                                    >
                                        <exp.icon size={28} strokeWidth={1.5} className="md:w-8 md:h-8" />
                                    </motion.div>

                                    <div className="flex flex-col gap-0.5">
                                        <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary/90 transition-colors duration-500" style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
                                            {exp.role}
                                        </h3>

                                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground font-medium">
                                            <span className="text-foreground/80 font-medium text-base">{exp.company}</span>
                                            {exp.type && (
                                                <>
                                                    <span className="hidden md:inline text-border/60">•</span>
                                                    <span className="text-xs opacity-80">{exp.type}</span>
                                                </>
                                            )}
                                        </div>

                                        {exp.id === 'freelance-photo' && (
                                            <motion.a
                                                href="https://4nuraag-blend.figma.site/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ x: 4 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                                className="mt-2 md:mt-1 inline-flex items-center text-xs font-bold text-primary hover:text-foreground transition-colors duration-300 uppercase tracking-wider"
                                            >
                                                Visit Portfolio →
                                            </motion.a>
                                        )}
                                    </div>
                                </div>

                                {/* Right Side: Date & Location */}
                                <div className="flex flex-row md:flex-col items-center md:items-end gap-x-6 gap-y-0.5 ml-auto md:ml-0 pl-[52px] md:pl-0 w-full md:w-auto">
                                    <div className="text-sm font-semibold uppercase tracking-wider text-primary/80">
                                        {exp.date}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium">
                                        <MapPin size={12} strokeWidth={1.5} />
                                        <span>{exp.location}</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Animated divider line — sweeps in from left */}
                            {index !== experiences.length - 1 && (
                                <motion.div
                                    custom={index}
                                    variants={dividerLine}
                                    initial="hidden"
                                    animate={isInView ? "visible" : "hidden"}
                                    className="h-[1px] bg-border/40"
                                />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
}
