'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Instagram } from 'lucide-react';
import {
    staggerContainer,
    revealUp,
    revealFade,
    revealLeft,
    EASE_PREMIUM,
    useScrollReveal,
} from '@/lib/animations';

const socials = [
    {
        href: 'mailto:anuraag.vinod@gmail.com',
        icon: Mail,
        label: 'Email',
        external: false,
    },
    {
        href: 'https://www.linkedin.com/in/anuraagvk/',
        icon: Linkedin,
        label: 'LinkedIn',
        external: true,
    },
    {
        href: 'https://www.instagram.com/4nuraag.blend/',
        icon: Instagram,
        label: 'Instagram',
        external: true,
    },
];

const iconStagger = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.4,
        },
    },
};

const iconChild = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.8,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: EASE_PREMIUM,
        },
    },
};

export default function ContactFooter() {
    const { ref, isInView } = useScrollReveal({ amount: 0.2 });

    return (
        <footer id="contact-section" className="w-full text-foreground py-16 md:py-24 px-4 md:px-16 pb-24 md:pb-24 relative">
            {/* Animated gradient line at top */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.2, ease: EASE_PREMIUM }}
                className="absolute top-0 left-6 right-6 md:left-16 md:right-16 h-[1px] origin-left"
                style={{
                    background: 'linear-gradient(to right, rgba(200, 255, 0, 0.4), rgba(200, 255, 0, 0.05), transparent)',
                }}
            />

            <div ref={ref} className="max-w-7xl mx-auto">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 md:gap-8"
                >
                    {/* Left: Large editorial text */}
                    <motion.div
                        variants={revealLeft}
                        className="space-y-4"
                    >
                        <p
                            className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary/80 font-medium"
                            style={{ fontFamily: "'Google Sans', system-ui, sans-serif" }}
                        >
                            Get in Touch
                        </p>
                        <h3
                            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-none"
                            style={{ fontFamily: "'Google Sans', system-ui, sans-serif" }}
                        >
                            Let&apos;s Connect
                        </h3>
                        <p
                            className="text-muted-foreground max-w-md text-sm md:text-base leading-relaxed mt-4"
                            style={{ fontFamily: "'Google Sans', system-ui, sans-serif" }}
                        >
                            Open for collaborations and new opportunities.
                            <br />
                            Feel free to reach out!
                        </p>
                    </motion.div>

                    {/* Right: Social icons */}
                    <motion.div
                        variants={iconStagger}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="flex gap-4"
                    >
                        {socials.map((social) => (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                target={social.external ? "_blank" : undefined}
                                rel={social.external ? "noopener noreferrer" : undefined}
                                variants={iconChild}
                                whileHover={{
                                    scale: 1.15,
                                    y: -3,
                                }}
                                whileTap={{ scale: 0.9 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 15,
                                }}
                                className="w-12 h-12 flex items-center justify-center border border-white/[0.08] text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-200 ease-out cursor-pointer"
                                style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                                aria-label={social.label}
                            >
                                <social.icon size={20} strokeWidth={1.5} />
                            </motion.a>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Copyright */}
                <motion.div
                    variants={revealFade}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="mt-16 md:mt-24 text-[11px] text-muted-foreground/50 tracking-wide"
                    style={{ fontFamily: "'Google Sans', system-ui, sans-serif" }}
                >
                    © {new Date().getFullYear()} Anuraag Vinod Kumar. All rights reserved.
                </motion.div>
            </div>
        </footer>
    );
}
