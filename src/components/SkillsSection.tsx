'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useTheme } from 'next-themes';
import SkillsGlobe from './SkillsGlobe';

export default function SkillsSection() {
  const { theme } = useTheme();
  // Default to dark if undefined or 'system' (simplification, ideally we check system preference)
  const effectiveTheme = theme === 'light' ? 'light' : 'dark';

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="skills-section" className="w-full min-h-[80vh] text-foreground py-16 md:py-24 px-6 md:px-16 flex items-center justify-center overflow-hidden relative">
      {/* Top Fade Gradient for seamless transition */}
      <div className="absolute top-0 left-0 w-full h-24 md:h-32 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl w-full flex flex-col items-center justify-center gap-12 md:gap-16">

        {/* Top: Text Content */}
        <div className="z-10 text-center space-y-6 md:space-y-8 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-7xl font-bold leading-tight">
              <span className="text-foreground whitespace-nowrap">
                Skills
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-sm md:text-lg leading-relaxed max-w-xl mx-auto text-center md:whitespace-nowrap"
          >
            Bridging the gap between creative design and technical implementation.
          </motion.p>
        </div>

        {/* Bottom: 3D Network Globe */}
        <div className="relative h-[500px] md:h-[600px] w-full max-w-[800px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-visible z-0">
          <Canvas
            camera={{ position: [0, 0, 3.8], fov: 45 }}
            className="w-full h-full"
            dpr={[1, 2]} // Optimize pixel ratio
            style={{ pointerEvents: 'auto' }} // Ensure interaction
          >
            {/* Ambient Light for any potential standard materials */}
            <ambientLight intensity={0.5} />

            <SkillsGlobe theme={effectiveTheme} isMobile={isMobile} />

            {/* Controls for user interaction */}
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Canvas>
        </div>
      </div>
    </section>
  );
}
