"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, ArrowRight, Sparkles, ChevronDown, ChevronUp,
  Heart, Users, Church, HandHeart, Target, Crown, Award, 
  Globe, Layout
} from 'lucide-react';
import Logo from '@/components/Logo';
import HeroCarousel from '@/components/HeroCarousel';

const clearFramework = [
  { letter: 'C', word: 'Community', desc: 'Belonging where everyone is family.', color: 'bg-blue-600' },
  { letter: 'L', word: 'Leadership', desc: 'Spiritual direction modeling Christ.', color: 'bg-indigo-600' },
  { letter: 'E', word: 'Evangelism', desc: 'Intentional groups winning souls.', color: 'bg-red-600' },
  { letter: 'A', word: 'Accountability', desc: 'Growth through prayer and scripture.', color: 'bg-emerald-600' },
  { letter: 'R', word: 'Reproduction', desc: 'Multiplying groups and planting churches.', color: 'bg-purple-600' },
];

const competencies = [
  { title: 'Revival', icon: Heart, color: 'text-rose-500' },
  { title: 'Discipleship', icon: Users, color: 'text-blue-500' },
  { title: 'Home-based', icon: Church, color: 'text-emerald-500' },
  { title: 'Personal', icon: HandHeart, color: 'text-amber-500' },
  { title: 'Public', icon: Target, color: 'text-red-500' },
  { title: 'Practical', icon: Shield, color: 'text-indigo-500' },
  { title: 'Planting', icon: Crown, color: 'text-purple-500' },
];

export default function HomePage() {
  const [isFrameworkOpen, setIsFrameworkOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <Logo className="h-14 md:h-20" />
        <Link 
          href="/login" 
          className="bg-navy-brand text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-[#0a2a80] hover:scale-105 transition-all"
        >
          Access Portal
        </Link>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pb-24">
        {/* Hero Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-16">
          <HeroCarousel />
        </motion.div>

        {/* Main Brand Section */}
        <div className="max-w-4xl mx-auto text-center space-y-8 mb-32">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-logo/10 rounded-full">
            <Sparkles size={14} className="text-slate-logo" />
            <span className="font-black text-[9px] uppercase tracking-[0.2em] text-slate-logo">Business Unusual</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-navy-brand leading-[0.9] mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            Relationship <span className="text-slate-logo">•</span> Fellowship <span className="text-slate-logo">•</span> Belonging
          </h1>
          
          <p className="text-xl md:text-2xl text-red-brand font-black uppercase tracking-widest">
            → Discipleship For Mission
          </p>

          <div className="pt-8">
            <Link 
              href="/login" 
              className="w-full sm:w-auto bg-navy-brand text-white px-12 py-5 rounded-2xl font-black text-sm flex items-center justify-center gap-3 group shadow-2xl mx-auto uppercase tracking-widest hover:bg-[#0a2a80] hover:scale-105 transition-all"
            >
              <Layout size={20} className="group-hover:rotate-12 transition-transform" />
              Care Group PORTAL <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* The CLEAR Framework (Collapsible) */}
        <section className="max-w-2xl mx-auto mb-32">
          <button 
            onClick={() => setIsFrameworkOpen(!isFrameworkOpen)}
            className="w-full glass-panel p-6 flex justify-between items-center group hover:bg-white transition-all border-slate-logo/20 shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-navy-brand rounded-xl flex items-center justify-center text-white shadow-lg">
                <Shield size={20} />
              </div>
              <span className="font-black uppercase tracking-widest text-sm text-navy-brand">The CLEAR Framework</span>
            </div>
            {isFrameworkOpen ? <ChevronUp className="text-slate-logo" /> : <ChevronDown className="text-slate-logo" />}
          </button>

          <AnimatePresence>
            {isFrameworkOpen && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="pt-4 space-y-3">
                  {clearFramework.map((item) => (
                    <div key={item.letter} className="glass-card p-5 flex items-center gap-6 text-left border-white/60 bg-white/40">
                      <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-md`}>
                        {item.letter}
                      </div>
                      <div>
                        <h3 className="font-black text-navy-brand uppercase text-xs tracking-widest">{item.word}</h3>
                        <p className="text-sm text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* HIGH CONTRAST CTA SECTION */}
        <section className="max-w-5xl mx-auto">
          <div className="glass-panel p-12 md:p-24 text-center border-slate-logo/30 bg-white/90 backdrop-blur-2xl shadow-[0_30px_60px_rgba(84,113,137,0.15)] relative overflow-hidden">
            <div className="relative z-10 space-y-10">
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-20 h-20 bg-red-brand/5 rounded-full flex items-center justify-center mx-auto border border-red-brand/10"
              >
                <Heart size={40} className="text-red-brand fill-red-brand/10" />
              </motion.div>
              
              <div className="space-y-6">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-navy-brand leading-none" style={{ fontFamily: 'Georgia, serif' }}>
                  Ready to Start <br/> Your Journey?
                </h2>
                <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                  Join a Care Group today and experience the power of <span className="text-navy-brand font-black">intentional discipleship</span>. Your community is waiting for you.
                </p>
              </div>

              <div className="pt-6">
                <Link 
                  href="/login" 
                  className="bg-navy-brand text-white px-14 py-6 rounded-2xl font-black text-base inline-flex items-center justify-center gap-4 shadow-2xl uppercase tracking-widest hover:bg-[#0a2a80] hover:scale-105 transition-all active:scale-95"
                >
                  Get Started Now <ArrowRight size={20} />
                </Link>
              </div>
            </div>
            
            {/* Decorative background elements - Logo Slate Blue */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-slate-logo/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-brand/5 rounded-full blur-[100px]" />
          </div>
        </section>
      </main>

      <footer className="bg-navy-brand py-24 text-center relative overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
        {/* Beautiful C.A.R.E Section */}
<div className="mb-20 relative z-10">
  <h3 className="text-6xl md:text-7xl font-black text-white tracking-tighter uppercase mb-4" style={{ fontFamily: 'Georgia, serif' }}>
    C.A.R.E
  </h3>
  <div className="h-1.5 w-24 bg-red-brand mx-auto rounded-full mb-8" />
  <p className="text-lg md:text-2xl font-black text-white/90 uppercase tracking-[0.15em] max-w-4xl mx-auto leading-relaxed">
    <span className="text-red-brand">C</span>hrist&apos;s 
    <span className="mx-2 md:mx-4">
      <span className="text-red-brand">A</span>ttitude
    </span>
    <span className="mr-2 md:mr-4">
      <span className="text-red-brand">R</span>eflecting in
    </span>
    <span className="text-red-brand">E</span>veryone
  </p>
</div>




          {/* 7 Competencies Icons */}
          <div className="grid grid-cols-4 md:grid-cols-7 gap-8 mb-20 max-w-4xl mx-auto">
            {competencies.map((comp, i) => (
              <div key={i} className="flex flex-col items-center gap-3 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center transition-all group-hover:bg-white/10 group-hover:scale-110 border border-white/10 shadow-2xl">
                  <comp.icon className={`w-7 h-7 ${comp.color}`} />
                </div>
                <span className="text-[9px] font-black text-white/50 uppercase tracking-widest leading-tight">{comp.title}</span>
              </div>
            ))}
          </div>

          <div className="space-y-6 pt-12 border-t border-white/5">
            <p className="text-xs font-black uppercase tracking-[0.5em] text-white/60">
              Bethel Willenhall CARE Group
            </p>
            <div className="h-px w-16 bg-red-brand mx-auto opacity-40" />
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-medium">
              Designed with intentionality by DevFC Engineering • 2025
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none" />
      </footer>
    </div>
  );
}
