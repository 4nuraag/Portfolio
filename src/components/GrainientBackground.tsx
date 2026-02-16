'use client';

import { useTheme } from 'next-themes';
import Grainient from '@/components/Grainient';
import { useEffect, useState } from 'react';

export default function GrainientBackground() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = resolvedTheme === 'dark';

    // Light colors: Clean White/Very Subtle Rose/Soft Pastel Red (Porcelain look)
    // Dark colors: Black/Slate 950/Blue 950 (Deep Midnight look)
    const colors = isDark ? {
        color1: '#000000', // Black
        color2: '#020617', // Slate 950
        color3: '#172554', // Blue 950
    } : {
        color1: '#ffffff', // Pure White
        color2: '#fef2f2', // Red 50 (Very faint pink)
        color3: '#fecaca', // Red 200 (Soft pastel red)
    };

    return (
        <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
            <Grainient
                {...colors}
                timeSpeed={0.25}
                colorBalance={-0.06}
                warpStrength={0}
                warpFrequency={6}
                warpSpeed={2.3}
                warpAmplitude={50}
                blendAngle={-30}
                blendSoftness={0.05}
                rotationAmount={500}
                noiseScale={2}
                grainAmount={0.1}
                grainScale={2}
                grainAnimated={false}
                contrast={1.5}
                gamma={1}
                saturation={1}
                centerX={0}
                centerY={0}
                zoom={0.9}
                className="w-full h-full"
            />
        </div>
    );
}
