'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { EASE_PREMIUM, EASE_OUT_EXPO } from '@/lib/animations';

// =============================================
// Section mapping — single source of truth
// =============================================
const SECTIONS = [
    { id: 'home', target: 'hero', label: 'Home' },
    { id: 'skills', target: 'skills-section', label: 'Skills' },
    { id: 'projects', target: 'featured-works', label: 'Projects' },
    { id: 'visual', target: 'visual-gallery', label: 'Visual Media' },
    { id: 'contact', target: 'contact-section', label: 'Contact' },
] as const;

type SectionId = typeof SECTIONS[number]['id'];

export default function StickyHeader() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeSection, setActiveSection] = useState<SectionId | null>(null);

    // =============================================
    // INTERSECTION OBSERVER — replaces scroll listener
    // No more getBoundingClientRect on every frame.
    // Each section is observed independently.
    // =============================================
    useEffect(() => {
        // Visibility trigger: show header after scrolling past hero
        const heroEl = document.getElementById('hero');
        if (heroEl) {
            const heroObserver = new IntersectionObserver(
                ([entry]) => {
                    // Show header when hero is less than 20% visible
                    setIsVisible(!entry.isIntersecting || entry.intersectionRatio < 0.2);
                },
                { threshold: [0, 0.2] }
            );
            heroObserver.observe(heroEl);

            // Cleanup
            return () => heroObserver.disconnect();
        }
    }, []);

    useEffect(() => {
        // Active section detection via IntersectionObserver
        const observers: IntersectionObserver[] = [];

        SECTIONS.forEach(({ id, target }) => {
            const el = document.getElementById(target);
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
                        setActiveSection(id);
                    }
                },
                {
                    threshold: [0.3],
                    rootMargin: '-10% 0px -40% 0px',
                }
            );
            observer.observe(el);
            observers.push(observer);
        });

        // Edge case: detect bottom of page for Contact
        const handleScroll = () => {
            if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight - 20) {
                setActiveSection('contact');
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            observers.forEach(o => o.disconnect());
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToSection = useCallback((target: string) => {
        if (target === 'hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.header
                    initial={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                    transition={{ duration: 0.6, ease: EASE_PREMIUM }}
                    className="fixed top-0 left-0 w-full z-50 bg-transparent md:bg-background/70 backdrop-blur-none md:backdrop-blur-xl py-4 md:py-5 flex flex-col items-center justify-center border-none md:border-b border-border/50 shadow-none md:shadow-sm pointer-events-none md:pointer-events-auto"
                >
                    {/* Theme toggle */}
                    <div className="absolute right-4 md:right-8 top-4 md:top-1/2 md:-translate-y-1/2 pointer-events-auto">
                        <ThemeToggle />
                    </div>

                    {/* =========================================
                        NAV — with animated active indicator pill
                        The pill slides between items using layoutId
                        ========================================= */}
                    <nav className="hidden md:flex w-auto overflow-x-auto no-scrollbar px-6 items-center justify-center gap-1 text-sm text-muted-foreground font-medium tracking-wide">
                        {SECTIONS.map((section) => {
                            const isActive = activeSection === section.id;
                            return (
                                <motion.button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.target)}
                                    className="relative px-4 py-2 rounded-full whitespace-nowrap cursor-pointer transition-colors duration-300"
                                    style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                >
                                    {/* Active background pill — animates between items */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="header-active-pill"
                                            className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-full"
                                            transition={{
                                                type: "spring",
                                                stiffness: 350,
                                                damping: 30,
                                            }}
                                        />
                                    )}

                                    <span
                                        className={`relative z-10 transition-colors duration-300 ${isActive
                                            ? 'text-foreground font-semibold'
                                            : 'hover:text-foreground'
                                            }`}
                                        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                                    >
                                        {section.label}
                                    </span>
                                </motion.button>
                            );
                        })}
                    </nav>
                </motion.header>
            )}
        </AnimatePresence>
    );
}
