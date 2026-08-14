"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Download, Eye, Mail, ArrowDown } from "lucide-react";

import GlowingBorder from "@/components/ui/glowing-border";

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const words = [
  "Software Developer",
  "Frontend Developer",
  "Problem Solver",
  "DSA Enthusiast",
];

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Typing Effect Logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullWord = words[currentWordIndex];
    
    const type = () => {
      if (isDeleting) {
        // Deleting characters
        setCurrentText((prev) => prev.slice(0, -1));
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        // Typing characters
        setCurrentText((prev) => fullWord.slice(0, prev.length + 1));
        if (currentText === fullWord) {
          // Pause at the end of the word
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      }

      const speed = isDeleting ? 40 : 80;
      timer = setTimeout(type, speed);
    };

    timer = setTimeout(type, 100);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  // 3D Tilt Effect on Profile Card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    const rotateX = -(y / (box.height / 2)) * 10; // Max 10 degrees tilt
    const rotateY = (x / (box.width / 2)) * 10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  // Scroll handler for button clicks
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Content (Info & CTAs) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left gap-6 order-2 lg:order-1">
          {/* Header Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-3 py-1 rounded-full glassmorphism text-xs font-mono tracking-widest text-accent-cyan"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
            OPEN FOR OPPORTUNITIES
          </motion.div>

          {/* Heading */}
          <div className="space-y-2">
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-slate-400 font-mono text-lg md:text-xl"
            >
              Hi, I'm
            </motion.h2>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tighter font-sora text-white"
            >
              Kushal Tripathi
            </motion.h1>
          </div>

          {/* Typing Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="h-10 text-xl md:text-3xl font-bold font-sora text-transparent bg-clip-text bg-gradient-to-r from-accent-indigo via-accent-purple to-accent-cyan flex items-center"
          >
            <span>{currentText}</span>
            <span className="w-1 h-8 bg-accent-cyan ml-1 animate-pulse" />
          </motion.div>

          {/* Intro Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-slate-300 font-sans text-sm md:text-base leading-relaxed max-w-xl"
          >
            I am a Computer Science undergraduate passionate about Software Development, Java, 
            Data Structures & Algorithms, and building beautiful modern web applications. 
            I enjoy solving challenging programming problems while creating responsive, scalable, 
            and visually stunning user interfaces.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-3 mt-4"
          >
            <button
              onClick={() => scrollToSection("contact")}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-accent-indigo via-accent-purple to-accent-cyan text-white text-xs font-mono font-semibold tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-[0_0_15px_rgba(124,58,237,0.4)] flex items-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4" /> Contact Me
            </button>

            <button
              onClick={() => scrollToSection("projects")}
              className="px-5 py-3 rounded-xl glassmorphism text-accent-cyan hover:text-white text-xs font-mono font-semibold tracking-wider active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Eye className="w-4 h-4" /> View Projects
            </button>

            <a
              href="/assets/resume.pdf"
              download="Kushal_Tripathi_Resume.pdf"
              className="px-5 py-3 rounded-xl glassmorphism text-slate-300 hover:text-white text-xs font-mono font-semibold tracking-wider active:scale-95 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Resume
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex gap-4 mt-2 items-center"
          >
            <a
              href="https://github.com/Kushal18012006"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg glassmorphism text-slate-400 hover:text-accent-cyan transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/kushal-tripathi-56838232b/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg glassmorphism text-slate-400 hover:text-accent-cyan transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Right Content (Profile Photo Container) */}
        <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="relative group w-64 h-64 md:w-80 md:h-80"
          >
            {/* Orbiting Floating Particles */}
            <div className="absolute top-2 left-2 w-3 h-3 bg-accent-cyan rounded-full filter blur-[1px] animate-float" style={{ animationDelay: "0s" }} />
            <div className="absolute bottom-8 right-2 w-2.5 h-2.5 bg-accent-purple rounded-full filter blur-[1px] animate-float" style={{ animationDelay: "2s" }} />
            <div className="absolute top-1/2 -right-4 w-2 h-2 bg-accent-indigo rounded-full filter blur-[1px] animate-float" style={{ animationDelay: "4s" }} />

            {/* 3D Glass Card Container with Glowing Border */}
            <GlowingBorder borderRadius="rounded-[2rem]">
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-full h-full glassmorphism rounded-[2rem] p-3 transition-all duration-200 ease-out shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer overflow-hidden flex items-center justify-center"
              >
                <div className="relative w-full h-full rounded-[1.6rem] overflow-hidden bg-slate-950 flex items-center justify-center">
                  {/* Subtle Grid overlay inside card */}
                  <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />

                  {/* Profile Image with zoom and soft animation */}
                  <img
                    src="/assets/profile.png"
                    alt="Kushal Tripathi"
                    className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110 pointer-events-none"
                  />
                </div>
              </div>
            </GlowingBorder>
          </motion.div>
        </div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60">
        <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">SCROLL DOWN</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="text-accent-cyan cursor-pointer"
          onClick={() => scrollToSection("about")}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </div>
    </section>
  );
}
