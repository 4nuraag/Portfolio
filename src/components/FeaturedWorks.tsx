'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import ProjectOverlay from './ProjectOverlay';
import {
    staggerContainer,
    revealUp,
    revealFade,
    EASE_PREMIUM,
    useScrollReveal,
} from '@/lib/animations';

// Data — All content preserved exactly
const projects = [
    {
        id: 'brainary',
        title: 'Brainary Education App',
        subtitle: 'HiFi Prototype',
        description: 'Brainary is a learning platform that combines customizable libraries, a collaborative workspace, and an AI Genie to summarize materials. Its focus-driven design helps students redefine how they study.',
        skills: 'UX/UI Design · Prototyping · HCI',
        tags: ['UI UX Designing', 'Figma', 'Hi-Fi Prototyping', 'Lo-Fi Prototyping', 'User Study', 'Requirement Analysis', 'Wireframing'],
        tools: 'Figma, Adobe Photoshop',
        image: './gallery/Brainary.png',
        link: 'https://www.figma.com/proto/MBEz2Nl2Xj8MTf9zGz8b6e/Brainary--Copy-?node-id=1-2&p=f&t=s1eTJqDm1SMajO3s-0&scaling=contain&content-scaling=fixed&page-id=0%3A1',
        buttonText: 'View Prototype'
    },
    {
        id: 'smalltown',
        title: 'smalltownproductions.de',
        subtitle: 'Portfolio design',
        description: 'A modern, high-performance multimedia portfolio and service platform for Small Town Productions, built using WordPress, Elementor, custom CSS and HTML integrations tailored for showcasing high-quality videography and creative media services.',
        skills: 'Web Design · UI Motion · Typography',
        tags: ['WordPress', 'Elementor', 'HTML/CSS', 'Responsive-Design', 'UI/UX', 'Web-Optimization'],
        tools: 'Figma, Spline',
        image: './gallery/ST.png',
        link: 'https://smalltownproductions.de/',
        buttonText: 'Visit Website'
    },
    {
        id: 'photography-portfolio',
        title: 'Visual Portfolio',
        subtitle: 'Portfolio Design',
        description: 'A minimalist photography portfolio from the ground up, beginning with strategic Figma wireframes and utilizing Figma Make to build a bespoke visual interface. The project focuses on a unique, distraction-free layout that prioritizes high-impact media through clean aesthetics and intuitive navigation',
        skills: 'Web Design · UI Motion · Typography',
        tags: ['Figma', 'Figma Make', 'UI/UX', 'Prototyping', 'Responsive Design', 'Vibe Coding'],
        tools: 'Figma',
        image: './gallery/photography (2).png',
        link: 'https://4nuraag-blend.figma.site/',
        buttonText: 'View Website'
    },
    {
        id: 'restaurant-webapp',
        title: 'Restaurant WebApp',
        subtitle: 'Hi-Fi Prototype',
        description: 'A full-stack canteen management web app built using Angular, Java, HTML & CSS, and RESTful APIs. Featuring dynamic menus, user authentication, wallet and real-time order control. Built with MVC architecture for modularity & scalable client-server communication.',
        skills: 'Angular · REST API · Java · HTML/CSS',
        tags: ['Angular', 'REST API', 'Java', 'HTML/CSS', 'API Testing', 'JSON', 'MVC Architecture', 'UI & UX design'],
        tools: 'Postman, DevTools, Git, Eclipse IDE, Adobe Photoshop, Visual Studio Code',
        image: './gallery/canteen.png',
        link: 'https://4nuraag.github.io/archimedes-canteen/',
        buttonText: 'View Prototype'
    },
    {
        id: 'crm-analytics',
        title: 'CRM Analytics Dashboard',
        subtitle: 'Hi Fi Prototype',
        description: 'A high-fidelity CRM analytics dashboard designed in Figma for a digital networking brand. A sleek dark-mode UI and brand-aligned visuals. The prototype focuses on streamlining complex networking metrics like QR scans and tap rates into an intuitive, modern interface.',
        skills: 'Data-Visualization · UI/UX · Dark-Mode',
        tags: ['Figma', 'UI/UX', 'CRM-Dashboard', 'Data-Visualization', 'Prototyping', 'Dark-Mode'],
        tools: 'Figma',
        image: './gallery/CAARD b2b.png',
        link: 'https://4nuraag.github.io/B2B-CRM-Dashboard-UI-UX/#/dashboard',
        buttonText: 'View Prototype'
    },
    {
        id: 'data-vis',
        title: 'Data Visualization',
        subtitle: '',
        description: 'A collection of interactive dashboards developed using Power BI and Tableau to transform complex datasets into actionable insights. These projects showcase advanced data storytelling across diverse sectors, including sports analytics and academic research, with a focus on clarity and user engagement.',
        skills: 'Analytics · Business-Intelligence · Data-Storytelling',
        tags: ['Power-BI', 'Tableau', 'Data-Visualization', 'Analytics', 'Business-Intelligence', 'Data-Storytelling'],
        tools: 'Power BI, Tableau',
        image: './gallery/Data Vis.png',
        link: '',
        buttonText: null
    },
    {
        id: 'caard',
        title: 'CAARD',
        subtitle: 'Design Intern',
        description: 'Produced UI contents for the CAARD mobile application, social media posts, and marketing visuals. Developed 3D models, feature-specific logos, and high-fidelity dashboard design prototypes to streamline user experience and brand identity.',
        skills: 'UI/UX · 3D Modeling · Branding',
        tags: ['UI/UX-Design', '3D-Modeling', 'Marketing-Visuals', 'Social-Media-Design', 'Dashboard-Prototyping', 'Branding'],
        tools: 'Figma, Blender',
        image: './gallery/5.jpg',
        link: 'https://www.caard.net/',
        buttonText: 'Visit Website'
    },
];

// Varying aspect ratios per card — creates natural masonry rhythm
// Cycle: 4/3, 16/9, 1/1, 16/9, 4/3, 3/4, 16/9
const IMAGE_ASPECT_RATIOS = [
    '4 / 3',    // 0 — Brainary
    '16 / 9',   // 1 — smalltown
    '1 / 1',    // 2 — photography
    '16 / 9',   // 3 — restaurant
    '4 / 3',    // 4 — CRM
    '3 / 4',    // 5 — data-vis (portrait, tall card)
    '16 / 9',   // 6 — CAARD
];

// Card reveal animation
const cardReveal = {
    hidden: {
        opacity: 0,
        y: 40,
        filter: 'blur(6px)',
    },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.8,
            ease: EASE_PREMIUM,
            delay: i * 0.08,
        },
    }),
};

const MAX_VISIBLE_TAGS = 3;

function ProjectCard({
    project,
    index,
    onSelect,
}: {
    project: typeof projects[0];
    index: number;
    onSelect: (p: typeof projects[0]) => void;
}) {
    const visibleTags = project.tags?.slice(0, MAX_VISIBLE_TAGS) ?? [];
    const overflow = (project.tags?.length ?? 0) - MAX_VISIBLE_TAGS;
    const aspectRatio = IMAGE_ASPECT_RATIOS[index % IMAGE_ASPECT_RATIOS.length];

    return (
        <motion.div
            custom={index}
            variants={cardReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="group relative flex flex-col cursor-pointer overflow-hidden border border-white/[0.07] bg-card transition-all duration-200 ease-out hover:border-primary/40 break-inside-avoid"
            style={{
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                marginBottom: '20px',
            }}
            onClick={() => onSelect(project)}
        >
            {/* ── IMAGE ── */}
            <div className="relative w-full flex-shrink-0 overflow-hidden" style={{ aspectRatio }}>
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    loading="lazy"
                    className="object-cover object-[center_top] transition-transform duration-400 ease-out group-hover:scale-[1.04]"
                    style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                />
            </div>

            {/* ── BODY ── */}
            <div className="flex flex-1 flex-col gap-0 px-5 py-5 md:px-6 md:py-6">
                {/* Tags */}
                {visibleTags.length > 0 && (
                    <div className="mb-3.5 flex flex-wrap gap-1.5">
                        {visibleTags.map((tag: string) => (
                            <span
                                key={tag}
                                className="inline-flex items-center border border-white/[0.15] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.08em] leading-none text-white/60"
                                style={{ fontFamily: "'Google Sans', system-ui, sans-serif" }}
                            >
                                {tag}
                            </span>
                        ))}
                        {overflow > 0 && (
                            <span
                                className="inline-flex items-center border border-white/[0.15] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.08em] leading-none text-white/50"
                                style={{ fontFamily: "'Google Sans', system-ui, sans-serif" }}
                            >
                                +{overflow}
                            </span>
                        )}
                    </div>
                )}

                {/* Title */}
                <h3
                    className="mb-2.5 text-[1.2rem] font-bold leading-[1.3] tracking-tight text-foreground"
                    style={{ fontFamily: "'Google Sans', system-ui, sans-serif" }}
                >
                    {project.title}
                </h3>

                {/* Description — full text, no clamp, flex-1 pushes CTA down */}
                <p
                    className="mb-5 text-sm leading-[1.6] text-white/50"
                    style={{
                        fontFamily: "'Google Sans', system-ui, sans-serif",
                        flex: 1,
                    }}
                >
                    {project.description}
                </p>

                {/* CTA — always pinned to bottom */}
                <div className="mt-auto flex items-center gap-1.5">
                    {(project.link || project.buttonText) && (
                        <>
                            <span
                                className="text-[11px] font-semibold uppercase tracking-[0.1em] text-primary/80 transition-colors duration-200 ease-out group-hover:text-primary"
                                style={{ fontFamily: "'Google Sans', system-ui, sans-serif" }}
                            >
                                {project.buttonText || 'View Project'}
                            </span>
                            <ArrowUpRight
                                size={14}
                                className="text-primary/60 transition-all duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                            />
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default function FeaturedWorks() {
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
    const { ref: sectionRef, isInView } = useScrollReveal({ amount: 0.05 });

    return (
        <section className="relative w-full text-foreground py-16 md:py-24 px-4 md:px-16 overflow-hidden" id="featured-works">
            <div ref={sectionRef} className="max-w-[1200px] mx-auto">
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
                        Selected Work
                    </motion.p>
                    <motion.h2
                        variants={revealUp}
                        className="text-3xl md:text-5xl lg:text-6xl font-bold leading-none tracking-tight"
                        style={{ fontFamily: "'Google Sans', system-ui, sans-serif" }}
                    >
                        Projects
                    </motion.h2>
                    <motion.div variants={revealFade} className="mt-6">
                        <div className="w-16 h-[2px] bg-primary/40" />
                    </motion.div>
                </motion.div>

                {/* Masonry — CSS columns, varying heights */}
                <div className="projects-masonry">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            onSelect={setSelectedProject}
                        />
                    ))}
                </div>
            </div>

            {/* Project Overlay */}
            <ProjectOverlay
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
}
