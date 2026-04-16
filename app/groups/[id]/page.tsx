"use client";
import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import DashboardShell from "@/components/DashboardShell";
import AuthGuard from "@/components/AuthGuard";
import Link from "next/link";
import { 
  ArrowLeft, Edit, Trash2, Users, Heart, Target, 
  MapPin, Calendar, Clock, Award, Church, Crown,
  BookOpen
} from "lucide-react";
import { getGroup, loadGroups, saveGroups } from "@/lib/groupService";
import toast from "react-hot-toast";

export default function GroupDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const groupId = resolvedParams.id;
  const router = useRouter();
  const { hasPermission } = useAuth();
  const [group, setGroup] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const isAdmin = hasPermission(['admin']);

  useEffect(() => {
    const data = getGroup(groupId);
    if (data) {
      setGroup(data);
    }
    setLoading(false);
  }, [groupId]);

  const handleDeleteGroup = () => {
    if (!isAdmin) {
      toast.error("Only administrators can delete groups");
      return;
    }
    
    const allGroups = loadGroups();
    if (allGroups[groupId]) {
      delete allGroups[groupId];
      saveGroups(allGroups);
      toast.success(`Group "${group?.name}" has been deleted`);
      router.push('/groups');
    }
  };

  if (loading) {
    return (
      <AuthGuard>
        <DashboardShell>
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-[#C8102E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading group details...</p>
          </div>
        </DashboardShell>
      </AuthGuard>
    );
  }

  if (!group) {
    return (
      <AuthGuard>
        <DashboardShell>
          <div className="text-center py-20">
            <Church size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 font-black">Group Not Found</p>
            <Link href="/groups" className="inline-block mt-4 text-[#012169] text-sm font-black underline">
              Back to Groups
            </Link>
          </div>
        </DashboardShell>
      </AuthGuard>
    );
  }

  const stats = [
    { label: "Total Members", value: group.members?.length || 0, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Health Score", value: `${group.healthScore}%`, icon: Heart, color: "text-green-600", bg: "bg-green-50" },
    { label: "Souls Won", value: group.missionStats?.soulWinning || 0, icon: Target, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Baptisms", value: group.missionStats?.baptisms || 0, icon: Award, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <AuthGuard>
      <DashboardShell>
        <div className="max-w-5xl mx-auto space-y-6 pb-20">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Link href="/groups" className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition">
                <ArrowLeft size={20} />
              </Link>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Church size={16} className="text-[#012169]" />
                  <span className="text-[10px] font-black text-[#012169] uppercase tracking-wider">Care Group Details</span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-black tracking-tighter" style={{ fontFamily: 'Georgia, serif' }}>
                  {group.name}
                </h1>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin size={12} /> {group.location || 'Location TBD'}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar size={12} /> {group.meetingDay}s at {group.meetingTime}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {isAdmin && (
                <>
                  <Link
                    href={`/groups/${groupId}/edit`}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl text-xs font-black hover:bg-gray-200 transition"
                  >
                    <Edit size={14} /> Edit
                  </Link>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-black hover:bg-red-100 transition"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </>
              )}
              <Link
                href={`/group/${groupId}`}
                className="flex items-center gap-2 px-4 py-2 bg-[#012169] text-white rounded-xl text-xs font-black hover:bg-[#0a2a80] transition"
              >
                Go to Portal <ArrowLeft size={14} className="rotate-180" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className={`${stat.bg} rounded-2xl p-4 text-center`}>
                <stat.icon size={20} className={`mx-auto mb-2 ${stat.color}`} />
                <p className="text-2xl font-black">{stat.value}</p>
                <p className="text-[9px] font-black text-gray-500 uppercase">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-xl font-black mb-4 flex items-center gap-2">
              <Crown size={18} className="text-yellow-600" />
              Leadership Team
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-[#012169] rounded-full flex items-center justify-center text-white font-black">
                  {group.leader?.charAt(0) || 'L'}
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase">Group Leader</p>
                  <p className="font-black">{group.leader || 'Not Assigned'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white font-black">
                  {group.coLeader?.charAt(0) || 'C'}
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase">Co-Leader</p>
                  <p className="font-black">{group.coLeader || 'Not Assigned'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#012169] to-[#0a2a80] rounded-2xl p-6 text-white">
            <h3 className="text-xl font-black mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Link href={`/group/${groupId}/live-session`} className="text-center p-3 bg-white/10 rounded-xl hover:bg-white/20 transition">
                <Calendar size={20} className="mx-auto mb-1" />
                <p className="text-[9px] font-black">Live Session</p>
              </Link>
              <Link href={`/group/${groupId}/prayer-book`} className="text-center p-3 bg-white/10 rounded-xl hover:bg-white/20 transition">
                <Heart size={20} className="mx-auto mb-1" />
                <p className="text-[9px] font-black">Prayer Book</p>
              </Link>
              <Link href={`/group/${groupId}/study-hub`} className="text-center p-3 bg-white/10 rounded-xl hover:bg-white/20 transition">
                <BookOpen size={20} className="mx-auto mb-1" />
                <p className="text-[9px] font-black">Study Hub</p>
              </Link>
              <Link href={`/group/${groupId}/team`} className="text-center p-3 bg-white/10 rounded-xl hover:bg-white/20 transition">
                <Users size={20} className="mx-auto mb-1" />
                <p className="text-[9px] font-black">Core Team</p>
              </Link>
            </div>
          </div>
        </div>

        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 size={32} className="text-red-600" />
                </div>
                <h3 className="text-2xl font-black">Delete Care Group</h3>
                <p className="text-gray-500 text-sm mt-2">
                  Are you sure you want to delete "{group.name}"? This action cannot be undone.
                </p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 py-3 bg-gray-100 rounded-xl font-black text-sm">
                  Cancel
                </button>
                <button onClick={handleDeleteGroup} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-black text-sm">
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
