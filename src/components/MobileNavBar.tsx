'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Home, User, Briefcase, Image as ImageIcon, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE_PREMIUM } from '@/lib/animations';

const navItems = [
    { id: 'home' as const, icon: Home, label: 'Home', target: 'hero' },
    { id: 'skills' as const, icon: User, label: 'Skills', target: 'skills-section' },
    { id: 'projects' as const, icon: Briefcase, label: 'Works', target: 'featured-works' },
    { id: 'visual' as const, icon: ImageIcon, label: 'Visuals', target: 'visual-gallery' },
    { id: 'contact' as const, icon: Mail, label: 'Contact', target: 'contact-section' },
];

type SectionId = typeof navItems[number]['id'];

export default function MobileNavBar() {
    const [activeSection, setActiveSection] = useState<SectionId>('home');

    // =============================================
    // INTERSECTION OBSERVER — replaces scroll listener
    // Each section is observed independently.
    // =============================================
    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        navItems.forEach(({ id, target }) => {
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

        // Edge case: bottom of page = contact
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

    const scrollToSection = useCallback((target: string, section: SectionId) => {
        if (target === 'hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setActiveSection('home');
        } else {
            document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(section);
        }
    }, []);

    return (
        <div className="fixed bottom-5 left-0 right-0 z-50 md:hidden flex justify-center px-4">
            {/* Floating Dock Container */}
            <motion.nav
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 24,
                    delay: 0.5,
                }}
                className="relative flex items-center gap-1 px-2 py-2 rounded-full border border-white/10 shadow-lg shadow-black/20"
                style={{
                    background: 'rgba(10, 10, 10, 0.75)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                }}
            >
                {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                        <motion.button
                            key={item.id}
                            onClick={() => scrollToSection(item.target, item.id)}
                            className="relative flex items-center justify-center rounded-full cursor-pointer z-10"
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            style={{ padding: isActive ? '8px 16px' : '10px' }}
                            aria-label={item.label}
                        >
                            {/* Active pill background — slides between items */}
                            {isActive && (
                                <motion.div
                                    layoutId="floating-dock-pill"
                                    className="absolute inset-0 rounded-full bg-primary"
                                    transition={{
                                        type: "spring",
                                        stiffness: 350,
                                        damping: 28,
                                    }}
                                />
                            )}

                            {/* Icon */}
                            <motion.div
                                animate={{
                                    scale: isActive ? 1.05 : 1,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20,
                                }}
                                className={`relative z-10 transition-colors duration-300 ${
                                    isActive ? 'text-primary-foreground' : 'text-white/50'
                                }`}
                                style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                            >
                                <item.icon
                                    size={20}
                                    strokeWidth={isActive ? 2.5 : 1.8}
                                />
                            </motion.div>

                            {/* Label — only visible on active item */}
                            <AnimatePresence mode="wait">
                                {isActive && (
                                    <motion.span
                                        initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                                        animate={{ width: 'auto', opacity: 1, marginLeft: 6 }}
                                        exit={{ width: 0, opacity: 0, marginLeft: 0 }}
                                        transition={{ duration: 0.25, ease: EASE_PREMIUM }}
                                        className="relative z-10 text-[11px] font-bold tracking-wide text-primary-foreground whitespace-nowrap overflow-hidden"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    );
                })}
            </motion.nav>
        </div>
    );
}
