"use client";

import React from "react";

interface GlowingBorderProps {
  children: React.ReactNode;
  className?: string;
  borderRadius?: string;
  activeHover?: boolean;
}

export default function GlowingBorder({
  children,
  className = "",
  borderRadius = "rounded-3xl",
  activeHover = true,
}: GlowingBorderProps) {
  return (
    <div className={`relative group/glow ${className}`}>
      {/* Outer Soft Subtle Blur Glow Line */}
      <div
        className={`absolute -inset-[1px] ${borderRadius} bg-gradient-to-r from-accent-indigo via-accent-purple to-accent-cyan opacity-35 blur-[4px] transition-all duration-500 animate-glowing-border pointer-events-none ${
          activeHover ? "group-hover/glow:opacity-75 group-hover/glow:blur-[8px]" : ""
        }`}
      />
      
      {/* Sharp Border Line Overlay */}
      <div
        className={`absolute -inset-[1px] ${borderRadius} bg-gradient-to-r from-accent-indigo/60 via-accent-purple/60 to-accent-cyan/60 opacity-60 transition-opacity duration-300 animate-glowing-border pointer-events-none ${
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
