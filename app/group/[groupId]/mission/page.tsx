"use client";
import { use, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/contexts/AuthContext";
import { getGroup, updateGroup } from "@/lib/groupService";
import { 
  Target, Sparkles, UserPlus, ArrowRight, CheckCircle2, 
  Flame, Edit2, Save, X, Trash2, Plus, Users, Filter,
  Heart, BookOpen, Cross, Award, Calendar,
  Trophy, MessageCircle, Search, ChevronDown, ChevronUp, Loader2
} from "lucide-react";
import toast from "react-hot-toast";

const STAGES = [
  { id: 'praying', label: 'Pray', color: 'bg-blue-500', bgLight: 'bg-blue-50', textColor: 'text-blue-700', description: 'Being prayed for', icon: Heart },
  { id: 'serving', label: 'Serve', color: 'bg-green-500', bgLight: 'bg-green-50', textColor: 'text-green-700', description: 'Serving in ministry', icon: Users },
  { id: 'invited', label: 'Invite', color: 'bg-yellow-500', bgLight: 'bg-yellow-50', textColor: 'text-yellow-700', description: 'Invited to group', icon: UserPlus },
  { id: 'attending', label: 'Attend', color: 'bg-orange-500', bgLight: 'bg-orange-50', textColor: 'text-orange-700', description: 'Regular attendee', icon: Calendar },
  { id: 'decided', label: 'Decide', color: 'bg-purple-500', bgLight: 'bg-purple-50', textColor: 'text-purple-700', description: 'Decided for Christ', icon: Cross },
  { id: 'baptized', label: 'Baptize', color: 'bg-red-600', bgLight: 'bg-red-50', textColor: 'text-red-700', description: 'Baptized member', icon: Award },
  { id: 'worker', label: 'Worker', color: 'bg-emerald-600', bgLight: 'bg-emerald-50', textColor: 'text-emerald-700', description: 'Winning souls', icon: Trophy }
];

interface Seeker {
  id: number;
  name: string;
  journeyStage: string;
  notes?: string;
  prayerCount?: number;
}

export default function MissionJourneyPage({ params }: { params: Promise<{ groupId: string }> }) {
  const resolvedParams = use(params);
  const groupId = resolvedParams.groupId;
  const { hasPermission, canAccessGroup } = useAuth();
  const [group, setGroup] = useState<any>(null);
  const [seekers, setSeekers] = useState<Seeker[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSeekerName, setNewSeekerName] = useState("");
  const [mounted, setMounted] = useState(false);
  
  const isLeader = hasPermission(['coordinator', 'pastor', 'admin']);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (groupId && canAccessGroup(groupId) && mounted) {
      const data = getGroup(groupId);
      setGroup(data);
      const saved = localStorage.getItem(`mission_${groupId}`);
      if (saved) {
        setSeekers(JSON.parse(saved));
      } else {
        const initial = [
          { id: 101, name: "New Visitor", journeyStage: "praying", prayerCount: 2 },
          { id: 102, name: "Interested Friend", journeyStage: "invited", prayerCount: 5 }
        ];
        setSeekers(initial);
        localStorage.setItem(`mission_${groupId}`, JSON.stringify(initial));
      }
    }
  }, [groupId, mounted, canAccessGroup]);

  const saveSeekers = (updated: Seeker[]) => {
    setSeekers(updated);
    localStorage.setItem(`mission_${groupId}`, JSON.stringify(updated));
  };

  const updateStage = (id: number, direction: 'next' | 'prev') => {
    const seeker = seekers.find(s => s.id === id);
    if (!seeker) return;
    const currentIndex = STAGES.findIndex(stage => stage.id === seeker.journeyStage);
    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    
    if (newIndex >= 0 && newIndex < STAGES.length) {
      const updated = seekers.map(s => s.id === id ? { ...s, journeyStage: STAGES[newIndex].id } : s);
      saveSeekers(updated);
      toast.success(`${seeker.name} moved to ${STAGES[newIndex].label}`);
    }
  };

  const handleAddSeeker = () => {
    if (!newSeekerName.trim()) return;
    const newSeeker: Seeker = {
      id: Date.now(),
      name: newSeekerName,
      journeyStage: 'praying',
      prayerCount: 0
    };
    saveSeekers([...seekers, newSeeker]);
    setNewSeekerName("");
    setShowAddModal(false);
    toast.success('Added to journey');
  };

  if (!mounted || !group) return <div className="p-20 text-center font-black">Loading...</div>;

  const completionRate = seekers.length > 0 
    ? Math.round((seekers.filter(s => s.journeyStage === 'worker').length / seekers.length) * 100) 
    : 0;

  return (
    <AuthGuard>
      <DashboardShell>
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Target size={20} className="text-emerald-600" />
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">Discipleship Pipeline</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase leading-none" style={{ fontFamily: 'Georgia, serif' }}>
                Mission Journey
              </h1>
              <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">
                Pray • Serve • Invite • Baptize • Work
              </p>
            </div>
            {isLeader && (
              <button onClick={() => setShowAddModal(true)} className="bg-emerald-600 text-white px-6 py-4 rounded-2xl font-black text-[10px] uppercase shadow-lg hover:bg-emerald-700 transition-all">
                Add Seeker
              </button>
            )}
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-black text-lg">Pipeline Progress</h3>
              <span className="text-2xl font-black text-emerald-600">{completionRate}%</span>
            </div>
            <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500" style={{ width: `${completionRate}%` }} />
            </div>
          </div>

          <div className="space-y-4">
            {seekers.map((seeker) => {
              const currentStageIndex = STAGES.findIndex(s => s.id === seeker.journeyStage);
              const currentStage = STAGES[currentStageIndex];
              return (
                <div key={seeker.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 ${currentStage?.bgLight} rounded-2xl flex items-center justify-center font-black text-2xl`}>
                        {seeker.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-black text-xl">{seeker.name}</h4>
                        <span className={`text-[9px] font-black uppercase tracking-widest ${currentStage?.textColor}`}>
                          {currentStage?.label} • {currentStage?.description}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 px-4">
                      <div className="flex justify-between mb-2">
                        {STAGES.map((stage, idx) => (
                          <div key={stage.id} className={`w-2 h-2 rounded-full ${idx <= currentStageIndex ? stage.color : 'bg-gray-200'}`} />
                        ))}
                      </div>
                      <div className="flex justify-between text-[6px] font-black text-gray-400">
                        {STAGES.map(s => <span key={s.id}>{s.label}</span>)}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button onClick={() => updateStage(seeker.id, 'prev')} disabled={currentStageIndex === 0} className="px-4 py-2 rounded-xl bg-gray-100 text-[9px] font-black uppercase disabled:opacity-30">Back</button>
                      <button onClick={() => updateStage(seeker.id, 'next')} disabled={currentStageIndex === STAGES.length - 1} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-[9px] font-black uppercase disabled:opacity-30">Advance</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black uppercase">Add to Journey</h3>
                <button onClick={() => setShowAddModal(false)}><X size={20}/></button>
              </div>
              <input 
                type="text" 
                value={newSeekerName} 
                onChange={e => setNewSeekerName(e.target.value)} 
                placeholder="Seeker Name" 
                className="w-full p-4 bg-gray-50 rounded-2xl border outline-none focus:border-emerald-600 mb-6"
                autoFocus
              />
              <div className="flex gap-3">
                <button onClick={() => setShowAddModal(false)} className="flex-1 py-4 bg-gray-100 rounded-2xl font-black uppercase text-xs">Cancel</button>
                <button onClick={handleAddSeeker} className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase text-xs shadow-lg">Start Journey</button>
              </div>
            </div>
          </div>
        )}
      </DashboardShell>
    </AuthGuard>
  );
}
