// app/group/[groupId]/study-hub/parenting/[id]/page.tsx
"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { parentingData } from "../lessonData";
import { 
  Quote, Sparkles, ChevronLeft, BookOpen, BookText, 
  Heart, LayoutGrid, ChevronDown, ChevronUp, 
  Target, Award, Clock, ChevronRight, CheckCircle2,
  PenTool, MessageSquare, List, AlertCircle, Baby, Home,
  Church, Shield, Star, GraduationCap, Headphones,
  Play, Pause, Volume2, VolumeX, X
} from "lucide-react";
import Link from "next/link";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import { motion, AnimatePresence } from "framer-motion";

export default function ParentingLessonDetail() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params?.id as string);
  const groupId = params?.groupId || "1";
  const lesson = parentingData[id];
  const [activeTab, setActiveTab] = useState<"study" | "reflect" | "apply">("study");
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState("");

  // Load saved notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem(`parenting_notes_${groupId}_${id}`);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [groupId, id]);

  // Save notes to localStorage
  const saveNotes = (newNotes: string) => {
    setNotes(newNotes);
    localStorage.setItem(`parenting_notes_${groupId}_${id}`, newNotes);
  };

  // Auto-expand all sections
  useEffect(() => {
    if (lesson?.sections) {
      const allExpanded: Record<number, boolean> = {};
      lesson.sections.forEach((_, index) => {
        allExpanded[index] = true;
      });
      setExpandedSections(allExpanded);
    }
  }, [lesson]);

  // Audio controls
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play error:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = parseFloat(e.target.value);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const toggleSection = (index: number) => {
    setExpandedSections(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const getColorScheme = () => {
    const colors: Record<number, string> = {
      1: "from-rose-600 to-pink-600",
      2: "from-blue-600 to-cyan-600",
      3: "from-red-600 to-rose-600",
      4: "from-amber-600 to-orange-600",
      5: "from-green-600 to-emerald-600",
      6: "from-indigo-600 to-purple-600",
      7: "from-teal-600 to-cyan-600",
      8: "from-yellow-600 to-amber-600",
      9: "from-purple-600 to-pink-600",
      10: "from-blue-600 to-indigo-600",
      11: "from-cyan-600 to-blue-600",
      12: "from-emerald-600 to-green-600"
    };
    return colors[id] || "from-emerald-600 to-green-600";
  };

  if (!lesson) {
    return (
      <ProtectedLayout>
        <DashboardShell>
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-emerald-600" />
              </div>
              <p className="text-xl font-black text-gray-900">Lesson Not Found</p>
              <p className="text-gray-500 mt-2 text-sm">The requested lesson does not exist.</p>
              <Link
                href={`/group/${groupId}/study-hub/parenting`}
                className="inline-block mt-8 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-black text-sm hover:bg-emerald-700 transition"
              >
                Back to Parenting Series
              </Link>
            </div>
          </div>
        </DashboardShell>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      <DashboardShell>
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-700 pb-24 md:pb-32">
          {/* Audio Player */}
          {lesson.audioFile && (
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 shadow-lg">
              <audio
                ref={audioRef}
                src={lesson.audioFile}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                onError={(e) => console.log("Audio error:", e)}
              />
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-700 transition shadow-lg"
                >
                  {isPlaying ? <Pause size={20} className="text-white" /> : <Play size={20} className="text-white ml-0.5" />}
                </button>
                <div className="flex items-center gap-2">
                  <Headphones size={18} className="text-gray-400" />
                  <span className="text-white text-xs font-black hidden sm:inline">Lesson Audio</span>
                </div>
              </div>
              <div className="flex-1 w-full">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
              <button
                onClick={toggleMute}
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition"
              >
                {isMuted ? <VolumeX size={16} className="text-gray-400" /> : <Volume2 size={16} className="text-gray-400" />}
              </button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex flex-wrap justify-between gap-3 px-1">
            <Link
              href={`/group/${groupId}/study-hub/parenting`}
              className="inline-flex items-center gap-1.5 text-emerald-600 font-black uppercase tracking-widest text-[9px] md:text-[10px] hover:opacity-70 transition-opacity"
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

          {/* Header */}
          <div className={`bg-gradient-to-r ${getColorScheme()} rounded-2xl md:rounded-3xl p-6 md:p-8 text-white shadow-xl`}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-white/20 backdrop-blur px-2.5 py-1 rounded-full text-[9px] md:text-xs font-black uppercase tracking-wider">
                  Lesson {id}
                </span>
                <span className="bg-white/20 backdrop-blur px-2.5 py-1 rounded-full text-[9px] md:text-xs font-black uppercase tracking-wider flex items-center gap-1">
                  <Clock size={10} /> ~45 min
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[1.1] md:leading-[0.9]" style={{ fontFamily: "Georgia, serif" }}>
                {lesson.title}
              </h1>
              <p className="text-white/80 text-sm md:text-base italic">{lesson.subtitle}</p>
            </div>
          </div>

          {/* Introduction */}
          <div className="bg-emerald-50 rounded-2xl md:rounded-3xl p-6 md:p-8 border-l-4 md:border-l-8 border-emerald-600 relative overflow-hidden shadow-sm">
            <Quote className="absolute -top-4 -right-4 w-20 h-20 md:w-32 md:h-32 text-emerald-200/40" />
            <p className="text-base md:text-xl text-emerald-900 italic font-bold relative z-10 leading-relaxed">
              {lesson.introduction}
            </p>
          </div>

          {/* Memory Verse */}
          <div className="bg-gray-900 rounded-2xl md:rounded-3xl p-6 md:p-8 text-white shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <BookText size={18} className="text-emerald-400" />
              <h3 className="font-black text-sm md:text-base uppercase tracking-wider">Memory Verse</h3>
            </div>
            <p className="font-mono text-sm md:text-base italic leading-relaxed">{lesson.memoryVerse}</p>
          </div>

          {/* Tab Navigation */}
          <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm py-3 -mx-4 px-4 border-b border-gray-100">
            <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl w-fit mx-auto">
              {[
                { id: "study", label: "Study", icon: BookOpen },
                { id: "reflect", label: "Reflect", icon: MessageSquare },
                { id: "apply", label: "Apply", icon: PenTool }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-4 md:px-5 py-2 rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${
                    activeTab === tab.id ? "bg-gray-900 text-white shadow-md" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <tab.icon size={12} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Study Content */}
          {activeTab === "study" && (
            <div className="space-y-4 md:space-y-6">
              {lesson.sections.map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => toggleSection(idx)}
                    className="w-full flex justify-between items-center p-5 md:p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 md:w-8 md:h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs md:text-sm font-black shrink-0">
                        {idx + 1}
                      </span>
                      <h2 className="text-base md:text-xl font-black tracking-tight text-gray-900 text-left">{section.title}</h2>
                    </div>
                    {expandedSections[idx] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  
                  <AnimatePresence>
                    {expandedSections[idx] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-5 md:p-6 pt-0 border-t border-gray-100 space-y-3 md:space-y-4"
                      >
                        {section.content.map((paragraph, pIdx) => (
                          <p key={pIdx} className="text-gray-600 text-sm md:text-base leading-relaxed">{paragraph}</p>
                        ))}
                        
                        {section.scripture && (
                          <div className="bg-blue-50 p-4 md:p-5 rounded-xl border-l-4 border-blue-600 my-3 md:my-4">
                            <p className="text-xs md:text-sm font-mono text-blue-800 italic">{section.scripture}</p>
                          </div>
                        )}
                        
                        {section.note && (
                          <div className="bg-amber-50 p-4 md:p-5 rounded-xl my-3 md:my-4 border-l-4 border-amber-500">
                            <div className="flex items-center gap-2 mb-2">
                              <Sparkles size={14} className="text-amber-600" />
                              <span className="font-black text-amber-800 text-xs md:text-sm">Note:</span>
                            </div>
                            <p className="text-xs md:text-sm text-amber-800 italic">{section.note}</p>
                          </div>
                        )}
                        
                        {section.quote && (
                          <div className="bg-gray-50 p-4 md:p-5 rounded-xl my-3 md:my-4 border-l-4 border-gray-500">
                            <p className="text-xs md:text-sm text-gray-700 italic">"{section.quote.text}"</p>
                            <p className="text-[10px] text-gray-500 mt-2">— {section.quote.author}</p>
                          </div>
                        )}
                        
                        {section.reflection && (
                          <div className="bg-amber-50 p-4 md:p-5 rounded-2xl my-3 md:my-4">
                            <div className="flex items-center gap-2 mb-2">
                              <PenTool size={14} className="text-amber-600" />
                              <span className="font-black text-amber-800 text-xs md:text-sm">Reflect:</span>
                            </div>
                            {section.reflection.map((q, qIdx) => (
                              <p key={qIdx} className="text-amber-700 italic text-xs md:text-sm mb-2">"{q}"</p>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}

          {/* Reflect Tab */}
          {activeTab === "reflect" && (
            <div className="space-y-5 md:space-y-6">
              <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 md:gap-3 mb-5 md:mb-6">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                    <MessageSquare size={18} className="md:w-5 md:h-5 text-emerald-600" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-black">Questions for Reflection</h2>
                </div>
                <div className="space-y-3 md:space-y-4">
                  {lesson.reflectionQuestions.map((question, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-3 md:gap-4 p-4 md:p-5 bg-gray-50 rounded-xl md:rounded-2xl hover:bg-emerald-50 transition-colors group"
                    >
                      <span className="w-5 h-5 md:w-6 md:h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-[10px] md:text-xs font-black shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        {idx + 1}
                      </span>
                      <p className="text-gray-700 text-sm md:text-base font-medium leading-relaxed">{question}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl md:rounded-3xl p-6 md:p-8 text-white shadow-xl">
                <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <Heart size={18} className="md:w-5 md:h-5 text-emerald-400" />
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
                  <h2 className="text-xl md:text-2xl font-black">Key Words</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {lesson.keyWords.map((kw, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="p-4 md:p-5 bg-gray-50 rounded-xl md:rounded-2xl hover:shadow-md transition-all hover:bg-emerald-50 group"
                    >
                      <h3 className="font-black text-emerald-600 text-base md:text-lg mb-1 md:mb-2 group-hover:text-emerald-700">{kw.word}</h3>
                      <p className="text-gray-600 text-xs md:text-sm leading-relaxed">{kw.definition}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Apply Tab */}
          {activeTab === "apply" && (
            <div className="space-y-5 md:space-y-6">
              {lesson.application && (
                <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 md:gap-3 mb-5 md:mb-6">
                    <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                      <Target size={18} className="md:w-5 md:h-5 text-blue-600" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-black">Practical Application</h2>
                  </div>
                  <div className="space-y-4">
                    {lesson.application.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                      >
                        <CheckCircle2 size={18} className="text-blue-600 shrink-0 mt-0.5" />
                        <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
              
              {lesson.parentChildActivity && (
                <div className="bg-amber-50 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-amber-100 shadow-sm">
                  <div className="flex items-center gap-2 md:gap-3 mb-4">
                    <Baby size={18} className="md:w-5 md:h-5 text-amber-600" />
                    <h3 className="font-black text-amber-800 text-base md:text-lg">Parent-Child Activity</h3>
                  </div>
                  <p className="text-amber-700 text-sm md:text-base leading-relaxed">{lesson.parentChildActivity}</p>
                </div>
              )}
              
              <div className="bg-gray-50 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 md:gap-3">
                    <PenTool size={18} className="md:w-5 md:h-5 text-gray-600" />
                    <h3 className="font-black text-gray-800 text-base md:text-lg">My Parenting Commitments</h3>
                  </div>
                  <button
                    onClick={() => setShowNotes(!showNotes)}
                    className="text-xs text-emerald-600 hover:text-emerald-700 font-black"
                  >
                    {showNotes ? "Hide Notes" : "Show Notes"}
                  </button>
                </div>
                
                <AnimatePresence>
                  {showNotes && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs text-gray-500 mb-3 italic">
                        Previous notes are saved automatically. Write down your personal commitments, reflections, and prayer requests for your children.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <textarea
                  value={notes}
                  onChange={(e) => saveNotes(e.target.value)}
                  placeholder="Write your personal commitments, reflections, and prayer requests for your children here..."
                  className="w-full p-4 bg-white rounded-xl md:rounded-2xl border border-gray-200 focus:border-emerald-500 outline-none text-sm md:text-base transition-colors"
                  rows={6}
                />
                <p className="text-[9px] text-gray-400 mt-2 text-right">Auto-saved ✓</p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-3 md:gap-4 pt-6 md:pt-8 border-t border-gray-100">
            {id > 1 ? (
              <Link
                href={`/group/${groupId}/study-hub/parenting/${id - 1}`}
                className="flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-gray-100 rounded-xl md:rounded-2xl font-black text-xs md:text-sm hover:bg-gray-200 transition"
              >
                <ChevronLeft size={14} /> Previous Lesson
              </Link>
            ) : (
              <div />
            )}
            
            {id < 12 ? (
              <Link
                href={`/group/${groupId}/study-hub/parenting/${id + 1}`}
                className="flex items-center gap-1.5 md:gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-emerald-600 text-white rounded-xl md:rounded-2xl font-black text-xs md:text-sm hover:bg-emerald-700 transition shadow-md"
              >
                Next Lesson <ChevronRight size={14} />
              </Link>
            ) : (
              <Link
                href={`/group/${groupId}/study-hub`}
                className="flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-green-600 text-white rounded-xl md:rounded-2xl font-black text-xs md:text-sm hover:bg-green-700 transition shadow-md"
              >
                <CheckCircle2 size={14} /> Complete Series
              </Link>
            )}
          </div>
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}