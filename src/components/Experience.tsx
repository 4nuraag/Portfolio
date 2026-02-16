'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Camera, Palette, Terminal, PenTool, Gamepad2, MapPin, Calendar, Building2 } from 'lucide-react';

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

export default function Experience() {
    return (
        <section className="relative w-full text-foreground py-16 px-6 md:px-16 overflow-hidden" id="experience">
            <div className="max-w-[900px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4 inline-block relative">
                        Experience
                    </h2>
                </motion.div>

                <div className="flex flex-col">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`group relative flex flex-col md:flex-row items-start md:items-center justify-between py-6 transition-all duration-300 ${index !== experiences.length - 1 ? 'border-b border-border/40' : ''
                                }`}
                        >
                            {/* Left Side: Icon & Details */}
                            <div className="flex items-start gap-5 mb-3 md:mb-0">
                                <div className={`flex items-center justify-center shrink-0 text-foreground/70 group-hover:text-primary transition-colors duration-300`}>
                                    <exp.icon size={28} strokeWidth={1.5} className="md:w-8 md:h-8" />
                                </div>

                                <div className="flex flex-col gap-0.5">
                                    <h3 className="text-xl md:text-2xl font-bold text-foreground">
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
                                        <a
                                            href="https://4nuraag-blend.figma.site/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-2 inline-flex items-center text-xs font-bold text-primary hover:text-foreground transition-colors uppercase tracking-wider md:hidden"
                                        >
                                            Visit Portfolio →
                                        </a>
                                    )}
                                    {exp.id === 'freelance-photo' && (
                                        <a
                                            href="https://4nuraag-blend.figma.site/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hidden md:inline-flex mt-1 text-xs font-bold text-primary hover:text-foreground transition-colors uppercase tracking-wider"
                                        >
                                            Visit Portfolio →
                                        </a>
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
                    ))}
                </div>
            </div>
        </section>
    );
}
