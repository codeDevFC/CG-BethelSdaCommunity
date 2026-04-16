#!/bin/bash

echo "🔧 COMPLETE BETHEL SDA LOGIN FIX"
echo "=================================="
echo ""

# Stop any running dev server
echo "🛑 Stopping any running dev server..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

# Clear all Next.js cache and build files
echo "🗑️ Clearing all caches..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf .vercel

# Clear browser storage data from localStorage (will be done on client side)
echo "✅ Caches cleared"

# Create the fixed NextAuth route
echo "📝 Creating fixed NextAuth route..."
mkdir -p app/api/auth/\[...nextauth\]

cat > app/api/auth/\[...nextauth\]/route.ts << 'NEXTAUTH'
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const USERS = [
  { id: "1", username: "admin", email: "admin@bethelwillenhall.org.uk", name: "System Administrator", role: "ADMIN", groupId: "all", isActive: true },
  { id: "2", username: "PastorDan", email: "dan.majaducon@bethelwillenhall.org.uk", name: "Pastor Dan Majaducon", role: "PASTOR", groupId: "all", isActive: true },
  { id: "3", username: "PastorTM", email: "thando.mlalazi@bethelwillenhall.org.uk", name: "Pastor Thando Mlalazi", role: "PASTOR", groupId: "all", isActive: true },
  { id: "4", username: "CG-coord-01", email: "coordinator1@bethelwillenhall.org.uk", name: "Coordinator CG-01", role: "COORDINATOR", groupId: "1", isActive: true },
  { id: "5", username: "Member@BWcg", email: "member@bethelwillenhall.org.uk", name: "Care Group Member", role: "MEMBER", groupId: "1", isActive: true },
];

const getPassword = (username: string, role: string): string => {
  const month = String(new Date().getMonth() + 1).padStart(2, '0');
  if (role === 'ADMIN') return 'admin@Bwcg777';
  if (role === 'PASTOR') return `${username}@BWcg777`;
  if (role === 'COORDINATOR') return `${username}@BWcg${month}`;
  return `${username}@member`;
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Please enter username and password");
        }

        const user = USERS.find(u => u.username.toLowerCase() === credentials.username.toLowerCase());
        
        if (!user) {
          throw new Error("User not found");
        }

        const expectedPassword = getPassword(user.username, user.role);
        
        if (credentials.password !== expectedPassword) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          groupId: user.groupId,
          username: user.username,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.groupId = user.groupId;
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.groupId = token.groupId;
        session.user.id = token.id;
        session.user.username = token.username;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "bethel-secret-2026",
  trustHost: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
NEXTAUTH

echo "✅ NextAuth route created"

# Create the fixed login page with clear session on load
echo "📝 Creating fixed login page..."

cat > app/login/page.tsx << 'LOGINPAGE'
"use client";

import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, User, ChevronRight, ChevronLeft, Eye, EyeOff, Church, Users, Calendar, MapPin, Heart, Shield, AlertCircle, LogIn, Key } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";

const GROUPS = [
  { id: "1", name: "Bethel CareGroup-01", meetingDay: "Sunday", meetingTime: "14:00", location: "Willenhall", memberCount: 12, healthScore: 92 },
  { id: "2", name: "Bethel CareGroup-02", meetingDay: "Wednesday", meetingTime: "18:30", location: "Dudley", memberCount: 10, healthScore: 85 },
  { id: "3", name: "Bethel CareGroup-03", meetingDay: "Tuesday", meetingTime: "19:00", location: "Birmingham", memberCount: 15, healthScore: 78 },
  { id: "4", name: "Bethel CareGroup-04", meetingDay: "Thursday", meetingTime: "19:30", location: "Wolverhampton", memberCount: 8, healthScore: 70 },
  { id: "5", name: "Bethel CareGroup-05", meetingDay: "Monday", meetingTime: "18:00", location: "Walsall", memberCount: 11, healthScore: 88 },
];

export default function LoginPage() {
  const [step, setStep] = useState<"group" | "credentials">("group");
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  
  const router = useRouter();
  const { data: session, status } = useSession();

  // Force sign out on page load to ensure clean state
  useEffect(() => {
    const clearSession = async () => {
      if (status === "authenticated") {
        await signOut({ redirect: false });
        // Clear all localStorage auth data
        localStorage.removeItem("bethel_auth_user");
        localStorage.removeItem("selected_group");
        // Reload page to clear session
        window.location.reload();
      }
    };
    clearSession();
  }, [status]);

  // Redirect if authenticated after sign out check
  useEffect(() => {
    if (status === "authenticated" && step === "credentials") {
      router.push("/portal");
    }
  }, [status, router, step]);

  const handleGroupSelect = (group: any) => {
    setSelectedGroup(group);
    setStep("credentials");
    setError("");
    setUsername("");
    setPassword("");
  };

  const handleBack = () => {
    setStep("group");
    setSelectedGroup(null);
    setUsername("");
    setPassword("");
    setError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        username: username.trim(),
        password: password.trim(),
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid username or password. Check the login guide.");
        setIsSubmitting(false);
      } else {
        // Store selected group
        if (selectedGroup) {
          localStorage.setItem("selected_group", JSON.stringify(selectedGroup));
        }
        router.push("/portal");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#012169] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (step === "group") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto pt-12 px-4 pb-20">
          <div className="text-center mb-10">
            <Logo className="h-24 mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl font-black text-[#012169]">Select Your Care Group</h1>
            <p className="text-gray-500 mt-2">Choose your group to access your personalized portal</p>
          </div>

          <div className="space-y-3">
            {GROUPS.map((group) => (
              <button
                key={group.id}
                onClick={() => handleGroupSelect(group)}
                className="w-full bg-white rounded-2xl p-5 text-left border border-gray-200 shadow-sm hover:shadow-lg hover:border-[#547189] transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#012169] to-[#0a2a80] flex items-center justify-center text-white font-black text-xl">
                      {group.id}
                    </div>
                    <div>
                      <h3 className="font-black text-gray-900 text-lg">{group.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar size={12} /> {group.meetingDay}s
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin size={12} /> {group.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400 group-hover:text-[#547189] transition-colors" />
                </div>
                <div className="flex gap-4 mt-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    <Users size={12} className="text-gray-400" />
                    <span className="text-xs font-medium text-gray-600">{group.memberCount} members</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart size={12} className="text-gray-400" />
                    <span className="text-xs font-medium text-gray-600">{group.healthScore}% health</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => setShowGuide(true)}
              className="text-xs text-gray-400 hover:text-[#547189] transition-colors"
            >
              Need help logging in?
            </button>
          </div>
        </div>

        {showGuide && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowGuide(false)}>
            <div className="bg-white rounded-3xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-3 mb-4">
                <Key size={24} className="text-[#547189]" />
                <h2 className="text-2xl font-black">Login Guide</h2>
              </div>
              <div className="space-y-3">
                <div className="bg-blue-50 rounded-xl p-3">
                  <p className="font-black text-blue-800 text-sm">Admin:</p>
                  <code className="text-xs">admin / admin@Bwcg777</code>
                </div>
                <div className="bg-green-50 rounded-xl p-3">
                  <p className="font-black text-green-800 text-sm">Pastors:</p>
                  <code className="text-xs block">PastorDan / PastorDan@BWcg777</code>
                  <code className="text-xs">PastorTM / PastorTM@BWcg777</code>
                </div>
                <div className="bg-purple-50 rounded-xl p-3">
                  <p className="font-black text-purple-800 text-sm">Coordinators:</p>
                  <code className="text-xs">CG-coord-01 / CG-coord-01@BWcg04</code>
                </div>
                <div className="bg-amber-50 rounded-xl p-3">
                  <p className="font-black text-amber-800 text-sm">Members:</p>
                  <code className="text-xs">Member@BWcg / Member@BWcg@member</code>
                </div>
              </div>
              <button onClick={() => setShowGuide(false)} className="w-full mt-6 py-3 bg-[#012169] text-white rounded-xl font-black text-sm">
                Got it
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <button onClick={handleBack} className="flex items-center gap-2 text-gray-400 hover:text-[#547189] mb-6 text-sm">
          <ChevronLeft size={16} /> Back to Groups
        </button>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-[#012169] to-[#0a2a80] p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Church size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-white/70">Accessing</p>
                <h2 className="font-black text-xl">{selectedGroup?.name}</h2>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="text-center mb-6">
              <h3 className="font-black text-gray-900 text-xl">Welcome Back</h3>
              <p className="text-sm text-gray-500 mt-1">Enter your credentials to continue</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#547189] outline-none"
                  required
                  autoFocus
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#547189] outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {error && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                  <AlertCircle size={16} className="text-red-500 mt-0.5" />
                  <p className="text-xs text-red-600">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-[#012169] to-[#0a2a80] text-white rounded-xl font-black text-sm hover:from-[#C8102E] hover:to-[#a00d26] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <LogIn size={16} />
                    Access Portal
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => setShowGuide(true)}
                className="text-[10px] text-gray-400 hover:text-[#547189] transition-colors"
              >
                Forgot password?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
LOGINPAGE

echo "✅ Login page created with session clear"

# Fix DashboardShell with working Sign Out and Switch User
echo "📝 Fixing DashboardShell with proper sign out..."

cat > components/DashboardShell.tsx << 'DASHBOARD'
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, Calendar, Heart, Shield, LogOut,
  Target, BookOpen, ChevronRight, Home, Church,
  Menu, X, Library, Bell, Star,
  BarChart3, Image, Clock, Globe, Power,
  UserCircle, Settings, SwitchCamera
} from "lucide-react";
import Logo from "./Logo";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const groupId = (params?.groupId as string) || session?.user?.groupId || "1";
  const userRole = session?.user?.role || "member";
  const userName = session?.user?.name || "User";

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const hasPermission = (roles?: string[]) => {
    if (!roles || roles.length === 0) return true;
    if (userRole === 'ADMIN') return true;
    return roles.includes(userRole);
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  const handleSwitchUser = async () => {
    // Clear local storage and sign out
    localStorage.removeItem("bethel_auth_user");
    localStorage.removeItem("selected_group");
    await signOut({ callbackUrl: '/login' });
  };

  const navSections = [
    {
      title: "MAIN",
      items: [
        { label: 'GROUP HOME', icon: Home, path: `/group/${groupId}`, roles: ['MEMBER', 'COORDINATOR', 'PASTOR', 'ADMIN'] },
      ]
    },
    {
      title: "MEETINGS",
      items: [
        { label: 'LIVE SESSION', icon: Bell, path: `/group/${groupId}/live-session`, roles: ['COORDINATOR', 'PASTOR', 'ADMIN'] },
        { label: 'ATTENDANCE', icon: Clock, path: `/group/${groupId}/attendance`, roles: ['COORDINATOR', 'PASTOR', 'ADMIN'] },
        { label: 'CALENDAR', icon: Calendar, path: `/group/${groupId}/calendar`, roles: ['MEMBER', 'COORDINATOR', 'PASTOR', 'ADMIN'] },
        { label: 'GALLERY', icon: Image, path: `/group/${groupId}/gallery`, roles: ['MEMBER', 'COORDINATOR', 'PASTOR', 'ADMIN'] },
      ]
    },
    {
      title: "MINISTRY",
      items: [
        { label: 'LEADERSHIP HUB', icon: Shield, path: `/group/${groupId}/leadership-hub`, roles: ['COORDINATOR', 'PASTOR', 'ADMIN'] },
        { label: 'MISSION JOURNEY', icon: Target, path: `/group/${groupId}/mission`, roles: ['COORDINATOR', 'PASTOR', 'ADMIN'] },
        { label: 'PRAYER BOOK', icon: Heart, path: `/group/${groupId}/prayer-book`, roles: ['MEMBER', 'COORDINATOR', 'PASTOR', 'ADMIN'] },
      ]
    },
    {
      title: "LEARNING",
      items: [
        { label: 'STUDY HUB', icon: BookOpen, path: `/group/${groupId}/study-hub`, roles: ['MEMBER', 'COORDINATOR', 'PASTOR', 'ADMIN'] },
        { label: 'STUDY 101', icon: BookOpen, path: `/group/${groupId}/study-101`, roles: ['MEMBER', 'COORDINATOR', 'PASTOR', 'ADMIN'] },
        { label: 'RESOURCES', icon: Library, path: `/group/${groupId}/resources`, roles: ['MEMBER', 'COORDINATOR', 'PASTOR', 'ADMIN'] },
      ]
    },
    {
      title: "MANAGEMENT",
      items: [
        { label: 'CORE TEAM', icon: Users, path: `/group/${groupId}/team`, roles: ['COORDINATOR', 'PASTOR', 'ADMIN'] },
        { label: 'REPORTS', icon: BarChart3, path: `/group/${groupId}/reports`, roles: ['COORDINATOR', 'PASTOR', 'ADMIN'] },
      ]
    },
    {
      title: "GLOBAL",
      items: [
        { label: 'PORTAL HOME', icon: Globe, path: '/portal', roles: ['MEMBER', 'COORDINATOR', 'PASTOR', 'ADMIN'] },
        { label: 'ALL GROUPS', icon: Church, path: '/groups', roles: ['COORDINATOR', 'PASTOR', 'ADMIN'] },
      ]
    }
  ];

  const getRoleBadgeColor = () => {
    switch(userRole) {
      case 'ADMIN': return 'bg-purple-100 text-purple-700';
      case 'PASTOR': return 'bg-blue-100 text-blue-700';
      case 'COORDINATOR': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  if (!mounted || status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#012169] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-gray-200">
        <Link href="/portal">
          <Logo className="h-14 w-auto" />
        </Link>
      </div>

      {session?.user && (
        <div className="px-5 py-4 border-b border-gray-200 relative">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black text-[#547189] uppercase tracking-widest">AUTHORIZED ACCESS</p>
              <p className="font-black text-sm text-gray-900 mt-1 truncate">{userName}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`text-[8px] font-black px-2 py-0.5 rounded-full ${getRoleBadgeColor()} uppercase`}>
                  {userRole}
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <UserCircle size={20} className="text-gray-500" />
            </button>
          </div>

          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-50"
              >
                <div className="p-2">
                  <button
                    onClick={handleSwitchUser}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <SwitchCamera size={16} />
                    <span>Switch User</span>
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Power size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto no-scrollbar">
        {navSections.map((section) => {
          const visibleItems = section.items.filter(item => hasPermission(item.roles));
          if (visibleItems.length === 0) return null;
          return (
            <div key={section.title} className="space-y-1">
              <p className="px-4 text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">{section.title}</p>
              {visibleItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                return (
                  <button
                    key={item.label}
                    onClick={() => { router.push(item.path); setIsMobileMenuOpen(false); }}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                      isActive 
                        ? 'bg-[#547189] text-white shadow-lg' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} className={isActive ? 'text-white' : 'text-gray-500'} />
                      <span className={isActive ? 'text-white' : 'text-gray-700'}>{item.label}</span>
                    </div>
                    {isActive && <ChevronRight size={14} className="text-white" />}
                  </button>
                );
              })}
            </div>
          );
        })}
      </nav>

      <div className="p-5 border-t border-gray-200 bg-gray-50 lg:hidden">
        <button 
          onClick={handleSignOut} 
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-black text-[9px] uppercase text-white bg-[#C8102E] shadow-lg hover:brightness-110 transition-all active:scale-95"
        >
          <LogOut size={14} /> SIGN OUT
        </button>
        <p className="text-[7px] font-black text-gray-400 text-center mt-3 uppercase tracking-widest">
          Bethel Willenhall ? v3.0
        </p>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <div className={`lg:hidden fixed top-0 left-0 right-0 z-40 px-4 py-3 flex justify-between items-center transition-all ${
        scrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      }`}>
        <Logo className="h-10 w-auto" />
        <div className="flex items-center gap-2">
          <button
            onClick={handleSignOut}
            className="p-2 bg-red-500 text-white rounded-xl shadow-md"
          >
            <LogOut size={18} />
          </button>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 bg-[#547189] text-white rounded-xl shadow-md">
            <Menu size={20} />
          </button>
        </div>
      </div>

      <aside className="fixed inset-y-0 left-0 w-72 bg-white border-r border-gray-200 flex flex-col shadow-sm z-30 hidden lg:flex">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-white z-50 shadow-2xl flex flex-col lg:hidden"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className={`flex-1 transition-all duration-300 ${isMobile ? 'pt-20' : 'lg:ml-72'} px-4 py-6 lg:px-12 lg:py-10`}>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
DASHBOARD

echo "✅ DashboardShell fixed with sign out buttons"

# Create .env.local
echo "📝 Creating .env.local..."

cat > .env.local << 'ENV'
NEXTAUTH_SECRET=bethel-willenhall-secret-key-2026
NEXTAUTH_URL=http://localhost:3000
ENV

echo "✅ Environment variables set"

echo ""
echo "=========================================="
echo "✅ COMPLETE FIX DONE!"
echo "=========================================="
echo ""
echo "🚀 IMPORTANT: Run these commands:"
echo ""
echo "   1. npm run dev"
echo "   2. Open http://localhost:3000"
echo "   3. Clear your browser cache (Ctrl+Shift+Delete) or use Incognito mode"
echo ""
echo "📋 Test Credentials:"
echo "   Admin:        admin / admin@Bwcg777"
echo "   Pastor:       PastorDan / PastorDan@BWcg777"
echo "   Coordinator:  CG-coord-01 / CG-coord-01@BWcg04"
echo "   Member:       Member@BWcg / Member@BWcg@member"
echo ""
echo "🔄 Sign Out button is now in the sidebar under your name"
echo "=========================================="

