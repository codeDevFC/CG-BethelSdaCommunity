"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Church, Users, Heart, Target, MapPin, Calendar, 
  ChevronRight, LogOut, UserCircle, Power, SwitchCamera,
  Shield, Award, Star
} from "lucide-react";
import { FALLBACK_GROUPS } from "@/lib/constants";

export default function GroupsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [groups, setGroups] = useState(FALLBACK_GROUPS);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [loading, setLoading] = useState(true);

  const userRole = session?.user?.role || "MEMBER";
  const userName = session?.user?.name || "User";

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/login");
      return;
    }

    // Only Admin and Pastor can see all groups
    if (userRole !== "ADMIN" && userRole !== "PASTOR") {
      // Redirect to their specific group
      const userGroupId = session?.user?.groupId;
      if (userGroupId && userGroupId !== "all") {
        router.push(`/group/${userGroupId}`);
      } else {
        router.push("/login");
      }
      return;
    }

    setLoading(false);
  }, [session, status, router, userRole]);

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
          <div className="w-12 h-12 border-4 border-[#012169] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading groups...</p>
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
            <h1 className="text-2xl font-black text-[#012169]">Care Groups Overview</h1>
            <p className="text-xs text-gray-500">Manage all Bethel Care Groups</p>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
            >
              <UserCircle size={20} className="text-gray-600" />
              <span className="text-sm font-black hidden sm:inline">{userName}</span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <Link
              key={group.id}
              href={`/group/${group.id}`}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all overflow-hidden group-card"
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#012169] to-[#0a2a80] flex items-center justify-center text-white font-black text-lg">
                    {group.id}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart size={14} className="text-green-500" />
                    <span className="text-sm font-black text-green-600">{group.healthScore}%</span>
                  </div>
                </div>
                
                <h2 className="text-xl font-black text-gray-900 mb-2">{group.name}</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar size={14} />
                    <span>{group.meetingDay}s at {group.meetingTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={14} />
                    <span>{group.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users size={14} />
                    <span>{group.memberCount} members</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-400">Care Group</span>
                  <ChevronRight size={18} className="text-[#547189] group-hover:translate-x-1 transition" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
