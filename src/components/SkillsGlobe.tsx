'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';


const skills = [
    "Adobe Creative Suite", "HTML & CSS", "Figma", "Vibe Coding",
    "Prompt Engineering", "UI/UX Designing", "Web App", "Blender 3D",
    "JavaScript", "Photography", "Graphics Designing", "Generative AI",
    "Data Visualization"
];

interface SkillsGlobeProps {
    theme: string;
    isMobile?: boolean; // Add optional prop
}

export default function SkillsGlobe({ theme, isMobile = false }: SkillsGlobeProps) {
    const groupRef = useRef<THREE.Group>(null);

    // Determine colors based on theme
    const isDark = theme === 'dark' || !theme;

    // Light Mode: Wireframe = Gray-300 (#d1d5db), Text handled by CSS class
    // Dark Mode: Wireframe = White/20 (#ffffff33), Text handled by CSS class

    const wireframeColor = theme === 'light' ? '#cbd5e1' : '#ffffff'; // Slate-300 vs White
    const wireframeOpacity = theme === 'light' ? 0.4 : 0.15;

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.1; // Slow rotation
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1; // Subtle wobbling
        }
    });

    // Distribute skills evenly on sphere surface (Fibonacci Sphere algorithm)
    const skillPositions = useMemo(() => {
        const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
        const radiusMultiplier = 1.3; // Constant radius relative to sphere size

        return skills.map((skill, i) => {
            const y = 1 - (i / (skills.length - 1)) * 2; // y goes from 1 to -1
            const radius = Math.sqrt(1 - y * y);
            const theta = phi * i;

            const x = Math.cos(theta) * radius;
            const z = Math.sin(theta) * radius;

            return new THREE.Vector3(x, y, z).multiplyScalar(radiusMultiplier);
        });
    }, []);

    return (
        <group ref={groupRef} scale={isMobile ? 0.6 : 1}>
            {/* Main Wireframe Sphere */}
            <Sphere args={[1, 12, 12]}>
                <meshBasicMaterial
                    color={wireframeColor}
                    wireframe
                    transparent
                    opacity={wireframeOpacity}
                />
            </Sphere>

            {/* Connection Nodes (Points) */}
            <points>
                <sphereGeometry args={[1, 12, 12]} />
                <pointsMaterial
                    color={theme === 'light' ? '#0f172a' : '#ffffff'}
                    size={0.03}
                    sizeAttenuation
                    transparent
                    opacity={theme === 'light' ? 0.3 : 0.5}
                />
            </points>

            {/* Floating Skills */}
            {skills.map((skill, i) => {
                // Determine size class based on skill name
                // Mobile: Smaller sizes to prevent overlap on small globe
                let sizeClass = 'text-[7px] md:text-xs'; // Default

                if (skill === 'Figma' || skill === 'HTML & CSS' || skill === 'Web App') {
                    sizeClass = 'text-[9px] md:text-sm'; // Bigger, but regular weight
                } else if (skill === 'Photography' || skill === 'Data Visualization' || skill === 'Adobe Creative Suite') {
                    sizeClass = 'text-[6px] md:text-[10px]'; // Smaller
                }

                return (
                    <Html
                        key={i}
                        position={skillPositions[i]}
                        center
                        distanceFactor={6}
                        zIndexRange={[100, 0]} // Ensure text doesn't get hidden behind the sphere too aggressively
                    >
                        <div className={`
                ${sizeClass}
                font-normal tracking-wide whitespace-nowrap
                transition-all duration-300 select-none cursor-default
                ${theme === 'light'
                                ? 'text-slate-800'
                                : 'text-white'
                            }
            `}>
                            {skill}
                        </div>
                    </Html>
                );
            })}
        </group>
    );
}
