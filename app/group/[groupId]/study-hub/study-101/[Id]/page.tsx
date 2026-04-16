// app/group/[groupId]/study-101/[id]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Heart,
  Star,
  Target,
  Award,
  Clock,
  CheckCircle,
  Share2,
  Bookmark,
  Copy,
  Twitter,
  Facebook,
  Mail,
  Lock,
  Unlock,
  ArrowLeft,
  Home
} from "lucide-react";
import Link from "next/link";
import { handbookData } from "../handbookData";

export default function StudyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const groupId = params?.groupId || "1";
  const id = params?.id as string;
  const studyId = parseInt(id);

  const [unlockedStudies, setUnlockedStudies] = useState<number[]>([]);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const study = handbookData[id];
  const nextStudy = handbookData[String(studyId + 1)];
  const prevStudy = handbookData[String(studyId - 1)];

  useEffect(() => {
    const saved = localStorage.getItem(`unlocked101_${groupId}`);
    const unlocked = saved ? JSON.parse(saved) : [1];
    setUnlockedStudies(unlocked);
    setIsUnlocked(unlocked.includes(studyId));
  }, [groupId, studyId]);

  const handleUnlock = () => {
    setShowUnlockModal(true);
  };

  const verifyCode = () => {
    const expectedCode = 777 - (studyId - 1);
    if (parseInt(codeInput) === expectedCode) {
      const newUnlocked = [...unlockedStudies, studyId];
      setUnlockedStudies(newUnlocked);
      localStorage.setItem(`unlocked101_${groupId}`, JSON.stringify(newUnlocked));
      setIsUnlocked(true);
      setShowUnlockModal(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } else {
      alert("Invalid code. Please try again.");
      setCodeInput("");
    }
  };

  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Study Not Found</h1>
          <p className="text-gray-500 mt-2">The requested study does not exist.</p>
          <Link href={`/group/${groupId}/study-101`} className="inline-block mt-4 text-indigo-600 hover:underline">
            Back to Handbook
          </Link>
        </div>
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Study {studyId}</h2>
            <p className="text-indigo-100 mt-1">{study.title}</p>
          </div>
          <div className="p-6">
            <p className="text-gray-600 text-center mb-6">
              This study is locked. Enter the access code to unlock it.
            </p>
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-500 text-center">
                Code format: 3-digit number<br />
                Hint: 777 - (study number - 1)
              </p>
            </div>
            <input
              type="number"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              placeholder="Enter 3-digit code"
              className="w-full border border-gray-200 rounded-xl p-3 text-center text-2xl font-mono mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              autoFocus
            />
            <button
              onClick={verifyCode}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-medium hover:from-indigo-700 transition-all"
            >
              Unlock Study
            </button>
            <Link
              href={`/group/${groupId}/study-101`}
              className="block text-center mt-4 text-gray-500 text-sm hover:text-indigo-600"
            >
              ← Back to Handbook
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-top-2">
          <CheckCircle className="w-5 h-5" />
          <span>Study unlocked successfully!</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <Link
              href={`/group/${groupId}/study-101`}
              className="inline-flex items-center gap-2 text-indigo-200 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Handbook</span>
            </Link>
            <div className="flex items-center gap-2 text-indigo-200">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">Study {studyId} of 51</span>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{study.title}</h1>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
              {study.keyVerses.slice(0, 3).map((verse, idx) => (
                <span key={idx} className="text-xs bg-white/10 px-3 py-1 rounded-full">
                  📖 {verse}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="bg-indigo-50 rounded-2xl p-6 mb-8 border-l-4 border-indigo-500">
          <p className="text-indigo-900 text-lg leading-relaxed">{study.intro}</p>
        </div>

        {/* Sections */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-600" />
            Study Content
          </h2>
          {study.sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <h3 className="text-xl font-bold text-indigo-700 mb-3">{section.t}</h3>
              <p className="text-gray-600 leading-relaxed">{section.c}</p>
            </motion.div>
          ))}
        </div>

        {/* Reflection Questions */}
        <div className="bg-amber-50 rounded-2xl p-6 mb-8 border border-amber-100">
          <h2 className="text-xl font-bold text-amber-800 flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-amber-600" />
            Reflection Questions
          </h2>
          <ul className="space-y-3">
            {study.reflections.map((question, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">{idx + 1}.</span>
                <span className="text-gray-700">{question}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Key Verses */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-yellow-600" />
            Key Verses
          </h2>
          <ul className="space-y-2">
            {study.keyVerses.map((verse, idx) => (
              <li key={idx} className="font-mono text-gray-700">{verse}</li>
            ))}
          </ul>
        </div>

        {/* Navigation */}
        <div className="flex justify-between gap-4 pt-8 border-t border-gray-200">
          {prevStudy ? (
            <Link
              href={`/group/${groupId}/study-101/${studyId - 1}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous Study
            </Link>
          ) : (
            <div />
          )}
          <Link
            href={`/group/${groupId}/study-101`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Handbook
          </Link>
          {nextStudy ? (
            <Link
              href={`/group/${groupId}/study-101/${studyId + 1}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Next Study
              <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}