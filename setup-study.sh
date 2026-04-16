#!/bin/bash

# Create directories
mkdir -p "app/group/[groupId]/study-101"
mkdir -p "app/group/[groupId]/study-101/[id]"

# Create the main study-101 page
cat > "app/group/[groupId]/study-101/page.tsx" << 'EOF'
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, Lock, Unlock, ChevronRight, Search, Heart } from "lucide-react";
import Link from "next/link";
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
    title: handbookData[id].title,
    keyVerses: handbookData[id].keyVerses || []
  }));

  const filteredStudies = studies.filter(study =>
    study.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const progress = (unlockedStudies.length / studies.length) * 100;

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
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-indigo-100 px-4 py-2 rounded-full mb-4">
              <BookOpen size={16} className="text-indigo-600" />
              <span className="text-xs font-bold text-indigo-600 uppercase">Study 101</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter">Bible Study Handbook</h1>
            <p className="text-gray-500 mt-2">51 essential Bible studies for spiritual growth</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <span className="font-black text-sm">Your Progress</span>
              <span className="text-sm font-black text-indigo-600">{unlockedStudies.length}/{studies.length}</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full bg-indigo-600 rounded-full" />
            </div>
          </div>

          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search studies..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 border rounded-xl focus:border-indigo-500 outline-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudies.map((study) => {
              const isUnlocked = unlockedStudies.includes(study.id);
              return (
                <div key={study.id} className="bg-white rounded-2xl border p-5">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">Study {study.id}</span>
                    {isUnlocked ? <Unlock size={14} className="text-green-500" /> : <Lock size={14} className="text-gray-400" />}
                  </div>
                  <h3 className="font-black text-lg mb-2">{study.title}</h3>
                  <button onClick={() => {
                    if (isUnlocked) router.push(`/group/${groupId}/study-101/${study.id}`);
                    else { const code = 777 - (study.id - 1); const input = prompt(`Enter code:`); if (input && parseInt(input) === code) { const newUnlocked = [...unlockedStudies, study.id]; setUnlockedStudies(newUnlocked); localStorage.setItem(`unlocked101_${groupId}`, JSON.stringify(newUnlocked)); router.push(`/group/${groupId}/study-101/${study.id}`); } else alert("Invalid code!"); }
                  }} className={`w-full py-2.5 rounded-xl font-black text-xs uppercase transition ${isUnlocked ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-gray-100 text-gray-500"}`}>
                    {isUnlocked ? "Start Study" : `Unlock (Code: ${777 - (study.id - 1)})`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </DashboardShell>
    </AuthGuard>
  );
}
EOF

# Create the handbookData.ts file
cat > "app/group/[groupId]/study-101/handbookData.ts" << 'EOF'
export interface StudySection {
  t: string;
  c: string;
}

export interface StudyData {
  title: string;
  intro: string;
  sections: StudySection[];
  reflections: string[];
  keyVerses: string[];
}

export const handbookData: Record<string, StudyData> = {
  "1": {
    title: "In Search of Freedom: Synthesis of the Bible",
    intro: "The Christian journey is a fascinating but demanding journey...",
    sections: [
      { t: "The First Message", c: "We are all children of God and this world is the home He had prepared for us." },
      { t: "The Tempter and the Fall", c: "A tempter leads man to doubt the Father's love." },
      { t: "The Journey of Return", c: "In man's heart, the need for God always resounds." },
      { t: "The Final Restoration", c: "In the end, God brings us home." }
    ],
    reflections: ["How would you define the Bible?", "What is true freedom?", "Why does the son ask for his inheritance?"],
    keyVerses: ["John 8:31-32", "Galatians 5:13", "Romans 6:22"]
  }
};
EOF

echo "Files created successfully!"
