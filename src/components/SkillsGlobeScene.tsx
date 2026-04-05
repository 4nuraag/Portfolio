'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import SkillsGlobe from './SkillsGlobe';

interface Props {
    theme: string;
    isMobile: boolean;
}

export default function SkillsGlobeScene({ theme, isMobile }: Props) {
    return (
        <Canvas
            camera={{ position: [0, 0, 3.8], fov: 45 }}
            className="w-full h-full"
            frameloop="always"
            dpr={[1, 2]}
            style={{ pointerEvents: 'auto', touchAction: 'pan-y' }}
        >
            <ambientLight intensity={0.5} />
            <SkillsGlobe theme={theme} isMobile={isMobile} />
            {!isMobile && (
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={true}
                    autoRotate
                    autoRotateSpeed={0.5}
                />
            )}
        </Canvas>
    );
}
