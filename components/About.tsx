"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, Code, Layers, Lightbulb, Trophy, Cpu } from "lucide-react";
import GlowingBorder from "@/components/ui/glowing-border";

interface CounterProps {
  value: number;
  duration?: number;
  suffix?: string;
}

function AnimatedCounter({ value, duration = 1500, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration, isInView]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { label: "Projects Built", value: 15, suffix: "+" },
  { label: "Coding Hours", value: 1200, suffix: "+" },
  { label: "Commits Made", value: 800, suffix: "+" },
  { label: "GitHub Repos", value: 20, suffix: "+" },
  { label: "Hackathons", value: 5, suffix: "" },
  { label: "Certifications", value: 6, suffix: "" },
];

const timelineData = [
  {
    icon: <BookOpen className="w-5 h-5" />,
    title: "B.Tech in CSE (AI & ML)",
    description: "GL Bajaj Group of Institutions | 2024–2028. Pursuing engineering studies focusing on Generative AI models, algorithmic problem solving, software design, and database configurations.",
  },
  {
    icon: <Trophy className="w-5 h-5" />,
    title: "City Montessori School",
    description: "High School Graduation | Completed in 2024. Formed early foundations in core scientific research, mathematics, and computer applications.",
  },
  {
    icon: <Cpu className="w-5 h-5" />,
    title: "Java Developer & Backend Architecture",
    description: "Deeply interested in Object-Oriented principles, collections, and structural problem-solving. Practicing DSA challenges and refining code quality.",
  },
  {
    icon: <Layers className="w-5 h-5" />,
    title: "Frontend & Responsive UI Engineering",
    description: "Designing beautiful, mobile-first responsive web layouts using HTML5, CSS3, JavaScript, and React.js. Implementing clean DOM patterns and layouts.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 bg-slate-950/20">
      <div className="max-w-7xl mx-auto px-6 z-10 relative">
        {/* Title */}
        <div className="text-center mb-16 space-y-2">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono tracking-[0.3em] text-accent-cyan uppercase"
          >
            My Story
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-sora tracking-tight text-white"
          >
            About Me
          </motion.h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-accent-purple to-accent-cyan mx-auto mt-4" />
        </div>

        {/* Layout Grid wrapped with GlowingBorder */}
        <GlowingBorder borderRadius="rounded-3xl" activeHover={false}>
          <div className="glassmorphism p-8 md:p-10 rounded-3xl border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Timeline Description (Left side) */}
            <div className="lg:col-span-7 space-y-8">
              <h3 className="text-xl md:text-2xl font-bold font-sora text-slate-200">
                The Journey of a Software Engineer
              </h3>
              
              {/* Timeline List */}
              <div className="relative pl-12 ml-6 border-l border-white/10 space-y-8">
                {timelineData.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative space-y-2"
                  >
                    {/* Timeline Dot Icon (Centered on timeline line, fully inside section) */}
                    <div className="absolute -left-[17px] top-0 p-1.5 rounded-full bg-[#050816] border border-accent-cyan text-accent-cyan shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                      {item.icon}
                    </div>
                    <h4 className="text-lg font-semibold text-white font-sora">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-400 font-sans leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats Dashboard (Right side) */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="glassmorphism p-6 rounded-2xl flex flex-col justify-center items-center text-center gap-1 group hover:border-accent-cyan/40 transition-colors duration-300"
                >
                  <div className="text-3xl md:text-4xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-accent-indigo via-accent-purple to-accent-cyan">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs font-mono tracking-wider text-slate-400 mt-1 uppercase">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </GlowingBorder>
      </div>
    </section>
  );
}
