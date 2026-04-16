// app/group/[groupId]/study-hub/parenting/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Lock, Unlock, BookOpen, Heart, LayoutGrid, BookText, 
  Sparkles, Users, Baby, Home, Church, 
  Star, Award, Clock, Target, Flame, Shield,
  Crown, TreePine, HandHeart, GraduationCap,
  AlertCircle, CheckCircle2, ChevronRight,
  ArrowRight, Play, Headphones, Music, Coffee, Sun, Moon
} from "lucide-react";
import DashboardShell from "@/components/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";
import Link from "next/link";
import { motion } from "framer-motion";

interface Lesson {
  id: number;
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  keyVerses: string[];
  description: string;
  code: string;
  audioFile?: string;
  duration?: string;
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: "God's Ownership of Our Children",
    subtitle: "A precious trust from heaven",
    icon: Heart,
    color: "from-rose-600 to-pink-600",
    keyVerses: ["Psalm 127:3", "Adventist Home p.159"],
    description: "Understanding that children are a gift from God entrusted to our care",
    code: "PA01",
    audioFile: "/audio/parenting/lesson1.mp3",
    duration: "45 min"
  },
  {
    id: 2,
    title: "A Divine Commission to Parents",
    subtitle: "Called to be God's partners",
    icon: Church,
    color: "from-blue-600 to-cyan-600",
    keyVerses: ["Genesis 5:22", "Deuteronomy 6:6-7"],
    description: "God's sacred calling to parenthood as ministry",
    code: "PA02",
    audioFile: "/audio/parenting/lesson2.mp3",
    duration: "45 min"
  },
  {
    id: 3,
    title: "The First Steps: Love and Trust",
    subtitle: "Building the foundation",
    icon: Heart,
    color: "from-red-600 to-rose-600",
    keyVerses: ["Psalm 36:7", "1 John 4:19"],
    description: "Teaching love through consistent, unconditional care",
    code: "PA03",
    audioFile: "/audio/parenting/lesson3.mp3",
    duration: "50 min"
  },
  {
    id: 4,
    title: "The Second Steps: Obedience and Discipline",
    subtitle: "Training in righteousness",
    icon: Crown,
    color: "from-amber-600 to-orange-600",
    keyVerses: ["Proverbs 22:6", "Hebrews 12:11"],
    description: "God's methods for teaching obedience and shaping character",
    code: "PA04",
    audioFile: "/audio/parenting/lesson4.mp3",
    duration: "50 min"
  },
  {
    id: 5,
    title: "Spirituality During Early Childhood",
    subtitle: "Nurturing young faith",
    icon: Baby,
    color: "from-green-600 to-emerald-600",
    keyVerses: ["Ecclesiastes 12:1", "Mark 10:15"],
    description: "The critical early years of faith formation",
    code: "PA05",
    audioFile: "/audio/parenting/lesson5.mp3",
    duration: "45 min"
  },
  {
    id: 6,
    title: "Encouraging Positive Attitude Toward Scripture",
    subtitle: "Making the Bible come alive",
    icon: BookOpen,
    color: "from-indigo-600 to-purple-600",
    keyVerses: ["3 John 1:4", "2 Timothy 3:15-17"],
    description: "Creating a love for God's Word in children's hearts",
    code: "PA06",
    audioFile: "/audio/parenting/lesson6.mp3",
    duration: "50 min"
  },
  {
    id: 7,
    title: "Family Worship and Prayer",
    subtitle: "Building spiritual heritage",
    icon: Home,
    color: "from-teal-600 to-cyan-600",
    keyVerses: ["Joel 1:3", "Deuteronomy 6:7"],
    description: "The heart of a godly home—family worship",
    code: "PA07",
    audioFile: "/audio/parenting/lesson7.mp3",
    duration: "45 min"
  },
  {
    id: 8,
    title: "Sabbath: The Day of Delight",
    subtitle: "A special gift for families",
    icon: Star,
    color: "from-yellow-600 to-amber-600",
    keyVerses: ["Isaiah 58:13-14", "Exodus 20:8-11"],
    description: "Making the Sabbath a family treasure",
    code: "PA08",
    audioFile: "/audio/parenting/lesson8.mp3",
    duration: "50 min"
  },
  {
    id: 9,
    title: "The Church and the Child",
    subtitle: "Partnering for spiritual growth",
    icon: Church,
    color: "from-purple-600 to-pink-600",
    keyVerses: ["Psalm 100:4", "Ephesians 4:12"],
    description: "The church as your parenting partner",
    code: "PA09",
    audioFile: "/audio/parenting/lesson9.mp3",
    duration: "45 min"
  },
  {
    id: 10,
    title: "Confronting the World (Part 1)",
    subtitle: "Choosing companions and influences",
    icon: Shield,
    color: "from-blue-600 to-indigo-600",
    keyVerses: ["John 17:15", "1 Corinthians 15:33"],
    description: "Guiding children in friendship choices",
    code: "PA10",
    audioFile: "/audio/parenting/lesson10.mp3",
    duration: "55 min"
  },
  {
    id: 11,
    title: "Confronting the World (Part 2)",
    subtitle: "Recreation and media",
    icon: Star,
    color: "from-cyan-600 to-blue-600",
    keyVerses: ["Philippians 4:8-9", "Psalm 101:3"],
    description: "Navigating entertainment and amusements",
    code: "PA11",
    audioFile: "/audio/parenting/lesson11.mp3",
    duration: "55 min"
  },
  {
    id: 12,
    title: "The Child's Education",
    subtitle: "True education for eternity",
    icon: GraduationCap,
    color: "from-emerald-600 to-green-600",
    keyVerses: ["Proverbs 1:7", "Isaiah 54:13"],
    description: "Educating for this life and the next",
    code: "PA12",
    audioFile: "/audio/parenting/lesson12.mp3",
    duration: "50 min"
  }
];

export default function ParentingHub() {
  const params = useParams();
  const router = useRouter();
  const groupId = params?.groupId || "1";
  const [unlocked, setUnlocked] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [code, setCode] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`unlockedParenting_${groupId}`);
    if (saved) {
      setUnlocked(JSON.parse(saved));
    } else {
      // Lesson 1 unlocked by default
      setUnlocked([1]);
      localStorage.setItem(`unlockedParenting_${groupId}`, JSON.stringify([1]));
    }
  }, [groupId]);

  const handleUnlock = () => {
    if (selectedId) {
      const lesson = lessons.find(l => l.id === selectedId);
      if (lesson && code.toUpperCase() === lesson.code) {
        const newUnlocked = [...unlocked, selectedId];
        setUnlocked(newUnlocked);
        localStorage.setItem(`unlockedParenting_${groupId}`, JSON.stringify(newUnlocked));
        setShowModal(false);
        setCode("");
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          router.push(`/group/${groupId}/study-hub/parenting/${selectedId}`);
        }, 1500);
      } else {
        alert(`Invalid code. The correct code is ${lesson?.code}`);
      }
    }
  };

  const progress = (unlocked.length / lessons.length) * 100;

  return (
    <ProtectedLayout>
      <DashboardShell>
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700 pb-24">
          {/* Back Link */}
          <Link
            href={`/group/${groupId}/study-hub`}
            className="inline-flex items-center gap-2 text-emerald-600 font-black uppercase tracking-widest text-[10px] hover:opacity-70 transition-opacity"
          >
            <LayoutGrid className="w-3 h-3" /> Back to Study Hub
          </Link>

          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-700 text-white shadow-2xl">
            <div className="absolute inset-0 opacity-10">
              <Heart className="absolute -top-20 -right-20 w-64 h-64" />
              <Baby className="absolute -bottom-20 -left-20 w-64 h-64" />
              <Home className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96" />
            </div>
            <div className="relative z-10 p-8 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-10 h-10 md:w-12 md:h-12" />
                <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                  Level 3 • Discipleship
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[1.1] md:leading-[0.9] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                Raising God's<br />Children
              </h1>
              <p className="text-emerald-100 max-w-2xl text-base md:text-lg font-medium italic leading-relaxed">
                "Train up a child in the way he should go, and when he is old he will not depart from it."
              </p>
              <p className="text-emerald-200/80 text-xs md:text-sm mt-3">
                A 12-lesson journey to discover God's blueprint for Christian parenting
              </p>
            </div>
            {/* Wave decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400" />
          </div>

          {/* Progress Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <Award size={18} className="text-emerald-600" />
                <span className="font-black text-sm">Your Parenting Journey</span>
              </div>
              <span className="text-xs font-black text-emerald-600">{unlocked.length}/{lessons.length} Lessons</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-2">
              {Math.round(progress)}% complete — Continue building your parenting legacy
            </p>
          </div>

          {/* Quote Card */}
          <div className="bg-gray-900 rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
            <QuoteIcon className="absolute -top-4 -right-4 w-24 h-24 text-white/5" />
            <p className="text-sm md:text-base italic leading-relaxed relative z-10">
              "Children are the heritage of the Lord, and we are answerable to Him for our management of His property. In love, faith, and prayer let parents work for their households, until with joy they can come to God saying, 'Behold, I and the children whom the Lord hath given me.'"
            </p>
            <p className="text-right text-xs text-gray-400 mt-3">— Adventist Home, p.159</p>
          </div>

          {/* Lessons Grid */}
          <div>
            <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-emerald-600" />
              Parenting Lessons
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {lessons.map((lesson) => {
                const isUnlocked = unlocked.includes(lesson.id);
                const IconComponent = lesson.icon;
                
                return (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: lesson.id * 0.03 }}
                    className={`group bg-white rounded-2xl border overflow-hidden hover:scale-[1.02] transition-all duration-300 flex flex-col ${
                      isUnlocked ? 'border-emerald-200 shadow-lg hover:shadow-xl' : 'border-gray-100 shadow-sm hover:shadow-md'
                    }`}
                  >
                    <div className={`bg-gradient-to-r ${lesson.color} p-4 text-white relative overflow-hidden`}>
                      <div className="absolute inset-0 opacity-10">
                        <IconComponent className="absolute -bottom-4 -right-4 w-16 h-16" />
                      </div>
                      <div className="relative z-10">
                        <div className="flex justify-between items-start">
                          <IconComponent size={24} />
                          <span className="text-[8px] font-black bg-white/20 px-2 py-1 rounded-full">
                            Lesson {lesson.id}
                          </span>
                        </div>
                        <h3 className="font-black text-base mt-2 leading-tight line-clamp-2">{lesson.title}</h3>
                        <p className="text-[10px] opacity-90 mt-1 line-clamp-1">{lesson.subtitle}</p>
                      </div>
                    </div>
                    
                    <div className="p-4 flex-1">
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">{lesson.description}</p>
                      
                      <div className="bg-gray-50 rounded-xl p-2.5">
                        <p className="text-[8px] font-black text-emerald-600 uppercase tracking-widest mb-1 flex items-center gap-1">
                          <BookText size={8} /> Memory Verse
                        </p>
                        <p className="text-[9px] font-mono text-gray-700 truncate">{lesson.keyVerses[0]}</p>
                      </div>
                      
                      {lesson.audioFile && (
                        <div className="mt-2 flex items-center gap-1 text-[9px] text-gray-400">
                          <Headphones size={10} /> Audio lesson • {lesson.duration}
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 pt-0">
                      <button
                        onClick={() => {
                          setSelectedId(lesson.id);
                          if (isUnlocked) {
                            router.push(`/group/${groupId}/study-hub/parenting/${lesson.id}`);
                          } else {
                            setShowModal(true);
                          }
                        }}
                        className={`w-full py-2.5 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                          isUnlocked 
                            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-md' 
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {isUnlocked ? (
                          <>
                            <BookOpen size={12} /> Study Lesson <ChevronRight size={10} />
                          </>
                        ) : (
                          <>
                            <Lock size={12} /> Unlock with: {lesson.code}
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Unlock Modal */}
        {showModal && selectedId && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-black mb-2">Unlock Lesson {selectedId}</h2>
                <p className="text-gray-500 text-sm">
                  Enter the access code for <span className="font-bold text-gray-800">Christian Parenting</span>
                </p>
                <div className="mt-3 inline-block bg-gray-100 px-3 py-1 rounded-full">
                  <code className="text-sm font-mono font-bold text-emerald-600">
                    {lessons.find(l => l.id === selectedId)?.code}
                  </code>
                </div>
              </div>

              <input
                type="text"
                placeholder="Enter access code"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="w-full border-2 border-gray-200 rounded-2xl p-4 text-center text-xl font-mono font-black mb-6 focus:border-emerald-500 outline-none transition-colors uppercase"
                autoFocus
                onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
              />

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setCode("");
                  }}
                  className="flex-1 py-3 border border-gray-200 rounded-xl font-black text-sm hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUnlock}
                  className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-700 transition shadow-md"
                >
                  Unlock Lesson
                </button>
              </div>
              <p className="text-[10px] text-gray-400 text-center mt-4">
                Codes are provided by your study group leader.
              </p>
            </motion.div>
          </div>
        )}

        {/* Success Toast */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3">
              <CheckCircle2 size={20} />
              <span className="font-bold text-sm">Lesson unlocked successfully!</span>
            </div>
          </motion.div>
        )}
      </DashboardShell>
    </ProtectedLayout>
  );
}

// Quote Icon Component
function QuoteIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 17h3l2-4V7h-6v6h3l-2 4zm-8 0h3l2-4V7H5v6h3l-2 4z" />
    </svg>
  );
}