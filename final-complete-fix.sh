#!/bin/bash

echo "🔧 FINAL COMPLETE FIX - ALL ISSUES"
echo "=================================="
echo ""

# 1. Fix lib/constants.ts with correct data
cat > lib/constants.ts << 'CONSTANTS'
export const FALLBACK_GROUPS = [
  { id: "1", name: "Bethel CareGroup-01", meetingDay: "Sunday", meetingTime: "14:00", location: "Willenhall", memberCount: 12, healthScore: 92 },
  { id: "2", name: "Bethel CareGroup-02", meetingDay: "Wednesday", meetingTime: "18:30", location: "Dudley", memberCount: 10, healthScore: 85 },
  { id: "3", name: "Bethel CareGroup-03", meetingDay: "Tuesday", meetingTime: "19:00", location: "Birmingham", memberCount: 15, healthScore: 78 },
  { id: "4", name: "Bethel CareGroup-04", meetingDay: "Thursday", meetingTime: "19:30", location: "Wolverhampton", memberCount: 8, healthScore: 70 },
  { id: "5", name: "Bethel CareGroup-05", meetingDay: "Monday", meetingTime: "18:00", location: "Walsall", memberCount: 11, healthScore: 88 },
  { id: "6", name: "Bethel CareGroup-06", meetingDay: "Saturday", meetingTime: "10:00", location: "Coventry", memberCount: 9, healthScore: 75 },
  { id: "7", name: "Bethel CareGroup-07", meetingDay: "Tuesday", meetingTime: "19:30", location: "Sandwell", memberCount: 13, healthScore: 82 },
  { id: "8", name: "Bethel CareGroup-08", meetingDay: "Thursday", meetingTime: "18:00", location: "West Bromwich", memberCount: 7, healthScore: 68 },
  { id: "9", name: "Bethel CareGroup-09", meetingDay: "Sunday", meetingTime: "15:00", location: "Stourbridge", memberCount: 10, healthScore: 80 },
  { id: "10", name: "Bethel CareGroup-10", meetingDay: "Wednesday", meetingTime: "19:00", location: "Halesowen", memberCount: 14, healthScore: 90 },
];

export const FALLBACK_USERS = [
  { id: "1", username: "admin", email: "admin@bethelwillenhall.org.uk", name: "System Administrator", role: "ADMIN", groupId: "all", password: "admin@Bwcg777", isActive: true },
  { id: "2", username: "PastorDan", email: "dan.majaducon@bethelwillenhall.org.uk", name: "Pastor Dan Majaducon", role: "PASTOR", groupId: "all", password: "PastorDan@BWcg777", isActive: true },
  { id: "3", username: "PastorTM", email: "thando.mlalazi@bethelwillenhall.org.uk", name: "Pastor Thando Mlalazi", role: "PASTOR", groupId: "all", password: "PastorTM@BWcg777", isActive: true },
  { id: "4", username: "CG-coord-01", email: "coordinator1@bethelwillenhall.org.uk", name: "Coordinator CG-01", role: "COORDINATOR", groupId: "1", password: "CG-coord-01@BWcg04", isActive: true },
  { id: "5", username: "CG-coord-02", email: "coordinator2@bethelwillenhall.org.uk", name: "Coordinator CG-02", role: "COORDINATOR", groupId: "2", password: "CG-coord-02@BWcg04", isActive: true },
  { id: "6", username: "CG-coord-03", email: "coordinator3@bethelwillenhall.org.uk", name: "Coordinator CG-03", role: "COORDINATOR", groupId: "3", password: "CG-coord-03@BWcg04", isActive: true },
  { id: "7", username: "Member01", email: "member1@bethelwillenhall.org.uk", name: "Member One", role: "MEMBER", groupId: "1", password: "Member01@member", isActive: true },
  { id: "8", username: "Member02", email: "member2@bethelwillenhall.org.uk", name: "Member Two", role: "MEMBER", groupId: "2", password: "Member02@member", isActive: true },
];
CONSTANTS

echo "✅ lib/constants.ts updated"

# 2. Fix NextAuth route
cat > app/api/auth/\[...nextauth\]/route.ts << 'NEXTAUTH'
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { FALLBACK_USERS } from "@/lib/constants";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: { username: { label: "Username" }, password: { label: "Password" } },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = FALLBACK_USERS.find(
          u => u.username.toLowerCase() === credentials.username.toLowerCase()
        );

        if (!user || !user.isActive) {
          throw new Error("User not found");
        }

        if (credentials.password !== user.password) {
          throw new Error("Invalid password");
        }

        return { 
          id: user.id, 
          name: user.name, 
          email: user.email, 
          role: user.role, 
          groupId: user.groupId, 
          username: user.username 
        };
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 8 * 60 * 60 },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) { 
        token.role = user.role; 
        token.groupId = user.groupId; 
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) { 
        session.user.role = token.role; 
        session.user.groupId = token.groupId; 
        session.user.id = token.id;
        session.user.username = token.username;
      }
      return session;
    },
  },
  pages: { signIn: "/login", error: "/login" },
  secret: process.env.NEXTAUTH_SECRET || "bethel-secret-key-2026",
  trustHost: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
NEXTAUTH

echo "✅ NextAuth route updated"

# 3. Fix the Group Home page to show Sign Out button
cat > app/group/\[groupId\]/page.tsx << 'GROUPPAGE'
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
GROUPPAGE

echo "✅ Group home page updated with Sign Out button"

# 4. Fix the portal page redirect for non-admin users
cat > app/portal/page.tsx << 'PORTAL'
"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FALLBACK_GROUPS } from "@/lib/constants";

export default function PortalPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/login");
      return;
    }

    const userRole = session.user?.role;
    const userGroupId = session.user?.groupId;

    // Redirect to appropriate page based on role
    if (userRole === "ADMIN" || userRole === "PASTOR") {
      router.push("/groups");
    } else if (userGroupId && userGroupId !== "all") {
      router.push(`/group/${userGroupId}`);
    } else {
      // If member has no group, show group selection
      router.push("/login");
    }
  }, [session, status, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#012169] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}
PORTAL

echo "✅ Portal page updated"

# 5. Clear cache
rm -rf .next

echo ""
echo "=========================================="
echo "✅ COMPLETE FIX DONE!"
echo "=========================================="
echo ""
echo "🚀 Run: npm run dev"
echo "📱 Use Incognito/Private window"
echo ""
echo "📋 TEST CREDENTIALS:"
echo "   ┌─────────────┬──────────────┬─────────────────────────┐"
echo "   │ Role        │ Username     │ Password                │"
echo "   ├─────────────┼──────────────┼─────────────────────────┤"
echo "   │ Admin       │ admin        │ admin@Bwcg777           │"
echo "   │ Pastor      │ PastorDan    │ PastorDan@BWcg777       │"
echo "   │ Coordinator │ CG-coord-01  │ CG-coord-01@BWcg04      │"
echo "   │ Member      │ Member01     │ Member01@member         │"
echo "   └─────────────┴──────────────┴─────────────────────────┘"
echo ""
echo "📍 After login:"
echo "   - Admins/Pastors → Go to /groups page"
echo "   - Coordinators/Members → Go to /group/1 page"
echo ""
echo "🔘 Sign Out button is in the TOP RIGHT corner of the group page"
echo "=========================================="

