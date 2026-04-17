"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, User, Eye, EyeOff, Church, Users, Calendar, MapPin, Heart, LogIn, Key, Shield, ChevronDown, ChevronUp, Star, Target, Award } from "lucide-react";
import Logo from "@/components/Logo";

// Group data
const GROUPS = [
  { id: "1", name: "01 - Bethel Care Group", meetingDay: "Sunday", meetingTime: "14:00", location: "Willenhall", memberCount: 12, healthScore: 92, soulsWon: 8, color: "from-blue-600 to-indigo-600", bgLight: "bg-blue-50", borderColor: "border-blue-200", textColor: "text-blue-700", accentColor: "bg-blue-600" },
  { id: "2", name: "02 - Faith Community", meetingDay: "Wednesday", meetingTime: "18:30", location: "Dudley", memberCount: 10, healthScore: 85, soulsWon: 5, color: "from-green-600 to-emerald-600", bgLight: "bg-green-50", borderColor: "border-green-200", textColor: "text-green-700", accentColor: "bg-green-600" },
  { id: "3", name: "03 - Hope Fellowship", meetingDay: "Tuesday", meetingTime: "19:00", location: "Birmingham", memberCount: 15, healthScore: 78, soulsWon: 12, color: "from-purple-600 to-pink-600", bgLight: "bg-purple-50", borderColor: "border-purple-200", textColor: "text-purple-700", accentColor: "bg-purple-600" },
  { id: "4", name: "04 - Grace Circle", meetingDay: "Thursday", meetingTime: "19:30", location: "Wolverhampton", memberCount: 8, healthScore: 70, soulsWon: 3, color: "from-amber-600 to-orange-600", bgLight: "bg-amber-50", borderColor: "border-amber-200", textColor: "text-amber-700", accentColor: "bg-amber-600" },
  { id: "5", name: "05 - Love Alliance", meetingDay: "Monday", meetingTime: "18:00", location: "Walsall", memberCount: 11, healthScore: 88, soulsWon: 6, color: "from-red-600 to-rose-600", bgLight: "bg-red-50", borderColor: "border-red-200", textColor: "text-red-700", accentColor: "bg-red-600" },
  { id: "6", name: "06 - Joy Gathering", meetingDay: "Saturday", meetingTime: "10:00", location: "Coventry", memberCount: 9, healthScore: 75, soulsWon: 4, color: "from-teal-600 to-cyan-600", bgLight: "bg-teal-50", borderColor: "border-teal-200", textColor: "text-teal-700", accentColor: "bg-teal-600" },
  { id: "7", name: "07 - Peace Circle", meetingDay: "Tuesday", meetingTime: "19:30", location: "Sandwell", memberCount: 13, healthScore: 82, soulsWon: 7, color: "from-indigo-600 to-blue-600", bgLight: "bg-indigo-50", borderColor: "border-indigo-200", textColor: "text-indigo-700", accentColor: "bg-indigo-600" },
];

const roleRedirects: Record<string, string> = {
  ADMIN: "/groups",
  PASTOR: "/groups",
  COORDINATOR: "/portal",
  MEMBER: "/portal",
};

// Collapsible Group Card Component
function GroupCard({ group, onSelect, isExpanded, onToggle }: { group: any; onSelect: () => void; isExpanded: boolean; onToggle: () => void }) {
  return (
    <div className={`bg-white rounded-2xl border-2 ${group.borderColor} shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden`}>
      {/* Card Header - Always visible */}
      <div 
        className="p-5 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${group.color} flex items-center justify-center text-white font-black text-xl shadow-md shrink-0`}>
              {group.id}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-black text-lg text-gray-800 truncate">{group.name}</h3>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span className="flex items-center gap-1 text-xs text-gray-600">
                  <Calendar size={12} /> {group.meetingDay}s
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-600">
                  <MapPin size={12} /> {group.location}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full">
              <Heart size={12} className="text-green-600" />
              <span className="text-xs font-bold text-green-700">{group.healthScore}%</span>
            </div>
            {isExpanded ? (
              <ChevronUp size={20} className="text-gray-400 shrink-0" />
            ) : (
              <ChevronDown size={20} className="text-gray-400 shrink-0" />
            )}
          </div>
        </div>
      </div>

      {/* Expanded Content - Shows on click */}
      {isExpanded && (
        <div className="px-5 pb-5 pt-2 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className={`${group.bgLight} rounded-xl p-3 text-center`}>
              <Users size={16} className={`mx-auto mb-1 ${group.textColor}`} />
              <p className="text-xl font-black text-gray-800">{group.memberCount}</p>
              <p className="text-[9px] font-black text-gray-500 uppercase">Members</p>
            </div>
            <div className={`${group.bgLight} rounded-xl p-3 text-center`}>
              <Target size={16} className={`mx-auto mb-1 ${group.textColor}`} />
              <p className="text-xl font-black text-gray-800">{group.soulsWon}</p>
              <p className="text-[9px] font-black text-gray-500 uppercase">Souls Won</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1">
              <div className={`w-6 h-6 rounded-full ${group.accentColor} flex items-center justify-center text-white text-[10px] font-black`}>
                L
              </div>
              <span className="text-[10px] text-gray-600">Group Leader</span>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onSelect(); }}
              className={`flex-1 ml-3 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider text-white bg-gradient-to-r ${group.color} hover:shadow-md transition-all flex items-center justify-center gap-2`}
            >
              <LogIn size={14} />
              Select Group
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LoginPage() {
  const [step, setStep] = useState<"group" | "credentials">("group");
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const role = session.user.role as string;
      const redirectPath = roleRedirects[role] || "/portal";
      router.push(redirectPath);
    }
  }, [status, session, router]);

  const handleGroupSelect = (group: any) => {
    setSelectedGroup(group);
    setStep("credentials");
    setError("");
    setUsername("");
    setPassword("");
    setExpandedCard(null);
  };

  const handleBack = () => {
    setStep("group");
    setSelectedGroup(null);
    setUsername("");
    setPassword("");
    setError("");
  };

  const toggleExpand = (groupId: string) => {
    setExpandedCard(expandedCard === groupId ? null : groupId);
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
        if (selectedGroup) {
          localStorage.setItem("selected_group_id", selectedGroup.id);
          localStorage.setItem("selected_group_name", selectedGroup.name);
        }
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#012169] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (step === "group") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="max-w-2xl mx-auto pt-8 px-4 pb-20">
          {/* Header */}
          <div className="text-center mb-8">
            <Logo className="h-20 mx-auto mb-4" />
            <h1 className="text-2xl md:text-3xl font-black text-[#012169]">Select Your Care Group</h1>
            <p className="text-gray-600 text-sm mt-2">Tap a group to see details, then select to continue</p>
          </div>

          {/* Collapsible Groups List */}
          <div className="space-y-3">
            {GROUPS.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                onSelect={() => handleGroupSelect(group)}
                isExpanded={expandedCard === group.id}
                onToggle={() => toggleExpand(group.id)}
              />
            ))}
          </div>

          {/* Help Link */}
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowGuide(true)}
              className="text-sm text-gray-500 hover:text-[#547189] transition-colors flex items-center gap-1 mx-auto"
            >
              <Shield size={14} />
              Need help logging in?
            </button>
          </div>
        </div>

        {/* Login Guide Modal */}
        {showGuide && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowGuide(false)}>
            <div className="bg-white rounded-2xl max-w-md w-full p-5 mx-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-2 mb-4">
                <Key size={22} className="text-[#547189]" />
                <h2 className="text-xl font-black text-gray-800">Login Guide</h2>
              </div>
              <div className="space-y-2">
                <div className="bg-blue-50 rounded-xl p-3">
                  <p className="font-black text-blue-800 text-xs">Admin:</p>
                  <code className="text-xs text-gray-700 break-all">admin / admin@Bwcg777</code>
                </div>
                <div className="bg-green-50 rounded-xl p-3">
                  <p className="font-black text-green-800 text-xs">Pastors:</p>
                  <code className="text-xs text-gray-700 block break-all">PastorDan / PastorDan@BWcg777</code>
                  <code className="text-xs text-gray-700 break-all">PastorTM / PastorTM@BWcg777</code>
                </div>
                <div className="bg-purple-50 rounded-xl p-3">
                  <p className="font-black text-purple-800 text-xs">Coordinators:</p>
                  <code className="text-xs text-gray-700 break-all">CG-coord-01 / CG-coord-01@BWcg04</code>
                  <p className="text-[10px] text-gray-500 mt-1">(Use current month: 01-12)</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-3">
                  <p className="font-black text-amber-800 text-xs">Members:</p>
                  <code className="text-xs text-gray-700 break-all">Member01 / Member01@member</code>
                </div>
              </div>
              <button onClick={() => setShowGuide(false)} className="w-full mt-5 py-3 bg-[#012169] text-white rounded-xl font-black text-sm">
                Got it
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Credentials step - Mobile responsive
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <button onClick={handleBack} className="flex items-center gap-2 text-gray-500 hover:text-[#547189] mb-5 text-sm">
          ← Back to Groups
        </button>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className={`bg-gradient-to-r ${selectedGroup?.color || "from-[#012169] to-[#0a2a80]"} p-5 text-white`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Church size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/70">Accessing</p>
                <h2 className="font-black text-lg">{selectedGroup?.name}</h2>
              </div>
            </div>
          </div>

          <div className="p-5">
            <div className="text-center mb-5">
              <h3 className="font-black text-gray-800 text-lg">Welcome Back</h3>
              <p className="text-xs text-gray-500 mt-1">Enter your credentials to continue</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-9 pr-3 py-3 bg-gray-100 border border-gray-200 rounded-xl focus:border-[#547189] outline-none text-gray-800 placeholder:text-gray-400 text-base"
                  required
                  autoFocus
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-3 bg-gray-100 border border-gray-200 rounded-xl focus:border-[#547189] outline-none text-gray-800 placeholder:text-gray-400 text-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
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
