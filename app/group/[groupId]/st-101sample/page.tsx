"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  BookOpen,
  Lock,
  Unlock,
  ChevronRight,
  Sparkles,
  Heart,
  Book,
  Star,
  TrendingUp,
  Users,
  Calendar,
  Globe,
  Cross,
  Award,
  Clock,
  CheckCircle,
  X,
  Shield,
  Lightbulb,
  Home,
  Crown,
  Feather,
  Sun,
  Moon,
  Cloud,
  Droplet,
  Tree,
  Music,
  Smile,
  Anchor,
  Compass,
  Key,
  Scroll,
  Church
} from "lucide-react";
import Link from "next/link";
import { handbookData } from "./handbookData";

// Category definitions with icons and colors
const categories = [
  { id: "all", name: "All Studies", icon: BookOpen, color: "blue", gradient: "from-blue-500 to-cyan-500" },
  { id: "foundational", name: "Foundational", icon: Heart, color: "rose", gradient: "from-rose-500 to-pink-500" },
  { id: "doctrine", name: "Doctrine", icon: Book, color: "purple", gradient: "from-purple-500 to-indigo-500" },
  { id: "prophecy", name: "Prophecy", icon: Star, color: "amber", gradient: "from-amber-500 to-orange-500" },
  { id: "christian-living", name: "Christian Living", icon: TrendingUp, color: "green", gradient: "from-green-500 to-emerald-500" },
  { id: "church", name: "The Church", icon: Users, color: "indigo", gradient: "from-indigo-500 to-blue-500" },
  { id: "end-times", name: "End Times", icon: Calendar, color: "orange", gradient: "from-orange-500 to-red-500" }
];

// Study categories mapping (1-51)
const studyCategories: Record<number, string> = {
  1: "foundational", 2: "foundational", 3: "foundational", 4: "foundational",
  5: "foundational", 6: "foundational", 7: "foundational", 8: "foundational",
  9: "doctrine", 10: "doctrine", 11: "doctrine", 12: "doctrine",
  13: "prophecy", 14: "prophecy", 15: "prophecy", 16: "prophecy",
  17: "doctrine", 18: "doctrine", 19: "doctrine", 20: "doctrine",
  21: "church", 22: "church", 23: "church", 24: "christian-living",
  25: "church", 26: "christian-living", 27: "christian-living",
  28: "doctrine", 29: "doctrine", 30: "doctrine", 31: "doctrine",
  32: "doctrine", 33: "christian-living", 34: "christian-living",
  35: "christian-living", 36: "christian-living", 37: "prophecy",
  38: "prophecy", 39: "prophecy", 40: "prophecy", 41: "prophecy",
  42: "prophecy", 43: "prophecy", 44: "church", 45: "prophecy",
  46: "christian-living", 47: "christian-living", 48: "christian-living",
  49: "doctrine", 50: "doctrine", 51: "doctrine"
};

// Helper function to get category icon component
const getCategoryIcon = (categoryId: string) => {
  const category = categories.find(c => c.id === categoryId);
  return category?.icon || BookOpen;
};

export default function HandbookHub() {
  const params = useParams();
  const router = useRouter();
  const groupId = params?.groupId || "1";
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [unlockedStudies, setUnlockedStudies] = useState<number[]>([]);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState<number | null>(null);
  const [codeInput, setCodeInput] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`unlocked101_${groupId}`);
    if (saved) {
      setUnlockedStudies(JSON.parse(saved));
    } else {
      setUnlockedStudies([1]);
      localStorage.setItem(`unlocked101_${groupId}`, JSON.stringify([1]));
    }
  }, [groupId]);

  const studies = Object.keys(handbookData).map(id => ({
    id: parseInt(id),
    title: handbookData[id].title,
    keyVerses: handbookData[id].keyVerses || ["Psalm 119:105", "John 3:16", "Romans 8:28"],
    category: studyCategories[parseInt(id)] || "foundational"
  }));

  const filteredStudies = studies.filter(study => {
    const matchesSearch = study.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || study.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUnlock = (studyId: number) => {
    setSelectedStudy(studyId);
    setCodeInput("");
    setShowCodeModal(true);
  };

  const verifyCode = () => {
    if (selectedStudy && parseInt(codeInput) === 777 - (selectedStudy - 1)) {
      const newUnlocked = [...unlockedStudies, selectedStudy];
      setUnlockedStudies(newUnlocked);
      localStorage.setItem(`unlocked101_${groupId}`, JSON.stringify(newUnlocked));
      setShowCodeModal(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        router.push(`/group/${groupId}/study-101/${selectedStudy}`);
      }, 1500);
    } else {
      alert("Invalid code. Please check the code and try again.");
    }
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat?.color || "blue";
  };

  const getCategoryGradient = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat?.gradient || "from-blue-500 to-cyan-500";
  };

  const progressPercentage = (unlockedStudies.length / 51) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-indigo-200 mb-6"
              >
                <BookOpen className="w-4 h-4" />
                <span>Complete Bible Study Curriculum</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
              >
                101 Bible
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200">
                  Study Guide
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-indigo-200 text-lg md:text-xl max-w-2xl mb-6"
              >
                A complete handbook for pastors, students, and seekers. 
                Explore foundational truths and deep doctrines.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center min-w-[160px] border border-white/20"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-1">
                {unlockedStudies.length}
              </div>
              <div className="text-indigo-200 text-sm mb-3">Studies Unlocked</div>
              <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  className="h-full bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full"
                />
              </div>
              <div className="text-indigo-200 text-xs mt-2">
                {Math.round(progressPercentage)}% Complete
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10 flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search 51 studies by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    selectedCategory === category.id
                      ? `bg-gradient-to-r ${category.gradient} text-white shadow-md`
                      : "bg-white text-gray-600 border border-gray-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredStudies.map((study, index) => {
              const isUnlocked = unlockedStudies.includes(study.id);
              const CategoryIcon = getCategoryIcon(study.category);
              const gradient = getCategoryGradient(study.category);

              return (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 h-full flex flex-col">
                    <div className={`h-2 bg-gradient-to-r ${gradient}`}></div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          <CategoryIcon className="w-3 h-3" />
                          <span className="capitalize">{study.category.replace("-", " ")}</span>
                        </div>
                        {isUnlocked ? (
                          <div className="flex items-center gap-1 text-green-600 text-xs bg-green-50 px-2 py-1 rounded-full">
                            <Unlock className="w-3 h-3" />
                            <span>Unlocked</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-gray-400 text-xs bg-gray-50 px-2 py-1 rounded-full">
                            <Lock className="w-3 h-3" />
                            <span>Locked</span>
                          </div>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                        <span className="text-indigo-400 mr-1">{study.id}.</span> {study.title}
                      </h3>

                      <div className="bg-gray-50 rounded-xl p-3 mb-4 border border-gray-100 flex-1">
                        <p className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
                          <Book className="w-3 h-3" />
                          Key Verses
                        </p>
                        <ul className="space-y-1">
                          {study.keyVerses.slice(0, 2).map((verse, idx) => (
                            <li key={idx} className="text-xs font-mono text-gray-600 flex items-start gap-1">
                              <ChevronRight className="w-3 h-3 text-indigo-400 mt-0.5" />
                              <span>{verse}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {isUnlocked ? (
                        <Link href={`/group/${groupId}/study-101/${study.id}`}>
                          <button className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-2.5 rounded-xl hover:from-indigo-700 transition-all flex items-center justify-center gap-2 font-medium">
                            <BookOpen className="w-4 h-4" />
                            View Full Study
                          </button>
                        </Link>
                      ) : (
                        <button
                          onClick={() => handleUnlock(study.id)}
                          className="w-full border-2 border-indigo-200 text-indigo-600 py-2.5 rounded-xl hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 font-medium"
                        >
                          <Lock className="w-4 h-4" />
                          Unlock with Code
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Unlock Modal */}
      <AnimatePresence>
        {showCodeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowCodeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Unlock Study {selectedStudy}</h3>
                <p className="text-gray-500 text-sm mb-6">Enter the access code to unlock this study.</p>
                <input
                  type="number"
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  placeholder="Enter 3-digit code"
                  className="w-full border border-gray-200 rounded-xl p-3 text-center text-2xl font-mono mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  autoFocus
                />
                <div className="flex gap-3">
                  <button onClick={() => setShowCodeModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-gray-600">Cancel</button>
                  <button onClick={verifyCode} className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-xl">Unlock</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Study unlocked successfully!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
