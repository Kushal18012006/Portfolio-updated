"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ShieldCheck, Database, Award, ShoppingBag, Terminal as TermIcon } from "lucide-react";
import GlowingBorder from "@/components/ui/glowing-border";

const GithubIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  features: string[];
  github: string;
  demo: string;
  accent: string; // Tailored glow color class
  visual: React.ReactNode; // Interactive mockup node
}

// ----------------------------------------------------
// PROJECT VISUAL MOCKUPS (Interactive & Latency-Free)
// ----------------------------------------------------

// 1. CivicAI - Typing AI Bot Mockup
function CivicAIVisual() {
  const [messages, setMessages] = useState([
    { role: "user", text: "Report: Pothole on Market St." },
    { role: "system", text: "CivicAI: Analyzing..." },
    { role: "system", text: "Classified: Infrastructure [Priority High]" }
  ]);

  return (
    <div className="w-full h-full bg-slate-950 p-4 rounded-xl font-mono text-xs text-slate-300 flex flex-col justify-between border border-white/5 relative overflow-hidden group-hover:border-accent-cyan/30 transition-colors">
      <div className="absolute inset-0 grid-overlay opacity-10" />
      <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
        <span className="text-[10px] text-accent-cyan flex items-center gap-1.5 font-semibold">
          <span className="w-1.5 h-1.5 bg-accent-cyan rounded-full animate-ping" /> CIVIC-AI DEPLOYED
        </span>
        <span className="text-[9px] text-slate-500">v1.2.0</span>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`p-1.5 rounded ${m.role === 'user' ? 'bg-white/5 border-l border-white/20' : 'bg-accent-cyan/10 border-l border-accent-cyan text-accent-cyan'}`}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="pt-2 border-t border-white/10 text-[9px] text-slate-500 flex justify-between">
        <span>STATUS: ACTIVE</span>
        <span>LATENCY: 12ms</span>
      </div>
    </div>
  );
}

// 2. Student Management System - GPA Progress & Stats Mockup
function StudentVisual() {
  const grades = [
    { course: "Data Structures", grade: "O" },
    { course: "Object Oriented Java", grade: "A+" },
    { course: "Database Management", grade: "A" }
  ];

  return (
    <div className="w-full h-full bg-slate-950 p-4 rounded-xl flex flex-col justify-between border border-white/5 relative overflow-hidden group-hover:border-accent-purple/30 transition-colors">
      <div className="absolute inset-0 grid-overlay opacity-10" />
      <div className="flex justify-between items-center pb-2 border-b border-white/10 mb-2">
        <span className="text-[10px] text-accent-purple font-mono tracking-widest uppercase">GRADES DASHBOARD</span>
        <span className="text-xs font-mono font-bold text-white">GPA: 9.4/10</span>
      </div>
      <div className="space-y-1.5">
        {grades.map((g, i) => (
          <div key={i} className="flex justify-between items-center text-xs font-mono bg-white/5 p-1 px-2 rounded">
            <span className="text-slate-400 text-[10px] truncate max-w-[140px]">{g.course}</span>
            <span className="text-accent-purple font-bold">{g.grade}</span>
          </div>
        ))}
      </div>
      {/* Visual Chart Mockup */}
      <div className="flex gap-1 items-end h-8 mt-2 justify-center">
        <div className="w-4 bg-accent-purple/30 h-4 rounded-t" />
        <div className="w-4 bg-accent-purple/50 h-6 rounded-t" />
        <div className="w-4 bg-gradient-to-t from-accent-purple to-accent-indigo h-8 rounded-t animate-pulse" />
      </div>
    </div>
  );
}

// 3. Cyborg Landing Page - Glitch Neon Terminal Mockup
function CyborgVisual() {
  return (
    <div className="w-full h-full bg-[#050010] p-4 rounded-xl flex flex-col justify-between border border-purple-500/20 relative overflow-hidden group-hover:border-purple-500/50 transition-colors select-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.15),transparent_60%)]" />
      <div className="w-full text-center py-2 border border-purple-500/30 rounded bg-purple-950/20 shadow-[0_0_15px_rgba(124,58,237,0.2)]">
        <h4 className="text-sm font-bold tracking-[0.2em] font-sora text-purple-400 animate-pulse">CYBORG.EXE</h4>
      </div>
      <div className="font-mono text-[9px] text-purple-300 space-y-1">
        <div>&gt; INITIALIZING CYBERNETIC PROTOCOL...</div>
        <div className="text-emerald-400">&gt; NEURAL LINK LOADED // 100%</div>
      </div>
      <div className="w-full h-6 border-t border-purple-500/20 flex items-center justify-between text-[9px] text-purple-500 font-mono">
        <span>FPS: 144</span>
        <span>GLITCH_MODE: TRUE</span>
      </div>
    </div>
  );
}

// 4. Nike Shoe Landing Page - Shoe Customizer Visual (Clickable colors!)
function NikeVisual() {
  const [shoeColor, setShoeColor] = useState("#06B6D4"); // Accent Cyan first
  const colors = ["#06B6D4", "#EF4444", "#EAB308"]; // Cyan, Red, Yellow

  return (
    <div className="w-full h-full bg-slate-950 p-4 rounded-xl flex flex-col justify-between border border-white/5 relative overflow-hidden group-hover:border-orange-500/30 transition-colors">
      <div className="absolute inset-0 grid-overlay opacity-10" />
      {/* Sneaker Graphic (SVG) */}
      <div className="flex-1 flex items-center justify-center relative">
        <svg
          viewBox="0 0 100 60"
          className="w-28 h-20 transform -rotate-12 transition-transform duration-500 group-hover:scale-110"
        >
          {/* Shoe Outline */}
          <path
            d="M5,40 L15,42 L25,43 L45,43 L60,40 L75,30 L90,20 L85,15 L70,22 L55,20 L35,28 L20,30 L5,40 Z"
            fill={shoeColor}
            opacity="0.9"
            className="transition-colors duration-500"
          />
          {/* Shoe Sole */}
          <path d="M4,40 L15,42 L45,43 L92,30 L90,27 L45,40 L5,38 Z" fill="#FFFFFF" />
          {/* Details */}
          <path d="M50,28 L65,22 L75,25" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.7" />
        </svg>
        {/* Soft shadow below shoe */}
        <div className="absolute bottom-2 w-24 h-1.5 bg-black/40 rounded-full blur-[2px]" />
      </div>

      {/* Color Selector */}
      <div className="flex justify-between items-center pt-2 border-t border-white/10">
        <span className="text-[9px] font-mono text-slate-500">CUSTOM SNEAKER</span>
        <div className="flex gap-1.5">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setShoeColor(c)}
              className="w-3.5 h-3.5 rounded-full border border-white/20 cursor-pointer transition-transform hover:scale-125"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// 5. Personal Portfolio Website - Lighthouse Audit Score Rings
function PortfolioVisual() {
  const ringStats = [
    { label: "Perf", val: 100, color: "stroke-emerald-500" },
    { label: "Access", val: 100, color: "stroke-emerald-500" },
    { label: "Best P.", val: 100, color: "stroke-emerald-500" },
    { label: "SEO", val: 100, color: "stroke-emerald-500" },
  ];

  return (
    <div className="w-full h-full bg-slate-950 p-4 rounded-xl flex flex-col justify-between border border-white/5 relative overflow-hidden group-hover:border-accent-indigo/30 transition-colors">
      <div className="absolute inset-0 grid-overlay opacity-10" />
      <div className="text-[10px] font-mono text-center text-slate-400 pb-2 border-b border-white/10 mb-2">
        LIGHTHOUSE AUDIT COMPLIANT
      </div>
      
      {/* 4 circular progress stats */}
      <div className="grid grid-cols-4 gap-1 items-center justify-center my-auto">
        {ringStats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center gap-1 font-mono">
            <svg className="w-8 h-8 transform -rotate-90">
              {/* background ring */}
              <circle cx="16" cy="16" r="13" className="stroke-slate-800" strokeWidth="2.5" fill="none" />
              {/* foreground progress */}
              <circle
                cx="16"
                cy="16"
                r="13"
                className={stat.color}
                strokeWidth="2.5"
                fill="none"
                strokeDasharray="81.68"
                strokeDashoffset="0"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-[8px] text-white font-bold">{stat.val}</span>
            <span className="text-[7px] text-slate-500 uppercase">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="w-full text-center pt-2 border-t border-white/10 text-[9px] text-emerald-400 font-mono">
        ✓ ALL VERIFICATIONS PASSED
      </div>
    </div>
  );
}

const projects: Project[] = [
  {
    id: 1,
    title: "CivicAI",
    subtitle: "Digital Governance Platform",
    description: "An AI-powered municipal management hub designed to bridge the gap between citizens and local governance. Automates complaint classification, prioritizes workorders, and indexes city bylaws.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "LLM APIs", "Charts.js"],
    features: [
      "Conversational AI for ordinance queries",
      "Automatic ticket category routing",
      "Real-time status tracking dashboard",
      "Geotagged infrastructure complaint feeds",
    ],
    github: "https://github.com/Kushal18012006/Civic-Ai.git",
    demo: "https://civic-anhpnmsg0-kushal-tripathis-projects-887b613e.vercel.app/",
    accent: "shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:border-accent-cyan/50",
    visual: <CivicAIVisual />,
  },
  {
    id: 3,
    title: "Cyborg Landing Page",
    subtitle: "Futuristic Gaming Concept",
    description: "An award-winning front-end showcase landing page inspired by modern cyberpunk gaming styles. Integrates dense visual feedback, parallax overlays, and retro-futuristic styling.",
    tech: ["React", "Framer Motion", "Tailwind CSS", "Web Audio"],
    features: [
      "Reactive hover tilt glassmorphic grids",
      "Immersive dark ambient soundtrack toggle",
      "Scroll-linked parallax header grids",
      "Dynamic mouse radial flashlights",
    ],
    github: "https://github.com/Kushal18012006/Cyborg-Landing-page.git",
    demo: "https://kushal18012006.github.io/Cyborg-Landing-page/",
    accent: "shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:border-purple-500/50",
    visual: <CyborgVisual />,
  },
  {
    id: 2,
    title: "Student Management System",
    subtitle: "Academic Operations Tool",
    description: "A secure, administrative dashboard system facilitating grade tracking, course enrollment, classroom schedules, and performance visual analytics.",
    tech: ["Java", "Swing / JSP", "MySQL", "OOP Design"],
    features: [
      "Custom GPA calculations and reports",
      "Course prerequisite validation logic",
      "Timetable schedule clash detector",
      "Granular role-based user accessibility",
    ],
    github: "https://github.com/Kushal18012006",
    demo: "https://github.com/Kushal18012006",
    accent: "shadow-[0_0_20px_rgba(124,58,237,0.15)] hover:border-accent-purple/50",
    visual: <StudentVisual />,
  },
  {
    id: 4,
    title: "Nike Shoes Landing Page",
    subtitle: "E-Commerce Concept Model",
    description: "A high-fidelity landing page detailing custom e-commerce product layouts. Features micro-interactions, responsive sizing selectors, and color customization templates.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    features: [
      "Interactive multi-color sneaker configurator",
      "Animated sizes selection grid with check states",
      "Hover-triggered zooming showcase grids",
      "Smooth cart addition micro-indicator animations",
    ],
    github: "https://github.com/Kushal18012006/Nike-Shoes-Landing-Page.git",
    demo: "https://kushal18012006.github.io/Nike-Shoes-Landing-Page/",
    accent: "shadow-[0_0_20px_rgba(249,115,22,0.15)] hover:border-orange-500/50",
    visual: <NikeVisual />,
  },
  {
    id: 5,
    title: "Personal Portfolio Website",
    subtitle: "Elite Developer Resume",
    description: "The premium portfolio website you are currently exploring. Optimized for outstanding presentation, rapid load metrics, clean configurations, and rich animations.",
    tech: ["Next.js 15", "TypeScript", "Tailwind v4", "Canvas API", "Framer Motion"],
    features: [
      "Custom responsive canvas particle field",
      "Dynamic SVG GitHub coding heatmap",
      "Zero-latency interactive iframe mockups",
      "Bespoke magnetic custom cursors",
    ],
    github: "https://github.com/Kushal18012006/Portfolio-updated",
    demo: "https://portfolio-updated-gules-six.vercel.app/",
    accent: "shadow-[0_0_20px_rgba(79,70,229,0.15)] hover:border-accent-indigo/50",
    visual: <PortfolioVisual />,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-6 z-10 relative">
        {/* Title */}
        <div className="text-center mb-16 space-y-2">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono tracking-[0.3em] text-accent-cyan uppercase"
          >
            My Creations
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-sora tracking-tight text-white"
          >
            Featured Projects
          </motion.h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-accent-purple to-accent-cyan mx-auto mt-4" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <GlowingBorder key={project.id} borderRadius="rounded-[2rem]">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`group flex flex-col justify-between p-6 rounded-[2rem] glassmorphism border border-white/5 transition-all duration-500 cursor-pointer h-full ${project.accent}`}
              >
                <div className="space-y-4">
                  {/* Visual Area (Interactive) */}
                  <div className="w-full h-44 rounded-2xl overflow-hidden bg-slate-900/50 p-2 flex items-center justify-center">
                    {project.visual}
                  </div>

                  {/* Subtitle & Title */}
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-accent-cyan uppercase font-semibold">
                      {project.subtitle}
                    </span>
                    <h3 className="text-xl font-bold text-white font-sora tracking-tight mt-0.5">
                      {project.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Features Accordion/List */}
                  <div className="space-y-1 py-1">
                    <span className="text-[9px] font-mono tracking-wider text-slate-500 uppercase">Key Innovations:</span>
                    <ul className="text-[10px] text-slate-300 font-sans space-y-1 list-disc list-inside">
                      {project.features.slice(0, 3).map((f, i) => (
                        <li key={i} className="truncate">{f}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5 gap-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-xl glassmorphism text-slate-400 hover:text-white text-[10px] font-mono tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" /> CODE
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-xl bg-gradient-to-r from-accent-indigo to-accent-purple text-white text-[10px] font-mono tracking-wider flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> DEMO
                  </a>
                </div>
              </motion.div>
            </GlowingBorder>
          ))}
        </div>
      </div>
    </section>
  );
}
