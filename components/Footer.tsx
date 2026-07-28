"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Heart } from "lucide-react";

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

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
  ];

  const secondaryLinks = [
    { name: "Achievements", href: "#achievements" },
    { name: "Certifications", href: "#certifications" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
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
    <footer className="relative bg-slate-950/80 pt-16 pb-8 border-t border-white/5 overflow-hidden">
      {/* Animated top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-accent-indigo via-accent-purple to-accent-cyan animate-pulse-slow" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
        {/* Brand Column */}
        <div className="md:col-span-5 space-y-4">
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home")}
            className="text-2xl font-bold font-sora tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-accent-indigo via-accent-purple to-accent-cyan"
          >
            KUSHAL TRIPATHI
          </a>
          <p className="text-xs text-slate-400 font-sans leading-relaxed max-w-sm">
            Computer Science undergraduate specializing in Java software development, data structures, and highly interactive modern web application engineering.
          </p>
          {/* Social Row */}
          <div className="flex gap-3 pt-2">
            <a
              href="https://github.com/Kushal18012006"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl glassmorphism text-slate-400 hover:text-accent-cyan transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/kushal-tripathi-56838232b/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl glassmorphism text-slate-400 hover:text-accent-cyan transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
             <a
              href="mailto:kushal.tripathi2006@gmail.com"
              className="p-2.5 rounded-xl glassmorphism text-slate-400 hover:text-accent-cyan transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links Column 1 */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-xs font-mono tracking-widest text-white uppercase font-bold">
            Navigation
          </h4>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-xs text-slate-400 hover:text-accent-cyan transition-colors font-mono"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links Column 2 */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-xs font-mono tracking-widest text-white uppercase font-bold">
            Sections
          </h4>
          <ul className="space-y-2">
            {secondaryLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-xs text-slate-400 hover:text-accent-cyan transition-colors font-mono"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Bottom (Copyright / Made with love) */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row md:justify-between items-center gap-4 text-center md:text-left">
        <span className="text-[10px] font-mono text-slate-500 tracking-wider">
          DEVELOPER PORTFOLIO ©2026 KUSHAL TRIPATHI. ALL RIGHTS RESERVED.
        </span>
        <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
          Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" /> by Kushal Tripathi
        </span>
      </div>
    </footer>
  );
}
