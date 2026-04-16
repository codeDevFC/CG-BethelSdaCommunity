"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, Lock, Unlock, ChevronRight, Heart, Award, Clock, Sparkles, LayoutGrid } from "lucide-react";
import DashboardShell from "@/components/DashboardShell";
import AuthGuard from "@/components/AuthGuard";

const stayAliveLessons = [
  { id: 1, title: "He's Coming Back", duration: "45 min", description: "The blessed hope of His return", code: "SA01" },
  { id: 2, title: "When He Comes", duration: "45 min", description: "The manner of His appearing", code: "SA02" },
  { id: 3, title: "Your First 1000 Years with Jesus", duration: "50 min", description: "The millennium revealed", code: "SA03" },
  { id: 4, title: "New Earth For You", duration: "45 min", description: "Your eternal home", code: "SA04" },
  { id: 5, title: "Where Are You After You Die?", duration: "50 min", description: "The truth about death", code: "SA05" },
  { id: 6, title: "Destruction of the Wicked", duration: "45 min", description: "God's justice revealed", code: "SA06" }
];

export default function StayAlivePage() {
  const params = useParams();
  const router = useRouter();
  const groupId = params?.groupId || "1";
  
  const [unlockedLessons, setUnlockedLessons] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("unlocked_stay-alive_" + groupId);
    const unlocked = saved ? JSON.parse(saved) : [1];
    setUnlockedLessons(unlocked);
    setLoading(false);
  }, [groupId]);

  const progress = (unlockedLessons.length / stayAliveLessons.length) * 100;

  if (loading) {
    return (
      <AuthGuard>
        <DashboardShell>
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="mt-4 text-gray-500">Loading lessons...</p>
          </div>
        </DashboardShell>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <DashboardShell>
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
          {/* Back to Hub Link */}
          <div className="flex justify-between items-center">
            <Link href={"/group/" + groupId + "/study-hub"} className="inline-flex items-center gap-2 text-gray-400 text-sm hover:text-teal-600 transition-colors">
              <LayoutGrid size={14} /> Back to Study Hub
            </Link>
            <span className="text-xs text-gray-400">{unlockedLessons.length} of {stayAliveLessons.length} unlocked</span>
          </div>

          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-teal-100 px-4 py-2 rounded-full mb-4">
              <Heart size={16} className="text-teal-600" />
              <span className="text-xs font-bold text-teal-600 uppercase">Stay Alive with Jesus</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
              Stay Alive with Jesus
            </h1>
            <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
              6 essential lessons for new believers to grow in faith
            </p>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <Award size={18} className="text-teal-600" />
                <span className="font-black text-sm">Your Progress</span>
              </div>
              <span className="text-sm font-black text-teal-600">{unlockedLessons.length}/{stayAliveLessons.length} Lessons</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Lessons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stayAliveLessons.map((lesson) => {
              const isUnlocked = unlockedLessons.includes(lesson.id);
              return (
                <div key={lesson.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-black text-teal-600 bg-teal-50 px-2 py-1 rounded-full">
                        Lesson {lesson.id}
                      </span>
                      {isUnlocked ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <Unlock size={12} />
                          <span className="text-[8px] font-black">Unlocked</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-gray-400">
                          <Lock size={12} />
                          <span className="text-[8px] font-black">Locked</span>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="font-black text-lg text-gray-800 mb-2">{lesson.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">{lesson.description}</p>
                    
                    <div className="flex items-center gap-1 mb-4">
                      <Clock size={12} className="text-gray-400" />
                      <span className="text-[10px] text-gray-400">{lesson.duration}</span>
                    </div>
                    
                    <button
                      onClick={() => {
                        if (isUnlocked) {
                          router.push("/group/" + groupId + "/study-hub/stay-alive/" + lesson.id);
                        } else {
                          const input = prompt("Enter unlock code for \"" + lesson.title + "\":");
                          if (input && input.toUpperCase() === lesson.code) {
                            const newUnlocked = [...unlockedLessons, lesson.id];
                            setUnlockedLessons(newUnlocked);
                            localStorage.setItem("unlocked_stay-alive_" + groupId, JSON.stringify(newUnlocked));
                            router.push("/group/" + groupId + "/study-hub/stay-alive/" + lesson.id);
                          } else {
                            alert("Invalid code! The correct code is " + lesson.code);
                          }
                        }
                      }}
                      className={`w-full py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wider transition-all ${
                        isUnlocked 
                          ? "bg-teal-600 text-white hover:bg-teal-700 shadow-md" 
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {isUnlocked ? "Start Lesson" : "Unlock with: " + lesson.code}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </DashboardShell>
    </AuthGuard>
  );
}
