"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlowingBorder from "@/components/ui/glowing-border";
import { 
  Coffee, Code2, Terminal, Cpu, FileCode, Palette, Wind, 
  GitBranch, Monitor, Layers, Cloud, Network, 
  Binary, GitMerge, Blocks, Bug, CheckSquare, Zap, Smartphone 
} from "lucide-react";

const GithubIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface Skill {
  name: string;
  icon: React.ReactNode;
  level?: string; // e.g., "Advanced", "Intermediate"
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const skillCategories: Record<string, SkillCategory> = {
  programming: {
    title: "Programming",
    skills: [
      { name: "Java", icon: <Coffee className="w-6 h-6 text-orange-400" /> },
      { name: "JavaScript", icon: <Code2 className="w-6 h-6 text-yellow-400" /> },
      { name: "Python", icon: <Terminal className="w-6 h-6 text-blue-400" /> },
      { name: "C Language", icon: <Cpu className="w-6 h-6 text-slate-400" /> },
    ],
  },
  frontend: {
    title: "Frontend",
    skills: [
      { name: "HTML5", icon: <FileCode className="w-6 h-6 text-red-500" /> },
      { name: "CSS3", icon: <Palette className="w-6 h-6 text-blue-500" /> },
      { name: "React.js", icon: <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }}><Cpu className="w-6 h-6 text-cyan-400" /></motion.div> },
      { name: "Tailwind CSS", icon: <Wind className="w-6 h-6 text-teal-400" /> },
    ],
  },
  backend: {
    title: "Backend",
    skills: [
      { name: "Java Standard Ed.", icon: <Coffee className="w-6 h-6 text-orange-400" /> },
      { name: "System Logics", icon: <Layers className="w-6 h-6 text-purple-400" /> },
    ],
  },
  tools: {
    title: "Tools & DevOps",
    skills: [
      { name: "Git", icon: <GitBranch className="w-6 h-6 text-orange-500" /> },
      { name: "GitHub", icon: <GithubIcon className="w-6 h-6 text-white" /> },
      { name: "VS Code", icon: <Monitor className="w-6 h-6 text-blue-500" /> },
      { name: "IntelliJ IDEA", icon: <Layers className="w-6 h-6 text-pink-500" /> },
      { name: "AWS", icon: <Cloud className="w-6 h-6 text-amber-500" /> },
      { name: "UML Diagrams", icon: <Network className="w-6 h-6 text-green-400" /> },
      { name: "ER Diagrams", icon: <Network className="w-6 h-6 text-indigo-400" /> },
    ],
  },
  engineering: {
    title: "Software Engineering",
    skills: [
      { name: "Data Structures", icon: <Binary className="w-6 h-6 text-cyan-500" /> },
      { name: "Algorithms", icon: <GitMerge className="w-6 h-6 text-purple-500" /> },
      { name: "Object Oriented Prog.", icon: <Blocks className="w-6 h-6 text-emerald-400" /> },
      { name: "Debugging", icon: <Bug className="w-6 h-6 text-rose-500" /> },
      { name: "Code Review", icon: <CheckSquare className="w-6 h-6 text-lime-400" /> },
      { name: "Problem Solving", icon: <Zap className="w-6 h-6 text-yellow-500 animate-bounce" /> },
      { name: "Responsive Design", icon: <Smartphone className="w-6 h-6 text-violet-400" /> },
    ],
  },
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState<keyof typeof skillCategories>("programming");

  return (
    <section id="skills" className="relative py-24">
      <div className="max-w-7xl mx-auto px-6 z-10 relative">
        {/* Title */}
        <div className="text-center mb-16 space-y-2">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono tracking-[0.3em] text-accent-cyan uppercase"
          >
            Capabilities
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-sora tracking-tight text-white"
          >
            My Tech Stack
          </motion.h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-accent-purple to-accent-cyan mx-auto mt-4" />
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {Object.keys(skillCategories).map((key) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key as keyof typeof skillCategories)}
                className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-accent-indigo to-accent-purple text-white shadow-[0_0_15px_rgba(124,58,237,0.3)] border border-accent-purple"
                    : "glassmorphism text-slate-400 hover:text-white"
                }`}
              >
                {skillCategories[key].title}
              </button>
            );
          })}
        </div>

        {/* Skill Cards Grid Container wrapped with GlowingBorder */}
        <GlowingBorder borderRadius="rounded-3xl" activeHover={false}>
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="wait">
              {skillCategories[activeTab].skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="relative group p-6 rounded-2xl glassmorphism flex flex-col items-center justify-center text-center gap-4 transition-all duration-300 border border-white/5 hover:border-accent-cyan/30 cursor-pointer"
                >
                  {/* Background Card Hover Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-accent-indigo/10 to-accent-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-accent-indigo to-accent-cyan opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300 -z-10" />

                  {/* Animated Skill Icon */}
                  <motion.div 
                    whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                    className="p-4 rounded-xl bg-slate-900/60 border border-white/10 group-hover:border-accent-cyan/40 transition-colors shadow-inner"
                  >
                    {skill.icon}
                  </motion.div>

                  {/* Skill Name */}
                  <span className="text-sm font-semibold tracking-wide text-slate-200 group-hover:text-white transition-colors font-sora">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </GlowingBorder>
      </div>
    </section>
  );
}
