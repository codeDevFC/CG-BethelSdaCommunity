// app/group/[groupId]/study-hub/[series]/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Lock, Unlock, LayoutGrid, Award, ChevronRight, Clock, Sparkles } from "lucide-react";
import DashboardShell from "@/components/DashboardShell";
import AuthGuard from "@/components/AuthGuard";
import Link from "next/link";
import { UnlockModal } from "@/components/UnlockModal";
import { STUDY_SERIES, getUnlockCode } from "@/lib/studyCodes";

// Import all lesson data mapping
import { comeAliveData } from "../come-alive/lessonData";
import { courtshipData } from "../courtship/lessonData";
import { danielData } from "../daniel/lessonData";
import { discoverData } from "../discover/lessonData";
import { encounterData } from "../encounter/lessonData";
import { excellenceInLifeData } from "../excellence-in-life/lessonData";
import { explorerClassData } from "../explorer-class/lessonData";
import { financeData } from "../finance/lessonData";
import { godlyManData } from "../godly-man/lessonData";
import { parentingData } from "../parenting/lessonData";
import { sanctuaryData } from "../sanctuary/lessonData";
import { searchForCertaintyData } from "../search-for-certainty/lessonData";
import { secretsOfProphecyData } from "../secrets-of-prophecy/lessonData";
import { sevenChurchesData } from "../seven-churches/lessonsData";
// Fix: Use the correct export name - branchAndVineData (with "And")
import { branchAndVineData } from "../branch-and-vine/lessonData";
import { handbookData } from "../study-101/handbookData";

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
  'study-101': handbookData
};

export default function SeriesHubPage() {
  const params = useParams();
  const router = useRouter();
  const series = params?.series as string;
  const groupId = params?.groupId || "1";
  
  const [unlockedLessons, setUnlockedLessons] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const seriesKey = series?.toUpperCase().replace(/-/g, '_');
  const seriesInfo = STUDY_SERIES[seriesKey as keyof typeof STUDY_SERIES];

  useEffect(() => {
    try {
      // Load unlocked lessons from localStorage
      const saved = localStorage.getItem(`unlocked_${series}_${groupId}`);
      setUnlockedLessons(saved ? JSON.parse(saved) : [1]);

      // Load lesson data for this series
      const data = seriesDataMap[series];
      if (data && typeof data === 'object') {
        const list = Object.entries(data)
          .filter(([id]) => !isNaN(parseInt(id)))
          .map(([id, lesson]: [string, any]) => ({
            id: parseInt(id),
            title: lesson.title || `Lesson ${id}`,
            description: lesson.introduction || lesson.intro || "Study lesson content.",
            keyVerse: lesson.memoryVerse || "Scripture provided in lesson.",
            audioFile: lesson.audioFile || null
          }))
          .sort((a, b) => a.id - b.id);
        setLessons(list);
      } else {
        console.warn(`No data found for series: ${series}`);
        setLessons([]);
      }
    } catch (error) {
      console.error("Error loading series data:", error);
      setLessons([]);
    } finally {
      setLoading(false);
    }
  }, [series, groupId]);

  const handleUnlock = (lessonId: number) => {
    setSelectedLesson(lessonId);
    setShowModal(true);
  };

  const handleVerifyUnlock = (code: string) => {
    if (selectedLesson) {
      const newUnlocked = [...unlockedLessons, selectedLesson];
      setUnlockedLessons(newUnlocked);
      localStorage.setItem(`unlocked_${series}_${groupId}`, JSON.stringify(newUnlocked));
      setShowModal(false);
      router.push(`/group/${groupId}/study-hub/${series}/${selectedLesson}`);
    }
  };

  const progress = lessons.length > 0 ? (unlockedLessons.length / lessons.length) * 100 : 0;

  // Get series-specific color gradient
  const getSeriesGradient = () => {
    const gradients: Record<string, string> = {
      'come-alive': 'from-pink-600 to-rose-600',
      'courtship': 'from-rose-600 to-pink-600',
      'daniel': 'from-blue-600 to-cyan-600',
      'discover': 'from-blue-600 to-indigo-600',
      'encounter': 'from-indigo-600 to-purple-600',
      'excellence-in-life': 'from-amber-600 to-yellow-600',
      'explorer-class': 'from-amber-600 to-orange-600',
      'finance': 'from-emerald-600 to-teal-600',
      'godly-man': 'from-emerald-600 to-green-600',
      'parenting': 'from-emerald-600 to-teal-600',
      'sanctuary': 'from-red-600 to-rose-600',
      'search-for-certainty': 'from-indigo-600 to-purple-600',
      'secrets-of-prophecy': 'from-purple-600 to-violet-600',
      'seven-churches': 'from-red-600 to-amber-600',
      'branch-and-vine': 'from-green-600 to-emerald-600',
      'study-101': 'from-slate-600 to-gray-800'
    };
    return gradients[series] || 'from-[#012169] to-[#547189]';
  };

  if (loading) {
    return (
      <AuthGuard>
        <DashboardShell>
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-500 font-black text-sm">Loading series...</p>
            </div>
          </div>
        </DashboardShell>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <DashboardShell>
        <div className="max-w-7xl mx-auto space-y-8 animate-intentional">
          {/* Back to Hub Link */}
          <Link 
            href={`/group/${groupId}/study-hub`} 
            className="inline-flex items-center gap-2 text-[#547189] font-black uppercase text-[10px] hover:gap-3 transition-all"
          >
            <LayoutGrid size={12} /> Back to Hub
          </Link>

          {/* Series Header */}
          <div className={`bg-gradient-to-r ${getSeriesGradient()} rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden`}>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter" style={{ fontFamily: 'Georgia, serif' }}>
              {seriesInfo?.name || series?.replace(/-/g, ' ') || 'Study Series'}
            </h1>
            <p className="opacity-80 italic mt-2 text-sm">{lessons.length} Lessons in this series</p>
            {seriesInfo?.description && (
              <p className="opacity-70 text-sm mt-4 max-w-2xl">{seriesInfo.description}</p>
            )}
            <Sparkles className="absolute -bottom-10 -right-10 w-64 h-64 text-white opacity-10" />
          </div>

          {/* Progress Bar */}
          {lessons.length > 0 && (
            <div className="glass-panel p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4 flex-1 w-full">
                <Award className="text-emerald-600 shrink-0" size={24} />
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
              </div>
              <span className="font-black text-emerald-600 text-xs uppercase whitespace-nowrap">
                {unlockedLessons.length} / {lessons.length} Unlocked
              </span>
            </div>
          )}

          {/* Lessons Grid */}
          {lessons.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles size={32} className="text-amber-600" />
              </div>
              <p className="text-gray-500 font-black">No lessons found for this series.</p>
              <Link 
                href={`/group/${groupId}/study-hub`}
                className="inline-block mt-4 text-[#547189] font-black text-sm underline"
              >
                Return to Study Hub
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lessons.map((lesson) => {
                const isUnlocked = unlockedLessons.includes(lesson.id);
                const code = getUnlockCode(seriesKey, lesson.id);
                return (
                  <div key={lesson.id} className="glass-card p-6 flex flex-col h-full group hover:shadow-xl transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] font-black uppercase text-[#547189] bg-[#547189]/10 px-2 py-1 rounded">
                        Lesson {lesson.id}
                      </span>
                      {isUnlocked ? (
                        <Unlock size={14} className="text-green-500" />
                      ) : (
                        <Lock size={14} className="text-gray-400" />
                      )}
                    </div>
                    
                    <h3 className="text-xl font-black text-[#012169] mb-2 line-clamp-2 group-hover:text-[#C8102E] transition-colors">
                      {lesson.title}
                    </h3>
                    
                    <p className="text-sm text-gray-500 line-clamp-3 mb-6 flex-1">
                      {lesson.description}
                    </p>
                    
                    {lesson.audioFile && (
                      <div className="flex items-center gap-1 text-[10px] text-gray-400 mb-4">
                        <Clock size={10} /> Audio Available
                      </div>
                    )}
                    
                    <button
                      onClick={() => isUnlocked ? router.push(`/group/${groupId}/study-hub/${series}/${lesson.id}`) : handleUnlock(lesson.id)}
                      className={`w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                        isUnlocked 
                          ? 'bg-[#012169] text-white shadow-lg hover:bg-[#C8102E] hover:shadow-xl active:scale-95' 
                          : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                      }`}
                    >
                      {isUnlocked ? (
                        <span className="flex items-center justify-center gap-2">
                          Start Study <ChevronRight size={12} />
                        </span>
                      ) : (
                        `Unlock Code: ${code}`
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Series Completion Message */}
          {unlockedLessons.length === lessons.length && lessons.length > 0 && (
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-center text-white">
              <Award size={32} className="mx-auto mb-3" />
              <h3 className="text-xl font-black mb-2">Series Completed!</h3>
              <p className="text-sm opacity-90">
                Congratulations on completing all {lessons.length} lessons in this series!
              </p>
            </div>
          )}
        </div>

        {/* Unlock Modal */}
        {showModal && selectedLesson && (
          <UnlockModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onVerify={handleVerifyUnlock}
            seriesName={seriesInfo?.name || series}
            seriesPrefix={seriesInfo?.prefix || ""}
            lessonNumber={selectedLesson}
            expectedCode={getUnlockCode(seriesKey, selectedLesson)}
          />
        )}
      </DashboardShell>
    </AuthGuard>
  );
}