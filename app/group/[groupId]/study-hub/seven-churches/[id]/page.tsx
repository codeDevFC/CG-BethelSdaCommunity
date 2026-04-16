// study-hub/seven-churches/[id]/page.tsx
"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { sevenChurchesData } from "../lessonsData";
import {
  Quote, Sparkles, ChevronLeft, BookOpen, BookText,
  Heart, LayoutGrid, GraduationCap, FileText, ChevronDown,
  ChevronUp, Church, MapPin, Clock, Award, Target,
  AlertTriangle, Eye, Crown, Scroll, CheckCircle2,
  Table, Grid, List, PenTool, MessageSquare, ChevronRight,
  Star, Flame, Cross, Shield, Users
} from "lucide-react";
import Link from "next/link";
import DashboardShell from "@/components/DashboardShell";
import AuthGuard from "@/components/AuthGuard";

export default function SevenChurchesDetail() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params?.id as string);
  const groupId = params?.groupId || "1";
  const lesson = sevenChurchesData[id];
  const [activeTab, setActiveTab] = useState<"study" | "reflection" | "keywords">("study");
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({});

  // Auto-expand all sections on load
  useEffect(() => {
    if (lesson?.sections) {
      const allExpanded: Record<number, boolean> = {};
      lesson.sections.forEach((_, index) => {
        allExpanded[index] = true;
      });
      setExpandedSections(allExpanded);
    }
  }, [lesson]);

  if (!lesson) {
    return (
      <AuthGuard>
        <DashboardShell>
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-10 h-10 text-red-600" />
              </div>
              <p className="text-xl font-black text-gray-900">Lesson Not Found</p>
              <p className="text-gray-500 mt-2 text-sm">The requested lesson does not exist.</p>
              <Link
                href={`/group/${groupId}/study-hub/seven-churches`}
                className="inline-block mt-8 px-6 py-3 bg-red-600 text-white rounded-2xl font-black text-sm hover:bg-red-700 transition"
              >
                Back to Seven Churches
              </Link>
            </div>
          </div>
        </DashboardShell>
      </AuthGuard>
    );
  }

  const toggleSection = (index: number) => {
    setExpandedSections(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const getEraColor = (era: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      "Apostolic Era": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
      "Persecution Era": { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
      "Corruption Era": { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" },
      "Apostasy Era": { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
      "Reformation Era": { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200" },
      "Revival Era": { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
      "End Times": { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
      "All Eras": { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" }
    };
    return colors[era] || { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200" };
  };

  const getHeaderGradient = () => {
    const gradients: Record<number, string> = {
      1: "from-purple-700 to-indigo-800",
      2: "from-blue-700 to-cyan-800",
      3: "from-red-700 to-orange-800",
      4: "from-yellow-700 to-amber-800",
      5: "from-purple-700 to-pink-800",
      6: "from-gray-700 to-gray-900",
      7: "from-green-700 to-emerald-800",
      8: "from-red-700 to-rose-800"
    };
    return gradients[id] || "from-red-700 to-rose-800";
  };

  const eraColors = getEraColor(lesson.era);

  return (
    <AuthGuard>
      <DashboardShell>
        <div className="max-w-5xl mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-700 pb-24 md:pb-32">
          {/* Navigation */}
          <div className="flex flex-wrap justify-between gap-3 px-1">
            <Link
              href={`/group/${groupId}/study-hub/seven-churches`}
              className="inline-flex items-center gap-1.5 text-red-600 font-black uppercase tracking-widest text-[9px] md:text-[10px] hover:opacity-70 transition-opacity"
            >
              <ChevronLeft className="w-3 h-3" /> Back to Series
            </Link>
            <Link
              href={`/group/${groupId}/study-hub`}
              className="inline-flex items-center gap-1.5 text-gray-400 font-black uppercase tracking-widest text-[9px] md:text-[10px] hover:text-gray-900 transition-colors"
            >
              <LayoutGrid className="w-3 h-3" /> Study Hub
            </Link>
          </div>

          {/* Header Card */}
          <div className={`bg-gradient-to-r ${getHeaderGradient()} rounded-2xl md:rounded-3xl p-6 md:p-8 text-white shadow-xl`}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-white/20 backdrop-blur px-2.5 py-1 rounded-full text-[9px] md:text-xs font-black uppercase tracking-wider">
                  Lesson {id}
                </span>
                <span className={`${eraColors.bg} ${eraColors.text} px-2.5 py-1 rounded-full text-[9px] md:text-xs font-black uppercase tracking-wider`}>
                  {lesson.era}
                </span>
                <span className="bg-white/20 backdrop-blur px-2.5 py-1 rounded-full text-[9px] md:text-xs font-black uppercase tracking-wider flex items-center gap-1">
                  <Clock size={10} className="md:w-3 md:h-3" />
                  {lesson.dates}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[1.1] md:leading-[0.9]" style={{ fontFamily: 'Georgia, serif' }}>
                {lesson.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-white/80 text-sm md:text-base">
                <div className="flex items-center gap-1.5">
                  <Church size={14} className="md:w-4 md:h-4" />
                  <span className="font-bold">{lesson.church}</span>
                </div>
                <div className="w-1 h-1 bg-white/40 rounded-full hidden sm:block" />
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} className="md:w-4 md:h-4" />
                  <span>{lesson.background.city}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <div className="bg-amber-50 rounded-2xl md:rounded-3xl p-6 md:p-8 border-l-4 md:border-l-8 border-amber-600 relative overflow-hidden">
            <Quote className="absolute -top-4 -right-4 w-20 h-20 md:w-32 md:h-32 text-amber-200/40" />
            <p className="text-base md:text-xl text-amber-900 italic font-bold relative z-10 leading-relaxed">
              "{lesson.introduction}"
            </p>
          </div>

          {/* Background Info */}
          <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-6 border border-gray-100 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2 md:mb-3">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-red-50 rounded-lg flex items-center justify-center">
                    <MapPin size={14} className="md:w-4 md:h-4 text-red-600" />
                  </div>
                  <h3 className="font-black text-sm md:text-lg">Location & Geography</h3>
                </div>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">{lesson.background.geography}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2 md:mb-3">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-red-50 rounded-lg flex items-center justify-center">
                    <Scroll size={14} className="md:w-4 md:h-4 text-red-600" />
                  </div>
                  <h3 className="font-black text-sm md:text-lg">Historical Context</h3>
                </div>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">{lesson.background.history}</p>
              </div>
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-2 md:mb-3">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-red-50 rounded-lg flex items-center justify-center">
                    <Heart size={14} className="md:w-4 md:h-4 text-red-600" />
                  </div>
                  <h3 className="font-black text-sm md:text-lg">Spiritual Significance</h3>
                </div>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">{lesson.background.spiritualContext}</p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm py-3 -mx-4 px-4 border-b border-gray-100">
            <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl w-fit mx-auto">
              <button
                onClick={() => setActiveTab("study")}
                className={`flex items-center gap-1.5 px-4 md:px-5 py-2 rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeTab === "study" ? "bg-gray-900 text-white shadow-md" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <BookOpen size={12} className="md:w-3.5 md:h-3.5" /> Study
              </button>
              <button
                onClick={() => setActiveTab("reflection")}
                className={`flex items-center gap-1.5 px-4 md:px-5 py-2 rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeTab === "reflection" ? "bg-gray-900 text-white shadow-md" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <MessageSquare size={12} className="md:w-3.5 md:h-3.5" /> Reflect
              </button>
              <button
                onClick={() => setActiveTab("keywords")}
                className={`flex items-center gap-1.5 px-4 md:px-5 py-2 rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeTab === "keywords" ? "bg-gray-900 text-white shadow-md" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <List size={12} className="md:w-3.5 md:h-3.5" /> Words
              </button>
            </div>
          </div>

          {/* Study Tab Content */}
          {activeTab === "study" && (
            <div className="space-y-4 md:space-y-6">
              {lesson.sections.map((section, idx) => (
                <div key={idx} className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                  <button
                    onClick={() => toggleSection(idx)}
                    className="w-full flex justify-between items-center p-5 md:p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 md:w-8 md:h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs md:text-sm font-black shrink-0">
                        {idx + 1}
                      </span>
                      <h2 className="text-base md:text-xl font-black tracking-tight text-gray-900 text-left">{section.title}</h2>
                    </div>
                    {expandedSections[idx] ? <ChevronUp size={18} className="md:w-5 md:h-5 shrink-0" /> : <ChevronDown size={18} className="md:w-5 md:h-5 shrink-0" />}
                  </button>
                  {expandedSections[idx] && (
                    <div className="p-5 md:p-6 pt-0 border-t border-gray-100 space-y-3 md:space-y-4">
                      {section.content.map((paragraph, pIdx) => (
                        <p key={pIdx} className="text-gray-600 text-sm md:text-base leading-relaxed">{paragraph}</p>
                      ))}
                      {section.scripture && (
                        <div className="bg-blue-50 p-4 md:p-5 rounded-xl border-l-4 border-blue-600 my-3 md:my-4">
                          <p className="text-xs md:text-sm font-mono text-blue-800 italic">{section.scripture}</p>
                        </div>
                      )}
                      {section.table && (
                        <div className="overflow-x-auto my-3 md:my-4">
                          <table className="min-w-[400px] md:min-w-full w-full text-xs md:text-sm border-collapse">
                            <thead>
                              <tr className="bg-gray-100">
                                {section.table.headers.map((header, hIdx) => (
                                  <th key={hIdx} className="p-2 md:p-3 text-left font-black text-gray-700 text-xs md:text-sm">{header}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {section.table.rows.map((row, rIdx) => (
                                <tr key={rIdx} className="border-b border-gray-200">
                                  {row.map((cell, cIdx) => (
                                    <td key={cIdx} className="p-2 md:p-3 text-gray-600 text-xs md:text-sm">{cell}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                      {section.reflection && (
                        <div className="bg-amber-50 p-4 md:p-5 rounded-2xl my-3 md:my-4">
                          <div className="flex items-center gap-2 mb-2 md:mb-3">
                            <PenTool size={14} className="md:w-4 md:h-4 text-amber-600" />
                            <span className="font-black text-amber-800 text-xs md:text-sm">Reflect on this:</span>
                          </div>
                          {section.reflection.map((q, qIdx) => (
                            <p key={qIdx} className="text-amber-700 italic text-xs md:text-sm mb-2">"{q}"</p>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Reflection Tab */}
          {activeTab === "reflection" && (
            <div className="space-y-5 md:space-y-6">
              <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 md:gap-3 mb-5 md:mb-6">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-red-50 rounded-xl flex items-center justify-center">
                    <MessageSquare size={18} className="md:w-5 md:h-5 text-red-600" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-black">Questions for Reflection</h2>
                </div>
                <div className="space-y-3 md:space-y-4">
                  {lesson.reflectionQuestions.map((question, idx) => (
                    <div key={idx} className="flex items-start gap-3 md:gap-4 p-4 md:p-5 bg-gray-50 rounded-xl md:rounded-2xl">
                      <span className="w-5 h-5 md:w-6 md:h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-[10px] md:text-xs font-black shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-gray-700 text-sm md:text-base font-medium leading-relaxed">{question}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl md:rounded-3xl p-6 md:p-8 text-white">
                <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <Heart size={18} className="md:w-5 md:h-5 text-red-400" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-black">Prayer Prompt</h2>
                </div>
                <p className="text-gray-200 text-sm md:text-base italic leading-relaxed">{lesson.prayerPrompt}</p>
              </div>
              <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 md:gap-3 mb-5 md:mb-6">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-green-50 rounded-xl flex items-center justify-center">
                    <BookText size={18} className="md:w-5 md:h-5 text-green-600" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-black">Key Verses to Memorize</h2>
                </div>
                <ul className="space-y-2 md:space-y-3">
                  {lesson.keyVerses.map((verse, idx) => (
                    <li key={idx} className="font-mono text-gray-700 text-sm md:text-base border-l-4 border-green-500 pl-3 md:pl-4 py-1 md:py-2">
                      {verse}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Keywords Tab */}
          {activeTab === "keywords" && (
            <div className="space-y-5 md:space-y-6">
              <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 md:gap-3 mb-5 md:mb-6">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                    <List size={18} className="md:w-5 md:h-5 text-purple-600" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-black">Key Words & Definitions</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {lesson.keyWords.map((kw, idx) => (
                    <div key={idx} className="p-4 md:p-5 bg-gray-50 rounded-xl md:rounded-2xl hover:shadow-md transition-all">
                      <h3 className="font-black text-red-600 text-base md:text-lg mb-1 md:mb-2">{kw.word}</h3>
                      <p className="text-gray-600 text-xs md:text-sm leading-relaxed">{kw.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-amber-50 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-amber-100">
                <div className="flex items-center gap-2 md:gap-3 mb-4">
                  <PenTool size={18} className="md:w-5 md:h-5 text-amber-600" />
                  <h3 className="font-black text-amber-800 text-base md:text-lg">My Study Notes</h3>
                </div>
                <textarea
                  placeholder="Write your personal notes and observations here..."
                  className="w-full p-4 bg-white rounded-xl md:rounded-2xl border border-amber-200 focus:border-amber-500 outline-none text-sm md:text-base"
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-3 md:gap-4 pt-6 md:pt-8 border-t border-gray-100">
            {id > 1 ? (
              <Link
                href={`/group/${groupId}/study-hub/seven-churches/${id - 1}`}
                className="flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-gray-100 rounded-xl md:rounded-2xl font-black text-xs md:text-sm hover:bg-gray-200 transition"
              >
                <ChevronLeft size={14} className="md:w-4 md:h-4" /> Previous Lesson
              </Link>
            ) : (
              <div />
            )}
            {id < 8 ? (
              <Link
                href={`/group/${groupId}/study-hub/seven-churches/${id + 1}`}
                className="flex items-center gap-1.5 md:gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-red-600 text-white rounded-xl md:rounded-2xl font-black text-xs md:text-sm hover:bg-red-700 transition"
              >
                Next Lesson <ChevronRight size={14} className="md:w-4 md:h-4" />
              </Link>
            ) : (
              <Link
                href={`/group/${groupId}/study-hub`}
                className="flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-green-600 text-white rounded-xl md:rounded-2xl font-black text-xs md:text-sm hover:bg-green-700 transition"
              >
                <CheckCircle2 size={14} className="md:w-4 md:h-4" /> Complete Series
              </Link>
            )}
          </div>
        </div>
      </DashboardShell>
    </AuthGuard>
  );
}