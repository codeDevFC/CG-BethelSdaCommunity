"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Heart, Lock, CheckCircle, ChevronDown, ChevronUp, LayoutGrid } from "lucide-react";
import DashboardShell from "@/components/DashboardShell";
import AuthGuard from "@/components/AuthGuard";
import { stepsDataById } from "../lessonData";

export default function LessonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const groupId = params?.groupId || "1";
  const lessonId = parseInt(params?.lessonId as string);
  
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [unlockedLessons, setUnlockedLessons] = useState<number[]>([]);
  const [codeInput, setCodeInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"study" | "reflect" | "apply">("study");
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({});

  const lesson = stepsDataById[lessonId];
  const prevLesson = stepsDataById[lessonId - 1];
  const nextLesson = stepsDataById[lessonId + 1];

  useEffect(() => {
    const saved = localStorage.getItem("unlocked_steps-to-jesus_" + groupId);
    const unlocked = saved ? JSON.parse(saved) : [1];
    setUnlockedLessons(unlocked);
    setIsUnlocked(unlocked.includes(lessonId));
    setLoading(false);
    if (lesson?.sections) {
      const allExpanded: Record<number, boolean> = {};
      lesson.sections.forEach((_: any, idx: number) => { allExpanded[idx] = true; });
      setExpandedSections(allExpanded);
    }
  }, [groupId, lessonId, lesson]);

  const toggleSection = (index: number) => {
    setExpandedSections(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const verifyCode = () => {
    const codeMap: Record<number, string> = { 1: "SJ01", 2: "SJ02", 3: "SJ03", 4: "SJ04", 5: "SJ05" };
    const expectedCode = codeMap[lessonId] || "SJ" + (lessonId < 10 ? "0" + lessonId : lessonId);
    
    if (codeInput.toUpperCase() === expectedCode) {
      const newUnlocked = [...unlockedLessons, lessonId];
      setUnlockedLessons(newUnlocked);
      localStorage.setItem("unlocked_steps-to-jesus_" + groupId, JSON.stringify(newUnlocked));
      setIsUnlocked(true);
    } else {
      alert("Invalid code! The correct code is " + expectedCode);
    }
  };

  if (loading) {
    return (
      <AuthGuard>
        <DashboardShell>
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="mt-4 text-gray-500">Loading lesson...</p>
          </div>
        </DashboardShell>
      </AuthGuard>
    );
  }

  if (!lesson) {
    return (
      <AuthGuard>
        <DashboardShell>
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold">Lesson Not Found</h1>
            <Link href={"/group/" + groupId + "/study-hub/steps-to-jesus"} className="text-indigo-600 mt-4 inline-block">
              Back to Steps to Jesus
            </Link>
          </div>
        </DashboardShell>
      </AuthGuard>
    );
  }

  if (!isUnlocked) {
    const codeMap: Record<number, string> = { 1: "SJ01", 2: "SJ02", 3: "SJ03", 4: "SJ04", 5: "SJ05" };
    const expectedCode = codeMap[lessonId] || "SJ" + (lessonId < 10 ? "0" + lessonId : lessonId);
    
    return (
      <AuthGuard>
        <DashboardShell>
          <div className="max-w-md mx-auto text-center py-20">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock size={32} className="text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Lesson {lessonId}</h2>
            <p className="text-gray-500 mb-6">{lesson.title}</p>
            <input
              type="text"
              placeholder="Enter access code (e.g., SJ01)"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
              className="w-full p-3 border rounded-xl text-center text-lg font-mono mb-4"
              autoFocus
            />
            <button onClick={verifyCode} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold">
              Unlock Lesson
            </button>
            <Link href={"/group/" + groupId + "/study-hub/steps-to-jesus"} className="block mt-6 text-indigo-600 text-sm">
              Back to Series
            </Link>
          </div>
        </DashboardShell>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <DashboardShell>
        <div className="max-w-4xl mx-auto space-y-6 pb-20">
          {/* Navigation Row with Back to Hub */}
          <div className="flex flex-wrap justify-between items-center gap-3">
            <div className="flex items-center gap-3">
              <Link href={"/group/" + groupId + "/study-hub/steps-to-jesus"} className="inline-flex items-center gap-2 text-indigo-600 text-sm hover:underline">
                <ArrowLeft size={16} /> Back to Steps to Jesus
              </Link>
              <Link href={"/group/" + groupId + "/study-hub"} className="inline-flex items-center gap-2 text-gray-400 text-sm hover:text-indigo-600 transition-colors">
                <LayoutGrid size={14} /> Back to Hub
              </Link>
            </div>
            <span className="text-xs text-gray-400">Lesson {lessonId} of 5</span>
          </div>

          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-800 to-purple-800 rounded-2xl p-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">{lesson.title}</h1>
            <p className="text-indigo-100 italic text-white/90">{lesson.subtitle}</p>
          </div>

          {/* Introduction */}
          <div className="bg-indigo-50 rounded-2xl p-6 border-l-4 border-indigo-600">
            <p className="text-gray-800 text-lg leading-relaxed">{lesson.introduction}</p>
          </div>

          {/* Memory Verse */}
          <div className="bg-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={18} className="text-indigo-400" />
              <h3 className="font-black text-sm uppercase tracking-wider text-indigo-300">Memory Verse</h3>
            </div>
            <p className="font-mono text-sm md:text-base italic leading-relaxed text-gray-200">{lesson.memoryVerse}</p>
          </div>

          {/* Tab Navigation */}
          <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm py-3 border-b border-gray-200 rounded-xl">
            <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl w-fit mx-auto">
              <button onClick={() => setActiveTab("study")} className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all ${activeTab === "study" ? "bg-indigo-600 text-white shadow-md" : "text-gray-600 hover:text-indigo-600 hover:bg-gray-200"}`}>
                <BookOpen size={14} /> Study
              </button>
              <button onClick={() => setActiveTab("reflect")} className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all ${activeTab === "reflect" ? "bg-indigo-600 text-white shadow-md" : "text-gray-600 hover:text-indigo-600 hover:bg-gray-200"}`}>
                <Heart size={14} /> Reflect
              </button>
              <button onClick={() => setActiveTab("apply")} className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all ${activeTab === "apply" ? "bg-indigo-600 text-white shadow-md" : "text-gray-600 hover:text-indigo-600 hover:bg-gray-200"}`}>
                <CheckCircle size={14} /> Apply
              </button>
            </div>
          </div>

          {/* Study Tab */}
          {activeTab === "study" && (
            <div className="space-y-4">
              {lesson.sections.map((section: any, idx: number) => (
                <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <button onClick={() => toggleSection(idx)} className="w-full flex justify-between items-center p-5 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-xs font-black">{idx + 1}</span>
                      <h2 className="text-base md:text-lg font-black tracking-tight text-gray-800 text-left">{section.title}</h2>
                    </div>
                    {expandedSections[idx] ? <ChevronUp size={18} className="text-gray-500" /> : <ChevronDown size={18} className="text-gray-500" />}
                  </button>
                  {expandedSections[idx] && (
                    <div className="p-5 pt-0 border-t border-gray-100">
                      {section.content.map((paragraph: string, pIdx: number) => (
                        <p key={pIdx} className="text-gray-700 text-sm md:text-base leading-relaxed mb-3 whitespace-pre-wrap">{paragraph}</p>
                      ))}
                      {section.scripture && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                          <p className="text-xs text-blue-700 font-mono">{section.scripture}</p>
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
            <div className="space-y-5">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <Heart size={18} className="text-indigo-600" />
                  <h2 className="text-xl font-black text-gray-800">Questions for Reflection</h2>
                </div>
                <div className="space-y-4">
                  {lesson.reflectionQuestions.map((q: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                      <span className="w-6 h-6 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-xs font-black shrink-0">{idx + 1}</span>
                      <p className="text-gray-700 text-sm font-medium leading-relaxed">{q}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Study Guide Questions */}
              {lesson.guide && lesson.guide.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <h2 className="text-xl font-black text-gray-800 mb-4">Study Guide</h2>
                  <div className="space-y-3">
                    {lesson.guide.map((item: any, idx: number) => (
                      <div key={idx} className="p-3 bg-gray-50 rounded-xl">
                        <p className="font-black text-indigo-700 text-sm">{item.q}</p>
                        <p className="text-sm text-gray-600 mt-1">{item.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Key Words Section */}
              {lesson.keyWords && lesson.keyWords.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <h2 className="text-xl font-black text-gray-800 mb-4">Key Words</h2>
                  <div className="space-y-3">
                    {lesson.keyWords.map((kw: any, idx: number) => (
                      <div key={idx} className="p-3 bg-gray-50 rounded-xl">
                        <h3 className="font-black text-indigo-700">{kw.word}</h3>
                        <p className="text-sm text-gray-600 mt-1">{kw.definition}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Heart size={18} className="text-indigo-400" />
                  <h2 className="text-xl font-black text-white">Prayer Prompt</h2>
                </div>
                <p className="text-gray-200 text-base italic leading-relaxed">{lesson.prayerPrompt}</p>
              </div>
            </div>
          )}

          {/* Apply Tab */}
          {activeTab === "apply" && lesson.application && (
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <CheckCircle size={18} className="text-blue-600" />
                </div>
                <h2 className="text-xl font-black text-gray-800">Practical Application</h2>
              </div>
              <div className="space-y-3">
                {lesson.application.map((item: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                    <CheckCircle size={18} className="text-blue-600 shrink-0 mt-0.5" />
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="font-black text-gray-800 text-base mb-3">My Notes</h3>
                <textarea placeholder="Write your personal reflections and commitments here..." className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none text-gray-700 text-sm" rows={4} />
                <p className="text-[9px] text-gray-400 mt-2 text-right">Auto-saved locally</p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4 pt-6 border-t border-gray-200">
            <div className="flex gap-2">
              {prevLesson ? <Link href={"/group/" + groupId + "/study-hub/steps-to-jesus/" + (lessonId - 1)} className="px-5 py-2.5 bg-gray-100 rounded-xl font-black text-sm text-gray-700 hover:bg-gray-200 transition">← Previous</Link> : <div className="w-24" />}
            </div>
            <div className="flex gap-2">
              <Link href={"/group/" + groupId + "/study-hub/steps-to-jesus"} className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-black text-sm hover:bg-indigo-700 transition shadow-md">All Lessons</Link>
              <Link href={"/group/" + groupId + "/study-hub"} className="px-5 py-2.5 bg-gray-500 text-white rounded-xl font-black text-sm hover:bg-gray-600 transition shadow-md"><LayoutGrid size={14} className="inline mr-1" /> Hub</Link>
            </div>
            <div className="flex gap-2">
              {nextLesson ? <Link href={"/group/" + groupId + "/study-hub/steps-to-jesus/" + (lessonId + 1)} className="px-5 py-2.5 bg-gray-100 rounded-xl font-black text-sm text-gray-700 hover:bg-gray-200 transition">Next →</Link> : <div className="px-5 py-2.5 bg-green-600 text-white rounded-xl font-black text-sm shadow-md"><CheckCircle size={16} className="inline mr-1" /> Complete</div>}
            </div>
          </div>
        </div>
      </DashboardShell>
    </AuthGuard>
  );
}
