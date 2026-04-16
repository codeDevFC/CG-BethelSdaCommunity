"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import DashboardShell from "@/components/DashboardShell";
import Link from "next/link";
import {
  Users, Calendar, Heart, Target, Award, Church,
  MapPin, Clock, BookOpen, Shield, LogOut,
  UserCircle, Power, SwitchCamera
} from "lucide-react";
import { getGroup } from "@/lib/groupService";

export default function GroupHomePage() {
  const params = useParams();
  const router = useRouter();
  const groupId = params?.groupId as string;
  const { data: session, status } = useSession();
  const [group, setGroup] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const userRole = session?.user?.role || "MEMBER";
  const userName = session?.user?.name || "User";
  const userGroupId = session?.user?.groupId;

  const canAccess = userRole === "ADMIN" || userRole === "PASTOR" || userGroupId === groupId;

  useEffect(() => {
    if (groupId && canAccess) {
      const data = getGroup(groupId);
      setGroup(data);
    }
    setLoading(false);
  }, [groupId, canAccess]);

  const handleSignOut = async () => {
    localStorage.clear();
    await signOut({ callbackUrl: '/login' });
  };

  const handleSwitchUser = async () => {
    localStorage.clear();
    await signOut({ callbackUrl: '/login' });
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#547189] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-500">Loading group...</p>
        </div>
      </div>
    );
  }

  if (!canAccess || !group) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center py-20">
          <Shield size={48} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">Access Denied</p>
          <button onClick={handleSignOut} className="mt-4 px-6 py-2 bg-red-600 text-white rounded-xl font-black text-sm">
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <DashboardShell>
      <div className="space-y-8 pb-20">
        {/* Header with User Menu */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-black">{group.name}</h1>
            <div className="flex flex-wrap gap-4 mt-2">
              <p className="flex items-center gap-1 text-sm text-gray-500">
                <MapPin size={14} /> {group.location || 'TBD'}
              </p>
              <p className="flex items-center gap-1 text-sm text-gray-500">
                <Calendar size={14} /> {group.meetingDay}s at {group.meetingTime}
              </p>
            </div>
          </div>
          
          {/* User Menu Button */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50"
            >
              <UserCircle size={20} className="text-gray-500" />
              <span className="text-sm font-black hidden sm:inline">{userName}</span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-gray-100">
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

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <Users className="w-8 h-8 mx-auto mb-3 text-[#547189]" />
            <p className="text-3xl font-black">{group.members?.length || 0}</p>
            <p className="text-xs text-gray-400">Members</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <Heart className="w-8 h-8 mx-auto mb-3 text-green-600" />
            <p className="text-3xl font-black">{group.healthScore || 70}</p>
            <p className="text-xs text-gray-400">Health Score</p>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Link href={`/group/${groupId}/live-session`} className="bg-white rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition">
            <Calendar className="w-8 h-8 mx-auto mb-2 text-red-600" />
            <p className="font-black">Live Session</p>
          </Link>
          <Link href={`/group/${groupId}/prayer-book`} className="bg-white rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition">
            <Heart className="w-8 h-8 mx-auto mb-2 text-rose-600" />
            <p className="font-black">Prayer Book</p>
          </Link>
          <Link href={`/group/${groupId}/study-hub`} className="bg-white rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition">
            <BookOpen className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <p className="font-black">Study Hub</p>
          </Link>
          <Link href={`/group/${groupId}/team`} className="bg-white rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition">
            <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <p className="font-black">Core Team</p>
          </Link>
        </div>
      </div>
    </DashboardShell>
  );
}
