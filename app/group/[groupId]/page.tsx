"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  Users, Calendar, Heart, Target, Award, Church,
  MapPin, Clock, BookOpen, Shield, LogOut,
  UserCircle, Power, SwitchCamera, Home, Image,
  Library, BarChart3
} from "lucide-react";

export default function GroupHomePage() {
  const params = useParams();
  const router = useRouter();
  const groupId = params?.groupId as string;
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [group, setGroup] = useState<any>(null);

  const userRole = session?.user?.role || "MEMBER";
  const userName = session?.user?.name || "User";
  const userGroupId = session?.user?.groupId;

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/login");
      return;
    }

    // Check access
    const canAccess = userRole === "ADMIN" || userRole === "PASTOR" || userGroupId === groupId;
    
    if (!canAccess) {
      router.push("/groups");
      return;
    }

    // Load group data
    const loadGroup = async () => {
      try {
        const { getGroup } = await import("@/lib/groupService");
        const data = getGroup(groupId);
        setGroup(data || { id: groupId, name: `Care Group ${groupId}`, members: [], healthScore: 70 });
      } catch (e) {
        setGroup({ id: groupId, name: `Care Group ${groupId}`, members: [], healthScore: 70 });
      }
      setLoading(false);
    };
    
    loadGroup();
  }, [session, status, router, groupId, userRole, userGroupId]);

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

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#547189] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-500">Loading group...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with User Menu */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-[#012169]">{group?.name || `Group ${groupId}`}</h1>
            <p className="text-xs text-gray-500">Your Care Group Dashboard</p>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
            >
              <UserCircle size={20} className="text-gray-600" />
              <span className="text-sm font-black hidden sm:inline">{userName}</span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                {userRole}
              </span>
            </button>
            
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
                <div className="p-2">
                  <button
                    onClick={handleSwitchUser}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    <SwitchCamera size={16} />
                    <span>Switch User</span>
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Power size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
            <Users className="w-8 h-8 mx-auto mb-3 text-[#547189]" />
            <p className="text-3xl font-black">{group?.members?.length || 0}</p>
            <p className="text-xs text-gray-400">Members</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
            <Heart className="w-8 h-8 mx-auto mb-3 text-green-600" />
            <p className="text-3xl font-black">{group?.healthScore || 70}%</p>
            <p className="text-xs text-gray-400">Health Score</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
            <Target className="w-8 h-8 mx-auto mb-3 text-amber-600" />
            <p className="text-3xl font-black">{group?.missionStats?.soulWinning || 0}</p>
            <p className="text-xs text-gray-400">Souls Won</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
            <Award className="w-8 h-8 mx-auto mb-3 text-purple-600" />
            <p className="text-3xl font-black">{group?.missionStats?.baptisms || 0}</p>
            <p className="text-xs text-gray-400">Baptisms</p>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Link href={`/group/${groupId}/live-session`} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100 hover:shadow-md hover:border-[#547189] transition-all">
            <Calendar className="w-8 h-8 mx-auto mb-2 text-red-600" />
            <p className="font-black text-sm">Live Session</p>
          </Link>
          <Link href={`/group/${groupId}/attendance`} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100 hover:shadow-md hover:border-[#547189] transition-all">
            <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <p className="font-black text-sm">Attendance</p>
          </Link>
          <Link href={`/group/${groupId}/calendar`} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100 hover:shadow-md hover:border-[#547189] transition-all">
            <Calendar className="w-8 h-8 mx-auto mb-2 text-indigo-600" />
            <p className="font-black text-sm">Calendar</p>
          </Link>
          <Link href={`/group/${groupId}/prayer-book`} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100 hover:shadow-md hover:border-[#547189] transition-all">
            <Heart className="w-8 h-8 mx-auto mb-2 text-rose-600" />
            <p className="font-black text-sm">Prayer Book</p>
          </Link>
          <Link href={`/group/${groupId}/study-hub`} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100 hover:shadow-md hover:border-[#547189] transition-all">
            <BookOpen className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <p className="font-black text-sm">Study Hub</p>
          </Link>
          <Link href={`/group/${groupId}/gallery`} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100 hover:shadow-md hover:border-[#547189] transition-all">
            <Image className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <p className="font-black text-sm">Gallery</p>
          </Link>
          <Link href={`/group/${groupId}/team`} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100 hover:shadow-md hover:border-[#547189] transition-all">
            <Users className="w-8 h-8 mx-auto mb-2 text-teal-600" />
            <p className="font-black text-sm">Core Team</p>
          </Link>
          <Link href={`/group/${groupId}/resources`} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100 hover:shadow-md hover:border-[#547189] transition-all">
            <Library className="w-8 h-8 mx-auto mb-2 text-amber-600" />
            <p className="font-black text-sm">Resources</p>
          </Link>
        </div>

        {/* Leadership Only Section */}
        {(userRole === "ADMIN" || userRole === "PASTOR" || userRole === "COORDINATOR") && (
          <div className="mt-8">
            <h2 className="text-lg font-black text-gray-800 mb-4">Leadership Tools</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Link href={`/group/${groupId}/leadership-hub`} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 text-center shadow-sm border border-blue-100 hover:shadow-md transition-all">
                <Shield className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <p className="font-black text-sm">Leadership Hub</p>
              </Link>
              <Link href={`/group/${groupId}/mission`} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-5 text-center shadow-sm border border-green-100 hover:shadow-md transition-all">
                <Target className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <p className="font-black text-sm">Mission Journey</p>
              </Link>
              <Link href={`/group/${groupId}/reports`} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-5 text-center shadow-sm border border-purple-100 hover:shadow-md transition-all">
                <BarChart3 className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <p className="font-black text-sm">Reports</p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
