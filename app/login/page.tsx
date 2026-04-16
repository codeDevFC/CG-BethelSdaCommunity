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
