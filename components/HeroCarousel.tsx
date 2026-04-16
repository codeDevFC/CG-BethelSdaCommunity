"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = Array.from({ length: 20 }, (_, i) => ({
  url: `/images/cg-${(i + 1).toString().padStart(2, '0')}.jpg`,
  title: [
    'Intentional Community', 'Spiritual Growth', 'Mission Driven', 'True Belonging',
    'Revival by the Word', 'Discipleship', 'Home Evangelism', 'Personal Growth',
    'Public Witness', 'Practical Leadership', 'Church Planting', 'Faithful Service',
    'Bible Study', 'Prayer Ministry', 'Grace Abounding', 'Kingdom Focus',
    'Heart Transformation', 'Community Impact', 'Sacrificial Love', 'Eternal Hope'
  ][i],
  subtitle: [
    'Building relationships that last for eternity', 'Deepening our walk through the Word',
    'Equipping workers for the harvest', 'A family where you are known and loved',
    'Christ-centered Bible study and prayer', 'Modeling the character of Jesus daily',
    'Sharing the gospel from home to home', 'Empowering every member for ministry',
    'Proclaiming the three angels messages', 'Bible-based decisions for life',
    'Multiplying groups across the region', 'Serving our neighbors with joy',
    'Unlocking the treasures of Scripture', 'Interceding for our community',
    'Receiving the gift of righteousness', 'Seeking first the Kingdom of God',
    'Being changed from the inside out', 'Salt and light in Willenhall',
    'Giving as Christ gave to us', 'Looking forward to the New Earth'
  ][i]
}));

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent(current === slides.length - 1 ? 0 : current + 1);
  const prev = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);

  return (
    <div className="relative w-full h-[450px] md:h-[650px] overflow-hidden rounded-[3rem] shadow-2xl border border-white/20 bg-navy-brand">
      {/* 
          Cross-fade logic: 
          We remove mode="wait" so the outgoing image stays 
          while the incoming one fades in over it.
      */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-navy-brand/90 via-navy-brand/20 to-transparent z-10" />
          <img
            src={slides[current].url}
            alt={slides[current].title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-16 px-6 text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          key={`text-${current}`}
          transition={{ duration: 1, delay: 0.5 }}
          className="glass-panel p-6 md:p-10 bg-white/5 backdrop-blur-md border-white/10 max-w-2xl pointer-events-auto"
        >
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            {slides[current].title}
          </h2>
          <p className="text-white/90 text-sm md:text-xl font-medium italic leading-relaxed">
            {slides[current].subtitle}
          </p>
        </motion.div>
      </div>

      <div className="absolute inset-0 z-30 flex items-center justify-between px-6 opacity-0 hover:opacity-100 transition-opacity">
        <button onClick={prev} className="p-4 rounded-full bg-white/10 backdrop-blur-xl text-white hover:bg-white/30 transition-all active:scale-90">
          <ChevronLeft size={28} />
        </button>
        <button onClick={next} className="p-4 rounded-full bg-white/10 backdrop-blur-xl text-white hover:bg-white/30 transition-all active:scale-90">
          <ChevronRight size={28} />
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-1.5 px-4 py-2 bg-black/20 backdrop-blur-md rounded-full">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all ${
              current === i ? 'w-6 bg-white' : 'w-1.5 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
