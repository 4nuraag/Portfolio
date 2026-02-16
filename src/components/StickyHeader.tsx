'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

export default function StickyHeader() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeSection, setActiveSection] = useState<'home' | 'skills' | 'projects' | 'visual' | 'contact' | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const threshold = window.innerHeight * 0.8;
            setIsVisible(window.scrollY > threshold);

            // Active section detection
            const sections = ['hero', 'skills-section', 'featured-works', 'visual-gallery', 'contact-section'];
            let currentSection: string | null = null;

            // Check if user has scrolled to the bottom of the page
            if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight - 20) {
                currentSection = 'contact-section';
            } else {
                for (const sectionId of sections) {
                    const element = document.getElementById(sectionId);
                    if (element) {
                        const rect = element.getBoundingClientRect();
                        // Check if section is active (covers middle of screen)
                        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
                            currentSection = sectionId;
                        }
                    }
                }
            }

            // Map section IDs to active states
            if (currentSection === 'hero') setActiveSection('home');
            else if (currentSection === 'skills-section') setActiveSection('skills');
            else if (currentSection === 'featured-works') setActiveSection('projects');
            else if (currentSection === 'visual-gallery') setActiveSection('visual');
            else if (currentSection === 'contact-section') setActiveSection('contact');
            else setActiveSection(null);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            // Offset for sticky header if needed, though scrollIntoView usually handles it well enough
            // or use window.scrollTo behavior
            element.scrollIntoView({ behavior: 'smooth' });
        } else if (id === 'hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed top-0 left-0 w-full z-50 bg-transparent md:bg-background/80 backdrop-blur-none md:backdrop-blur-md py-4 md:py-6 flex flex-col items-center justify-center border-none md:border-b border-border shadow-none md:shadow-sm pointer-events-none md:pointer-events-auto"
                >
                    <div className="absolute right-4 md:right-8 top-4 md:top-1/2 md:-translate-y-1/2 pointer-events-auto">
                        <ThemeToggle />
                    </div>
                    {/* Hiding the Project title in header to make room for nav or just keeping it? 
                        User asked for buttons: Home - Skills - Projects - Visual Media - Contact.
                        Let's focus on the Nav. The title 'Projects' might be redundant if 'Projects' is a nav link.
                        But keeping a brand name or title is standard. Let's keep it minimal or remove if it conflicts.
                        User prompt: "Header should have the following buttons now."
                        I'll remove the big "Projects" title to align with standard nav bar behavior where nav IS the main thing.
                    */}

                    <nav className="hidden md:flex w-full md:w-auto overflow-x-auto no-scrollbar px-6 items-center justify-start md:justify-center space-x-6 text-sm md:text-base text-muted-foreground font-medium tracking-wide">
                        <span
                            onClick={() => scrollToSection('hero')}
                            className={`whitespace-nowrap transition-colors cursor-pointer ${activeSection === 'home' ? 'text-foreground font-bold' : 'hover:text-foreground'}`}
                        >
                            Home
                        </span>
                        <span className="text-gray-600 hidden md:inline">·</span>

                        <span
                            onClick={() => scrollToSection('skills-section')}
                            className={`whitespace-nowrap transition-colors cursor-pointer ${activeSection === 'skills' ? 'text-foreground font-bold' : 'hover:text-foreground'}`}
                        >
                            Skills
                        </span>
                        <span className="text-gray-600 hidden md:inline">·</span>

                        <span
                            onClick={() => scrollToSection('featured-works')}
                            className={`whitespace-nowrap transition-colors cursor-pointer ${activeSection === 'projects' ? 'text-foreground font-bold' : 'hover:text-foreground'}`}
                        >
                            Projects
                        </span>
                        <span className="text-gray-600 hidden md:inline">·</span>

                        <span
                            onClick={() => scrollToSection('visual-gallery')}
                            className={`whitespace-nowrap transition-colors cursor-pointer ${activeSection === 'visual' ? 'text-foreground font-bold' : 'hover:text-foreground'}`}
                        >
                            Visual Media
                        </span>
                        <span className="text-gray-600 hidden md:inline">·</span>

                        <span
                            onClick={() => scrollToSection('contact-section')}
                            className={`whitespace-nowrap transition-colors cursor-pointer ${activeSection === 'contact' ? 'text-foreground font-bold' : 'hover:text-foreground'}`}
                        >
                            Contact
                        </span>
                    </nav>
                </motion.header>
            )}
        </AnimatePresence>
    );
}
