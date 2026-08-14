"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Award, ExternalLink, ShieldCheck } from "lucide-react";
import GlowingBorder from "@/components/ui/glowing-border";

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  verifyUrl: string;
  logoColor: string; // Gradient color of front card border
  details: string[];
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: "Advanced Software Engineering",
    issuer: "Walmart USA / Forage",
    date: "November 2025",
    credentialId: "WMT-SWE-SIM-2025",
    verifyUrl: "https://theforage.com",
    logoColor: "from-blue-500 to-cyan-500",
    details: [
      "Custom Heap Data Structures",
      "Java Shipping Operation Queries",
      "UML Class Diagrams Modeling",
      "Entity Relationship Diagrams"
    ],
  },
  {
    id: 2,
    title: "Software Development Simulation",
    issuer: "Datacom / Forage",
    date: "October 2025",
    credentialId: "DTC-SD-SIM-2025",
    verifyUrl: "https://theforage.com",
    logoColor: "from-red-500 to-orange-500",
    details: [
      "Code Reviews & Defect Checks",
      "Web Application Debugging",
      "Application Quality Optimization",
      "Maintainability Improvements"
    ],
  },
  {
    id: 3,
    title: "Solutions Architecture Simulation",
    issuer: "AWS / Forage",
    date: "October 2025",
    credentialId: "AWS-SA-SIM-2025",
    verifyUrl: "https://theforage.com",
    logoColor: "from-amber-500 to-yellow-500",
    details: [
      "Scalable Cloud Infrastructures",
      "AWS Elastic Beanstalk Deployments",
      "Architectural Documentation",
      "Cloud Cost & Logic Optimization"
    ],
  },
  {
    id: 4,
    title: "Python Essentials 1",
    issuer: "Cisco Networking Academy",
    date: "December 2025",
    credentialId: "CISCO-PY-ESS-1",
    verifyUrl: "https://netacad.com",
    logoColor: "from-green-500 to-emerald-500",
    details: [
      "Python Basics & Syntax",
      "Control Structures & Data Flow",
      "Collections, Lists & Tuples",
      "Algorithm Logic Foundations"
    ],
  },
  {
    id: 5,
    title: "GenAI Powered Data Analytics",
    issuer: "Tata Group / Forage",
    date: "April 2026",
    credentialId: "TATA-GENAI-ANALYTICS",
    verifyUrl: "https://theforage.com",
    logoColor: "from-purple-500 to-indigo-500",
    details: [
      "Generative AI Data Processing",
      "Corporate Dataset Insights",
      "Exploratory Analytics Models",
      "Dashboard Metrics Formulation"
    ],
  },
  {
    id: 6,
    title: "AI Tools Workshop",
    issuer: "Academic Workshop / Seminar",
    date: "February 2026",
    credentialId: "AI-TOOLS-WKSHP-2026",
    verifyUrl: "https://github.com",
    logoColor: "from-pink-500 to-rose-500",
    details: [
      "Generative Models Workflows",
      "Prompt Engineering Paradigms",
      "System Automation Workflows",
      "AI APIs Client Integration"
    ],
  },
];

export default function Certifications() {
  const [startIndex, setStartIndex] = useState(0);

  // Carousel Next/Prev Navigation
  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % certificates.length);
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  // Get current visible certificates (show 3 on desktop, 2 on tablet, 1 on mobile)
  const getVisibleCertificates = () => {
    const list = [];
    for (let i = 0; i < 3; i++) {
      list.push(certificates[(startIndex + i) % certificates.length]);
    }
    return list;
  };

  return (
    <section id="certifications" className="relative py-24 bg-slate-950/40">
      {/* 3D perspective styles for flipping cards */}
      <style jsx global>{`
        .flip-container {
          perspective: 1200px;
        }
        .flip-inner {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        .flip-container:hover .flip-inner {
          transform: rotateY(180deg);
        }
        .flip-front,
        .flip-back {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          position: absolute;
          inset: 0;
        }
        .flip-back {
          transform: rotateY(180deg);
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 z-10 relative">
        {/* Title */}
        <div className="text-center mb-16 space-y-2">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono tracking-[0.3em] text-accent-cyan uppercase"
          >
            Credentials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-sora tracking-tight text-white"
          >
            Certifications
          </motion.h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-accent-purple to-accent-cyan mx-auto mt-4" />
        </div>

        {/* Carousel Container wrapped with GlowingBorder */}
        <GlowingBorder borderRadius="rounded-3xl" activeHover={false}>
          <div className="relative max-w-5xl mx-auto flex items-center justify-center gap-4 glassmorphism p-4 md:p-6 rounded-3xl border border-white/5">
            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="p-3 rounded-full glassmorphism text-accent-cyan hover:text-accent-purple transition-colors cursor-pointer shrink-0 z-10"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 overflow-hidden py-4 px-2">
              <AnimatePresence mode="popLayout">
                {getVisibleCertificates().map((cert, index) => (
                  <motion.div
                    key={`${cert.id}-${startIndex}`}
                    initial={{ opacity: 0, scale: 0.9, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: -50 }}
                    transition={{ duration: 0.4 }}
                    className="flip-container h-80 w-full relative cursor-pointer"
                  >
                    <div className="flip-inner w-full h-full relative">
                      
                      {/* FRONT OF THE CARD */}
                      <div className="flip-front w-full h-full p-6 rounded-2xl glassmorphism border border-white/5 flex flex-col justify-between">
                        {/* Logo header */}
                        <div className="flex justify-between items-start">
                          <div className="p-3 rounded-xl bg-slate-900 border border-white/10 text-accent-cyan shadow-inner">
                            <Award className="w-6 h-6" />
                          </div>
                          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                            Hover to Inspect
                          </span>
                        </div>

                        {/* Title & Issuer */}
                        <div className="space-y-1">
                          <h3 className="text-base font-bold text-white font-sora tracking-tight">
                            {cert.title}
                          </h3>
                          <p className="text-xs font-semibold text-accent-cyan font-mono tracking-wide">
                            {cert.issuer}
                          </p>
                        </div>

                        {/* Date / Stamp */}
                        <div className="flex justify-between items-end border-t border-white/5 pt-4">
                          <div className="font-mono text-[10px] text-slate-400">
                            <div>ISSUED:</div>
                            <div className="text-white font-bold">{cert.date}</div>
                          </div>
                          <div
                            className={`w-8 h-8 rounded-full bg-gradient-to-r ${cert.logoColor} opacity-25 filter blur-xs animate-pulse`}
                          />
                        </div>
                      </div>

                      {/* BACK OF THE CARD */}
                      <div className="flip-back w-full h-full p-6 rounded-2xl glassmorphism border border-accent-cyan/30 flex flex-col justify-between bg-slate-950/95 shadow-[0_0_25px_rgba(6,182,212,0.1)]">
                        {/* Back Header */}
                        <div className="flex justify-between items-center pb-2 border-b border-white/10">
                          <span className="text-[10px] font-mono tracking-widest text-accent-cyan uppercase font-semibold flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" /> CREDENTIAL VERIFIED
                          </span>
                        </div>

                        {/* Bullet points of certification */}
                        <div className="flex-1 py-3 flex flex-col justify-center">
                          <ul className="text-[10px] text-slate-300 font-sans space-y-1.5 list-disc list-inside leading-snug">
                            {cert.details.map((d, i) => (
                              <li key={i} className="truncate">{d}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Credentials Verification Info */}
                        <div className="space-y-3">
                          <div className="font-mono text-[9px] text-slate-400">
                            ID: <span className="text-slate-200 font-bold">{cert.credentialId}</span>
                          </div>
                          <a
                            href={cert.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2 rounded-xl bg-gradient-to-r from-accent-indigo to-accent-purple text-white text-[10px] font-mono tracking-widest flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
                          >
                            VERIFY CREDENTIAL <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="p-3 rounded-full glassmorphism text-accent-cyan hover:text-accent-purple transition-colors cursor-pointer shrink-0 z-10"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </GlowingBorder>
      </div>
    </section>
  );
}
