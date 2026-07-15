"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, ShieldAlert, Sparkles } from "lucide-react";

interface Achievement {
  id: number;
  title: string;
  competition: string;
  badge: string;
  description: string;
  accent: string; // Tailored glow colors
  glowColor: string;
}

const achievements: Achievement[] = [
  {
    id: 1,
    title: "2nd Runner Up Award",
    competition: "N8N Hackathon 2025",
    badge: "🏆 2nd Runner Up",
    description: "Honored among hundreds of developers for building a highly optimized workflow automation assistant. Evaluated on integration complexity, speed of execution, and interface aesthetics.",
    accent: "from-amber-400 to-yellow-600",
    glowColor: "rgba(245, 158, 11, 0.15)",
  },
  {
    id: 2,
    title: "Most Innovative Solution Award",
    competition: "HackAura Hackathon 2025",
    badge: "🏆 Innovation Leader",
    description: "Awarded for designing a unique neural-matching civic query architecture. Recognizes outstanding creativity, problem-solving, and implementation of cutting-edge tech models.",
    accent: "from-cyan-400 to-purple-600",
    glowColor: "rgba(6, 182, 212, 0.15)",
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-24 bg-slate-950/20">
      <div className="max-w-7xl mx-auto px-6 z-10 relative">
        {/* Title */}
        <div className="text-center mb-16 space-y-2">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono tracking-[0.3em] text-accent-cyan uppercase"
          >
            Milestones
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-sora tracking-tight text-white"
          >
            Achievements
          </motion.h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-accent-purple to-accent-cyan mx-auto mt-4" />
        </div>

        {/* Achievements Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {achievements.map((ach, idx) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="relative group p-8 rounded-3xl glassmorphism border border-white/5 overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300"
              style={{
                boxShadow: `0 20px 40px -15px ${ach.glowColor}`,
              }}
            >
              {/* Backlit glow effect */}
              <div
                className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-[80px] group-hover:scale-125 transition-transform duration-500 opacity-60"
                style={{
                  background: `radial-gradient(circle, ${ach.glowColor.replace("0.15", "0.4")} 0%, transparent 70%)`,
                }}
              />

              <div className="flex flex-col gap-6 items-start">
                {/* Trophy Graphic */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                    delay: idx * 2,
                  }}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 relative"
                >
                  {/* Decorative sparklers */}
                  <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-pulse" />
                  
                  {/* Custom Trophy SVG */}
                  <svg
                    viewBox="0 0 24 24"
                    className="w-10 h-10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      d="M6 9H4.5A2.5 2.5 0 012 6.5v0A2.5 2.5 0 014.5 4H6m12 5h1.5A2.5 2.5 0 0022 6.5v0A2.5 2.5 0 0019.5 4H18"
                      className="stroke-amber-400"
                    />
                    <path
                      d="M6 4v7c0 3.313 2.687 6 6 6s6-2.687 6-6V4H6z"
                      className="stroke-amber-500 fill-amber-500/10"
                    />
                    <path d="M12 17v4M9 21h6" className="stroke-amber-600" strokeLinecap="round" />
                  </svg>
                </motion.div>

                {/* Content */}
                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-wider text-accent-cyan font-medium">
                    {ach.badge}
                  </span>
                  <h3 className="text-xl font-bold font-sora text-white tracking-tight mt-2">
                    {ach.title}
                  </h3>
                  <h4 className="text-sm font-semibold font-mono text-slate-400">
                    {ach.competition}
                  </h4>
                  <p className="text-sm text-slate-400 font-sans leading-relaxed pt-2">
                    {ach.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
