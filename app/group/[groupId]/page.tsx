"use client";

import { use, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import DashboardShell from "@/components/DashboardShell";
import Link from "next/link";
import {
  Users, Calendar, Heart, Target, Award, Church,
  MapPin, Clock, UserCheck, BookOpen, Shield,
  Image, Bell, ChevronRight, Activity
} from "lucide-react";
import { getGroup } from "@/lib/groupService";

export default function GroupHomePage({ params }: { params: Promise<{ groupId: string }> }) {
  const resolvedParams = use(params);
  const groupId = resolvedParams.groupId;
  const { data: session, status } = useSession();
  const [group, setGroup] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const userRole = session?.user?.role;
  const userGroupId = session?.user?.groupId;
  const canAccess = userRole === 'ADMIN' || userRole === 'PASTOR' || userGroupId === groupId;

  useEffect(() => {
    if (groupId && canAccess) {
      const data = getGroup(groupId);
      setGroup(data);
    }
    setLoading(false);
  }, [groupId, canAccess]);

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
        </div>
      </div>
    );
  }

  return (
    <DashboardShell>
      <div className="space-y-8 pb-20">
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <Users className="w-8 h-8 mx-auto mb-3 text-[#547189]" />
            <p className="text-3xl font-black">{group.members?.length || 0}</p>
            <p className="text-xs text-gray-400">Members</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <Heart className="w-8 h-8 mx-auto mb-3 text-green-600" />
            <p className="text-3xl font-black">{group.healthScore}%</p>
            <p className="text-xs text-gray-400">Health Score</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Link href={`/group/${groupId}/live-session`} className="bg-white rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition">
            <Bell className="w-8 h-8 mx-auto mb-2 text-red-600" />
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
