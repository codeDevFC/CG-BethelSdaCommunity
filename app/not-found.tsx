"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Home, 
  ArrowLeft, 
  Compass, 
  Search,
  Hourglass
} from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    // Check if there's history to go back to
    setCanGoBack(window.history.length > 1);
  }, []);

  const handleGoBack = () => {
    if (canGoBack) {
      router.back();
    } else {
      // Fallback to home if no history exists
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0a0a0a]">
      {/* Background Intentionality - Radial Glows using Logo Slate */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#547189]/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#C8102E]/10 rounded-full blur-[120px]" />

      <div className="relative z-10 text-center px-6">
        {/* Animated Icon Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-dashed border-[#547189]/30 rounded-full scale-150"
            />
            <div className="w-24 h-24 glass-panel flex items-center justify-center bg-white/5 border-white/10">
              <Hourglass size={40} className="text-amber-500" />
            </div>
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="text-7xl md:text-9xl font-black text-white/10 absolute top-[-40px] left-1/2 -translate-x-1/2 select-none">
            404
          </h1>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 relative z-10" style={{ fontFamily: 'Georgia, serif' }}>
            Journey Interrupted
          </h2>
          <p className="text-gray-400 max-w-md mx-auto mb-10 text-lg leading-relaxed">
            "Trust the timing. It's worth it." <br/>
            The page you are looking for has moved or is currently being carefully prepared.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={handleGoBack}
            className="w-full sm:w-auto px-8 py-4 glass-card flex items-center justify-center gap-3 text-white hover:bg-white/10 transition-all active:scale-95"
          >
            <ArrowLeft size={18} />
            <span className="font-black text-[10px] uppercase tracking-widest">
              {canGoBack ? "Go Back" : "Go Home"}
            </span>
          </button>

          <Link href="/" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-10 py-4 bg-[#547189] text-white rounded-[20px] font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-[#3a4f61] transition-all flex items-center justify-center gap-3 active:scale-95">
              <Home size={18} />
              Return Home
            </button>
          </Link>
        </motion.div>

        {/* Subtle Footer Link */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1 }}
          className="mt-16"
        >
          <Link href="/portal" className="text-gray-500 hover:text-[#547189] transition-colors flex items-center justify-center gap-2">
            <Compass size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">Access Portal</span>
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          font-weight: bold;
        }
        .glass-panel {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
}