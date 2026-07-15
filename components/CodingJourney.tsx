"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitPullRequest, Code, Flame, Award, ExternalLink } from "lucide-react";

const GithubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Generate activity grid data: 7 rows (days) x 24 columns (weeks) = 168 cells
const rows = 7;
const cols = 24;

interface Cell {
  id: string;
  intensity: number; // 0 (empty) to 4 (high activity)
}

export default function CodingJourney() {
  const [grid, setGrid] = useState<Cell[]>([]);
  const [hoveredCell, setHoveredCell] = useState<{ r: number; c: number } | null>(null);

  // Initialize and animate commit activity grid
  useEffect(() => {
    const initialGrid: Cell[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Generate random activity distribution
        const rand = Math.random();
        let intensity = 0;
        if (rand > 0.85) intensity = 4;
        else if (rand > 0.65) intensity = 3;
        else if (rand > 0.45) intensity = 2;
        else if (rand > 0.25) intensity = 1;

        initialGrid.push({
          id: `${r}-${c}`,
          intensity,
        });
      }
    }
    setGrid(initialGrid);

    // Randomly update a cell to simulate live commits
    const timer = setInterval(() => {
      setGrid((prevGrid) => {
        if (prevGrid.length === 0) return prevGrid;
        const newGrid = [...prevGrid];
        const randomIndex = Math.floor(Math.random() * newGrid.length);
        newGrid[randomIndex] = {
          ...newGrid[randomIndex],
          intensity: Math.min(newGrid[randomIndex].intensity + 1, 4),
        };
        // Reset after reaching max
        if (newGrid[randomIndex].intensity === 4 && Math.random() > 0.7) {
          newGrid[randomIndex].intensity = 0;
        }
        return newGrid;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Intensity color maps (green/cyan shades matching dark/light themes)
  const getCellColor = (intensity: number, r: number, c: number) => {
    // If hovering, calculate distance ripple effect
    if (hoveredCell) {
      const dist = Math.sqrt(Math.pow(r - hoveredCell.r, 2) + Math.pow(c - hoveredCell.c, 2));
      if (dist < 2.5) {
        // Ripple highlights cells close to mouse with a purple/cyan glow
        if (dist === 0) return "bg-accent-cyan shadow-[0_0_12px_#06B6D4] z-10 scale-125";
        if (dist < 1.5) return "bg-accent-purple shadow-[0_0_8px_#7C3AED] z-10 scale-110";
        return "bg-accent-indigo opacity-85";
      }
    }

    switch (intensity) {
      case 4:
        return "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.4)]";
      case 3:
        return "bg-emerald-600";
      case 2:
        return "bg-emerald-800";
      case 1:
        return "bg-emerald-950/80";
      default:
        return "bg-slate-900 border border-white/5";
    }
  };

  const codingStats = [
    { label: "Total Commits", value: "840+", icon: <GitPullRequest className="w-4 h-4 text-emerald-400" /> },
    { label: "Active Days", value: "220+", icon: <Flame className="w-4 h-4 text-orange-500 animate-pulse" /> },
    { label: "Longest Streak", value: "42 Days", icon: <Award className="w-4 h-4 text-amber-400" /> },
  ];

  return (
    <section id="journey" className="relative py-24">
      <div className="max-w-7xl mx-auto px-6 z-10 relative">
        {/* Title */}
        <div className="text-center mb-16 space-y-2">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono tracking-[0.3em] text-accent-cyan uppercase"
          >
            Activity Logs
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-sora tracking-tight text-white"
          >
            Coding Journey
          </motion.h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-accent-purple to-accent-cyan mx-auto mt-4" />
        </div>

        {/* Outer Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto glassmorphism p-8 rounded-3xl border border-white/5 shadow-2xl">
          
          {/* Heatmap Section (Left/Center) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <GithubIcon className="w-5 h-5 text-white" />
                <span className="text-sm font-bold font-sora text-slate-200">GitHub Contributions</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest animate-pulse">
                Live Simulation Running
              </span>
            </div>

            {/* Heatmap Matrix Grid */}
            <div className="overflow-x-auto no-scrollbar pb-2 flex justify-center lg:justify-start">
              <div className="flex flex-col gap-[3px] select-none shrink-0">
                {Array.from({ length: rows }).map((_, rIndex) => (
                  <div key={rIndex} className="flex gap-[3px]">
                    {Array.from({ length: cols }).map((_, cIndex) => {
                      const cell = grid.find((item) => item.id === `${rIndex}-${cIndex}`);
                      const intensity = cell ? cell.intensity : 0;
                      return (
                        <div
                          key={cIndex}
                          onMouseEnter={() => setHoveredCell({ r: rIndex, c: cIndex })}
                          onMouseLeave={() => setHoveredCell(null)}
                          className={`w-[11px] h-[11px] md:w-[13px] md:h-[13px] rounded-[2px] transition-all duration-300 ${getCellColor(
                            intensity,
                            rIndex,
                            cIndex
                          )}`}
                          style={{
                            transitionDelay: hoveredCell ? "0ms" : `${(rIndex + cIndex) * 5}ms`,
                          }}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend info */}
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
              <span>Less</span>
              <div className="flex gap-[3px] items-center px-2">
                <div className="w-[10px] h-[10px] bg-slate-900 rounded-[1px] border border-white/5" />
                <div className="w-[10px] h-[10px] bg-emerald-950/80 rounded-[1px]" />
                <div className="w-[10px] h-[10px] bg-emerald-800 rounded-[1px]" />
                <div className="w-[10px] h-[10px] bg-emerald-600 rounded-[1px]" />
                <div className="w-[10px] h-[10px] bg-emerald-400 rounded-[1px]" />
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Stats Section (Right) */}
          <div className="lg:col-span-4 flex flex-col gap-4 border-t lg:border-t-0 lg:border-l border-white/5 pt-6 lg:pt-0 lg:pl-8">
            <div className="text-xs font-mono tracking-widest text-accent-cyan uppercase mb-2">
              Development Metrics
            </div>

            <div className="space-y-4">
              {codingStats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-950 border border-white/10 text-white">
                      {stat.icon}
                    </div>
                    <span className="text-xs text-slate-400 font-sans">{stat.label}</span>
                  </div>
                  <span className="text-sm font-bold font-mono text-white">{stat.value}</span>
                </div>
              ))}
            </div>

            <a
              href="https://leetcode.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-accent-indigo via-accent-purple to-accent-cyan text-white text-xs font-mono tracking-wider font-semibold flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all"
            >
              <Code className="w-4 h-4" /> LEETCODE PROFILE <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
