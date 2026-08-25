'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3DVisual() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for mouse interaction
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Abstract Exvora Core: Dual Interlocking Icosahedron & Torus (Exchange Loop)
    const coreGeo = new THREE.IcosahedronGeometry(3.2, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      emissive: 0x0a2540,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // Core Wireframe Cage
    const wireGeo = new THREE.IcosahedronGeometry(3.5, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    mainGroup.add(wireMesh);

    // Outer Exchange Torus Ring
    const torusGeo = new THREE.TorusGeometry(5.2, 0.18, 16, 100);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0x78350f,
      roughness: 0.3,
      metalness: 0.9,
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.rotation.x = Math.PI / 3;
    mainGroup.add(torusMesh);

    const torusGeo2 = new THREE.TorusGeometry(6.4, 0.12, 16, 100);
    const torusMat2 = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x064e3b,
      roughness: 0.4,
      metalness: 0.8,
    });
    const torusMesh2 = new THREE.Mesh(torusGeo2, torusMat2);
    torusMesh2.rotation.y = Math.PI / 4;
    mainGroup.add(torusMesh2);

    // 2. Floating Satellite Nodes (Representing Textbooks, Electronics, Notes, Tickets, Skills, Give Away)
    const nodeConfigs = [
      { color: 0xf59e0b, radius: 0.75, dist: 7.2, speed: 0.008, angle: 0, yOffset: 1.5, name: 'Textbooks' },
      { color: 0x06b6d4, radius: 0.85, dist: 8.0, speed: 0.006, angle: Math.PI / 3, yOffset: -2.0, name: 'Electronics' },
      { color: 0x8b5cf6, radius: 0.7, dist: 6.8, speed: 0.009, angle: (2 * Math.PI) / 3, yOffset: 2.2, name: 'Notes' },
      { color: 0xec4899, radius: 0.65, dist: 7.5, speed: 0.007, angle: Math.PI, yOffset: -1.2, name: 'Tickets' },
      { color: 0x10b981, radius: 0.9, dist: 8.5, speed: 0.005, angle: (4 * Math.PI) / 3, yOffset: 1.8, name: 'Skills' },
      { color: 0x3b82f6, radius: 0.8, dist: 7.0, speed: 0.008, angle: (5 * Math.PI) / 3, yOffset: -1.8, name: 'Give Away' },
    ];

    const satelliteMeshes: { mesh: THREE.Mesh; config: typeof nodeConfigs[0] }[] = [];

    nodeConfigs.forEach((cfg) => {
      const satGeo = new THREE.DodecahedronGeometry(cfg.radius, 0);
      const satMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        roughness: 0.3,
        metalness: 0.7,
        flatShading: true,
      });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      mainGroup.add(satMesh);
      satelliteMeshes.push({ mesh: satMesh, config: cfg });
    });

    // 3. Ambient Particle Cloud (Depth & Connectivity)
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 30;
      particlePositions[i + 1] = (Math.random() - 0.5) * 25;
      particlePositions[i + 2] = (Math.random() - 0.5) * 20;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.15,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x60a5fa, 3.5);
    keyLight.position.set(10, 15, 10);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0xf59e0b, 4.0, 30);
    fillLight.position.set(-10, -5, 8);
    scene.add(fillLight);

    const backLight = new THREE.PointLight(0x10b981, 3.0, 25);
    backLight.position.set(0, -10, -10);
    scene.add(backLight);

    // Mouse Interaction Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      mainGroup.rotation.y = targetX * 0.6 + elapsed * 0.15;
      mainGroup.rotation.x = -targetY * 0.4 + Math.sin(elapsed * 0.3) * 0.1;

      // Central core breathing rotation
      coreMesh.rotation.x = elapsed * 0.4;
      coreMesh.rotation.y = elapsed * 0.5;
      wireMesh.rotation.x = -elapsed * 0.2;
      wireMesh.rotation.z = elapsed * 0.3;

      torusMesh.rotation.z = elapsed * 0.3;
      torusMesh2.rotation.x = elapsed * 0.25;

      // Update orbiting satellites
      satelliteMeshes.forEach(({ mesh, config }, idx) => {
        const curAngle = config.angle + elapsed * config.speed * 8;
        mesh.position.x = Math.cos(curAngle) * config.dist;
        mesh.position.z = Math.sin(curAngle) * config.dist;
        mesh.position.y = config.yOffset + Math.sin(elapsed * 2 + idx) * 0.6;

        mesh.rotation.x += 0.02;
        mesh.rotation.y += 0.03;
      });

      // Background particle drift
      particles.rotation.y = elapsed * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[540px] flex items-center justify-center">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating 3D Badge Overlay */}
      <div className="absolute -bottom-2 sm:bottom-4 px-4 py-2 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-700/80 shadow-2xl flex items-center gap-3 pointer-events-none text-xs text-white">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
        <span className="font-bold tracking-wide text-slate-200">
          Exvora Campus Mesh & Exchange Core
        </span>
      </div>
    </div>
  );
}
