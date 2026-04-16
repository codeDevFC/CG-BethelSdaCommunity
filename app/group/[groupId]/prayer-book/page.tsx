
"use client";
import { use, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/contexts/AuthContext";
import { getGroup, addPrayer, updatePrayer, deletePrayer } from "@/lib/groupService";
import Link from "next/link";
import { 
  ArrowLeft, Heart, Plus, Search, Filter, CheckCircle, 
  Clock, MessageCircle, Edit, Trash2, Eye, X, Send,
  Lock, Globe, AlertCircle, Users, Calendar, Sparkles
} from "lucide-react";
import toast from "react-hot-toast";

interface Prayer {
  id: number;
  memberName: string;
  request: string;
  status: 'active' | 'answered';
  date: string;
  isPrivate: boolean;
  testimony?: string;
  answeredDate?: string;
  category?: string;
  urgency?: 'high' | 'medium' | 'low';
}

export default function PrayerBookPage() {
  const params = useParams();
  const groupId = params?.groupId as string;
  const { user, hasPermission, canAccessGroup } = useAuth();
  const [group, setGroup] = useState<any>(null);
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    request: "",
    isPrivate: false,
    category: "Personal",
    urgency: "medium" as 'high' | 'medium' | 'low'
  });
  const [submitting, setSubmitting] = useState(false);
  
  const isLeader = hasPermission(['coordinator', 'pastor', 'admin']);

  useEffect(() => {
    if (groupId && canAccessGroup(groupId)) {
      const data = getGroup(groupId);
      setGroup(data);
      loadPrayers(data);
    }
  }, [groupId]);

  const loadPrayers = (groupData: any) => {
    const saved = localStorage.getItem(`prayers_${groupId}`);
    if (saved) {
      setPrayers(JSON.parse(saved));
    } else {
      // Sample prayers
      const samplePrayers: Prayer[] = [
        {
          id: 1,
          memberName: "Sarah M.",
          request: "Please pray for my mother's surgery recovery. She had a hip replacement yesterday.",
          status: "active",
          date: new Date().toISOString().split('T')[0],
          isPrivate: false,
          category: "Health",
          urgency: "high"
        },
        {
          id: 2,
          memberName: "James W.",
          request: "Job interview this Thursday. Pray for wisdom and favor.",
          status: "active",
          date: new Date().toISOString().split('T')[0],
          isPrivate: false,
          category: "Work",
          urgency: "medium"
        },
        {
          id: 3,
          memberName: "Prayer Team",
          request: "Our community outreach event this Saturday.",
          status: "answered",
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          isPrivate: false,
          category: "Outreach",
          urgency: "medium",
          answeredDate: new Date().toISOString().split('T')[0],
          testimony: "God sent 15 new visitors! 2 people gave their lives to Christ!"
        }
      ];
      setPrayers(samplePrayers);
      localStorage.setItem(`prayers_${groupId}`, JSON.stringify(samplePrayers));
    }
  };

  const savePrayers = (updatedPrayers: Prayer[]) => {
    setPrayers(updatedPrayers);
    localStorage.setItem(`prayers_${groupId}`, JSON.stringify(updatedPrayers));
  };

  const handleAddPrayer = () => {
    if (!formData.request.trim()) {
      toast.error("Please enter a prayer request");
      return;
    }

    setSubmitting(true);
    
    const newPrayer: Prayer = {
      id: Date.now(),
      memberName: user?.name || 'Anonymous',
      request: formData.request,
      status: 'active',
      date: new Date().toISOString().split('T')[0],
      isPrivate: formData.isPrivate,
      category: formData.category,
      urgency: formData.urgency
    };

    savePrayers([newPrayer, ...prayers]);
    toast.success("Prayer request submitted");
    setShowAddModal(false);
    setFormData({ request: "", isPrivate: false, category: "Personal", urgency: "medium" });
    setSubmitting(false);
  };

  const handleMarkAnswered = (id: number) => {
    const testimony = prompt("Share how God answered this prayer:");
    if (testimony === null) return;
    
    const updatedPrayers = prayers.map(p =>
      p.id === id
        ? { ...p, status: 'answered' as const, answeredDate: new Date().toISOString().split('T')[0], testimony }
        : p
    );
    savePrayers(updatedPrayers);
    toast.success("Prayer marked as answered!");
  };

  const handleDeletePrayer = (id: number) => {
    if (confirm("Are you sure you want to delete this prayer request?")) {
      savePrayers(prayers.filter(p => p.id !== id));
      toast.success("Prayer request deleted");
    }
  };

  const filteredPrayers = prayers.filter(p => {
    const matchesSearch = p.request.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.memberName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    active: prayers.filter(p => p.status === 'active').length,
    answered: prayers.filter(p => p.status === 'answered').length,
    total: prayers.length
  };

  if (!canAccessGroup(groupId)) {
    return (
      <AuthGuard>
        <DashboardShell>
          <div className="text-center py-20">
            <p className="text-gray-500">You don't have access to this group's prayer book.</p>
          </div>
        </DashboardShell>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <DashboardShell>
        <div className="space-y-6 pb-20">
          {/* Header */}
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <Link href={`/group/${groupId}`} className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition">
                <ArrowLeft size={20} />
              </Link>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Heart size={20} className="text-rose-600" />
                  <span className="text-[10px] font-black text-rose-600 uppercase tracking-wider">Prayer Ministry</span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-black tracking-tighter" style={{ fontFamily: 'Georgia, serif' }}>
                  Prayer Book
                </h1>
                <p className="text-gray-500 text-sm">{group?.name} • Submit and track prayer requests</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#547189] text-white px-5 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-[#3a5a6e] transition flex items-center gap-2"
            >
              <Plus size={14} /> New Request
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="glass-card p-4 text-center">
              <Heart size={20} className="mx-auto mb-2 text-rose-500" />
              <p className="text-2xl font-black text-rose-600">{stats.active}</p>
              <p className="text-[9px] font-black text-gray-400 uppercase">Active</p>
            </div>
            <div className="glass-card p-4 text-center">
              <CheckCircle size={20} className="mx-auto mb-2 text-green-500" />
              <p className="text-2xl font-black text-green-600">{stats.answered}</p>
              <p className="text-[9px] font-black text-gray-400 uppercase">Answered</p>
            </div>
            <div className="glass-card p-4 text-center">
              <Users size={20} className="mx-auto mb-2 text-blue-500" />
              <p className="text-2xl font-black">{stats.total}</p>
              <p className="text-[9px] font-black text-gray-400 uppercase">Total</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search prayers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 glass-card border focus:border-[#547189] outline-none text-sm"
                />
              </div>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 glass-card border focus:border-[#547189] outline-none text-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="answered">Answered</option>
            </select>
          </div>

          {/* Prayer Grid */}
          <div className="grid md:grid-cols-2 gap-5">
            {filteredPrayers.map((prayer) => (
              <div key={prayer.id} className="glass-card p-5 hover:bg-white/70 transition">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`text-[8px] font-black px-2 py-0.5 rounded-full ${
                        prayer.status === "active" ? "bg-rose-100 text-rose-700" : "bg-green-100 text-green-700"
                      }`}>
                        {prayer.status.toUpperCase()}
                      </span>
                      {prayer.urgency === 'high' && prayer.status === 'active' && (
                        <span className="text-[8px] font-black px-2 py-0.5 rounded-full bg-red-100 text-red-700 animate-pulse">URGENT</span>
                      )}
                      {prayer.category && (
                        <span className="text-[8px] font-black px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">{prayer.category}</span>
                      )}
                    </div>
                    <p className="font-black text-sm">{prayer.memberName}</p>
                    <p className="text-[10px] text-gray-500">{new Date(prayer.date).toLocaleDateString()}</p>
                  </div>
                  <Heart size={20} className={prayer.status === "active" ? "text-rose-500 fill-rose-100" : "text-gray-300"} />
                </div>
                
                <p className="text-sm text-gray-700 leading-relaxed mb-4 line-clamp-3">{prayer.request}</p>
                
                {prayer.testimony && (
                  <div className="bg-green-50 rounded-xl p-3 mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle size={12} className="text-green-600" />
                      <p className="text-[9px] font-black text-green-700 uppercase">Testimony</p>
                    </div>
                    <p className="text-[11px] text-green-800 line-clamp-2">{prayer.testimony}</p>
                  </div>
                )}
                
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  {prayer.status === "active" && (
                    <>
                      <button
                        onClick={() => handleMarkAnswered(prayer.id)}
                        className="flex-1 py-2 bg-green-50 text-green-700 rounded-xl text-[10px] font-black hover:bg-green-100 transition"
                      >
                        <CheckCircle size={12} className="inline mr-1" /> Mark Answered
                      </button>
                      {isLeader && (
                        <button
                          onClick={() => handleDeletePrayer(prayer.id)}
                          className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </>
                  )}
                  {prayer.status === "answered" && (
                    <div className="flex-1 text-center text-green-600 text-[10px] font-black">
                      Answered on {prayer.answeredDate}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredPrayers.length === 0 && (
            <div className="text-center py-16 glass-card">
              <Heart size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-gray-400 font-black">No prayer requests found</p>
            </div>
          )}
        </div>

        {/* Add Prayer Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
                <h3 className="text-2xl font-black">New Prayer Request</h3>
                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-xl">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Prayer Request *</label>
                  <textarea
                    value={formData.request}
                    onChange={(e) => setFormData({ ...formData, request: e.target.value })}
                    rows={5}
                    className="w-full p-3 bg-gray-50 rounded-xl border focus:border-[#547189] outline-none"
                    placeholder="What would you like us to pray about?..."
                    autoFocus
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-3 bg-gray-50 rounded-xl border focus:border-[#547189] outline-none"
                    >
                      <option value="Personal">Personal</option>
                      <option value="Family">Family</option>
                      <option value="Health">Health</option>
                      <option value="Work">Work</option>
                      <option value="Spiritual Growth">Spiritual Growth</option>
                      <option value="Outreach">Outreach</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Urgency</label>
                    <select
                      value={formData.urgency}
                      onChange={(e) => setFormData({ ...formData, urgency: e.target.value as any })}
                      className="w-full p-3 bg-gray-50 rounded-xl border focus:border-[#547189] outline-none"
                    >
                      <option value="high">🔴 High - Urgent</option>
                      <option value="medium">🟡 Medium</option>
                      <option value="low">🟢 Low - Pray as led</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-3">Privacy</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={!formData.isPrivate}
                        onChange={() => setFormData({ ...formData, isPrivate: false })}
                        className="w-4 h-4 text-rose-600"
                      />
                      <Globe size={14} className="text-gray-500" />
                      <span className="text-xs font-black">Public</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={formData.isPrivate}
                        onChange={() => setFormData({ ...formData, isPrivate: true })}
                        className="w-4 h-4 text-rose-600"
                      />
                      <Lock size={14} className="text-gray-500" />
                      <span className="text-xs font-black">Private</span>
                    </label>
                  </div>
                </div>
                <div className="bg-rose-50 rounded-xl p-4">
                  <p className="text-[10px] font-black text-rose-800">Prayer Promise</p>
                  <p className="text-[10px] text-rose-600 mt-1">"The effective, fervent prayer of a righteous man avails much." - James 5:16</p>
                </div>
              </div>
              <div className="sticky bottom-0 bg-white border-t p-6 flex gap-3">
                <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 bg-gray-100 rounded-xl font-black text-sm">
                  Cancel
                </button>
                <button
                  onClick={handleAddPrayer}
                  disabled={submitting}
                  className="flex-1 py-3 bg-[#547189] text-white rounded-xl font-black text-sm flex items-center justify-center gap-2"
                >
                  <Send size={14} /> {submitting ? "Submitting..." : "Submit Prayer"}
                </button>
              </div>
            </div>
          </div>
        )}
      </DashboardShell>
    </AuthGuard>
  );
}
