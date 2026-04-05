'use client';

import React, { useState, useEffect, useRef } from 'react';

// Lazy-load BackgroundBeams — it has 50 animated SVG gradients
// that burn CPU/GPU. Only mount after first paint, and pause when
// the user has scrolled far enough that the beams aren't visible.
const LazyBackgroundBeams = React.lazy(
    () => import('@/components/ui/background-beams').then(mod => ({ default: mod.BackgroundBeams }))
);

export default function LazyBackgroundBeamsWrapper({ className }: { className?: string }) {
    const [shouldMount, setShouldMount] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const sentinelRef = useRef<HTMLDivElement>(null);

    // Delay mount until after first paint (requestIdleCallback or setTimeout fallback)
    useEffect(() => {
        const schedule = (window as any).requestIdleCallback || ((cb: () => void) => setTimeout(cb, 200));
        const id = schedule(() => setShouldMount(true));
        return () => {
            const cancel = (window as any).cancelIdleCallback || clearTimeout;
            cancel(id);
        };
    }, []);

    // Use IntersectionObserver to hide beams when scrolled past
    // This prevents the 50 gradient animations from running off-screen
    useEffect(() => {
        if (!sentinelRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0 }
        );

        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            {/* Sentinel div — same size as the beams container */}
            <div ref={sentinelRef} className={`${className} pointer-events-none`} />

            {shouldMount && isVisible && (
                <React.Suspense fallback={null}>
                    <LazyBackgroundBeams className={className} />
                </React.Suspense>
            )}
        </>
    );
}
