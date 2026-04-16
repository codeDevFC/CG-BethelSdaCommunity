"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, User, ChevronRight, ChevronLeft, Eye, EyeOff, Church, Users, Calendar, MapPin, Heart, Shield, AlertCircle } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";

interface Group {
  id: string;
  name: string;
  meetingDay: string;
  meetingTime: string;
  location: string;
  memberCount: number;
  healthScore: number;
}

export default function LoginPage() {
  const [step, setStep] = useState<"group" | "credentials">("group");
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const router = useRouter();
  const { data: session, status } = useSession();
  
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/portal");
    }
  }, [status, router]);
  
  useEffect(() => {
    const loadGroups = async () => {
      try {
        const response = await fetch("/api/groups/public");
        const data = await response.json();
        setGroups(data);
      } catch (error) {
        setGroups([
          { id: "1", name: "Bethel CareGroup-01", meetingDay: "Sunday", meetingTime: "14:00", location: "Willenhall", memberCount: 12, healthScore: 92 },
          { id: "2", name: "Bethel CareGroup-02", meetingDay: "Wednesday", meetingTime: "18:30", location: "Dudley", memberCount: 10, healthScore: 85 },
          { id: "3", name: "Bethel CareGroup-03", meetingDay: "Tuesday", meetingTime: "19:00", location: "Birmingham", memberCount: 15, healthScore: 78 },
        ]);
      } finally {
        setLoading(false);
      }
    };
    loadGroups();
  }, []);
  
  const handleGroupSelect = (group: Group) => {
    setSelectedGroup(group);
    setStep("credentials");
    setError("");
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
    
    const result = await signIn("credentials", {
      username: username.trim(),
      password: password.trim(),
      groupId: selectedGroup?.id,
      redirect: false,
    });
    
    if (result?.error) {
      setError("Invalid username or password. Please try again.");
      setIsSubmitting(false);
    } else {
      router.push("/portal");
    }
  };
  
  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#012169] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Loading secure portal...</p>
        </div>
      </div>
    );
  }
  
  if (step === "group") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-md mx-auto pt-16 px-4 pb-20">
          <div className="text-center mb-8">
            <Logo className="h-20 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-[#012169]">Select Your Care Group</h1>
            <p className="text-gray-500 text-sm mt-2">Choose your group to access your personalized portal</p>
          </div>
          
          <div className="space-y-3">
            {groups.map((group) => (
              <button
                key={group.id}
                onClick={() => handleGroupSelect(group)}
                className="w-full bg-white rounded-2xl p-5 text-left border border-gray-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#012169] flex items-center justify-center text-white font-bold text-lg">
                      {group.name.slice(-2)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{group.name}</h3>
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
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
                
                <div className="flex gap-4 mt-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    <Users size={12} className="text-gray-400" />
                    <span className="text-xs font-bold">{group.memberCount} members</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart size={12} className="text-gray-400" />
                    <span className="text-xs font-bold">{group.healthScore}% health</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Link href="/admin/login" className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-[#547189]">
              <Shield size={12} /> Administrator Login
            </Link>
          </div>
        </div>
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
          <div className="bg-[#012169] p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Church size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-white/70">Accessing</p>
                <h2 className="font-bold text-xl">{selectedGroup?.name}</h2>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="text-center mb-6">
              <h3 className="font-bold text-gray-900">Welcome Back</h3>
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
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#547189] outline-none transition"
                  required
                />
              </div>
              
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#547189] outline-none transition"
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
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                  <AlertCircle size={16} className="text-red-500" />
                  <p className="text-xs text-red-600">{error}</p>
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#012169] text-white rounded-xl font-bold text-sm hover:bg-[#C8102E] transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Verifying..." : "Access Portal"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
