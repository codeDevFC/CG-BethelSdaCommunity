"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Church, Users, Heart, Target, Award, Calendar, 
  TrendingUp, Activity, Shield, LogOut, UserCircle,
  Power, SwitchCamera, BarChart3, Star, CheckCircle,
  Trash2, Edit2, X, AlertTriangle
} from "lucide-react";
import DashboardShell from "@/components/DashboardShell";
import AuthGuard from "@/components/AuthGuard";
import { loadGroups, saveGroups } from "@/lib/groupService";
import toast from "react-hot-toast";

// Group data
const GROUPS = [
  { id: "1", name: "01 - Bethel Care Group", memberCount: 12, healthScore: 92, soulsWon: 8, baptisms: 3, attendanceRate: 85, color: "from-blue-600 to-indigo-600", bgLight: "bg-blue-50", textColor: "text-blue-700" },
  { id: "2", name: "02 - Faith Community", memberCount: 10, healthScore: 85, soulsWon: 5, baptisms: 2, attendanceRate: 78, color: "from-green-600 to-emerald-600", bgLight: "bg-green-50", textColor: "text-green-700" },
  { id: "3", name: "03 - Hope Fellowship", memberCount: 15, healthScore: 78, soulsWon: 12, baptisms: 4, attendanceRate: 82, color: "from-purple-600 to-pink-600", bgLight: "bg-purple-50", textColor: "text-purple-700" },
  { id: "4", name: "04 - Grace Circle", memberCount: 8, healthScore: 70, soulsWon: 3, baptisms: 1, attendanceRate: 65, color: "from-amber-600 to-orange-600", bgLight: "bg-amber-50", textColor: "text-amber-700" },
  { id: "5", name: "05 - Love Alliance", memberCount: 11, healthScore: 88, soulsWon: 6, baptisms: 2, attendanceRate: 80, color: "from-red-600 to-rose-600", bgLight: "bg-red-50", textColor: "text-red-700" },
  { id: "6", name: "06 - Joy Gathering", memberCount: 9, healthScore: 75, soulsWon: 4, baptisms: 1, attendanceRate: 70, color: "from-teal-600 to-cyan-600", bgLight: "bg-teal-50", textColor: "text-teal-700" },
  { id: "7", name: "07 - Peace Circle", memberCount: 13, healthScore: 82, soulsWon: 7, baptisms: 2, attendanceRate: 76, color: "from-indigo-600 to-blue-600", bgLight: "bg-indigo-50", textColor: "text-indigo-700" },
];

export default function PastorDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<any>(null);
  const [groups, setGroups] = useState(GROUPS);
  const [totalStats, setTotalStats] = useState({
    totalMembers: 0,
    totalSoulsWon: 0,
    totalBaptisms: 0,
    avgHealthScore: 0,
    avgAttendance: 0
  });

  const userRole = session?.user?.role || "MEMBER";
  const userName = session?.user?.name || "Pastor";
  const isAdmin = userRole === "ADMIN" || userRole === "PASTOR";

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/login");
      return;
    }

    if (!isAdmin) {
      router.push("/portal");
      return;
    }

    updateStats();
  }, [session, status, router, isAdmin, groups]);

  const updateStats = () => {
    const totalMembers = groups.reduce((sum, g) => sum + g.memberCount, 0);
    const totalSoulsWon = groups.reduce((sum, g) => sum + g.soulsWon, 0);
    const totalBaptisms = groups.reduce((sum, g) => sum + g.baptisms, 0);
    const avgHealthScore = Math.round(groups.reduce((sum, g) => sum + g.healthScore, 0) / groups.length);
    const avgAttendance = Math.round(groups.reduce((sum, g) => sum + g.attendanceRate, 0) / groups.length);

    setTotalStats({ totalMembers, totalSoulsWon, totalBaptisms, avgHealthScore, avgAttendance });
  };

  const handleDeleteGroup = () => {
    if (!groupToDelete) return;
    
    // Remove from local state
    const updatedGroups = groups.filter(g => g.id !== groupToDelete.id);
    setGroups(updatedGroups);
    
    // Also remove from localStorage persistence
    const allGroups = loadGroups();
    if (allGroups[groupToDelete.id]) {
      delete allGroups[groupToDelete.id];
      saveGroups(allGroups);
    }
    
    toast.success(`${groupToDelete.name} has been deleted`);
    setShowDeleteModal(false);
    setGroupToDelete(null);
  };

  const handleSignOut = async () => {
    const { signOut } = await import("next-auth/react");
    localStorage.clear();
    await signOut({ callbackUrl: '/login' });
  };

  const handleSwitchUser = async () => {
    const { signOut } = await import("next-auth/react");
    localStorage.clear();
    await signOut({ callbackUrl: '/login' });
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#012169] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <DashboardShell>
        <div className="space-y-6 pb-20">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield size={18} className="text-[#012169]" />
                <span className="text-[10px] font-black text-[#012169] uppercase tracking-wider">Leadership Overview</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-black tracking-tighter text-gray-800">Pastor Dashboard</h1>
              <p className="text-gray-500 text-sm mt-1">Welcome, {userName} — Monitor all Care Groups</p>
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-200"
              >
                <UserCircle size={18} className="text-gray-600" />
                <span className="font-black text-sm hidden sm:inline">{userName}</span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  {userRole}
                </span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                  <div className="p-2">
                    <button onClick={handleSwitchUser} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                      <SwitchCamera size={16} /> <span>Switch User</span>
                    </button>
                    <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                      <Power size={16} /> <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Summary Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <Users size={20} className="text-blue-600 mb-1" />
              <p className="text-2xl font-black text-gray-800">{totalStats.totalMembers}</p>
              <p className="text-[9px] font-black text-gray-500 uppercase">Total Members</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
              <Target size={20} className="text-green-600 mb-1" />
              <p className="text-2xl font-black text-gray-800">{totalStats.totalSoulsWon}</p>
              <p className="text-[9px] font-black text-gray-500 uppercase">Souls Won</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
              <Award size={20} className="text-purple-600 mb-1" />
              <p className="text-2xl font-black text-gray-800">{totalStats.totalBaptisms}</p>
              <p className="text-[9px] font-black text-gray-500 uppercase">Baptisms</p>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-xl p-4 border border-rose-100">
              <Heart size={20} className="text-rose-600 mb-1" />
              <p className="text-2xl font-black text-gray-800">{totalStats.avgHealthScore}%</p>
              <p className="text-[9px] font-black text-gray-500 uppercase">Avg Health</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100">
              <Activity size={20} className="text-amber-600 mb-1" />
              <p className="text-2xl font-black text-gray-800">{totalStats.avgAttendance}%</p>
              <p className="text-[9px] font-black text-gray-500 uppercase">Avg Attendance</p>
            </div>
          </div>

          {/* Groups Performance Table with Delete */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h2 className="font-black text-base flex items-center gap-2">
                <BarChart3 size={16} className="text-[#012169]" />
                Groups Performance Overview
              </h2>
              <Link href="/groups/add" className="text-[10px] font-black text-white bg-[#012169] px-3 py-1.5 rounded-lg hover:bg-[#0a2a80] transition">
                + Add New Group
              </Link>
            </div>
            
            {/* Mobile Card View */}
            <div className="block lg:hidden divide-y divide-gray-100">
              {groups.map((group) => (
                <div key={group.id} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${group.color} flex items-center justify-center text-white text-xs font-black`}>
                        {group.id}
                      </div>
                      <span className="font-black text-sm text-gray-800">{group.name}</span>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/groups/${group.id}/edit`} className="p-1.5 bg-gray-100 rounded-lg">
                        <Edit2 size={12} className="text-gray-600" />
                      </Link>
                      <button onClick={() => { setGroupToDelete(group); setShowDeleteModal(true); }} className="p-1.5 bg-red-50 rounded-lg">
                        <Trash2 size={12} className="text-red-600" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                    <div><span className="font-black text-gray-800">{group.memberCount}</span><br /><span className="text-gray-400">Members</span></div>
                    <div><span className="font-black text-green-600">{group.soulsWon}</span><br /><span className="text-gray-400">Souls</span></div>
                    <div><span className="font-black text-purple-600">{group.baptisms}</span><br /><span className="text-gray-400">Baptisms</span></div>
                    <div><span className="font-black text-blue-600">{group.healthScore}%</span><br /><span className="text-gray-400">Health</span></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b text-[10px] font-black uppercase text-gray-400">
                  <tr>
                    <th className="px-4 py-3">Group</th>
                    <th className="px-4 py-3">Members</th>
                    <th className="px-4 py-3">Health</th>
                    <th className="px-4 py-3">Souls Won</th>
                    <th className="px-4 py-3">Baptisms</th>
                    <th className="px-4 py-3">Attendance</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {groups.map((group) => (
                    <tr key={group.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-7 h-7 rounded-lg bg-gradient-to-r ${group.color} flex items-center justify-center text-white text-[10px] font-black`}>
                            {group.id}
                          </div>
                          <span className="font-black text-sm text-gray-800">{group.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-black text-gray-800">{group.memberCount}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: `${group.healthScore}%` }} />
                          </div>
                          <span className="text-xs font-black text-gray-700">{group.healthScore}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-black text-green-600">{group.soulsWon}</td>
                      <td className="px-4 py-3 font-black text-purple-600">{group.baptisms}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${group.attendanceRate}%` }} />
                          </div>
                          <span className="text-xs font-black text-gray-700">{group.attendanceRate}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <Link href={`/groups/${group.id}/edit`} className="p-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                            <Edit2 size={14} className="text-gray-600" />
                          </Link>
                          <button onClick={() => { setGroupToDelete(group); setShowDeleteModal(true); }} className="p-1.5 bg-red-50 rounded-lg hover:bg-red-100 transition">
                            <Trash2 size={14} className="text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Link href="/groups" className="bg-gradient-to-r from-[#012169] to-[#0a2a80] rounded-xl p-4 text-white hover:shadow-md transition">
              <Church size={20} className="mb-2" />
              <h3 className="font-black text-sm">Manage All Groups</h3>
              <p className="text-[10px] text-white/70 mt-1">View and edit group details</p>
            </Link>
            <Link href="/groups/add" className="bg-gradient-to-r from-[#547189] to-[#3a5a6e] rounded-xl p-4 text-white hover:shadow-md transition">
              <Users size={20} className="mb-2" />
              <h3 className="font-black text-sm">Add New Group</h3>
              <p className="text-[10px] text-white/70 mt-1">Create a new Care Group</p>
            </Link>
            <Link href="/safety" className="bg-gradient-to-r from-[#C8102E] to-[#a00d26] rounded-xl p-4 text-white hover:shadow-md transition">
              <Shield size={20} className="mb-2" />
              <h3 className="font-black text-sm">Safety Compliance</h3>
              <p className="text-[10px] text-white/70 mt-1">Review health & safety checklist</p>
            </Link>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && groupToDelete && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-5">
              <div className="text-center mb-4">
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AlertTriangle size={28} className="text-red-600" />
                </div>
                <h3 className="text-xl font-black text-gray-800">Delete Care Group?</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Are you sure you want to delete <span className="font-bold text-gray-800">{groupToDelete.name}</span>?
                  <br />This action cannot be undone.
                </p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => { setShowDeleteModal(false); setGroupToDelete(null); }} className="flex-1 py-2.5 bg-gray-100 rounded-xl font-black text-sm text-gray-700">
                  Cancel
                </button>
                <button onClick={handleDeleteGroup} className="flex-1 py-2.5 bg-red-600 text-white rounded-xl font-black text-sm">
                  Delete Group
                </button>
              </div>
            </div>
          </div>
        )}
      </DashboardShell>
    </AuthGuard>
  );
}
