'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Home, User, Briefcase, Image as ImageIcon, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
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
        <div className="fixed bottom-0 left-0 w-full z-50 md:hidden pb-safe">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-xl border-t border-border" />

            <nav className="relative flex justify-around items-center px-2 py-3 pb-5">
                {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                        <div
                            key={item.id}
                            onClick={() => scrollToSection(item.target, item.id)}
                            className="flex flex-col items-center justify-center w-full cursor-pointer group relative"
                        >
                            {/* Active indicator — slides between items with spring */}
                            {isActive && (
                                <motion.div
                                    layoutId="mobile-nav-indicator"
                                    className="absolute -top-3 w-8 h-1 bg-primary rounded-b-full"
                                    transition={{
                                        type: "spring",
                                        stiffness: 350,
                                        damping: 28,
                                    }}
                                />
                            )}

                            <motion.div
                                whileTap={{ scale: 0.85 }}
                                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                className="flex flex-col items-center gap-1"
                            >
                                {/* Icon — springs up when active */}
                                <motion.div
                                    animate={{
                                        y: isActive ? -2 : 0,
                                        scale: isActive ? 1.1 : 1,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20,
                                    }}
                                    className={`transition-colors duration-500 ${isActive ? 'text-primary' : 'text-muted-foreground'
                                        }`}
                                    style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                                >
                                    <item.icon
                                        size={24}
                                        strokeWidth={isActive ? 2.5 : 2}
                                    />
                                </motion.div>

                                {/* Label */}
                                <motion.span
                                    animate={{ opacity: isActive ? 1 : 0.6 }}
                                    transition={{ duration: 0.3, ease: EASE_PREMIUM }}
                                    className={`text-[10px] font-medium tracking-wide ${isActive ? 'text-primary' : 'text-muted-foreground'
                                        }`}
                                >
                                    {item.label}
                                </motion.span>
                            </motion.div>
                        </div>
                    );
                })}
            </nav>
        </div>
    );
}
