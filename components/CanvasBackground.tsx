"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

export default function CanvasBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // CONFIG
    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 6000 : 14000;
    const SPEED_MULT = 1;
    const AUTO_SPIN = true;

    // SCENE & CAMERA
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x02040a, 0.008);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.set(0, 0, 110);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background to blend with CSS aurora blobs
    container.appendChild(renderer.domElement);

    // ORBIT CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = AUTO_SPIN;
    controls.autoRotateSpeed = 1.5;
    controls.enableZoom = false; // Disable zoom to prevent background scroll interference
    controls.enablePan = false;

    // POST PROCESSING (BLOOM)
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    bloomPass.strength = 1.6;
    bloomPass.radius = 0.45;
    bloomPass.threshold = 0.05;
    composer.addPass(bloomPass);

    // SWARM OBJECTS & GEOMETRY
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();
    const target = new THREE.Vector3();

    const geometry = new THREE.TetrahedronGeometry(0.28);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const instancedMesh = new THREE.InstancedMesh(geometry, material, COUNT);
    instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(instancedMesh);

    // DATA ARRAYS
    const positions: THREE.Vector3[] = [];
    for (let i = 0; i < COUNT; i++) {
      positions.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100
        )
      );
      instancedMesh.setColorAt(i, color.setHex(0x00ff88));
    }

    const PARAMS = { speed: 0.4, chaos: 20, coreSize: 10 };
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime() * SPEED_MULT;

      controls.update();

      const count = COUNT;
      const goldenRatio = (1.0 + Math.sqrt(5.0)) / 2.0;

      for (let i = 0; i < COUNT; i++) {
        const speed = PARAMS.speed;
        const chaos = PARAMS.chaos;
        const coreSize = PARAMS.coreSize;

        // 1. Progression towards the core
        const norm = i / count;
        const progress = (norm + time * speed * 0.2) % 1.0;
        const easeProgress = Math.pow(progress, 1.5);

        // 2. Spherical distribution (Fibonacci sphere)
        const theta = (2.0 * Math.PI * i) / goldenRatio;
        const phi = Math.acos(1.0 - 2.0 * norm);

        // 3. Radius logic
        const currentRadius = coreSize + 150.0 * (1.0 - easeProgress);

        // 4. Noise/Chaos
        const instability = Math.pow(1.0 - progress, 2.0);
        const wobbleX = Math.sin(time * 2.0 + norm * 100.0) * chaos * instability;
        const wobbleY = Math.cos(time * 1.5 + norm * 200.0) * chaos * instability;
        const wobbleZ = Math.sin(time * 3.0 - norm * 300.0) * chaos * instability;

        // 5. Position assembly
        const sinPhi = Math.sin(phi);
        const x = currentRadius * sinPhi * Math.cos(theta) + wobbleX;
        const y = currentRadius * sinPhi * Math.sin(theta) + wobbleY;
        const z = currentRadius * Math.cos(phi) + wobbleZ;

        target.set(x, y, z);

        // 6. Color mapping: Outer = Cool Data Blue (~0.55), Core = High-Energy Purple/Cyan (~0.75)
        const hue = 0.55 + 0.25 * progress;
        const saturation = 0.85 + 0.15 * progress;
        const corePulse = progress > 0.95 ? Math.sin(time * 10.0) * 0.3 : 0.0;
        const lightness = 0.2 + 0.6 * progress + corePulse;

        color.setHSL(hue, saturation, Math.max(0.0, Math.min(1.0, lightness)));

        // LERP & UPDATE
        positions[i].lerp(target, 0.1);
        dummy.position.copy(positions[i]);
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
        instancedMesh.setColorAt(i, color);
      }

      if (instancedMesh.instanceMatrix) instancedMesh.instanceMatrix.needsUpdate = true;
      if (instancedMesh.instanceColor) instancedMesh.instanceColor.needsUpdate = true;

      composer.render();
    };

    animate();

    // RESIZE HANDLER
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      composer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();
      composer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* HTML Ambient Blobs (Aurora backdrop) */}
      <div className="absolute top-[10%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-accent-indigo opacity-20 mix-blend-screen filter blur-[140px] animate-float" />
      <div className="absolute top-[40%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-accent-purple opacity-20 mix-blend-screen filter blur-[160px] animate-pulse-slow" />
      <div className="absolute bottom-[10%] left-[30%] w-[35vw] h-[35vw] rounded-full bg-accent-cyan opacity-20 mix-blend-screen filter blur-[120px] animate-float [animation-delay:2s]" />

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 grid-overlay opacity-20" />

      {/* 3D Three.js Swarm Container */}
      <div ref={containerRef} className="absolute inset-0 block" />
    </div>
  );
}
