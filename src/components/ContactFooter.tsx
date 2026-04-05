'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Instagram } from 'lucide-react';
import {
    staggerContainer,
    revealUp,
    revealFade,
    revealLeft,
    revealRight,
    EASE_PREMIUM,
    useScrollReveal,
} from '@/lib/animations';

// Social links with spring hover
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

// Stagger variant for social icons
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
        <footer id="contact-section" className="w-full text-foreground py-16 px-6 md:px-16 border-t border-border pb-24 md:pb-16">
            <div ref={ref} className="max-w-7xl mx-auto">

                {/* =========================================
                    MAIN CONTENT — Staggered left/right reveal
                    ========================================= */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="flex flex-col md:flex-row justify-between items-center gap-8"
                >
                    {/* Left: Text — slides in from left */}
                    <motion.div
                        variants={revealLeft}
                        className="text-center md:text-left"
                    >
                        <h3 className="text-2xl font-bold mb-2">Let&apos;s Connect</h3>
                        <p className="text-muted-foreground max-w-md">
                            Open for collaborations and new opportunities.
                            <br />
                            Feel free to reach out!
                        </p>
                    </motion.div>

                    {/* Right: Social icons — stagger in with spring hover */}
                    <motion.div
                        variants={iconStagger}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="flex gap-6"
                    >
                        {socials.map((social) => (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                target={social.external ? "_blank" : undefined}
                                rel={social.external ? "noopener noreferrer" : undefined}
                                variants={iconChild}
                                whileHover={{
                                    scale: 1.2,
                                    y: -4,
                                }}
                                whileTap={{ scale: 0.9 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 15,
                                }}
                                className="text-foreground/80 hover:text-primary transition-colors duration-300 cursor-pointer"
                                style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                                aria-label={social.label}
                            >
                                <social.icon size={24} />
                            </motion.a>
                        ))}
                    </motion.div>
                </motion.div>

                {/* =========================================
                    FOOTER LINE — Fades in last
                    ========================================= */}
                <motion.div
                    variants={revealFade}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="mt-12 text-center text-sm text-muted-foreground"
                >
                    © {new Date().getFullYear()} Anuraag Vinod Kumar. All rights reserved.
                </motion.div>
            </div>
        </footer>
    );
}
