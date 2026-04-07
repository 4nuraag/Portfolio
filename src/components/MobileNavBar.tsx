'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Home, Briefcase, Clock, Image as ImageIcon, Mail, Cpu } from 'lucide-react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

const navItems = [
    { id: 'home' as const, icon: Home, label: 'Home', target: 'hero' },
    { id: 'skills' as const, icon: Cpu, label: 'Skills', target: 'skills-section' },
    { id: 'projects' as const, icon: Briefcase, label: 'Work', target: 'featured-works' },
    { id: 'experience' as const, icon: Clock, label: 'Exp', target: 'experience' },
    { id: 'visual' as const, icon: ImageIcon, label: 'Gallery', target: 'visual-gallery' },
    { id: 'contact' as const, icon: Mail, label: 'Contact', target: 'contact-section' },
];

type SectionId = typeof navItems[number]['id'];

export default function MobileNavBar() {
    const [activeSection, setActiveSection] = useState<SectionId>('home');

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            const triggerPoint = scrollY + viewportHeight * 0.3;

            let current: SectionId = 'home';
            for (const { id, target } of navItems) {
                const el = document.getElementById(target);
                if (!el) continue;
                if (el.offsetTop <= triggerPoint) {
                    current = id;
                }
            }
            setActiveSection(current);

            if (scrollY + viewportHeight >= document.body.offsetHeight - 20) {
                setActiveSection('contact');
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
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
        <div className="fixed bottom-6 left-0 right-0 z-50 md:hidden flex justify-center">
            <motion.nav
                initial={{ y: 60, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 28,
                    delay: 0.6,
                    mass: 0.8,
                }}
                className="relative flex items-center rounded-full border border-white/[0.1] px-1.5 py-1.5"
                style={{
                    background: 'rgba(10, 10, 10, 0.8)',
                    backdropFilter: 'blur(32px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(32px) saturate(180%)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.03) inset',
                }}
            >
                <LayoutGroup>
                    {navItems.map((item) => {
                        const isActive = activeSection === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.target)}
                                className="relative z-10 flex items-center justify-center cursor-pointer"
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    WebkitTapHighlightColor: 'transparent',
                                }}
                                aria-label={item.label}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                {/* Sliding active indicator */}
                                {isActive && (
                                    <motion.div
                                        layoutId="mobile-nav-active"
                                        className="absolute inset-0 bg-white/[0.08] rounded-full"
                                        transition={{
                                            type: 'tween',
                                            ease: [0.25, 1, 0.5, 1],
                                            duration: 0.35,
                                        }}
                                    />
                                )}

                                {/* Icon */}
                                <motion.div
                                    className="relative z-10 flex items-center justify-center"
                                    animate={{
                                        scale: isActive ? 1.08 : 1,
                                    }}
                                    transition={{
                                        type: 'tween',
                                        ease: [0.25, 1, 0.5, 1],
                                        duration: 0.35,
                                    }}
                                >
                                    <item.icon
                                        size={20}
                                        strokeWidth={isActive ? 2.2 : 1.6}
                                        className={
                                            isActive
                                                ? 'text-[#c8ff00]'
                                                : 'text-white/35'
                                        }
                                    />
                                </motion.div>
                            </button>
                        );
                    })}
                </LayoutGroup>
            </motion.nav>
        </div>
    );
}
