"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Church, Users, Heart, Target, MapPin, Calendar, 
  ChevronRight, LogOut, UserCircle, Power, SwitchCamera,
  Shield, TrendingUp, Award, Activity, Menu, X,
  Trash2, Edit2, AlertTriangle
} from "lucide-react";
import { loadGroups, saveGroups } from "@/lib/groupService";
import toast from "react-hot-toast";

const GROUPS = [
  { id: "1", name: "01 - Bethel Care Group", meetingDay: "Sunday", meetingTime: "14:00", location: "Willenhall", memberCount: 12, healthScore: 92, soulsWon: 8, baptisms: 3, attendanceRate: 85, color: "from-blue-600 to-indigo-600", bgLight: "bg-blue-50", textColor: "text-blue-700", borderColor: "border-blue-200" },
  { id: "2", name: "02 - Faith Community", meetingDay: "Wednesday", meetingTime: "18:30", location: "Dudley", memberCount: 10, healthScore: 85, soulsWon: 5, baptisms: 2, attendanceRate: 78, color: "from-green-600 to-emerald-600", bgLight: "bg-green-50", textColor: "text-green-700", borderColor: "border-green-200" },
  { id: "3", name: "03 - Hope Fellowship", meetingDay: "Tuesday", meetingTime: "19:00", location: "Birmingham", memberCount: 15, healthScore: 78, soulsWon: 12, baptisms: 4, attendanceRate: 82, color: "from-purple-600 to-pink-600", bgLight: "bg-purple-50", textColor: "text-purple-700", borderColor: "border-purple-200" },
  { id: "4", name: "04 - Grace Circle", meetingDay: "Thursday", meetingTime: "19:30", location: "Wolverhampton", memberCount: 8, healthScore: 70, soulsWon: 3, baptisms: 1, attendanceRate: 65, color: "from-amber-600 to-orange-600", bgLight: "bg-amber-50", textColor: "text-amber-700", borderColor: "border-amber-200" },
  { id: "5", name: "05 - Love Alliance", meetingDay: "Monday", meetingTime: "18:00", location: "Walsall", memberCount: 11, healthScore: 88, soulsWon: 6, baptisms: 2, attendanceRate: 80, color: "from-red-600 to-rose-600", bgLight: "bg-red-50", textColor: "text-red-700", borderColor: "border-red-200" },
  { id: "6", name: "06 - Joy Gathering", meetingDay: "Saturday", meetingTime: "10:00", location: "Coventry", memberCount: 9, healthScore: 75, soulsWon: 4, baptisms: 1, attendanceRate: 70, color: "from-teal-600 to-cyan-600", bgLight: "bg-teal-50", textColor: "text-teal-700", borderColor: "border-teal-200" },
  { id: "7", name: "07 - Peace Circle", meetingDay: "Tuesday", meetingTime: "19:30", location: "Sandwell", memberCount: 13, healthScore: 82, soulsWon: 7, baptisms: 2, attendanceRate: 76, color: "from-indigo-600 to-blue-600", bgLight: "bg-indigo-50", textColor: "text-indigo-700", borderColor: "border-indigo-200" },
];

export default function GroupsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<any>(null);
  const [groups, setGroups] = useState(GROUPS);

  const userRole = session?.user?.role || "MEMBER";
  const userName = session?.user?.name || "User";
  const isAdmin = userRole === "ADMIN" || userRole === "PASTOR";

  useEffect(() => {
    if (status === "loading") return;
    if (!session) router.push("/login");
  }, [session, status, router]);

  const handleDeleteGroup = () => {
    if (!groupToDelete) return;
    
    const updatedGroups = groups.filter(g => g.id !== groupToDelete.id);
    setGroups(updatedGroups);
    
    // Remove from localStorage persistence
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
          <p className="text-gray-600">Loading groups...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  const totalMembers = groups.reduce((sum, g) => sum + g.memberCount, 0);
  const totalSoulsWon = groups.reduce((sum, g) => sum + g.soulsWon, 0);
  const totalBaptisms = groups.reduce((sum, g) => sum + g.baptisms, 0);
  const avgHealthScore = Math.round(groups.reduce((sum, g) => sum + g.healthScore, 0) / groups.length);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-20 px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <span className="font-black text-xl text-[#012169]">Bethel SDA</span>
        </Link>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center gap-1">
            <UserCircle size={22} className="text-gray-600" />
          </button>
          <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="p-1">
            {showMobileMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile User Menu */}
      {showUserMenu && (
        <div className="lg:hidden fixed top-14 right-4 z-30 w-48 bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-2">
            <p className="px-3 py-2 text-sm font-black text-gray-700 border-b border-gray-100">{userName}</p>
            <button onClick={handleSwitchUser} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
              <SwitchCamera size={16} /> Switch User
            </button>
            <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
              <Power size={16} /> Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield size={16} className="text-[#012169]" />
              <span className="text-[10px] font-black text-[#012169] uppercase tracking-wider">Leadership Dashboard</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-gray-800">Care Groups</h1>
            <p className="text-gray-500 text-sm">Manage and monitor all Bethel Care Groups</p>
          </div>

          {/* Desktop User Menu */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center gap-3 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-200">
                <UserCircle size={18} className="text-gray-600" />
                <span className="font-black text-sm">{userName}</span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">{userRole}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <Users size={18} className="text-blue-600 mb-1" />
            <p className="text-2xl font-black text-gray-800">{totalMembers}</p>
            <p className="text-[9px] font-black text-gray-400 uppercase">Members</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <Target size={18} className="text-green-600 mb-1" />
            <p className="text-2xl font-black text-gray-800">{totalSoulsWon}</p>
            <p className="text-[9px] font-black text-gray-400 uppercase">Souls Won</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <Award size={18} className="text-purple-600 mb-1" />
            <p className="text-2xl font-black text-gray-800">{totalBaptisms}</p>
            <p className="text-[9px] font-black text-gray-400 uppercase">Baptisms</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <Heart size={18} className="text-rose-600 mb-1" />
            <p className="text-2xl font-black text-gray-800">{avgHealthScore}%</p>
            <p className="text-[9px] font-black text-gray-400 uppercase">Health</p>
          </div>
        </div>

        {/* Groups Grid with Delete for Admins */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-black text-gray-800 flex items-center gap-2">
              <Church size={18} className="text-[#012169]" />
              All Care Groups
              <span className="text-[9px] font-black text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{groups.length} Groups</span>
            </h2>
            {isAdmin && (
              <Link href="/groups/add" className="text-[10px] font-black text-white bg-[#012169] px-3 py-1.5 rounded-lg hover:bg-[#0a2a80] transition">
                + Add Group
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups.map((group) => (
              <div key={group.id} className={`bg-white rounded-xl border ${group.borderColor} shadow-sm hover:shadow-md transition-all overflow-hidden group-card`}>
                <div className={`h-1.5 bg-gradient-to-r ${group.color}`} />
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${group.color} flex items-center justify-center text-white font-black text-base shadow-sm`}>
                      {group.id}
                    </div>
                    <div className="flex items-center gap-1 bg-green-100 px-1.5 py-0.5 rounded-full">
                      <Heart size={10} className="text-green-600" />
                      <span className="text-[10px] font-bold text-green-700">{group.healthScore}%</span>
                    </div>
                  </div>

                  <h3 className="font-black text-base text-gray-800 mb-1">{group.name}</h3>
                  <p className="text-[10px] text-gray-500 mb-3">{group.location}</p>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><Calendar size={10} /> {group.meetingDay}s</span>
                    <span className="flex items-center gap-1"><Users size={10} /> {group.memberCount}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[8px] font-black text-gray-600">L</div>
                      <span className="text-[9px] text-gray-500">Leader</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {isAdmin && (
                        <button onClick={() => { setGroupToDelete(group); setShowDeleteModal(true); }} className="p-1.5 bg-red-50 rounded-lg">
                          <Trash2 size={12} className="text-red-600" />
                        </button>
                      )}
                      <Link href={`/group/${group.id}`}>
                        <ChevronRight size={14} className="text-gray-400 hover:text-[#012169] transition" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {showMobileMenu && (
        <div className="lg:hidden fixed inset-0 z-25 bg-white/95 backdrop-blur-sm pt-16 px-4">
          <div className="space-y-2">
            <Link href="/groups" className="block py-3 px-4 bg-gray-100 rounded-xl font-black text-gray-800">Groups</Link>
            <Link href="/pastor-dashboard" className="block py-3 px-4 rounded-xl font-black text-gray-600">Dashboard</Link>
            <button onClick={handleSignOut} className="w-full text-left py-3 px-4 rounded-xl font-black text-red-600">Sign Out</button>
          </div>
        </div>
      )}

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
    </div>
  );
}
