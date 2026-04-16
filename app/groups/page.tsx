"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardShell from "@/components/DashboardShell";
import AuthGuard from "@/components/AuthGuard";
import Link from "next/link";
import { 
  Church, Users, Heart, Target, Edit, Trash2, 
  Plus, MapPin, Calendar, ChevronRight, TrendingUp,
  Search, Shield, Crown, Star, Award, Activity,
  RefreshCw, AlertCircle, CheckCircle, Clock
} from "lucide-react";
import { loadGroups, saveGroups, getAllGroupsSummary } from "@/lib/groupService";
import toast from "react-hot-toast";

export default function GroupsPage() {
  const { user, hasPermission } = useAuth();
  const [groups, setGroups] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  
  const isAdmin = hasPermission(['admin']);
  const displayGroups = isAdmin ? groups : groups.filter(g => g.id === user?.groupId);
  
  useEffect(() => {
    loadGroupsList();
  }, []);

  const loadGroupsList = () => {
    setLoading(true);
    const summary = getAllGroupsSummary();
    setGroups(summary);
    setLoading(false);
  };

  const handleDeleteGroup = (id: string, name: string) => {
    if (!isAdmin) {
      toast.error("Only administrators can delete groups");
      return;
    }
    
    const allGroups = loadGroups();
    if (allGroups[id]) {
      delete allGroups[id];
      saveGroups(allGroups);
      refreshUsers();
      loadGroupsList();
      toast.success(`Group "${name}" has been deleted`);
    }
    setShowDeleteConfirm(null);
  };

  const getHealthColor = (score: number) => {
    if (score >= 85) return "text-emerald-600 bg-emerald-50";
    if (score >= 70) return "text-amber-600 bg-amber-50";
    return "text-red-600 bg-red-50";
  };

  const getHealthBadge = (score: number) => {
    if (score >= 85) return { label: "Excellent", icon: <Star size={10} />, color: "bg-emerald-100 text-emerald-700" };
    if (score >= 70) return { label: "Good", icon: <TrendingUp size={10} />, color: "bg-amber-100 text-amber-700" };
    if (score >= 50) return { label: "Needs Attention", icon: <AlertCircle size={10} />, color: "bg-orange-100 text-orange-700" };
    return { label: "Critical", icon: <AlertCircle size={10} />, color: "bg-red-100 text-red-700" };
  };

  const filteredGroups = displayGroups.filter(g =>
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (g.leader && g.leader.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (!hasPermission(['admin', 'coordinator', 'pastor'])) {
    return (
      <AuthGuard>
        <DashboardShell>
          <div className="text-center py-20">
            <Shield size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 font-black">Access Restricted</p>
            <p className="text-sm text-gray-400 mt-2">This page is for leaders only.</p>
          </div>
        </DashboardShell>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <DashboardShell>
        <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-700 pb-20">
          {/* Header */}
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Church size={20} className="text-blue-600" />
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider">Care Groups</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-black tracking-tighter" style={{ fontFamily: 'Georgia, serif' }}>
                Bethel Care Groups
              </h1>
              <p className="text-gray-500 text-sm mt-1">Manage and monitor all Care Groups across the region</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={loadGroupsList}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl text-[10px] font-black hover:bg-gray-200 transition"
              >
                <RefreshCw size={14} /> Refresh
              </button>
              {isAdmin && (
                <Link 
                  href="/groups/add"
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#012169] to-[#0a2a80] text-white rounded-xl font-black text-[10px] uppercase tracking-wider hover:scale-105 transition-all shadow-lg"
                >
                  <Plus size={16} /> New Group
                </Link>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by group name or leader..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#012169]"
              />
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-[#C8102E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400 text-sm">Loading Care Groups...</p>
            </div>
          )}

          {/* Groups Grid */}
          {!loading && (
            <div className="grid lg:grid-cols-2 gap-6">
              {filteredGroups.map((group) => {
                const healthBadge = getHealthBadge(group.healthScore);
                return (
                  <div key={group.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden group-card">
                    {/* Header */}
                    <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#012169] to-[#0a2a80] rounded-xl flex items-center justify-center text-white">
                            <Church size={22} />
                          </div>
                          <div>
                            <h2 className="text-xl font-black tracking-tight">{group.name}</h2>
                            <div className="flex items-center gap-3 mt-1 flex-wrap">
                              <span className="flex items-center gap-1 text-[10px] text-gray-500">
                                <MapPin size={10} /> {group.location || 'TBD'}
                              </span>
                              <span className="flex items-center gap-1 text-[10px] text-gray-500">
                                <Calendar size={10} /> {group.meetingDay}s at {group.meetingTime}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-black ${healthBadge.color}`}>
                            {healthBadge.icon}
                            <span>{healthBadge.label}</span>
                          </div>
                          <p className={`text-2xl font-black mt-1 ${getHealthColor(group.healthScore)}`}>
                            {group.healthScore}%
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="p-5">
                      <div className="grid grid-cols-4 gap-3 text-center mb-5">
                        <div className="bg-gray-50 rounded-xl p-2">
                          <Users size={16} className="mx-auto text-blue-600 mb-1" />
                          <p className="text-xl font-black">{group.memberCount || 0}</p>
                          <p className="text-[8px] text-gray-500">Members</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-2">
                          <Heart size={16} className="mx-auto text-rose-600 mb-1" />
                          <p className="text-xl font-black">{group.seekers || group.soulWinning || 0}</p>
                          <p className="text-[8px] text-gray-500">Seekers</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-2">
                          <Target size={16} className="mx-auto text-amber-600 mb-1" />
                          <p className="text-xl font-black">{group.leader || 'TBD'}</p>
                          <p className="text-[8px] text-gray-500">Leader</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-2">
                          <Award size={16} className="mx-auto text-green-600 mb-1" />
                          <p className="text-xl font-black">{group.soulWinning || 0}</p>
                          <p className="text-[8px] text-gray-500">Souls Won</p>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Link
                          href={`/groups/${group.id}`}
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#012169] text-white font-black text-[10px] uppercase hover:bg-[#0a2a80] transition-colors"
                        >
                          View Details <ChevronRight size={12} />
                        </Link>
                        {isAdmin && (
                          <>
                            <Link
                              href={`/groups/${group.id}/edit`}
                              className="p-2.5 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                            >
                              <Edit size={14} />
                            </Link>
                            <button
                              onClick={() => setShowDeleteConfirm(group.id)}
                              className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredGroups.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <Church size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-gray-400 font-black">No Care Groups found</p>
              <p className="text-sm text-gray-400 mt-1">
                {searchTerm ? "Try a different search term" : "Create your first Care Group to get started"}
              </p>
              {isAdmin && !searchTerm && (
                <Link href="/groups/add" className="inline-block mt-4 text-[#012169] text-sm font-black underline">
                  Create New Group
                </Link>
              )}
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-md w-full p-6">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle size={32} className="text-red-600" />
                  </div>
                  <h3 className="text-2xl font-black">Delete Care Group</h3>
                  <p className="text-gray-500 text-sm mt-2">
                    Are you sure you want to delete this group? This action cannot be undone.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setShowDeleteConfirm(null)} className="flex-1 py-3 bg-gray-100 rounded-xl font-black text-sm">
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      const group = groups.find(g => g.id === showDeleteConfirm);
                      handleDeleteGroup(showDeleteConfirm, group?.name || 'Group');
                    }} 
                    className="flex-1 py-3 bg-red-600 text-white rounded-xl font-black text-sm"
                  >
                    Delete Group
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DashboardShell>
    </AuthGuard>
  );
}