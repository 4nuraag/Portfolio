'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE_PREMIUM } from '@/lib/animations';

const SECTIONS = [
    { id: 'home', target: 'hero', label: 'Home' },
    { id: 'skills', target: 'skills-section', label: 'Skills' },
    { id: 'projects', target: 'featured-works', label: 'Work' },
    { id: 'experience', target: 'experience', label: 'Experience' },
    { id: 'visual', target: 'visual-gallery', label: 'Gallery' },
    { id: 'contact', target: 'contact-section', label: 'Contact' },
] as const;

type SectionId = typeof SECTIONS[number]['id'];

export default function StickyHeader() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeSection, setActiveSection] = useState<SectionId>('home');

    // Show header after scrolling past hero
    useEffect(() => {
        const heroEl = document.getElementById('hero');
        if (heroEl) {
            const heroObserver = new IntersectionObserver(
                ([entry]) => {
                    setIsVisible(!entry.isIntersecting || entry.intersectionRatio < 0.2);
                },
                { threshold: [0, 0.2] }
            );
            heroObserver.observe(heroEl);
            return () => heroObserver.disconnect();
        }
    }, []);

    // Active section detection via scroll position
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            const triggerPoint = scrollY + viewportHeight * 0.3;

            let current: SectionId = 'home';
            for (const { id, target } of SECTIONS) {
                const el = document.getElementById(target);
                if (!el) continue;
                if (el.offsetTop <= triggerPoint) {
                    current = id;
                }
            }
            setActiveSection(current);

            // Snap to contact when at bottom
            if (scrollY + viewportHeight >= document.body.offsetHeight - 20) {
                setActiveSection('contact');
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Run once on mount to set initial state
        return () => window.removeEventListener('scroll', handleScroll);
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
                    className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block"
                >
                    {/* Floating pill container */}
                    <nav
                        className="flex items-center gap-1 px-2 py-2 border border-white/[0.08]"
                        style={{
                            background: '#0a0a0a', // Solid background as requested
                        }}
                    >
                        {SECTIONS.map((section) => {
                            const isActive = activeSection === section.id;
                            return (
                                <motion.button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.target)}
                                    className="relative px-5 py-2 cursor-pointer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                    aria-current={isActive ? 'page' : undefined}
                                >
                                    <span
                                        className={`relative z-10 text-[13px] font-medium tracking-wide transition-colors duration-200 ease-out ${isActive
                                            ? 'text-foreground'
                                            : 'text-muted-foreground hover:text-foreground'
                                            }`}
                                        style={{
                                            fontFamily: "'Google Sans', system-ui, sans-serif",
                                            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                                        }}
                                    >
                                        {section.label}
                                    </span>

                                    {/* Active indicator — accent dot */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-active-dot"
                                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary"
                                            transition={{
                                                duration: 0.15,
                                                ease: "easeOut",
                                            }}
                                        />
                                    )}
                                </motion.button>
                            );
                        })}
                    </nav>
                </motion.header>
            )}
        </AnimatePresence>
    );
}
