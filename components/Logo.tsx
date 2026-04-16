"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function Logo({ className = "h-12 md:h-16", variant = "full" }: { className?: string; variant?: "full" | "compact" }) {
  const logoSrc = "/images/gallery/logoCG.png";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex items-center justify-center select-none ${className}`}
    >
      <div className="relative glass-panel p-2 md:p-3 bg-white/40 backdrop-blur-md border border-white/40 rounded-2xl shadow-sm">
        <img 
          src={logoSrc}
          alt="Bethel Willenhall" 
          className="h-full w-auto object-contain"
          style={{ maxHeight: variant === 'compact' ? '40px' : '80px' }}
        />
      </div>
    </motion.div>
  );
}
