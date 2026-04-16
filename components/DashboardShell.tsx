"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, Calendar, Heart, Shield, LogOut, 
  Target, BookOpen, ChevronRight, Home, Church, FileText,
  Menu, X, Library, Activity, Bell, Star,
  BarChart3, MessageCircle, Sparkles, Crown,
  ClipboardCheck, Image, Clock, Globe, Book
} from "lucide-react";
import Logo from "./Logo";

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
  roles?: string[];
}

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const groupId = (params?.groupId as string) || session?.user?.groupId || "1";
  const userRole = session?.user?.role || "member";

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

  const navSections = [
    {
      title: "Main",
      items: [
        { label: 'Group Home', icon: Home, path: `/group/${groupId}`, roles: ['MEMBER', 'COORDINATOR', 'PASTOR', 'ADMIN'] },
      ]
    },
    {
      title: "Meetings",
      items: [
        { label: 'Live Session', icon: Bell, path: `/group/${groupId}/live-session`, roles: ['COORDINATOR', 'PASTOR', 'ADMIN'] },
        { label: 'Attendance', icon: Clock, path: `/group/${groupId}/attendance`, roles: ['COORDINATOR', 'PASTOR', 'ADMIN'] },
        { label: 'Calendar', icon: Calendar, path: `/group/${groupId}/calendar`, roles: ['MEMBER', 'COORDINATOR', 'PASTOR', 'ADMIN'] },
        { label: 'Gallery', icon: Image, path: `/group/${groupId}/gallery`, roles: ['MEMBER', 'COORDINATOR', 'PASTOR', 'ADMIN'] },
      ]
    },
    {
      title: "Ministry",
      items: [
        { label: 'Leadership Hub', icon: Shield, path: `/group/${groupId}/leadership-hub`, roles: ['COORDINATOR', 'PASTOR', 'ADMIN'] },
        { label: 'Mission Journey', icon: Target, path: `/group/${groupId}/mission`, roles: ['COORDINATOR', 'PASTOR', 'ADMIN'] },
        { label: 'Prayer Book', icon: Heart, path: `/group/${groupId}/prayer-book`, roles: ['MEMBER', 'COORDINATOR', 'PASTOR', 'ADMIN'] },
      ]
    },
    {
      title: "Learning",
      items: [
        { label: 'Study Hub', icon: BookOpen, path: `/group/${groupId}/study-hub`, roles: ['MEMBER', 'COORDINATOR', 'PASTOR', 'ADMIN'] },
        { label: 'Study 101', icon: Book, path: `/group/${groupId}/study-101`, roles: ['MEMBER', 'COORDINATOR', 'PASTOR', 'ADMIN'] },
        { label: 'Resources', icon: Library, path: `/group/${groupId}/resources`, roles: ['MEMBER', 'COORDINATOR', 'PASTOR', 'ADMIN'] },
      ]
    },
    {
      title: "Management",
      items: [
        { label: 'Core Team', icon: Users, path: `/group/${groupId}/team`, roles: ['COORDINATOR', 'PASTOR', 'ADMIN'] },
        { label: 'Reports', icon: BarChart3, path: `/group/${groupId}/reports`, roles: ['COORDINATOR', 'PASTOR', 'ADMIN'] },
      ]
    },
    {
      title: "Global",
      items: [
        { label: 'Portal Home', icon: Globe, path: '/portal', roles: ['MEMBER', 'COORDINATOR', 'PASTOR', 'ADMIN'] },
        { label: 'All Groups', icon: Church, path: '/groups', roles: ['COORDINATOR', 'PASTOR', 'ADMIN'] },
        { label: 'Health & Safety', icon: ClipboardCheck, path: '/safety', roles: ['COORDINATOR', 'PASTOR', 'ADMIN'] },
      ]
    }
  ];

  const handleLogout = () => {
    // This will be handled by next-auth signOut
    window.location.href = '/api/auth/signout';
  };

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
        <div className="px-5 py-4 border-b border-gray-200">
          <p className="text-[9px] font-black text-[#547189] uppercase tracking-widest">Authorized Access</p>
          <p className="font-black text-sm text-gray-900 mt-1 truncate">{session.user.name}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-[8px] font-black px-2 py-0.5 rounded-full ${getRoleBadgeColor()} uppercase`}>
              {userRole}
            </span>
          </div>
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
                        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <ChevronRight size={14} />}
                  </button>
                );
              })}
            </div>
          );
        })}
      </nav>
      
      <div className="p-5 border-t border-gray-200 bg-gray-50">
        <button 
          onClick={handleLogout} 
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-black text-[9px] uppercase text-white bg-[#C8102E] shadow-lg hover:brightness-110 transition-all active:scale-95"
        >
          <LogOut size={14} /> Sign Out
        </button>
        <p className="text-[7px] font-black text-gray-400 text-center mt-3 uppercase tracking-widest">
          Bethel Willenhall • v3.0
        </p>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Mobile Top Bar */}
      <div className={`lg:hidden fixed top-0 left-0 right-0 z-40 px-4 py-3 flex justify-between items-center transition-all ${
        scrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      }`}>
        <Logo className="h-10 w-auto" />
        <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 bg-[#547189] text-white rounded-xl shadow-md">
          <Menu size={20} />
        </button>
      </div>
      
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-72 bg-white border-r border-gray-200 flex flex-col shadow-sm z-30 hidden lg:flex">
        <SidebarContent />
      </aside>
      
      {/* Mobile Drawer */}
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
