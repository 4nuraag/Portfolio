import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const vertexShader = `
uniform float time;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const fragmentShader = `
uniform sampler2D uDataTexture;
uniform sampler2D uTexture;
uniform vec4 resolution;
uniform float uImageAspect;
uniform float uYOffset;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec4 offset = texture2D(uDataTexture, vUv);
  
  // 1. Calculate distorted screen UV
  vec2 distortedUv = uv - 0.02 * offset.rg;

  // 2. Aspect Ratio Correction (Cover)
  float containerAspect = resolution.x / resolution.y;
  float imageAspect = uImageAspect;
  
  if (imageAspect == 0.0) imageAspect = 1.0;

  float aspect = containerAspect / imageAspect;
  vec2 scale = vec2(1.0);
  
  if (aspect > 1.0) {
      // Container wider than image: Scale V inverse to zoom in vertically
      scale = vec2(1.0, 1.0 / aspect);
  } else {
      // Container taller than image: Scale U inverse to zoom in horizontally
      scale = vec2(aspect, 1.0);
  }

  // Center the zoom
  vec2 correctedUv = (distortedUv - 0.5) * scale + 0.5;
  
  // Apply vertical offset
  correctedUv.y -= uYOffset;

  gl_FragColor = texture2D(uTexture, correctedUv);
}`;

interface GridDistortionProps {
    grid?: number;
    mouse?: number;
    strength?: number;
    relaxation?: number;
    imageSrc: string;
    className?: string;
    yOffset?: number; // New prop for vertical adjustment
}

const GridDistortion = ({
    grid = 15,
    mouse = 0.1,
    strength = 0.15,
    relaxation = 0.9,
    imageSrc,
    className = '',
    yOffset = 0
}: GridDistortionProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const planeRef = useRef<THREE.Mesh | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const imageAspectRef = useRef(1);
    const animationIdRef = useRef<number | null>(null);
    const resizeObserverRef = useRef<ResizeObserver | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;

        // Initial aspect ratio check
        const initialRect = container.getBoundingClientRect();
        const width = initialRect.width;
        const height = initialRect.height || 1;
        const initialAspect = width / height;

        const gridSizeY = grid;
        const safeAspect = Math.min(Math.max(initialAspect, 0.1), 10);
        const gridSizeX = Math.max(Math.floor(grid * safeAspect), 1);

        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        rendererRef.current = renderer;

        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        const camera = new THREE.OrthographicCamera(0, 0, 0, 0, -1000, 1000);
        camera.position.z = 2;
        cameraRef.current = camera;

        const uniforms = {
            time: { value: 0 },
            resolution: { value: new THREE.Vector4() },
            uImageAspect: { value: 1.0 },
            uYOffset: { value: yOffset },
            uTexture: { value: null as THREE.Texture | null },
            uDataTexture: { value: null as THREE.DataTexture | null }
        };

        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(imageSrc, texture => {
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.wrapS = THREE.ClampToEdgeWrapping;
            texture.wrapT = THREE.ClampToEdgeWrapping;

            const imgWidth = texture.image.width || 1;
            const imgHeight = texture.image.height || 1;
            const imgAspect = imgWidth / imgHeight;
            imageAspectRef.current = imgAspect;
            uniforms.uImageAspect.value = imgAspect;

            uniforms.uTexture.value = texture;
            handleResize();
        }, undefined, (err) => {
            console.error("Error loading texture:", err);
        });

        // Initialize data texture 
        const sizeX = gridSizeX;
        const sizeY = gridSizeY;

        const data = new Float32Array(4 * sizeX * sizeY);
        for (let i = 0; i < sizeX * sizeY; i++) {
            data[i * 4] = Math.random() * 255 - 125;
            data[i * 4 + 1] = Math.random() * 255 - 125;
            data[i * 4 + 2] = 0;
            data[i * 4 + 3] = 0;
        }

        const dataTexture = new THREE.DataTexture(data, sizeX, sizeY, THREE.RGBAFormat, THREE.FloatType);
        dataTexture.needsUpdate = true;
        uniforms.uDataTexture.value = dataTexture;

        const material = new THREE.ShaderMaterial({
            side: THREE.DoubleSide,
            uniforms,
            vertexShader,
            fragmentShader,
            transparent: true
        });

        const geometry = new THREE.PlaneGeometry(1, 1, sizeX - 1, sizeY - 1);
        const plane = new THREE.Mesh(geometry, material);
        planeRef.current = plane;
        scene.add(plane);

        const handleResize = () => {
            if (!container || !renderer || !camera) return;

            const rect = container.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;

            if (width === 0 || height === 0) return;

            const containerAspect = width / height;

            renderer.setSize(width, height);

            // Scale the plane to fit the screen EXACTLY
            // The fragment shader handles the image aspect ratio (Cover)
            if (plane) {
                plane.scale.set(containerAspect, 1, 1);
            }

            const frustumHeight = 1;
            const frustumWidth = frustumHeight * containerAspect;
            camera.left = -frustumWidth / 2;
            camera.right = frustumWidth / 2;
            camera.top = frustumHeight / 2;
            camera.bottom = -frustumHeight / 2;
            camera.updateProjectionMatrix();

            uniforms.resolution.value.set(width, height, 1, 1);
        };

        if (window.ResizeObserver) {
            const resizeObserver = new ResizeObserver(() => {
                handleResize();
            });
            resizeObserver.observe(container);
            resizeObserverRef.current = resizeObserver;
        } else {
            window.addEventListener('resize', handleResize);
        }

        const mouseState = {
            x: 0,
            y: 0,
            prevX: 0,
            prevY: 0,
            vX: 0,
            vY: 0
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = 1 - (e.clientY - rect.top) / rect.height;
            mouseState.vX = x - mouseState.prevX;
            mouseState.vY = y - mouseState.prevY;
            Object.assign(mouseState, { x, y, prevX: x, prevY: y });
        };

        const handleMouseLeave = () => {
            if (dataTexture) {
                dataTexture.needsUpdate = true;
            }
            Object.assign(mouseState, {
                x: 0,
                y: 0,
                prevX: 0,
                prevY: 0,
                vX: 0,
                vY: 0
            });
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        handleResize();

        const animate = () => {
            animationIdRef.current = requestAnimationFrame(animate);

            if (!renderer || !scene || !camera) return;

            uniforms.time.value += 0.05;

            const data = dataTexture.image.data;
            if (!data) return;

            for (let i = 0; i < sizeX * sizeY; i++) {
                data[i * 4] *= relaxation;
                data[i * 4 + 1] *= relaxation;
            }

            const gridMouseX = sizeX * mouseState.x;
            const gridMouseY = sizeY * mouseState.y;
            const maxDist = grid * mouse;

            for (let i = 0; i < sizeX; i++) {
                for (let j = 0; j < sizeY; j++) {
                    const distSq = Math.pow(gridMouseX - i, 2) + Math.pow(gridMouseY - j, 2);
                    if (distSq < maxDist * maxDist) {
                        const index = 4 * (i + sizeX * j);
                        const power = Math.min(maxDist / Math.sqrt(distSq), 10);
                        data[index] += strength * 100 * mouseState.vX * power;
                        data[index + 1] -= strength * 100 * mouseState.vY * power;
                    }
                }
            }

            dataTexture.needsUpdate = true;
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }

            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
            } else {
                window.removeEventListener('resize', handleResize);
            }

            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);

            if (renderer) {
                renderer.dispose();
            }
            if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }

            if (geometry) geometry.dispose();
            if (material) material.dispose();
            if (dataTexture) dataTexture.dispose();
            if (uniforms.uTexture.value) uniforms.uTexture.value.dispose();

            sceneRef.current = null;
            rendererRef.current = null;
            cameraRef.current = null;
            planeRef.current = null;
        };
    }, [grid, mouse, strength, relaxation, imageSrc, yOffset]);

    return (
        <div
            ref={containerRef}
            className={`distortion-container ${className}`}
            style={{
                width: '100%',
                height: '100%',
                minWidth: '0',
                minHeight: '0',
                overflow: 'hidden'
            }}
        />
    );
};

export default GridDistortion;
