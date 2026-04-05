'use client';

import { useRef } from 'react';
import { useInView, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

// =============================================
// PREMIUM EASING CURVES
// These replace Framer Motion's defaults with
// the smooth, weighted curves used by NINTH°
// =============================================

/** Signature premium ease — slow start, fast middle, soft landing */
export const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

/** Snappy expo-out — great for entrance reveals */
export const EASE_OUT_EXPO = [0.19, 1, 0.22, 1] as const;

/** Smooth quart-out — ideal for hover states */
export const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;

/** Symmetric ease — for looping or bidirectional animations */
export const EASE_IN_OUT_CUBIC = [0.65, 0, 0.35, 1] as const;


// =============================================
// STAGGER REVEAL VARIANTS
// Drop-in variants for motion.div containers
// that reveal children in choreographed sequence
// =============================================

/** 
 * Container variant — wrap children in this to get staggered reveals.
 * Usage: <motion.div variants={staggerContainer} initial="hidden" whileInView="visible">
 */
export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1,
        },
    },
};

/** 
 * Child variant — slide up + blur reveal.
 * Usage: <motion.div variants={revealUp}>
 */
export const revealUp = {
    hidden: {
        opacity: 0,
        y: 40,
        filter: 'blur(8px)',
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.9,
            ease: EASE_PREMIUM,
        },
    },
};

/**
 * Child variant — fade in only (for elements that shouldn't move).
 */
export const revealFade = {
    hidden: {
        opacity: 0,
        filter: 'blur(6px)',
    },
    visible: {
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
            duration: 0.8,
            ease: EASE_OUT_EXPO,
        },
    },
};

/**
 * Child variant — slide in from left.
 */
export const revealLeft = {
    hidden: {
        opacity: 0,
        x: -40,
        filter: 'blur(8px)',
    },
    visible: {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.9,
            ease: EASE_PREMIUM,
        },
    },
};

/**
 * Child variant — slide in from right.
 */
export const revealRight = {
    hidden: {
        opacity: 0,
        x: 40,
        filter: 'blur(8px)',
    },
    visible: {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.9,
            ease: EASE_PREMIUM,
        },
    },
};

/**
 * Scale reveal — for cards and images.
 */
export const revealScale = {
    hidden: {
        opacity: 0,
        scale: 0.92,
        filter: 'blur(6px)',
    },
    visible: {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
            duration: 1.0,
            ease: EASE_PREMIUM,
        },
    },
};


// =============================================
// SCROLL REVEAL HOOK
// Returns { ref, isInView } for whileInView triggers
// with configurable threshold and margin
// =============================================

interface ScrollRevealOptions {
    /** Only trigger once (default: true) */
    once?: boolean;
    /** How much of the element must be visible 0-1 (default: 0.15) */
    amount?: number;
    /** IntersectionObserver rootMargin (default: "0px 0px -80px 0px") */
    margin?: string;
}

export function useScrollReveal(options?: ScrollRevealOptions) {
    const {
        once = true,
        amount = 0.15,
        margin = "0px 0px -80px 0px",
    } = options || {};

    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, {
        once,
        amount,
        margin: margin as any,
    });

    return { ref, isInView };
}


// =============================================
// PARALLAX SECTION HOOK
// Creates a scroll-linked parallax transform
// for any section — background or foreground
// =============================================

interface ParallaxOptions {
    /** Speed multiplier. < 1 = slower (background), > 1 = faster (foreground) */
    speed?: number;
    /** Smooth spring stiffness (default: 100) */
    stiffness?: number;
    /** Smooth spring damping (default: 30) */
    damping?: number;
}

export function useParallax(options?: ParallaxOptions) {
    const {
        speed = 0.3,
        stiffness = 100,
        damping = 30,
    } = options || {};

    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness,
        damping,
        restDelta: 0.001,
    });

    const y = useTransform(
        smoothProgress,
        [0, 1],
        [`${-50 * speed}px`, `${50 * speed}px`]
    );

    return { ref, y, scrollYProgress: smoothProgress };
}
