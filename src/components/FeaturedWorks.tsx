'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import ProjectOverlay from './ProjectOverlay';
import { prefix } from '../lib/utils';

// Data Structure - Keeping original content
const projects = [
    {
        id: 'brainary',
        title: 'Brainary Education App',
        subtitle: 'HiFi Prototype',
        // Updated description and tags based on request/reference style
        description: 'Brainary is a learning platform that combines customizable libraries, a collaborative workspace, and an AI Genie to summarize materials. Its focus-driven design helps students redefine how they study.',
        skills: 'UX/UI Design · Prototyping · HCI',
        tags: ['UI UX Designing', 'Figma', 'Hi-Fi Prototyping', 'Lo-Fi Prototyping', 'User Study', 'Requirement Analysis', 'Wireframing'], // Added tags
        tools: 'Figma, Adobe Photoshop',
        image: prefix('/gallery/Brainary.png'), // Updated image path
        link: 'https://www.figma.com/proto/MBEz2Nl2Xj8MTf9zGz8b6e/Brainary--Copy-?node-id=1-2&p=f&t=s1eTJqDm1SMajO3s-0&scaling=contain&content-scaling=fixed&page-id=0%3A1', // Direct link
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
        image: prefix('/gallery/ST.png'),
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
        image: prefix('/gallery/photography (2).png'),
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
        image: prefix('/gallery/canteen.png'),
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
        image: prefix('/gallery/CAARD b2b.png'),
        link: 'https://www.figma.com/proto/6TMe8nRYBVq1Z8EBRacml1/CAARD-B2B-Revamp?node-id=1-3&t=s1eTJqDm1SMajO3s-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A3',
        buttonText: 'View Prototype'
    },
    {
        id: 'data-vis',
        title: 'Data Visualization',
        subtitle: '', // No subheading
        description: 'A collection of interactive dashboards developed using Power BI and Tableau to transform complex datasets into actionable insights. These projects showcase advanced data storytelling across diverse sectors, including sports analytics and academic research, with a focus on clarity and user engagement.',
        skills: 'Analytics · Business-Intelligence · Data-Storytelling',
        tags: ['Power-BI', 'Tableau', 'Data-Visualization', 'Analytics', 'Business-Intelligence', 'Data-Storytelling'],
        tools: 'Power BI, Tableau',
        image: prefix('/gallery/Data Vis.png'),
        link: '', // No link
        buttonText: null // Explicitly no button
    },
    {
        id: 'caard',
        title: 'CAARD',
        subtitle: 'Design Intern',
        description: 'Produced UI contents for the CAARD mobile application, social media posts, and marketing visuals. Developed 3D models, feature-specific logos, and high-fidelity dashboard design prototypes to streamline user experience and brand identity.',
        skills: 'UI/UX · 3D Modeling · Branding',
        tags: ['UI/UX-Design', '3D-Modeling', 'Marketing-Visuals', 'Social-Media-Design', 'Dashboard-Prototyping', 'Branding'],
        tools: 'Figma, Blender',
        image: prefix('/gallery/5.jpg'),
        link: 'https://www.caard.net/',
        buttonText: 'Visit Website'
    },
];

export default function FeaturedWorks() {
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

    // Infinite Scroll Setup
    // We create a triple set of items: [Buffer-Left, Main-Set, Buffer-Right]
    const extendedProjects = [...projects, ...projects, ...projects];
    const totalItems = projects.length;

    // Start at the beginning of the middle set
    const [currentIndex, setCurrentIndex] = useState(totalItems);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Helper to calculate mod for dots
    const displayIndex = currentIndex % totalItems;

    const [cardWidth, setCardWidth] = useState(0);
    const [gap, setGap] = useState(24);
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateDimensions = () => {
            // ... existing dimension logic logic ... 
            // We need to query the card width from DOM if possible, or fallback manually
            // Since we have multiple cards now, refs might be tricky. 
            // We can target the first card of the middle set.
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
        // We only reset if we've gone outside the "Middle Set" boundaries
        // Middle set is from index [totalItems] to [2*totalItems - 1]

        // If we scrolled past the end of the middle set (to totalItems * 2)
        if (currentIndex >= 2 * totalItems) {
            setIsTransitioning(false);
            // Reset to the start of the middle set + overlap
            // e.g. if we went to 2*N, we go to N. 
            setCurrentIndex(currentIndex - totalItems);
        }
        // If we scrolled past the start of the middle set (to totalItems - 1)
        else if (currentIndex < totalItems) {
            setIsTransitioning(false);
            // Reset to the end of the middle set
            setCurrentIndex(currentIndex + totalItems);
        } else {
            setIsTransitioning(false);
        }
    };

    // Auto-correct dimension if cardRef changes (e.g. initial render)
    useEffect(() => {
        if (cardRef.current && cardWidth === 0) {
            setCardWidth(cardRef.current.offsetWidth);
        }
    }, [currentIndex, cardWidth]);


    return (
        <section className="relative w-full text-foreground py-24 px-6 md:px-16 overflow-hidden" id="featured-works">
            <div className="max-w-[1400px] mx-auto">
                {/* Header Section */}
                <div className="flex flex-col justify-center items-center mb-12 relative z-10">
                    <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-2 text-center">
                        Projects
                    </h2>
                </div>

                {/* Carousel Container with Buttons */}
                <div className="relative group/carousel">


                    {/* Carousel Track */}
                    <div
                        className="relative w-full overflow-visible"
                        ref={containerRef}
                    >
                        <motion.div
                            className="flex gap-6 md:gap-8"
                            animate={{ x: -currentIndex * (cardWidth + gap) }}
                            // Only animate if transitioning is true (normal move). 
                            // If false (reset jump), duration should be 0.
                            transition={isTransitioning
                                ? { type: "spring", stiffness: 300, damping: 30 }
                                : { duration: 0 }
                            }
                            onAnimationComplete={handleAnimationComplete}
                            style={{ width: 'max-content' }}
                        >
                            {extendedProjects.map((project, index) => (
                                <motion.div
                                    key={`${project.id}-${index}`}
                                    // Ref logic: we only need one reference to measure width.
                                    // Let's use the first item of the middle set.
                                    // Middle set starts at 'totalItems'.
                                    ref={index === totalItems ? cardRef : null}
                                    className={`relative flex-shrink-0 w-[85vw] md:w-[600px] lg:w-[700px] aspect-[16/9] md:aspect-[16/10] rounded-3xl overflow-hidden cursor-pointer group border border-white/10`}
                                    onClick={() => {
                                        if (project.link && project.link.startsWith('http')) {
                                            window.open(project.link, '_blank');
                                        } else {
                                            setSelectedProject(project);
                                        }
                                    }}
                                    whileHover={{ scale: 1.01 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {/* Background Image */}
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:blur-[3px] group-hover:brightness-50 opacity-80"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-500 group-hover:opacity-80" />

                                    {/* Card Content */}
                                    <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end items-start text-left">
                                        <div className="transform translate-y-8 md:translate-y-16 group-hover:translate-y-0 transition-transform duration-500 w-full">

                                            {/* Tags - Visible on Hover */}
                                            {project.tags && (
                                                <div className="flex flex-wrap gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                    {project.tags.map(tag => (
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

                                                {/* Description - Expanded on hover */}
                                                {/* Using max-h-0 to remove layout space when not hovered, then animate height/opacity */}
                                                <div className="max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-700 ease-in-out overflow-hidden hidden md:block">
                                                    <p className="text-zinc-200 text-sm leading-relaxed max-w-lg py-2">
                                                        {project.description}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Action Button */}
                                            {/* Action Button - Always render to preserve layout space, hide if no link/text */}
                                            <div className={`mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 delay-300 shadow-lg shadow-white/10 ${(!project.link && !project.buttonText) ? 'opacity-0 invisible pointer-events-none' : 'opacity-0 group-hover:opacity-100'
                                                }`}>
                                                <span className="text-xs uppercase tracking-wider font-bold">
                                                    {project.buttonText || 'View Case Study'}
                                                </span>
                                                <ArrowUpRight size={14} />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Scroll Indicator & Controls */}
                    <div className="flex justify-center items-center gap-6 mt-12 md:mt-16">
                        <button
                            onClick={prevSlide}
                            className="w-12 h-12 rounded-full flex items-center justify-center text-foreground hover:bg-primary/20 hover:text-primary transition-all duration-300"
                            aria-label="Previous project"
                        >
                            <ChevronLeft size={28} />
                        </button>

                        <div className="flex gap-3">
                            {projects.map((_, index) => (
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
                                    aria-label={`Go to project ${index + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextSlide}
                            className="w-12 h-12 rounded-full flex items-center justify-center text-foreground hover:bg-primary/20 hover:text-primary transition-all duration-300"
                            aria-label="Next project"
                        >
                            <ChevronRight size={28} />
                        </button>
                    </div>
                </div>

                {/* Overlay Modal */}
                <ProjectOverlay
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            </div>
        </section>
    );
}
