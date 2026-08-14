"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Briefcase, CheckCircle2, Sparkles, X, Layers, ExternalLink } from "lucide-react";

export interface TimelineItem {
  id: number;
  title: string;
  company: string;
  type: string;
  duration: string;
  description: string;
  icon: React.ReactNode;
  status: "completed" | "in-progress" | "upcoming";
  energy: number;
  relatedIds?: number[];
}

interface RadialOrbitalTimelineProps {
  items: TimelineItem[];
  autoRotateSpeed?: number;
}

export default function RadialOrbitalTimeline({
  items,
  autoRotateSpeed = 0.2,
}: RadialOrbitalTimelineProps) {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [radius, setRadius] = useState(230);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive radius calculation
  const updateRadius = useCallback(() => {
    if (typeof window === "undefined") return;
    const width = window.innerWidth;
    if (width < 480) {
      setRadius(120);
    } else if (width < 768) {
      setRadius(160);
    } else if (width < 1024) {
      setRadius(200);
    } else {
      setRadius(240);
    }
  }, []);

  useEffect(() => {
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, [updateRadius]);

  // Smooth continuous rotation loop
  useEffect(() => {
    if (isPaused) return;

    let animId: number;
    const step = () => {
      setRotationAngle((prev) => (prev + autoRotateSpeed) % 360);
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isPaused, autoRotateSpeed]);

  // Close card when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setSelectedId(null);
        setIsPaused(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedId(null);
        setIsPaused(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNodeClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedId === id) {
      setSelectedId(null);
      setIsPaused(false);
    } else {
      setSelectedId(id);
      setIsPaused(true);
    }
  };

  const selectedItem = items.find((item) => item.id === selectedId);

  // Compute node positions relative to center
  const totalItems = items.length;
  const nodePositions = items.map((item, index) => {
    const baseAngle = (index * (360 / totalItems)) % 360;
    const currentAngle = (baseAngle + rotationAngle) % 360;
    const rad = (currentAngle * Math.PI) / 180;
    
    // Slight 3D perspective squish in Y axis
    const x = radius * Math.cos(rad);
    const y = radius * 0.7 * Math.sin(rad);

    // Z-index & scale based on sin(rad) (front vs back)
    const depth = Math.sin(rad); // -1 (back) to +1 (front)
    const scale = 0.85 + 0.3 * ((depth + 1) / 2);
    const opacity = 0.6 + 0.4 * ((depth + 1) / 2);
    const zIndex = Math.round(10 + depth * 10);

    const isSelected = selectedId === item.id;
    const isRelated =
      selectedItem?.relatedIds?.includes(item.id) ?? false;

    return {
      item,
      x,
      y,
      scale,
      opacity,
      zIndex: isSelected ? 50 : isRelated ? 30 : zIndex,
      isSelected,
      isRelated,
    };
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[420px] md:min-h-[460px] flex items-center justify-center select-none py-6 overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[300px] h-[300px] md:w-[480px] md:h-[480px] rounded-full bg-gradient-to-r from-accent-indigo/10 via-accent-purple/10 to-accent-cyan/10 blur-3xl animate-pulse-slow" />
      </div>

      {/* Main Orbital Track Ring */}
      <div
        className="absolute rounded-full border border-dashed border-white/15 pointer-events-none transition-all duration-300"
        style={{
          width: `${radius * 2}px`,
          height: `${radius * 1.4}px`,
        }}
      />
      <div
        className="absolute rounded-full border border-white/5 pointer-events-none transition-all duration-300"
        style={{
          width: `${radius * 2.4}px`,
          height: `${radius * 1.68}px`,
        }}
      />

      {/* SVG Connecting Lines for Related Nodes */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        {selectedId !== null &&
          nodePositions.map((pos) => {
            if (!pos.isRelated && !pos.isSelected) return null;
            const selectedPos = nodePositions.find((p) => p.isSelected);
            if (!selectedPos) return null;

            return (
              <line
                key={`line-${pos.item.id}`}
                x1={`calc(50% + ${selectedPos.x}px)`}
                y1={`calc(50% + ${selectedPos.y}px)`}
                x2={`calc(50% + ${pos.x}px)`}
                y2={`calc(50% + ${pos.y}px)`}
                stroke="rgba(6, 182, 212, 0.4)"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="animate-pulse"
              />
            );
          })}
      </svg>

      {/* Central Core Orb */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          boxShadow: [
            "0 0 30px rgba(124, 58, 237, 0.3)",
            "0 0 50px rgba(6, 182, 212, 0.5)",
            "0 0 30px rgba(124, 58, 237, 0.3)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute z-20 w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-accent-indigo via-accent-purple to-accent-cyan flex flex-col items-center justify-center text-white border border-white/30 cursor-pointer shadow-2xl"
        onClick={() => {
          setSelectedId(null);
          setIsPaused((prev) => !prev);
        }}
        aria-label="Toggle Orbit Rotation"
      >
        <Sparkles className="w-5 h-5 md:w-7 md:h-7 text-cyan-200 animate-spin-slow" />
        <span className="text-[9px] md:text-[10px] font-mono tracking-widest uppercase font-bold text-cyan-100 mt-1">
          {isPaused ? "PAUSED" : "ORBIT"}
        </span>
      </motion.div>

      {/* Experience Nodes on Orbit */}
      {nodePositions.map(({ item, x, y, scale, opacity, zIndex, isSelected, isRelated }) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{
            transform: `translate3d(${x}px, ${y}px, 0px) scale(${isSelected ? 1.25 : scale})`,
            zIndex,
            opacity: isSelected || isRelated ? 1 : opacity,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <button
            onClick={(e) => handleNodeClick(item.id, e)}
            aria-label={`${item.title} at ${item.company}`}
            className={`group relative flex flex-col items-center justify-center p-3 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan ${
              isSelected
                ? "bg-accent-cyan text-slate-950 shadow-[0_0_25px_rgba(6,182,212,0.8)] border-2 border-white scale-110"
                : isRelated
                ? "bg-accent-purple text-white shadow-[0_0_20px_rgba(168,85,247,0.6)] border border-cyan-400"
                : "glassmorphism text-slate-200 hover:text-white hover:border-accent-cyan/60"
            }`}
          >
            {/* Outer pulse ring for selected node */}
            {isSelected && (
              <span className="absolute -inset-2 rounded-full border border-accent-cyan animate-ping opacity-75 pointer-events-none" />
            )}

            {/* Icon */}
            <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
              {item.icon}
            </div>

            {/* Node Tooltip Label */}
            <div
              className={`absolute top-full mt-2 px-2.5 py-1 rounded-md text-[10px] md:text-xs font-mono font-bold whitespace-nowrap shadow-lg transition-all duration-200 pointer-events-none ${
                isSelected
                  ? "bg-accent-cyan text-slate-950 opacity-100"
                  : "bg-slate-900/90 border border-white/10 text-slate-200 opacity-80 group-hover:opacity-100"
              }`}
            >
              {item.company}
            </div>
          </button>
        </motion.div>
      ))}

      {/* Selected Experience Detail Card Modal / Panel */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
            className="absolute z-50 bottom-2 md:bottom-6 max-w-lg w-[90%] p-6 md:p-7 rounded-3xl glassmorphism border border-accent-cyan/40 bg-slate-950/95 shadow-[0_10px_40px_rgba(6,182,212,0.25)] text-left"
          >
            {/* Header with Title & Close Button */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div className="space-y-1">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-accent-cyan/15 border border-accent-cyan/30 text-accent-cyan text-[10px] font-mono tracking-wider uppercase font-bold">
                  {selectedItem.type}
                </span>
                <h3 className="text-base md:text-xl font-bold text-white font-sora tracking-tight leading-snug">
                  {selectedItem.title}
                </h3>
                <h4 className="text-xs md:text-sm font-semibold text-accent-cyan font-mono tracking-wide">
                  {selectedItem.company}
                </h4>
              </div>

              <button
                onClick={() => {
                  setSelectedId(null);
                  setIsPaused(false);
                }}
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close details"
              >
                <X className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>

            {/* Meta info: Date & Status & Energy */}
            <div className="flex items-center justify-between gap-2 py-3 border-b border-white/5 text-[11px] font-mono">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Calendar className="w-3.5 h-3.5 text-accent-cyan" />
                <span>{selectedItem.duration}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold uppercase tracking-wider text-[10px]">
                  <CheckCircle2 className="w-3 h-3" /> {selectedItem.status}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[10px] font-bold">
                  Energy: {selectedItem.energy}%
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="pt-4 space-y-2">
              <p className="text-xs md:text-sm text-slate-300 font-sans leading-relaxed">
                {selectedItem.description}
              </p>
            </div>

            {/* Footer hint */}
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>Click outside to resume orbit</span>
              <span className="text-accent-cyan font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Active Experience
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
