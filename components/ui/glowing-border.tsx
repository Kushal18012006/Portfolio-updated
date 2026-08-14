"use client";

import React from "react";

interface GlowingBorderProps {
  children: React.ReactNode;
  className?: string;
  borderRadius?: string; // e.g. "rounded-3xl", "rounded-2xl", "rounded-full"
  glowOpacity?: string;
  activeHover?: boolean;
}

export default function GlowingBorder({
  children,
  className = "",
  borderRadius = "rounded-3xl",
  glowOpacity = "opacity-40",
  activeHover = true,
}: GlowingBorderProps) {
  return (
    <div className={`relative group/glow ${className}`}>
      {/* Outer Blur Ambient Glow */}
      <div
        className={`absolute -inset-[1.5px] ${borderRadius} bg-gradient-to-r from-accent-indigo via-accent-purple to-accent-cyan ${glowOpacity} blur-[6px] transition-all duration-500 animate-glowing-border pointer-events-none ${
          activeHover ? "group-hover/glow:opacity-75 group-hover/glow:blur-[10px]" : ""
        }`}
      />
      
      {/* Sharp Border Line Overlay */}
      <div
        className={`absolute -inset-[1px] ${borderRadius} bg-gradient-to-r from-accent-indigo/60 via-accent-purple/60 to-accent-cyan/60 opacity-50 transition-opacity duration-300 animate-glowing-border pointer-events-none ${
          activeHover ? "group-hover/glow:opacity-100" : ""
        }`}
      />

      {/* Content Container */}
      <div className={`relative z-10 ${borderRadius} h-full`}>
        {children}
      </div>
    </div>
  );
}
