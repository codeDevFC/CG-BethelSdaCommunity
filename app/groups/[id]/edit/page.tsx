"use client";
import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import DashboardShell from "@/components/DashboardShell";
import AuthGuard from "@/components/AuthGuard";
import Link from "next/link";
import { 
  ArrowLeft, Save, Church, MapPin, Shield
} from "lucide-react";
import { getGroup, updateGroup } from "@/lib/groupService";
import toast from "react-hot-toast";

const meetingDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function EditGroupPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const groupId = resolvedParams.id;
  const router = useRouter();
  const { hasPermission } = useAuth();
  const [group, setGroup] = useState<any>(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const data = getGroup(groupId);
    if (data) {
      setGroup(data);
      setFormData({
        name: data.name || "",
        meetingDay: data.meetingDay || "Wednesday",
        meetingTime: data.meetingTime || "19:00",
        location: data.location || "",
        leader: data.leader || "",
        coLeader: data.coLeader || "",
        description: data.description || "",
      });
    }
    setLoading(false);
  }, [groupId]);

  if (!hasPermission(['admin'])) {
    return (
      <AuthGuard>
        <DashboardShell>
          <div className="text-center py-20">
            <Shield size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 font-black">Access Restricted</p>
            <p className="text-sm text-gray-400 mt-2">Only administrators can edit groups.</p>
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
    
    const updated = updateGroup(groupId, formData);
    
    if (updated) {
      toast.success(`Group "${formData.name}" updated successfully`);
      router.push(`/groups/${groupId}`);
    } else {
      toast.error("Failed to update group");
    }
    
    setSubmitting(false);
  };

  if (loading) return <div className="p-20 text-center font-black">Loading...</div>;
  if (!group) return <div className="p-20 text-center font-black">Group Not Found</div>;

  return (
    <AuthGuard>
      <DashboardShell>
        <div className="max-w-3xl mx-auto space-y-6 pb-20">
          <div className="flex items-center gap-4">
            <Link href={`/groups/${groupId}`} className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Church size={16} className="text-[#012169]" />
                <span className="text-[10px] font-black text-[#012169] uppercase tracking-wider">Edit Group</span>
              </div>
              <h1 className="text-3xl font-black tracking-tighter" style={{ fontFamily: 'Georgia, serif' }}>
                Edit {group.name}
              </h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Group Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 bg-gray-50 rounded-xl border focus:border-[#012169] outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Meeting Day</label>
                  <select
                    value={formData.meetingDay}
                    onChange={(e) => setFormData({ ...formData, meetingDay: e.target.value })}
                    className="w-full p-3 bg-gray-50 rounded-xl border focus:border-[#012169] outline-none"
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
                    className="w-full p-3 bg-gray-50 rounded-xl border focus:border-[#012169] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full p-3 bg-gray-50 rounded-xl border focus:border-[#012169] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Group Leader</label>
                  <input
                    type="text"
                    value={formData.leader}
                    onChange={(e) => setFormData({ ...formData, leader: e.target.value })}
                    className="w-full p-3 bg-gray-50 rounded-xl border focus:border-[#012169] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Co-Leader</label>
                  <input
                    type="text"
                    value={formData.coLeader}
                    onChange={(e) => setFormData({ ...formData, coLeader: e.target.value })}
                    className="w-full p-3 bg-gray-50 rounded-xl border focus:border-[#012169] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 bg-gray-50 rounded-xl border focus:border-[#012169] outline-none"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 bg-gray-50 border-t border-gray-100">
              <Link href={`/groups/${groupId}`} className="px-6 py-2.5 bg-gray-200 rounded-xl font-black text-[10px] uppercase hover:bg-gray-300 transition">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 bg-[#012169] text-white rounded-xl font-black text-[10px] uppercase flex items-center gap-2 hover:bg-[#0a2a80] transition disabled:opacity-50"
              >
                <Save size={14} /> {submitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </DashboardShell>
    </AuthGuard>
  );
}
