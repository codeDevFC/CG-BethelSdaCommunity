"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, Lock, Unlock, Search, ChevronRight, Award, Heart, LayoutGrid } from "lucide-react";
import DashboardShell from "@/components/DashboardShell";
import AuthGuard from "@/components/AuthGuard";
import { handbookData } from "./handbookData";

export default function Study101Page() {
  const params = useParams();
  const router = useRouter();
  const groupId = params?.groupId || "1";
  
  const [unlockedStudies, setUnlockedStudies] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(`unlocked101_${groupId}`);
    const unlocked = saved ? JSON.parse(saved) : [1];
    setUnlockedStudies(unlocked);
    setLoading(false);
  }, [groupId]);

  const studies = Object.keys(handbookData).map(id => ({
    id: parseInt(id),
    title: handbookData[id]?.title || `Study ${id}`,
    keyVerses: handbookData[id]?.keyVerses || []
  }));

  const filteredStudies = studies.filter(study =>
    study.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const progress = studies.length > 0 ? (unlockedStudies.length / studies.length) * 100 : 0;

  if (loading) {
    return (
      <AuthGuard>
        <DashboardShell>
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="mt-4 text-gray-500">Loading studies...</p>
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
            <Link href={`/group/${groupId}/study-hub`} className="inline-flex items-center gap-2 text-gray-400 text-sm hover:text-indigo-600 transition-colors">
              <LayoutGrid size={14} /> Back to Study Hub
            </Link>
            <span className="text-xs text-gray-400">{unlockedStudies.length} of {studies.length} unlocked</span>
          </div>

          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-indigo-100 px-4 py-2 rounded-full mb-4">
              <BookOpen size={16} className="text-indigo-600" />
              <span className="text-xs font-bold text-indigo-600 uppercase">Study 101</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
              Bible Study Handbook
            </h1>
            <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
              51 essential Bible studies for spiritual growth and understanding
            </p>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <Award size={18} className="text-indigo-600" />
                <span className="font-black text-sm">Your Progress</span>
              </div>
              <span className="text-sm font-black text-indigo-600">{unlockedStudies.length}/{studies.length} Studies</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search studies by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
            />
          </div>

          {/* Studies Grid */}
          {filteredStudies.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border">
              <BookOpen size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-gray-400 font-black">No studies found</p>
              <p className="text-sm text-gray-400 mt-1">Try a different search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudies.map((study) => {
                const isUnlocked = unlockedStudies.includes(study.id);
                const unlockCode = 777 - (study.id - 1);
                
                return (
                  <div key={study.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                          Study {study.id}
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
                      
                      <h3 className="font-black text-lg text-gray-800 mb-2 line-clamp-2">{study.title}</h3>
                      
                      {study.keyVerses.length > 0 && (
                        <div className="bg-gray-50 rounded-xl p-2 mb-4">
                          <p className="text-[8px] font-black text-gray-400 uppercase mb-1">Key Verse</p>
                          <p className="text-[10px] font-mono text-gray-600">{study.keyVerses[0]}</p>
                        </div>
                      )}
                      
                      <button
                        onClick={() => {
                          if (isUnlocked) {
                            router.push(`/group/${groupId}/study-101/${study.id}`);
                          } else {
                            const input = prompt(`Enter unlock code for Study ${study.id}:`);
                            if (input && parseInt(input) === unlockCode) {
                              const newUnlocked = [...unlockedStudies, study.id];
                              setUnlockedStudies(newUnlocked);
                              localStorage.setItem(`unlocked101_${groupId}`, JSON.stringify(newUnlocked));
                              router.push(`/group/${groupId}/study-101/${study.id}`);
                            } else {
                              alert(`Invalid code! The correct code is ${unlockCode}`);
                            }
                          }
                        }}
                        className={`w-full py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wider transition-all ${
                          isUnlocked 
                            ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md" 
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                      >
                        {isUnlocked ? (
                          <span className="flex items-center justify-center gap-2">
                            Start Study <ChevronRight size={12} />
                          </span>
                        ) : (
                          `Unlock with Code: ${unlockCode}`
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </DashboardShell>
    </AuthGuard>
  );
}
