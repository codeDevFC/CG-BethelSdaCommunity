"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { 
  Quote, ChevronLeft, BookOpen, BookText, Heart, LayoutGrid, 
  ChevronDown, ChevronUp, Target, Clock, ChevronRight, 
  CheckCircle2, PenTool, MessageSquare, AlertCircle, Sparkles,
  Headphones, Play, Pause, Volume2, VolumeX
} from "lucide-react";
import Link from "next/link";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import { STUDY_SERIES, getUnlockCode } from "@/lib/studyCodes";

// Import all lesson data statically
import { comeAliveData } from "../../come-alive/lessonData";
import { courtshipData } from "../../courtship/lessonData";
import { danielData } from "../../daniel/lessonData";
import { discoverData } from "../../discover/lessonData";
import { encounterData } from "../../encounter/lessonData";
import { excellenceInLifeData } from "../../excellence-in-life/lessonData";
import { explorerClassData } from "../../explorer-class/lessonData";
import { financeData } from "../../finance/lessonData";
import { godlyManData } from "../../godly-man/lessonData";
import { parentingData } from "../../parenting/lessonData";
import { sanctuaryData } from "../../sanctuary/lessonData";
import { searchForCertaintyData } from "../../search-for-certainty/lessonData";
import { secretsOfProphecyData } from "../../secrets-of-prophecy/lessonData";
import { sevenChurchesData } from "../../seven-churches/lessonsData";
import { branchAndVineData } from "../../branch-and-vine/lessonData";
import { stayAliveDataById } from "../../stay-alive/lessonData";
import { stepsData } from "../../steps-to-jesus/lessonData";

interface LessonSection {
  title: string;
  content: string[];
  scripture?: string;
  note?: string;
  quote?: { text: string; author: string };
  reflection?: string[];
  illustration?: string;
}

interface LessonData {
  id: number;
  title: string;
  subtitle: string;
  introduction: string;
  memoryVerse: string;
  sections: LessonSection[];
  reflectionQuestions: string[];
  prayerPrompt: string;
  keyWords: { word: string; definition: string }[];
  application?: string[];
  parentChildActivity?: string;
  audioFile?: string;
  illustration?: string;
  guide?: { q: string; a: string }[];
}

// Helper function to check if content contains ASCII diagram
const containsDiagram = (content: string): boolean => {
  return content.includes('┌') || content.includes('┐') || content.includes('└') || 
         content.includes('┘') || content.includes('├') || content.includes('┤') ||
         content.includes('─') || content.includes('│') || content.includes('┴') ||
         content.includes('┬') || content.includes('┼');
};

// Helper function to render content with proper diagram handling
const renderContent = (content: string[]) => {
  const fullText = content.join('\n');
  
  if (containsDiagram(fullText)) {
    return (
      <div className="diagram-wrapper my-4" key="diagram">
        <pre className="diagram">{fullText}</pre>
      </div>
    );
  }
  
  return content.map((paragraph, pIdx) => {
    if (paragraph.trim() === '') return null;
    return (
      <p key={pIdx} className="text-gray-600 text-sm md:text-base leading-relaxed mb-3">
        {paragraph}
      </p>
    );
  });
};

// Helper function to get placeholder lesson data
const getPlaceholderLesson = (series: string, lessonId: number): LessonData => {
  const seriesInfo = STUDY_SERIES[series.toUpperCase().replace(/-/g, '_') as keyof typeof STUDY_SERIES];
  const seriesName = seriesInfo?.name || series.replace(/-/g, ' ');
  
  return {
    id: lessonId,
    title: `Lesson ${lessonId}: ${seriesName}`,
    subtitle: "Coming Soon - Preparing Excellent Content",
    introduction: "This lesson is currently being prepared with meaningful, biblically-based content. Please check back soon!",
    memoryVerse: "Psalm 27:14 - 'Wait on the Lord; be of good courage, and He shall strengthen your heart.'",
    sections: [{ title: "Coming Soon", content: ["This lesson is being prepared. Check back soon for the complete study."] }],
    reflectionQuestions: ["What does it mean to wait on the Lord?", "How can you prepare your heart for this study?"],
    prayerPrompt: "Lord, prepare my heart as I wait for this study to be completed.",
    keyWords: [{ word: "Coming Soon", definition: "Content being prepared with excellence" }],
    application: ["Check back soon for the complete lesson"]
  };
};

// Helper function to get lesson data based on series and lesson ID
const getLessonData = (series: string, lessonId: number): LessonData | null => {
  // Map series to their data objects
  const seriesDataMap: Record<string, any> = {
    'come-alive': comeAliveData,
    'courtship': courtshipData,
    'daniel': danielData,
    'discover': discoverData,
    'encounter': encounterData,
    'excellence-in-life': excellenceInLifeData,
    'explorer-class': explorerClassData,
    'finance': financeData,
    'godly-man': godlyManData,
    'parenting': parentingData,
    'sanctuary': sanctuaryData,
    'search-for-certainty': searchForCertaintyData,
    'secrets-of-prophecy': secretsOfProphecyData,
    'seven-churches': sevenChurchesData,
    'branch-and-vine': branchAndVineData,
    'stay-alive': stayAliveDataById,
    'steps-to-jesus': stepsData,
  };
  
  const seriesData = seriesDataMap[series];
  if (seriesData && seriesData[lessonId]) {
    console.log(`Loading lesson ${lessonId} for series ${series}`);
    return seriesData[lessonId];
  }
  
  console.log(`No data found for ${series} lesson ${lessonId}, using placeholder`);
  return getPlaceholderLesson(series, lessonId);
};

export default function LessonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const series = params?.series as string;
  const lessonId = parseInt(params?.lessonId as string);
  const groupId = params?.groupId || "1";
  
  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"study" | "reflect" | "apply">("study");
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({});
  const [showAnswers, setShowAnswers] = useState<Record<number, boolean>>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const data = getLessonData(series, lessonId);
    setLesson(data);
    
    if (data?.sections) {
      const allExpanded: Record<number, boolean> = {};
      data.sections.forEach((_, idx) => { allExpanded[idx] = true; });
      setExpandedSections(allExpanded);
    }
    
    const savedNotes = localStorage.getItem(`study_notes_${series}_${lessonId}_${groupId}`);
    if (savedNotes) setNotes(savedNotes);
    
    setLoading(false);
  }, [series, lessonId, groupId]);

  const saveNotes = (newNotes: string) => {
    setNotes(newNotes);
    localStorage.setItem(`study_notes_${series}_${lessonId}_${groupId}`, newNotes);
  };

  const toggleAnswer = (idx: number) => {
    setShowAnswers(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play().catch(e => console.log("Audio error:", e));
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
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
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

  const getSeriesColor = () => {
    const colors: Record<string, string> = {
      'sanctuary': 'from-red-600 to-rose-600',
      'branch-and-vine': 'from-green-600 to-emerald-600',
      'stay-alive': 'from-teal-600 to-cyan-600',
      'steps-to-jesus': 'from-indigo-600 to-purple-600',
      'courtship': 'from-rose-600 to-pink-600',
      'parenting': 'from-emerald-600 to-teal-600',
      'come-alive': 'from-pink-600 to-rose-600',
      'daniel': 'from-blue-600 to-cyan-600',
      'discover': 'from-blue-600 to-indigo-600',
      'encounter': 'from-indigo-600 to-purple-600',
      'excellence-in-life': 'from-amber-600 to-yellow-600',
      'explorer-class': 'from-amber-600 to-orange-600',
      'finance': 'from-emerald-600 to-teal-600',
      'godly-man': 'from-emerald-600 to-green-600',
      'search-for-certainty': 'from-indigo-600 to-purple-600',
      'secrets-of-prophecy': 'from-purple-600 to-violet-600',
      'seven-churches': 'from-red-600 to-amber-600',
      'default': 'from-gray-600 to-gray-800'
    };
    return colors[series] || colors.default;
  };

  if (loading) {
    return (
      <ProtectedLayout>
        <DashboardShell>
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-500 font-black text-sm">Loading lesson...</p>
            </div>
          </div>
        </DashboardShell>
      </ProtectedLayout>
    );
  }

  if (!lesson) {
    return (
      <ProtectedLayout>
        <DashboardShell>
          <div className="max-w-4xl mx-auto min-h-[60vh] flex items-center justify-center">
            <div className="text-center p-8 max-w-md">
              <AlertCircle className="w-16 h-16 text-amber-600 mx-auto mb-4" />
              <p className="text-xl font-black text-gray-900">Lesson Not Found</p>
              <p className="text-gray-500 mt-2">The requested lesson does not exist.</p>
              <Link href={`/group/${groupId}/study-hub/${series}`} className="inline-block mt-8 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-black text-sm hover:bg-emerald-700 transition">
                Back to Series
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
        <div className="max-w-4xl mx-auto space-y-6 pb-32">
          {/* Audio Player */}
          {lesson.audioFile && (
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 shadow-lg">
              <audio
                ref={audioRef}
                src={lesson.audioFile}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
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
          <div className="flex justify-between">
            <Link href={`/group/${groupId}/study-hub/${series}`} className="inline-flex items-center gap-1.5 text-emerald-600 font-black text-[10px] uppercase tracking-widest hover:opacity-70 transition">
              <ChevronLeft className="w-3 h-3" /> Back to Series
            </Link>
            <Link href={`/group/${groupId}/study-hub`} className="inline-flex items-center gap-1.5 text-gray-400 font-black text-[10px] uppercase tracking-widest hover:text-gray-900 transition">
              <LayoutGrid className="w-3 h-3" /> Study Hub
            </Link>
          </div>

          {/* Header */}
          <div className={`bg-gradient-to-r ${getSeriesColor()} rounded-2xl p-6 md:p-8 text-white shadow-xl`}>
            <div className="flex gap-2 mb-4">
              <span className="bg-white/20 backdrop-blur px-2.5 py-1 rounded-full text-[9px] md:text-xs font-black uppercase tracking-wider">
                Lesson {lessonId}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight">{lesson.title}</h1>
            <p className="text-white/80 italic mt-2 text-sm md:text-base">{lesson.subtitle}</p>
          </div>

          {/* Introduction */}
          <div className="bg-emerald-50 rounded-2xl p-6 md:p-8 border-l-4 md:border-l-8 border-emerald-600 relative overflow-hidden shadow-sm">
            <Quote className="absolute -top-4 -right-4 w-20 h-20 md:w-32 md:h-32 text-emerald-200/40" />
            <p className="text-base md:text-xl text-emerald-900 italic font-bold relative z-10 leading-relaxed">{lesson.introduction}</p>
          </div>

          {/* Memory Verse */}
          <div className="bg-gray-900 rounded-2xl p-6 md:p-8 text-white shadow-xl">
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
                <div key={idx} className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
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
                  {expandedSections[idx] && (
                    <div className="p-5 md:p-6 pt-0 border-t border-gray-100 space-y-3 md:space-y-4">
                      {renderContent(section.content)}
                      {section.scripture && (
                        <div className="bg-blue-50 p-4 md:p-5 rounded-xl border-l-4 border-blue-600 my-3 md:my-4">
                          <p className="text-xs md:text-sm font-mono text-blue-800 italic">{section.scripture}</p>
                        </div>
                      )}
                      {section.quote && (
                        <div className="bg-gray-50 p-4 md:p-5 rounded-xl my-3 md:my-4 border-l-4 border-gray-500">
                          <p className="text-xs md:text-sm text-gray-700 italic">"{section.quote.text}"</p>
                          <p className="text-[10px] text-gray-500 mt-2">— {section.quote.author}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
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
                    <div key={idx} className="flex items-start gap-3 md:gap-4 p-4 md:p-5 bg-gray-50 rounded-xl md:rounded-2xl hover:bg-emerald-50 transition-colors group">
                      <span className="w-5 h-5 md:w-6 md:h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-[10px] md:text-xs font-black shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        {idx + 1}
                      </span>
                      <p className="text-gray-700 text-sm md:text-base font-medium leading-relaxed">{question}</p>
                    </div>
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
              
              {lesson.keyWords && lesson.keyWords.length > 0 && (
                <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 md:gap-3 mb-5 md:mb-6">
                    <div className="w-9 h-9 md:w-10 md:h-10 bg-green-50 rounded-xl flex items-center justify-center">
                      <BookText size={18} className="md:w-5 md:h-5 text-green-600" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-black">Key Words</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    {lesson.keyWords.map((kw, idx) => (
                      <div key={idx} className="p-4 md:p-5 bg-gray-50 rounded-xl md:rounded-2xl hover:shadow-md transition-all hover:bg-emerald-50 group">
                        <h3 className="font-black text-emerald-600 text-base md:text-lg mb-1 md:mb-2 group-hover:text-emerald-700">{kw.word}</h3>
                        <p className="text-gray-600 text-xs md:text-sm leading-relaxed">{kw.definition}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Study Guide Questions for Steps to Jesus */}
              {lesson.guide && lesson.guide.length > 0 && (
                <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 md:gap-3 mb-5 md:mb-6">
                    <div className="w-9 h-9 md:w-10 md:h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                      <PenTool size={18} className="md:w-5 md:h-5 text-amber-600" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-black">Study Guide</h2>
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    {lesson.guide.map((item, idx) => (
                      <div key={idx} className="border border-gray-100 rounded-xl overflow-hidden">
                        <button
                          onClick={() => toggleAnswer(idx)}
                          className="w-full text-left p-4 md:p-5 bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
                        >
                          <div className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="text-gray-800 font-medium text-sm md:text-base">{item.q}</span>
                          </div>
                          {showAnswers[idx] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {showAnswers[idx] && (
                          <div className="p-4 md:p-5 bg-amber-50 border-t border-amber-100">
                            <p className="text-amber-800 text-sm md:text-base">{item.a}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Apply Tab */}
          {activeTab === "apply" && lesson.application && lesson.application.length > 0 && (
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 md:gap-3 mb-5 md:mb-6">
                <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Target size={18} className="md:w-5 md:h-5 text-blue-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-black">Practical Application</h2>
              </div>
              <div className="space-y-4">
                {lesson.application.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                    <CheckCircle2 size={18} className="text-blue-600 shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="font-black text-gray-800 text-base mb-3 flex items-center gap-2">
                  <PenTool size={16} /> My Notes
                </h3>
                <textarea
                  value={notes}
                  onChange={(e) => saveNotes(e.target.value)}
                  placeholder="Write your personal reflections, commitments, and prayer requests here..."
                  className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-emerald-500 outline-none text-sm transition-colors"
                  rows={5}
                />
                <p className="text-[9px] text-gray-400 mt-2 text-right">Auto-saved ✓</p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-3 md:gap-4 pt-6 md:pt-8 border-t border-gray-100">
            {lessonId > 1 ? (
              <Link
                href={`/group/${groupId}/study-hub/${series}/${lessonId - 1}`}
                className="flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-gray-100 rounded-xl md:rounded-2xl font-black text-xs md:text-sm hover:bg-gray-200 transition"
              >
                <ChevronLeft size={14} /> Previous Lesson
              </Link>
            ) : (
              <div />
            )}
            <Link
              href={`/group/${groupId}/study-hub/${series}`}
              className="flex items-center gap-1.5 md:gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-emerald-600 text-white rounded-xl md:rounded-2xl font-black text-xs md:text-sm hover:bg-emerald-700 transition shadow-md"
            >
              Back to Series <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}
