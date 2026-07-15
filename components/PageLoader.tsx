"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const duration = 1500; // 1.5 seconds loading time
    const interval = 20; // 20ms update interval
    const step = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step + Math.random() * 5; // adding some organic feel
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsDone(true), 200);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 bg-[#050816] z-[99999] flex flex-col justify-between p-8 md:p-16 select-none"
        >
          {/* Header */}
          <div className="flex justify-between items-center text-xs tracking-[0.25em] text-slate-400 font-mono">
            <div>KUSHAL TRIPATHI</div>
            <div>DEVELOPER PORTFOLIO ©2026</div>
          </div>

          {/* Center Text */}
          <div className="flex flex-col items-start gap-4">
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-4xl md:text-7xl font-bold font-sora tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-accent-indigo via-accent-purple to-accent-cyan"
              >
                KUSHAL TRIPATHI
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="text-xs md:text-sm tracking-[0.3em] text-slate-400 font-mono uppercase"
              >
                Software Developer // Java // Frontend
              </motion.p>
            </div>
          </div>

          {/* Footer & Progress */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-end">
              <span className="text-xs font-mono tracking-widest text-slate-400">INITIALIZING SYSTEMS</span>
              <span className="text-5xl md:text-8xl font-bold font-mono tracking-tight text-white/90">
                {Math.round(progress)}%
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-[1px] bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent-indigo via-accent-purple to-accent-cyan"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
