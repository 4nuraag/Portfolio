'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import ProjectOverlay from './ProjectOverlay';
import {
    staggerContainer,
    revealUp,
    revealFade,
    revealScale,
    EASE_PREMIUM,
    EASE_OUT_EXPO,
    EASE_OUT_QUART,
    useScrollReveal,
} from '@/lib/animations';

// Data Structure — Keeping original content
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
        link: 'https://www.figma.com/proto/6TMe8nRYBVq1Z8EBRacml1/CAARD-B2B-Revamp?node-id=1-3&t=s1eTJqDm1SMajO3s-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A3',
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

// =============================================
// MAGNETIC CARD COMPONENT
// Card subtly follows the cursor with spring physics
// on hover — the NINTH° "pull" effect
// =============================================

function MagneticCard({
    project,
    index,
    isMobileCard,
    refAttr,
    onSelect,
}: {
    project: typeof projects[0];
    index: number;
    isMobileCard: boolean;
    refAttr: React.Ref<HTMLDivElement> | null;
    onSelect: (p: typeof projects[0]) => void;
}) {
    const cardRef = useRef<HTMLDivElement>(null);

    // Motion values for magnetic tilt effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs — the "magnetic pull"
    const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

    // Transform to subtle rotation
    const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
    const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);

    // Image parallax inside card
    const imgX = useTransform(springX, [-0.5, 0.5], [8, -8]);
    const imgY = useTransform(springY, [-0.5, 0.5], [8, -8]);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (isMobileCard) return;
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const xPct = (e.clientX - rect.left) / rect.width - 0.5;
        const yPct = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(xPct);
        mouseY.set(yPct);
    }, [isMobileCard, mouseX, mouseY]);

    const handleMouseLeave = useCallback(() => {
        mouseX.set(0);
        mouseY.set(0);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            ref={(node) => {
                // Merge refs
                (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
                if (typeof refAttr === 'function') refAttr(node);
                else if (refAttr && 'current' in refAttr) {
                    (refAttr as React.MutableRefObject<HTMLDivElement | null>).current = node;
                }
            }}
            style={isMobileCard ? {} : {
                rotateX,
                rotateY,
                transformPerspective: 1200,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative flex-shrink-0 w-[85vw] md:w-[600px] lg:w-[700px] aspect-[16/9] md:aspect-[16/10] rounded-3xl overflow-hidden cursor-pointer group border border-white/10 ${isMobileCard ? 'snap-center' : ''}`}
            onClick={() => {
                if (typeof window !== 'undefined' && window.innerWidth >= 768) {
                    if (project.link) window.open(project.link, '_blank');
                } else {
                    onSelect(project);
                }
            }}
        >
            {/* Background Image — subtle parallax on hover */}
            <motion.div
                style={isMobileCard ? {} : { x: imgX, y: imgY }}
                className="absolute inset-[-16px] will-change-transform"
            >
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:blur-[3px] group-hover:brightness-50 opacity-80"
                    style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                />
            </motion.div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-500 group-hover:opacity-80" />

            {/* Card Content */}
            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end items-start text-left">
                <div
                    className="w-full"
                    style={{
                        transform: 'translateY(2rem)',
                        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    // Use a data attribute for group-hover in pure CSS won't work here,
                    // so we rely on the parent group class
                >
                    <div className="transform translate-y-8 md:translate-y-16 group-hover:translate-y-0 transition-transform duration-700 w-full" style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
                        {/* Tags - Visible on Hover */}
                        {project.tags && (
                            <div className="flex flex-wrap gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transitionDelay: '100ms' }}>
                                {project.tags.map((tag: string) => (
                                    <span key={tag} className="px-3 py-1 rounded-full bg-black/40 border border-white/20 text-[10px] uppercase tracking-wider font-semibold backdrop-blur-md text-zinc-100">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        <h3 className="text-2xl md:text-5xl font-bold text-white mb-2 leading-tight drop-shadow-lg">
                            {project.title}
                        </h3>

                        <div className="flex flex-col gap-3 mb-1">
                            <p className={`text-primary font-medium text-base tracking-wide ${!project.subtitle ? 'invisible' : ''}`}>
                                {project.subtitle || 'Type'}
                            </p>

                            {/* Description - Expanded on hover with premium ease */}
                            <div
                                className="max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 overflow-hidden hidden md:block"
                                style={{
                                    transition: 'max-height 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                                    transitionDelay: '150ms',
                                }}
                            >
                                <p className="text-zinc-200 text-sm leading-relaxed max-w-lg py-2">
                                    {project.description}
                                </p>
                            </div>
                        </div>

                        {/* Action Button — slides up with delay */}
                        <div
                            className={`mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold hover:bg-zinc-200 shadow-lg shadow-white/10 ${(!project.link && !project.buttonText) ? 'opacity-0 invisible pointer-events-none' : 'opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'}`}
                            style={{
                                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                                transitionDelay: '250ms',
                            }}
                        >
                            <span className="text-xs uppercase tracking-wider font-bold">
                                {project.buttonText || 'View Case Study'}
                            </span>
                            <ArrowUpRight size={14} />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}


export default function FeaturedWorks() {
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

    // Infinite Scroll Setup
    const extendedProjects = [...projects, ...projects, ...projects];
    const totalItems = projects.length;

    const [currentIndex, setCurrentIndex] = useState(totalItems);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const displayIndex = currentIndex % totalItems;

    const [cardWidth, setCardWidth] = useState(0);
    const [gap, setGap] = useState(24);
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    // Section reveal
    const { ref: sectionRef, isInView } = useScrollReveal({ amount: 0.08 });

    useEffect(() => {
        const updateDimensions = () => {
            if (cardRef.current) {
                setCardWidth(cardRef.current.offsetWidth);
            }
            setGap(window.innerWidth >= 768 ? 32 : 24);
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

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

    useEffect(() => {
        if (cardRef.current && cardWidth === 0) {
            setCardWidth(cardRef.current.offsetWidth);
        }
    }, [currentIndex, cardWidth]);

    return (
        <section className="relative w-full text-foreground py-24 px-6 md:px-16 overflow-hidden" id="featured-works">
            <div ref={sectionRef} className="max-w-[1400px] mx-auto">
                {/* =========================================
                    HEADER — Staggered reveal
                    ========================================= */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="flex flex-col justify-center items-center mb-12 relative z-10"
                >
                    <motion.h2
                        variants={revealUp}
                        className="text-4xl md:text-6xl font-bold leading-tight mb-2 text-center"
                    >
                        Projects
                    </motion.h2>

                    <motion.div variants={revealFade} className="mt-2">
                        <div className="w-12 h-[1px] bg-primary/50" />
                    </motion.div>
                </motion.div>

                {/* =========================================
                    CAROUSEL — Scale reveal entrance
                    ========================================= */}
                <motion.div
                    variants={revealScale}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="relative group/carousel"
                >
                    {/* Mobile Native Carousel Track */}
                    <div className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-8 px-4 -mx-4 mt-8">
                        {projects.map((project, i) => (
                            <MagneticCard
                                key={`mobile-${project.id}-${i}`}
                                project={project}
                                index={i}
                                isMobileCard={true}
                                refAttr={null}
                                onSelect={setSelectedProject}
                            />
                        ))}
                    </div>

                    {/* Desktop Carousel Track */}
                    <div
                        className="hidden md:block relative w-full overflow-visible"
                        ref={containerRef}
                    >
                        <motion.div
                            className="flex gap-6 md:gap-8"
                            animate={{ x: -currentIndex * (cardWidth + gap) }}
                            transition={isTransitioning
                                ? {
                                    type: "spring",
                                    stiffness: 200,  // Softer than before (was 300)
                                    damping: 28,     // Slightly less damped for bouncier feel
                                    mass: 0.8,       // Lighter for snappier response
                                }
                                : { duration: 0 }
                            }
                            onAnimationComplete={handleAnimationComplete}
                            style={{ width: 'max-content' }}
                            onPanEnd={(e, info) => {
                                const swipe = info.offset.x;
                                if (swipe < -50) {
                                    nextSlide();
                                } else if (swipe > 50) {
                                    prevSlide();
                                }
                            }}
                        >
                            {extendedProjects.map((project, index) => (
                                <MagneticCard
                                    key={`${project.id}-${index}`}
                                    project={project}
                                    index={index}
                                    isMobileCard={false}
                                    refAttr={index === totalItems ? cardRef : null}
                                    onSelect={setSelectedProject}
                                />
                            ))}
                        </motion.div>
                    </div>

                    {/* =========================================
                        CONTROLS — Fade in after carousel reveals
                        ========================================= */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8, ease: EASE_PREMIUM, delay: 0.5 }}
                        className="flex justify-center items-center gap-6 mt-12 md:mt-16"
                    >
                        <motion.button
                            onClick={prevSlide}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            className="w-12 h-12 rounded-full flex items-center justify-center text-foreground hover:bg-primary/20 hover:text-primary transition-colors duration-300"
                            aria-label="Previous project"
                        >
                            <ChevronLeft size={28} />
                        </motion.button>

                        <div className="flex gap-3">
                            {projects.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setIsTransitioning(true);
                                        setCurrentIndex(totalItems + index);
                                    }}
                                    className={`h-2 rounded-full transition-all duration-500 ${index === displayIndex
                                        ? 'w-8 bg-primary'
                                        : 'w-2 bg-foreground/20 hover:bg-foreground/40'
                                        }`}
                                    style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                                    aria-label={`Go to project ${index + 1}`}
                                />
                            ))}
                        </div>

                        <motion.button
                            onClick={nextSlide}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            className="w-12 h-12 rounded-full flex items-center justify-center text-foreground hover:bg-primary/20 hover:text-primary transition-all duration-300"
                            aria-label="Next project"
                        >
                            <ChevronRight size={28} />
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* Overlay Modal */}
                <ProjectOverlay
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            </div>
        </section>
    );
}
