"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import DashboardShell from "@/components/DashboardShell";
import AuthGuard from "@/components/AuthGuard";
import Link from "next/link";
import { 
  ArrowLeft, Save, X, Church, MapPin, Calendar, Users,
  Heart, Target, Shield, AlertCircle
} from "lucide-react";
import { loadGroups, saveGroups } from "@/lib/groupService";
import toast from "react-hot-toast";

const meetingDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const locations = [
  "Willenhall Town Centre", "Dudley Town Centre", "Birmingham City Centre", 
  "Wolverhampton City Centre", "Walsall Town Centre", "Coventry City Centre",
  "Sandwell Town Centre", "West Bromwich", "Stourbridge", "Halesowen"
];

export default function AddGroupPage() {
  const router = useRouter();
  const { hasPermission } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    meetingDay: "Wednesday",
    meetingTime: "19:00",
    location: "",
    leader: "",
    coLeader: "",
    description: "",
  });

  if (!hasPermission(['admin'])) {
    return (
      <AuthGuard>
        <DashboardShell>
          <div className="text-center py-20">
            <Shield size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 font-black">Access Restricted</p>
            <p className="text-sm text-gray-400 mt-2">Only administrators can add groups.</p>
          </div>
        </DashboardShell>
      </AuthGuard>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Please enter a group name");
      return;
    }
    setSubmitting(true);
    
    const allGroups = loadGroups();
    // Find the next available ID
    let newId = "1";
    for (let i = 1; i <= 10; i++) {
      if (!allGroups[i.toString()]) {
        newId = i.toString();
        break;
      }
    }
    
    allGroups[newId] = {
      id: newId,
      name: formData.name,
      meetingDay: formData.meetingDay,
      meetingTime: formData.meetingTime,
      healthScore: 70,
      location: formData.location || locations[parseInt(newId) - 1] || "TBD",
      leader: formData.leader,
      coLeader: formData.coLeader,
      description: formData.description,
      pillars: { fellowship: 70, breakingBread: 65, doctrine: 60, prayer: 55 },
      path: { relationship: 70, fellowship: 65, belonging: 55, discipleship: 45 },
      missionStats: { soulWinning: 0, baptisms: 0, outreachEvents: 0, prayerRequests: 0, answeredPrayers: 0 },
      rotas: [],
      prayers: [],
      members: [],
    };
    
    saveGroups(allGroups);
    toast.success(`Care Group "${formData.name}" created successfully`);
    router.push(`/groups`);
    setSubmitting(false);
  };

  return (
    <AuthGuard>
      <DashboardShell>
        <div className="max-w-3xl mx-auto space-y-6 pb-20">
          <div className="flex items-center gap-4">
            <Link href="/groups" className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Church size={16} className="text-[#547189]" />
                <span className="text-[10px] font-black text-[#547189] uppercase tracking-wider">Create New</span>
              </div>
              <h1 className="text-3xl font-black tracking-tighter" style={{ fontFamily: 'Georgia, serif' }}>
                Add Care Group
              </h1>
              <p className="text-gray-500 text-sm">Create a new Bethel Care Group (1-10)</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Group Name *</label>
                <div className="relative">
                  <Church size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#547189]" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Bethel CareGroup-08"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border focus:border-[#547189] outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Meeting Day</label>
                  <select
                    value={formData.meetingDay}
                    onChange={(e) => setFormData({ ...formData, meetingDay: e.target.value })}
                    className="w-full p-3 bg-gray-50 rounded-xl border focus:border-[#547189] outline-none"
                  >
                    {meetingDays.map(day => <option key={day} value={day}>{day}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Meeting Time</label>
                  <input
                    type="time"
                    value={formData.meetingTime}
                    onChange={(e) => setFormData({ ...formData, meetingTime: e.target.value })}
                    className="w-full p-3 bg-gray-50 rounded-xl border focus:border-[#547189] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Location</label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#547189]" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Willenhall Town Centre"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border focus:border-[#547189] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Group Leader</label>
                  <input
                    type="text"
                    value={formData.leader}
                    onChange={(e) => setFormData({ ...formData, leader: e.target.value })}
                    placeholder="Leader name"
                    className="w-full p-3 bg-gray-50 rounded-xl border focus:border-[#547189] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Co-Leader</label>
                  <input
                    type="text"
                    value={formData.coLeader}
                    onChange={(e) => setFormData({ ...formData, coLeader: e.target.value })}
                    placeholder="Co-leader name"
                    className="w-full p-3 bg-gray-50 rounded-xl border focus:border-[#547189] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the group..."
                  className="w-full p-3 bg-gray-50 rounded-xl border focus:border-[#547189] outline-none"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 bg-gray-50 border-t border-gray-100">
              <Link href="/groups" className="px-6 py-2.5 bg-gray-200 rounded-xl font-black text-[10px] uppercase hover:bg-gray-300 transition">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 bg-[#547189] text-white rounded-xl font-black text-[10px] uppercase flex items-center gap-2 hover:bg-[#3a5a6e] transition disabled:opacity-50"
              >
                <Save size={14} /> {submitting ? "Creating..." : "Create Group"}
              </button>
            </div>
          </form>
        </div>
      </DashboardShell>
    </AuthGuard>
  );
}
