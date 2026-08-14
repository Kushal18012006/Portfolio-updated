"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Laptop, Cloud, BrainCircuit } from "lucide-react";
import RadialOrbitalTimeline, { TimelineItem } from "@/components/ui/radial-orbital-timeline";

const simulationsData: TimelineItem[] = [
  {
    id: 1,
    title: "Advanced Software Engineering Job Simulation",
    company: "Walmart Global Tech",
    type: "Job Simulation",
    duration: "November 2025",
    description:
      "Developed a custom data structure in Java to optimize shipping operations. Designed UML class diagrams and Entity Relationship diagrams for scalable software systems.",
    icon: <Code2 className="w-5 h-5 text-cyan-400" />,
    status: "completed",
    energy: 100,
    relatedIds: [2, 3],
  },
  {
    id: 2,
    title: "Software Development Job Simulation",
    company: "Datacom",
    type: "Job Simulation",
    duration: "October 2025",
    description:
      "Performed code reviews to identify software defects and improve application quality. Debugged web application issues and suggested improvements for maintainability and performance.",
    icon: <Laptop className="w-5 h-5 text-orange-400" />,
    status: "completed",
    energy: 90,
    relatedIds: [1, 3],
  },
  {
    id: 3,
    title: "Solutions Architecture Job Simulation",
    company: "Amazon Web Services (AWS)",
    type: "Job Simulation",
    duration: "October 2025",
    description:
      "Designed scalable cloud architecture using AWS Elastic Beanstalk. Prepared technical documentation explaining architecture and optimization decisions.",
    icon: <Cloud className="w-5 h-5 text-amber-400" />,
    status: "completed",
    energy: 85,
    relatedIds: [1, 2, 4],
  },
  {
    id: 4,
    title: "GenAI Powered Data Analytics",
    company: "Tata Group",
    type: "Simulation",
    duration: "April 2026",
    description:
      "Applied Generative AI tools to analyze datasets and generate actionable insights.",
    icon: <BrainCircuit className="w-5 h-5 text-purple-400" />,
    status: "completed",
    energy: 95,
    relatedIds: [3],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 z-10 relative">
        {/* Title */}
        <div className="text-center mb-10 space-y-2">
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

        {/* Interactive Radial Orbital Timeline */}
        <div className="w-full relative">
          <RadialOrbitalTimeline items={simulationsData} />
        </div>
      </div>
    </section>
  );
}
