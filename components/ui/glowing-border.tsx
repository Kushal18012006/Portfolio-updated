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
      {/* 1. Subtle Outer Border Line Glow (Hollowed Center using Mask) */}
      <div
        className={`absolute -inset-[2px] ${borderRadius} bg-gradient-to-r from-accent-indigo via-accent-purple to-accent-cyan opacity-35 blur-[5px] transition-all duration-500 animate-glowing-border pointer-events-none ${
          activeHover ? "group-hover/glow:opacity-75 group-hover/glow:blur-[8px]" : ""
        }`}
        style={{
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "2px",
        }}
      />

      {/* 2. Sharp Animated Border Line Overlay (100% Hollow Center - No Background Fill) */}
      <div
        className={`absolute -inset-[1px] ${borderRadius} bg-gradient-to-r from-accent-indigo/70 via-accent-purple/70 to-accent-cyan/70 opacity-60 transition-opacity duration-300 animate-glowing-border pointer-events-none ${
          activeHover ? "group-hover/glow:opacity-100" : ""
        }`}
        style={{
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1.5px",
        }}
      />

      {/* Content Container (Transparent interior) */}
      <div className={`relative z-10 ${borderRadius} h-full`}>
        {children}
      </div>
    </div>
  );
}
