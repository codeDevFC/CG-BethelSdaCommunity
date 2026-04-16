"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lock, User, ChevronRight, ChevronLeft, Eye, EyeOff, 
  Church, Users, Calendar, MapPin, Heart, Shield, AlertCircle,
  LogIn, Key, Clock
} from "lucide-react";
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

// Fallback groups matching your Neon Database IDs
const FALLBACK_GROUPS: Group[] = [
  { id: "cmo0lam4w0007e519yfnml2z1", name: "Bethel CareGroup-01", meetingDay: "Sunday", meetingTime: "14:00", location: "Willenhall", memberCount: 12, healthScore: 85 },
  { id: "cmo0lam4w0008e519ibzjhzxh", name: "Bethel CareGroup-02", meetingDay: "Wednesday", meetingTime: "18:30", location: "Dudley", memberCount: 10, healthScore: 78 },
  { id: "cmo0lam4x0009e5193rof01vs", name: "Bethel CareGroup-03", meetingDay: "Tuesday", meetingTime: "19:00", location: "Birmingham", memberCount: 15, healthScore: 92 },
  { id: "cmo0lam4x000ae519cl2kgqqe", name: "Bethel CareGroup-04", meetingDay: "Thursday", meetingTime: "19:30", location: "Wolverhampton", memberCount: 8, healthScore: 70 },
  { id: "cmo0lam4x000be5192ib1im1m", name: "Bethel CareGroup-05", meetingDay: "Monday", meetingTime: "18:00", location: "Walsall", memberCount: 11, healthScore: 88 },
];

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
  const [showGuide, setShowGuide] = useState(false);
  
  const router = useRouter();
  const { data: session, status } = useSession();

  // 1. Redirect if already authenticated
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/portal");
    }
  }, [status, router]);

  // 2. Load groups from API or Fallback
  useEffect(() => {
    const loadGroups = async () => {
      try {
        const response = await fetch("/api/groups/public");
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setGroups(data);
            setLoading(false);
            return;
          }
        }
        setGroups(FALLBACK_GROUPS);
      } catch (err) {
        setGroups(FALLBACK_GROUPS);
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
      // We use redirect: false to handle errors manually
      const result = await signIn("credentials", {
        username: username.trim(),
        password: password.trim(),
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid username or password. Check the guide for help.");
        setIsSubmitting(false);
      } else {
        router.push("/portal");
        router.refresh();
      }
    } catch (err) {
      setError("Server connection error. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#012169] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading secure portal...</p>
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
            <h1 className="text-3xl md:text-4xl font-black text-[#012169] tracking-tighter">Select Your Care Group</h1>
            <p className="text-gray-500 mt-2">Choose your group to access your personalized portal</p>
          </div>

          <div className="grid gap-4">
            {groups.map((group) => (
              <motion.button
                key={group.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleGroupSelect(group)}
                className="w-full bg-white rounded-2xl p-6 text-left border border-gray-200 shadow-sm hover:shadow-md hover:border-[#547189] transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-navy-brand flex items-center justify-center text-white font-black">
                      <Users size={24} />
                    </div>
                    <div>
                      <h3 className="font-black text-gray-900 text-lg">{group.name}</h3>
                      <div className="flex items-center gap-3 mt-1 text-gray-500">
                        <span className="flex items-center gap-1 text-xs"><Calendar size={12} /> {group.meetingDay}</span>
                        <span className="flex items-center gap-1 text-xs"><MapPin size={12} /> {group.location}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-300 group-hover:text-navy-brand" />
                </div>
              </motion.button>
            ))}
          </div>

          <div className="mt-12 text-center space-y-4">
            <Link href="/admin/login" className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-navy-brand">
              <Shield size={14} /> Administrator Access
            </Link>
            <button onClick={() => setShowGuide(true)} className="block w-full text-[11px] text-gray-400 hover:underline">
              Need help with credentials?
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showGuide && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowGuide(false)}>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-black mb-6 flex items-center gap-2"><Key className="text-slate-logo" /> Login Guide</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <p className="font-bold text-blue-900 text-sm">Admin:</p>
                    <code className="text-xs">admin / admin@Bwcg777</code>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl">
                    <p className="font-bold text-green-900 text-sm">Pastors:</p>
                    <code className="text-xs">PastorDan / PastorDan@BWcg777</code>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-xl">
                    <p className="font-bold text-purple-900 text-sm">Coordinators:</p>
                    <code className="text-xs">CG-coord-01 / CG-coord-01@BWcg04</code>
                  </div>
                </div>
                <button onClick={() => setShowGuide(false)} className="w-full mt-8 py-4 bg-navy-brand text-white rounded-2xl font-black">Got it</button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <button onClick={handleBack} className="flex items-center gap-2 text-gray-400 hover:text-navy-brand mb-6 text-sm transition-colors">
          <ChevronLeft size={16} /> Back to Groups
        </button>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-navy-brand p-8 text-white">
            <p className="text-xs font-bold opacity-70 uppercase tracking-widest mb-1">Secure Login</p>
            <h2 className="font-black text-2xl">{selectedGroup?.name}</h2>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-5">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-navy-brand/20 outline-none transition-all"
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
                className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-navy-brand/20 outline-none transition-all"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && (
              <div className="flex items-start gap-2 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-medium">
                <AlertCircle size={16} className="shrink-0" /> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-navy-brand text-white rounded-2xl font-black shadow-lg shadow-navy-brand/20 hover:bg-[#0a2a80] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? "Verifying..." : <><LogIn size={18} /> Access Portal</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
