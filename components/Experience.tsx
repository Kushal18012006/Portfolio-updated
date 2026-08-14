"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Briefcase } from "lucide-react";

interface Simulation {
  company: string;
  role: string;
  duration: string;
  points: string[];
  logoText: string;
  logoBg: string; // Gradient color configuration
  shadow: string;
}

const simulations: Simulation[] = [
  {
    company: "Walmart Global Tech",
    role: "Advanced Software Engineering Job Simulation",
    duration: "November 2025",
    logoText: "W",
    logoBg: "from-blue-600 to-cyan-400",
    shadow: "shadow-[0_0_15px_rgba(37,99,235,0.3)]",
    points: [
      "Developed a custom heap data structure in Java to optimize shipping operations.",
      "Designed UML class diagrams and Entity Relationship diagrams for scalable software systems.",
    ],
  },
  {
    company: "Datacom",
    role: "Software Development Job Simulation",
    duration: "October 2025",
    logoText: "D",
    logoBg: "from-red-500 to-orange-400",
    shadow: "shadow-[0_0_15px_rgba(239,68,68,0.3)]",
    points: [
      "Performed code reviews to identify software defects and improve application quality.",
      "Debugged web application issues and suggested improvements for maintainability and performance.",
    ],
  },
  {
    company: "Amazon Web Services (AWS)",
    role: "Solutions Architecture Job Simulation",
    duration: "October 2025",
    logoText: "A",
    logoBg: "from-amber-500 to-yellow-400",
    shadow: "shadow-[0_0_15px_rgba(245,158,11,0.3)]",
    points: [
      "Designed scalable cloud architecture using AWS Elastic Beanstalk.",
      "Prepared technical documentation explaining architecture and optimization decisions.",
    ],
  },
  {
    company: "Tata Group",
    role: "GenAI Powered Data Analytics",
    duration: "April 2026",
    logoText: "T",
    logoBg: "from-indigo-600 to-purple-400",
    shadow: "shadow-[0_0_15px_rgba(79,70,229,0.3)]",
    points: [
      "Applied Generative AI tools to analyze datasets and generate actionable insights.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-24">
      <div className="max-w-7xl mx-auto px-6 z-10 relative">
        {/* Title */}
        <div className="text-center mb-16 space-y-2">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono tracking-[0.3em] text-accent-cyan uppercase"
          >
            Track Record
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-sora tracking-tight text-white"
          >
            Professional Experience
          </motion.h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-accent-purple to-accent-cyan mx-auto mt-4" />
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-3xl mx-auto pl-6 md:pl-0">
          {/* Vertical line for timelines (Centered on md screens) */}
          <div className="absolute left-[29px] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {simulations.map((sim, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={sim.company}
                  className="relative flex flex-col md:flex-row md:justify-between items-start md:items-center w-full"
                >
                  {/* Glowing Company Dot (Centered on timeline) */}
                  <div className="absolute left-[3px] md:left-1/2 top-1 md:top-auto p-1 rounded-full bg-[#050816] z-10 -translate-x-1/2">
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${sim.logoBg} ${sim.shadow} flex items-center justify-center text-white font-bold font-sora text-sm border border-white/20`}
                    >
                      {sim.logoText}
                    </div>
                  </div>

                  {/* Left Column (Date indicator for Even items, or Spacer for Odd items) */}
                  <div className={`hidden md:block w-[45%] ${isEven ? "order-1 text-right" : "order-2"}`}>
                    {isEven && (
                      <div className="pr-8 space-y-1 font-mono text-xs text-slate-400">
                        <div className="flex items-center gap-1.5 justify-end">
                          <Calendar className="w-3.5 h-3.5 text-accent-cyan" />
                          <span>{sim.duration}</span>
                        </div>
                        <div className="text-accent-cyan font-bold uppercase tracking-wider">
                          Simulation
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Spacer for center dot */}
                  <div className="hidden md:block w-[10%] order-2" />

                  {/* Card Container (Right/Left placement based on order) */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
                    className={`w-full md:w-[45%] p-6 rounded-2xl glassmorphism border border-white/5 hover:border-white/10 hover:bg-white/[0.03] transition-all duration-300 relative group cursor-pointer ${
                      isEven ? "order-3 md:order-2" : "order-1"
                    }`}
                  >
                    {/* Hover internal glow */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-accent-indigo/5 to-accent-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Mobile Duration indicator */}
                    <div className="flex md:hidden items-center gap-1.5 font-mono text-[10px] text-slate-400 mb-2">
                      <Calendar className="w-3.5 h-3.5 text-accent-cyan" />
                      <span>{sim.duration}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white font-sora tracking-tight leading-snug">
                      {sim.role}
                    </h3>
                    <h4 className="text-sm font-semibold text-accent-cyan font-mono tracking-wide mt-1">
                      {sim.company}
                    </h4>

                    <ul className="mt-4 space-y-2 text-xs text-slate-400 font-sans leading-relaxed list-disc list-inside">
                      {sim.points.map((pt, i) => (
                        <li key={i} className="pl-1 text-slate-300">
                          <span className="relative -left-1">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Right Column for Odd items (Date & Simulation label with pl-8 offset) */}
                  {!isEven && (
                    <div className="hidden md:block w-[45%] order-3 text-left">
                      <div className="pl-8 space-y-1 font-mono text-xs text-slate-400">
                        <div className="flex items-center gap-1.5 justify-start">
                          <Calendar className="w-3.5 h-3.5 text-accent-cyan" />
                          <span>{sim.duration}</span>
                        </div>
                        <div className="text-accent-cyan font-bold uppercase tracking-wider">
                          Simulation
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
