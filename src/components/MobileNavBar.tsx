'use client';

import React, { useState, useEffect } from 'react';
import { Home, User, Briefcase, Image as ImageIcon, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MobileNavBar() {
    const [activeSection, setActiveSection] = useState<'home' | 'skills' | 'projects' | 'visual' | 'contact'>('home');

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['hero', 'skills-section', 'featured-works', 'visual-gallery', 'contact-section'];
            let current: string | null = null;

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // If the section's top is visible or it's taking up most of the viewport
                    if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
                        current = sectionId;
                    }
                }
            }

            if (current === 'hero') setActiveSection('home');
            else if (current === 'skills-section') setActiveSection('skills');
            else if (current === 'featured-works') setActiveSection('projects');
            else if (current === 'visual-gallery') setActiveSection('visual');
            else if (current === 'contact-section') setActiveSection('contact');
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string, section: any) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(section);
        } else if (id === 'hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setActiveSection('home');
        }
    };

    const navItems = [
        { id: 'home', icon: Home, label: 'Home', target: 'hero' },
        { id: 'skills', icon: User, label: 'Skills', target: 'skills-section' },
        { id: 'projects', icon: Briefcase, label: 'Works', target: 'featured-works' },
        { id: 'visual', icon: ImageIcon, label: 'Visuals', target: 'visual-gallery' },
        { id: 'contact', icon: Mail, label: 'Contact', target: 'contact-section' },
    ];

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
                            className="flex flex-col items-center justify-center w-full cursor-pointer group"
                        >
                            <motion.div
                                whileTap={{ scale: 0.9 }}
                                className={`flex flex-col items-center gap-1 transition-colors duration-300 ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                                    }`}
                            >
                                <item.icon
                                    size={24}
                                    strokeWidth={isActive ? 2.5 : 2}
                                    className="transition-all duration-300"
                                />
                                <span className={`text-[10px] font-medium tracking-wide ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                                    {item.label}
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="mobile-nav-indicator"
                                        className="absolute -top-3 w-8 h-1 bg-primary rounded-b-full shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </motion.div>
                        </div>
                    );
                })}
            </nav>
        </div>
    );
}
