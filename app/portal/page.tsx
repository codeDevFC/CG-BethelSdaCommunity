"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Church, Users, Heart, Target, Calendar, BookOpen,
  ArrowRight, Shield, Crown, Star, Award, TrendingUp,
  MapPin, Clock, ChevronRight, Sparkles
} from "lucide-react";
import Logo from "@/components/Logo";
import { getAllGroupsSummary } from "@/lib/groupService";

interface GroupCard {
  id: string;
  name: string;
  meetingDay: string;
  meetingTime: string;
  location: string;
  leader: string;
  memberCount: number;
  healthScore: number;
  soulWinning: number;
  seekers: number;
  color: string;
}

export default function PortalPage() {
  const { user, hasPermission } = useAuth();
  const router = useRouter();
  const [groups, setGroups] = useState<GroupCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const isAdmin = hasPermission(['admin', 'pastor']);

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = () => {
    const summary = getAllGroupsSummary();
    const groupCards: GroupCard[] = summary.map((g, idx) => ({
      id: g.id,
      name: g.name,
      meetingDay: g.meetingDay,
      meetingTime: g.meetingTime || "19:00",
      location: g.location || `Bethel ${g.name.split('-')[1] || 'Central'}`,
      leader: g.leader || `Leader ${g.id}`,
      memberCount: g.memberCount,
      healthScore: g.healthScore,
      soulWinning: g.soulWinning,
      seekers: g.seekers || 0,
      color: getGroupColor(parseInt(g.id))
    }));
    setGroups(groupCards);
    setLoading(false);
  };

  const getGroupColor = (id: number) => {
    const colors = [
      "from-blue-600 to-cyan-600",
      "from-purple-600 to-indigo-600",
      "from-rose-600 to-pink-600",
      "from-emerald-600 to-green-600",
      "from-amber-600 to-orange-600",
      "from-red-600 to-rose-600",
      "from-teal-600 to-cyan-600",
      "from-indigo-600 to-blue-600",
      "from-pink-600 to-rose-600",
      "from-green-600 to-emerald-600"
    ];
    return colors[(id - 1) % colors.length];
  };

  const filteredGroups = groups.filter(g =>
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // If user has a specific group and not admin, redirect to their group
  if (!isAdmin && user?.groupId && user?.groupId !== 'all') {
    router.push(`/group/${user.groupId}`);
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#547189] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading your Care Groups...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header with Glass Effect */}
      <div className="bg-gradient-to-r from-[#547189]/90 to-[#3a5a6e]/90 backdrop-blur-md text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Logo className="h-14 w-auto" />
            <div className="text-right">
              <p className="text-[10px] font-black text-white/70 uppercase">Welcome back,</p>
              <p className="font-black text-lg">{user?.name}</p>
              <p className="text-[8px] text-white/50 uppercase">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-4">
            <Church size={14} className="text-[#547189]" />
            <span className="font-black text-[10px] uppercase tracking-widest text-[#547189]">Select Your Care Group</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-4 gradient-text" style={{ fontFamily: 'Georgia, serif' }}>
            Choose Your Community
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Select your Care Group to access live sessions, prayer books, study materials, and connect with your community.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Care Group by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-5 pr-4 py-3 glass-card border focus:border-[#547189] outline-none text-sm"
            />
          </div>
        </div>

        {/* Groups Grid - All 10 Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group, idx) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group glass-card hover:bg-white/70 transition-all overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${group.color} p-4 text-white rounded-t-2xl`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-black opacity-80 uppercase">Care Group</p>
                    <h3 className="text-xl font-black">{group.name}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black">{group.healthScore}%</p>
                    <p className="text-[8px] opacity-80">Health Score</p>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <MapPin size={12} className="text-[#547189]" />
                    <span className="truncate">{group.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock size={12} className="text-[#547189]" />
                    <span>{group.meetingDay}s at {group.meetingTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Users size={12} className="text-[#547189]" />
                    <span>{group.memberCount} members</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Heart size={12} className="text-[#547189]" />
                    <span>{group.seekers} seekers</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Link
                    href={`/group/${group.id}`}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#547189] text-white font-black text-[10px] uppercase hover:bg-[#3a5a6e] transition"
                  >
                    Enter Group <ChevronRight size={12} />
                  </Link>
                  {isAdmin && (
                    <Link
                      href={`/groups/${group.id}`}
                      className="p-2.5 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                    >
                      <Shield size={14} />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Footer */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="glass-card p-4">
              <p className="text-2xl font-black text-[#547189]">{groups.length}</p>
              <p className="text-[10px] text-gray-400 uppercase">Care Groups</p>
            </div>
            <div className="glass-card p-4">
              <p className="text-2xl font-black text-[#547189]">{groups.reduce((acc, g) => acc + g.memberCount, 0)}</p>
              <p className="text-[10px] text-gray-400 uppercase">Total Members</p>
            </div>
            <div className="glass-card p-4">
              <p className="text-2xl font-black text-[#547189]">{groups.reduce((acc, g) => acc + g.soulWinning, 0)}</p>
              <p className="text-[10px] text-gray-400 uppercase">Souls Won</p>
            </div>
            <div className="glass-card p-4">
              <p className="text-2xl font-black text-[#547189]">{Math.round(groups.reduce((acc, g) => acc + g.healthScore, 0) / groups.length)}%</p>
              <p className="text-[10px] text-gray-400 uppercase">Avg Health</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
