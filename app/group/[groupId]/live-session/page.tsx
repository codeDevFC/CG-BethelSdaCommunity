"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/contexts/AuthContext";
import { getGroup, updateGroup } from "@/lib/groupService";
import { CalendarIcon, UserCheck, UserX, Edit2, Save, X, Users, TrendingUp } from "lucide-react";
import toast from "react-hot-toast";

interface Member {
  id: number;
  name: string;
  status: string;
  history: string[];
}

export default function LiveSessionPage() {
  const params = useParams();
  const groupId = params?.groupId as string;
  const { hasPermission, canAccessGroup } = useAuth();
  const [group, setGroup] = useState<any>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [session, setSession] = useState<Record<number, { status: string; notes: string }>>({});
  const [editingNote, setEditingNote] = useState<number | null>(null);
  const [tempNote, setTempNote] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const isLeader = hasPermission(['coordinator', 'pastor', 'admin']);

  useEffect(() => {
    if (groupId && canAccessGroup(groupId)) {
      loadGroup();
    }
  }, [groupId]);

  useEffect(() => {
    if (members.length > 0) loadAttendance();
  }, [selectedDate, members]);

  const loadGroup = () => {
    const data = getGroup(groupId);
    setGroup(data);
    loadMembers(data);
  };

  const loadMembers = (groupData: any) => {
    const saved = localStorage.getItem(`group_members_${groupId}`);
    if (saved) {
      setMembers(JSON.parse(saved));
    } else {
      setMembers(groupData?.members || []);
      localStorage.setItem(`group_members_${groupId}`, JSON.stringify(groupData?.members || []));
    }
  };

  const saveMembers = (updatedMembers: Member[]) => {
    setMembers(updatedMembers);
    localStorage.setItem(`group_members_${groupId}`, JSON.stringify(updatedMembers));
    if (group) {
      updateGroup(groupId, { members: updatedMembers });
    }
  };

  const loadAttendance = () => {
    const saved = localStorage.getItem(`attendance_${groupId}_${selectedDate}`);
    if (saved) {
      setSession(JSON.parse(saved));
    } else {
      const initial: Record<number, { status: string; notes: string }> = {};
      members.forEach(m => { initial[m.id] = { status: 'present', notes: '' }; });
      setSession(initial);
    }
  };

  const updateAttendance = (id: number, field: 'status' | 'notes', value: string) => {
    const updated = { ...session, [id]: { ...session[id], [field]: value } };
    setSession(updated);
    saveAttendance(updated);
    
    if (field === 'status') {
      const updatedMembers = members.map(member => {
        if (member.id === id) {
          const newHistory = [value === 'present' ? 'P' : 'A', ...(member.history || []).slice(0, 11)];
          return { ...member, history: newHistory };
        }
        return member;
      });
      saveMembers(updatedMembers);
    }
  };

  const saveAttendance = async (data: Record<number, { status: string; notes: string }>) => {
    setIsSaving(true);
    try {
      localStorage.setItem(`attendance_${groupId}_${selectedDate}`, JSON.stringify(data));
      toast.success('Attendance saved');
    } catch (error) {
      toast.error('Failed to save attendance');
    } finally {
      setIsSaving(false);
    }
  };

  const getStats = () => {
    let present = 0, absent = 0;
    Object.values(session).forEach(record => {
      if (record.status === 'present') present++;
      else if (record.status === 'absent') absent++;
    });
    return { present, absent, total: members.length };
  };

  if (!canAccessGroup(groupId)) {
    return (
      <AuthGuard>
        <DashboardShell>
          <div className="text-center py-20">
            <p className="text-gray-500">You don't have access to this group's live session.</p>
          </div>
        </DashboardShell>
      </AuthGuard>
    );
  }

  const stats = getStats();
  const attendanceRate = stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0;

  if (!group) return <div className="p-20 text-center font-black">Loading Live Session...</div>;

  return (
    <AuthGuard>
      <DashboardShell>
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
            <div>
              <h1 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase leading-none" style={{ fontFamily: 'Georgia, serif' }}>
                Live Session
              </h1>
              <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">
                {group.name} • {group.meetingDay}s at {group.meetingTime}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-2xl border shadow-sm flex items-center gap-2">
                <CalendarIcon size={18} className="text-[#C8102E]" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="font-black text-sm uppercase outline-none bg-transparent"
                />
              </div>
              <div className="bg-[#012169] px-4 py-3 rounded-2xl text-center text-white">
                <p className="text-[10px] font-black uppercase">Attendance</p>
                <p className="text-xl font-black">{attendanceRate}%</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border text-center">
              <Users size={20} className="mx-auto mb-1 text-[#012169]" />
              <p className="text-2xl font-black">{stats.total}</p>
              <p className="text-[9px] font-black text-gray-400 uppercase">Total Members</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border text-center">
              <UserCheck size={20} className="mx-auto mb-1 text-green-600" />
              <p className="text-2xl font-black text-green-600">{stats.present}</p>
              <p className="text-[9px] font-black text-gray-400 uppercase">Present</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border text-center">
              <UserX size={20} className="mx-auto mb-1 text-[#C8102E]" />
              <p className="text-2xl font-black text-[#C8102E]">{stats.absent}</p>
              <p className="text-[9px] font-black text-gray-400 uppercase">Absent</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border text-center">
              <TrendingUp size={20} className="mx-auto mb-1 text-amber-600" />
              <p className="text-2xl font-black">{attendanceRate}%</p>
              <p className="text-[9px] font-black text-gray-400 uppercase">Attendance Rate</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead className="bg-gray-50 border-b text-[10px] font-black uppercase text-gray-400">
                  <tr>
                    <th className="px-4 py-4">Member</th>
                    <th className="px-4 py-4 text-center">Status</th>
                    <th className="px-4 py-4">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {members.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-4 font-black text-sm">{member.name}</td>
                      <td className="px-4 py-4">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => updateAttendance(member.id, 'status', 'present')}
                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                              session[member.id]?.status === 'present' ? 'bg-green-600 text-white shadow-lg' : 'bg-gray-100 text-gray-400 hover:bg-green-100'
                            }`}
                          ><UserCheck size={18} /></button>
                          <button
                            onClick={() => updateAttendance(member.id, 'status', 'absent')}
                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                              session[member.id]?.status === 'absent' ? 'bg-[#C8102E] text-white shadow-lg' : 'bg-gray-100 text-gray-400 hover:bg-red-100'
                            }`}
                          ><UserX size={18} /></button>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        {editingNote === member.id ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={tempNote}
                              onChange={(e) => setTempNote(e.target.value)}
                              className="flex-1 bg-gray-50 px-3 py-2 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#012169]"
                              autoFocus
                            />
                            <button onClick={() => { updateAttendance(member.id, 'notes', tempNote); setEditingNote(null); }} className="p-2 bg-green-600 text-white rounded-xl"><Save size={14} /></button>
                            <button onClick={() => setEditingNote(null)} className="p-2 bg-gray-200 rounded-xl"><X size={14} /></button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between gap-2 group">
                            <p className="text-sm text-gray-500 flex-1 truncate">{session[member.id]?.notes || '—'}</p>
                            <button
                              onClick={() => { setEditingNote(member.id); setTempNote(session[member.id]?.notes || ''); }}
                              className="p-2 text-gray-400 hover:text-[#012169] opacity-0 group-hover:opacity-100 transition-all"
                            ><Edit2 size={14} /></button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {isSaving && <p className="text-right text-xs text-gray-400 animate-pulse">Saving session...</p>}
        </div>
      </DashboardShell>
    </AuthGuard>
  );
}
