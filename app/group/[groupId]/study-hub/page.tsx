"use client";

import { use } from "react";
import Link from 'next/link';
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  ArrowLeft, BookOpen, Library, ChevronRight, Target, Heart, 
  Star, BookText, GraduationCap, Users, Church, Shield, Crown, 
  Flame, Sparkles, Search, Award, TrendingUp, Map, Cross, 
  Book, Clock, Lock 
} from "lucide-react";
import DashboardShell from "@/components/DashboardShell";
import AuthGuard from "@/components/AuthGuard";

export default function StudyHubPage() {
  const params = useParams();
  const groupId = params?.groupId || "1";
  
  // All hooks at the top
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  
  // Define levels data
  const levels = [
    {
      level: "Level 1",
      title: "To Know Jesus",
      subtitle: "SEEKER-FOCUSED STUDIES",
      description: "Foundational truths for those exploring faith.",
      color: "from-blue-600 to-blue-500",
      icon: <Target size={28} />,
      series: [
        { title: "Come Alive with Jesus", slug: "come-alive", duration: "7 lessons", icon: <Heart size={14} />, description: "New life in Christ" },
        { title: "Steps to Jesus", slug: "steps-to-jesus", duration: "5 lessons", icon: <Star size={14} />, description: "Classic Steps to Christ journey" },
        { title: "Search for Certainty", slug: "search-for-certainty", duration: "30 lessons", icon: <Search size={14} />, description: "30 lessons on biblical faith" },
        { title: "Explorer Class Series", slug: "explorer-class", duration: "18 lessons", icon: <GraduationCap size={14} />, description: "Foundational Bible lessons" }
      ]
    },
    {
      level: "Level 2",
      title: "To Grow in Jesus",
      subtitle: "NEW BELIEVER FOCUS",
      description: "Deepen your faith through systematic Bible study.",
      color: "from-green-600 to-emerald-500",
      icon: <Users size={28} />,
      series: [
        { title: "Stay Alive with Jesus", slug: "stay-alive", duration: "15 lessons", icon: <Heart size={14} />, description: "Essential truths for new believers" },
        { title: "The Branch and The Vine", slug: "branch-and-vine", duration: "10 lessons", icon: <Flame size={14} />, description: "Abiding in Christ" },
        { title: "Sanctuary: Blueprint", slug: "sanctuary", duration: "12 lessons", icon: <Church size={14} />, description: "The gospel in symbols" },
        { title: "Secrets of Prophecy", slug: "secrets-of-prophecy", duration: "24 lessons", icon: <Map size={14} />, description: "Daniel and Revelation" }
      ]
    },
    {
      level: "Level 3",
      title: "To Mature in Jesus",
      subtitle: "DISCIPLESHIP FOCUS",
      description: "Live out your faith in every area of life.",
      color: "from-amber-600 to-orange-500",
      icon: <Award size={28} />,
      series: [
        { title: "Excellence in Life", slug: "excellence-in-life", duration: "7 lessons", icon: <TrendingUp size={14} />, description: "Living at your best" },
        { title: "Courtship & Relationship", slug: "courtship", duration: "9 lessons", icon: <Heart size={14} />, description: "God's design for love" },
        { title: "Christian Parenting", slug: "parenting", duration: "12 lessons", icon: <Users size={14} />, description: "Raising godly children" },
        { title: "Being a Godly Man", slug: "godly-man", duration: "5 lessons", icon: <Shield size={14} />, description: "Biblical manhood" }
      ]
    },
    {
      level: "Level 4",
      title: "Extra Meat",
      subtitle: "DEEP DIVE STUDIES",
      description: "Advanced studies for spiritual depth.",
      color: "from-purple-600 to-violet-600",
      icon: <BookOpen size={28} />,
      isComingSoon: true,
      series: [
        { title: "Desire of Ages", slug: "desire-of-ages", duration: "87 chapters", icon: <BookOpen size={14} />, description: "Life of Christ" },
        { title: "Great Controversy", slug: "great-controversy", duration: "42 chapters", icon: <Shield size={14} />, description: "Cosmic conflict" }
      ]
    }
  ];

  const filteredLevels = levels.map(level => ({
    ...level,
    series: level.series.filter(series =>
      series.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      series.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(level => level.series.length > 0);

  return (
    <AuthGuard>
      <DashboardShell>
        <div className="space-y-10 pb-20">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6">
            <div>
              <h1 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase leading-none" style={{ fontFamily: 'Georgia, serif' }}>
                Study Hub
              </h1>
              <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">
                4 Levels of Spiritual Growth • Guided Discipleship
              </p>
            </div>
            <Link href={`/group/${groupId}/study-hub/resources-corner`} className="glass-card px-6 py-3 flex items-center gap-2 font-black text-[10px] uppercase text-navy-brand hover:bg-white/50 transition-all">
              <Library size={16} /> Resources Corner
            </Link>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search studies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-indigo-500 outline-none"
            />
          </div>

          {/* Featured Section: Study 101 */}
          <section className="relative group">
            <Link href={`/group/${groupId}/study-101`} className="relative flex flex-col md:flex-row items-center gap-8 glass-panel p-8 lg:p-10 border-navy-brand/10 hover:border-navy-brand/30 transition-all block">
              <div className="w-20 h-20 bg-navy-brand rounded-3xl flex items-center justify-center text-white shadow-2xl">
                <BookOpen size={40} />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-brand/10 text-red-brand rounded-full text-[9px] font-black uppercase tracking-widest mb-3">
                  <Sparkles size={10} /> Core Foundation
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tight text-navy-brand">Study 101: Handbooks</h2>
                <p className="text-slate-600 mt-2 max-w-xl">The essential guide for pastors, lay workers, and seekers. Access the complete handbook of foundational Bible truths.</p>
              </div>
              <div className="bg-navy-brand text-white p-4 rounded-2xl shadow-lg group-hover:translate-x-2 transition-transform">
                <ChevronRight size={24} />
              </div>
            </Link>
          </section>

          {/* Curriculum Levels */}
          <div className="space-y-16">
            {filteredLevels.map((level, idx) => (
              <div key={idx} className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <div className={`w-16 h-16 rounded-[1.5rem] bg-gradient-to-br ${level.color} text-white flex items-center justify-center shadow-lg`}>
                    {level.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{level.subtitle}</span>
                      {level.isComingSoon && <span className="text-[8px] font-black bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full uppercase">In Progress</span>}
                    </div>
                    <h2 className="text-3xl font-black uppercase text-navy-brand">{level.level}: {level.title}</h2>
                    <p className="text-sm text-slate-500 mt-1">{level.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {level.series.map((series, sIdx) => (
                    <Link
                      key={sIdx}
                      href={level.isComingSoon ? "#" : `/group/${groupId}/study-hub/${series.slug}`}
                      onClick={(e) => {
                        if (level.isComingSoon) {
                          e.preventDefault();
                          alert("This study series is coming soon!");
                        }
                      }}
                      className={`glass-card p-6 flex flex-col group transition-all ${level.isComingSoon ? 'opacity-60 cursor-not-allowed' : 'hover:border-navy-brand/40'}`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-xl bg-gray-50 text-navy-brand group-hover:bg-navy-brand group-hover:text-white transition-all">
                          {series.icon}
                        </div>
                        {level.isComingSoon && <Lock size={14} className="text-slate-300" />}
                      </div>
                      <h3 className="font-black text-navy-brand text-lg mb-1">{series.title}</h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-4">{series.duration}</p>
                      <div className="mt-auto pt-4 border-t border-white/20 flex items-center justify-between">
                        <span className="text-[9px] font-black uppercase text-slate-500">
                          {level.isComingSoon ? 'Coming Soon' : 'Open Series'}
                        </span>
                        {!level.isComingSoon && <ChevronRight size={16} className="text-slate-500 group-hover:translate-x-1 transition-transform" />}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardShell>
    </AuthGuard>
  );
}
