"use client";
import { use, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/contexts/AuthContext";
import { getGroup, updateGroup } from "@/lib/groupService";
import Link from "next/link";
import { 
  ArrowLeft, Calendar as CalendarIcon, UserCheck, UserX, Save, Clock,
  TrendingUp, Users, BarChart3, Download, Printer, Filter,
  ChevronLeft, ChevronRight, AlertCircle, CheckCircle2
} from "lucide-react";
import toast from "react-hot-toast";

interface Member {
  id: number;
  name: string;
  status: string;
  history: string[];
}

interface AttendanceRecord {
  date: string;
  records: Record<number, { status: string; notes: string }>;
}

export default function AttendancePage() {
  const params = useParams();
  const groupId = params?.groupId as string;
  const { hasPermission, canAccessGroup } = useAuth();
  const [group, setGroup] = useState<any>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [session, setSession] = useState<Record<number, { status: string; notes: string }>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [viewMode, setViewMode] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isClient, setIsClient] = useState(false);
  
  const isLeader = hasPermission(['coordinator', 'pastor', 'admin']);

  // Mark when component is mounted on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (groupId && canAccessGroup(groupId)) {
      loadGroup();
    }
  }, [groupId]);

  useEffect(() => {
    if (isClient && members.length > 0) {
      loadAttendance();
    }
  }, [selectedDate, members, viewMode, selectedWeek, selectedMonth, selectedYear, isClient]);

  const loadGroup = () => {
    const data = getGroup(groupId);
    setGroup(data);
    loadMembers(data);
  };

  const loadMembers = (groupData: any) => {
    if (typeof window === 'undefined') return;
    
    const saved = localStorage.getItem(`group_members_${groupId}`);
    if (saved) {
      setMembers(JSON.parse(saved));
    } else {
      setMembers(groupData?.members || []);
      localStorage.setItem(`group_members_${groupId}`, JSON.stringify(groupData?.members || []));
    }
  };

  const loadAttendance = () => {
    if (typeof window === 'undefined') return;
    
    const saved = localStorage.getItem(`attendance_${groupId}_${selectedDate}`);
    if (saved) {
      setSession(JSON.parse(saved));
    } else {
      const initial: Record<number, { status: string; notes: string }> = {};
      members.forEach(m => { initial[m.id] = { status: 'present', notes: '' }; });
      setSession(initial);
    }
  };

  const updateAttendance = (id: number, status: string) => {
    if (typeof window === 'undefined') return;
    
    const updated = { ...session, [id]: { ...session[id], status } };
    setSession(updated);
    saveAttendance(updated);
    
    // Update member history
    const updatedMembers = members.map(member => {
      if (member.id === id) {
        const newHistory = [status === 'present' ? 'P' : status === 'late' ? 'L' : 'A', ...(member.history || []).slice(0, 11)];
        return { ...member, history: newHistory };
      }
      return member;
    });
    setMembers(updatedMembers);
    localStorage.setItem(`group_members_${groupId}`, JSON.stringify(updatedMembers));
    if (group) {
      updateGroup(groupId, { members: updatedMembers });
    }
  };

  const saveAttendance = async (data: Record<number, { status: string; notes: string }>) => {
    if (typeof window === 'undefined') return;
    
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
    let present = 0, absent = 0, late = 0;
    Object.values(session).forEach(record => {
      if (record?.status === 'present') present++;
      else if (record?.status === 'late') late++;
      else if (record?.status === 'absent') absent++;
    });
    return { present, absent, late, total: members.length };
  };

  // Get weekly stats
  const getWeeklyStats = () => {
    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const stats = weekDays.map(day => ({ day, present: 0, absent: 0, late: 0, total: members.length }));
    return stats;
  };

  // Get monthly stats - FIXED: wrapped in client-side check
  const getMonthlyStats = () => {
    if (typeof window === 'undefined') return [];
    
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const monthlyData = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const saved = localStorage.getItem(`attendance_${groupId}_${date}`);
      if (saved) {
        const data = JSON.parse(saved);
        let present = 0, absent = 0, late = 0;
        Object.values(data).forEach((record: any) => {
          if (record?.status === 'present') present++;
          else if (record?.status === 'late') late++;
          else if (record?.status === 'absent') absent++;
        });
        monthlyData.push({ date, present, absent, late, total: members.length });
      }
    }
    return monthlyData;
  };

  const stats = getStats();
  const attendanceRate = stats.total > 0 ? Math.round(((stats.present + stats.late) / stats.total) * 100) : 0;
  const weeklyStats = getWeeklyStats();
  const monthlyStats = getMonthlyStats();

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'present': return <span className="text-[8px] font-black px-2 py-0.5 rounded-full bg-green-100 text-green-700">Present</span>;
      case 'late': return <span className="text-[8px] font-black px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">Late</span>;
      case 'absent': return <span className="text-[8px] font-black px-2 py-0.5 rounded-full bg-red-100 text-red-700">Absent</span>;
      default: return null;
    }
  };

  const exportReport = () => {
    if (typeof window === 'undefined') return;
    
    const report = `
Bethel Willenhall CARE Group - Attendance Report
Group: ${group?.name}
Date: ${new Date().toLocaleDateString()}
Period: ${viewMode.toUpperCase()}

Summary:
- Total Members: ${stats.total}
- Present: ${stats.present}
- Late: ${stats.late}
- Absent: ${stats.absent}
- Attendance Rate: ${attendanceRate}%

Member Details:
${members.map(m => `- ${m.name}: ${Object.values(session).find(s => s?.status)?.status || 'Not recorded'}`).join('\n')}

Report generated by Bethel Willenhall Church System
    `;
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance-${group?.name}-${selectedDate}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Report exported');
  };

  if (!canAccessGroup(groupId)) {
    return (
      <AuthGuard>
        <DashboardShell>
          <div className="text-center py-20">
            <p className="text-gray-500">You don't have access to this group's attendance.</p>
          </div>
        </DashboardShell>
      </AuthGuard>
    );
  }

  if (!group) return <div className="p-20 text-center font-black">Loading Attendance...</div>;

  return (
    <AuthGuard>
      <DashboardShell>
        <div className="space-y-6 pb-20">
          {/* Header */}
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <Link href={`/group/${groupId}`} className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition">
                <ArrowLeft size={20} />
              </Link>
              <div>
                <h1 className="text-3xl lg:text-4xl font-black tracking-tighter uppercase" style={{ fontFamily: 'Georgia, serif' }}>
                  Attendance
                </h1>
                <p className="text-gray-500 text-sm">{group.name} • Track weekly participation</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={exportReport}
                className="px-4 py-2 bg-gray-100 rounded-xl text-[10px] font-black flex items-center gap-2 hover:bg-gray-200 transition"
              >
                <Download size={14} /> Export
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-gray-100 rounded-xl text-[10px] font-black flex items-center gap-2 hover:bg-gray-200 transition"
              >
                <Printer size={14} /> Print
              </button>
            </div>
          </div>

          {/* View Mode Tabs */}
          <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl w-fit">
            {['daily', 'weekly', 'monthly'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as any)}
                className={`px-6 py-2 rounded-xl font-black text-[10px] uppercase transition-all ${
                  viewMode === mode ? 'bg-[#012169] text-white shadow-md' : 'text-gray-500'
                }`}
              >
                {mode === 'daily' ? 'Daily View' : mode === 'weekly' ? 'Weekly View' : 'Monthly View'}
              </button>
            ))}
          </div>

          {/* Daily View */}
          {viewMode === 'daily' && (
            <>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4 bg-white p-4 rounded-2xl border">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="bg-gray-50 p-3 rounded-2xl flex items-center gap-2">
                    <CalendarIcon size={18} className="text-[#C8102E]" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="font-black text-sm outline-none bg-transparent"
                    />
                  </div>
                  <div className="bg-[#012169] px-4 py-3 rounded-2xl text-center text-white">
                    <p className="text-[10px] font-black uppercase">Attendance Rate</p>
                    <p className="text-xl font-black">{attendanceRate}%</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-green-500"></div><span>Present ({stats.present})</span></div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-yellow-500"></div><span>Late ({stats.late})</span></div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-red-500"></div><span>Absent ({stats.absent})</span></div>
                  </div>
                </div>
                {isLeader && (
                  <button
                    onClick={() => saveAttendance(session)}
                    disabled={isSaving}
                    className="bg-green-600 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-green-700 transition shadow-lg flex items-center gap-2"
                  >
                    <Save size={14} /> {isSaving ? 'Saving...' : 'Save Attendance'}
                  </button>
                )}
              </div>

              <div className="bg-white rounded-2xl border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[500px]">
                    <thead className="bg-gray-50 border-b text-[10px] font-black uppercase text-gray-400">
                      <tr>
                        <th className="px-4 py-4">Member</th>
                        <th className="px-4 py-4 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {members.map((member) => (
                        <tr key={member.id} className="hover:bg-gray-50/50">
                          <td className="px-4 py-4 font-black text-sm">
                            {member.name}
                            {member.status === 'seeker' && (
                              <span className="ml-2 text-[8px] font-black px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">Seeker</span>
                            )}
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => updateAttendance(member.id, 'present')}
                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                                  session[member.id]?.status === 'present' ? 'bg-green-600 text-white shadow-lg' : 'bg-gray-100 text-gray-400 hover:bg-green-100'
                                }`}
                                title="Present"
                              >
                                <UserCheck size={18} />
                              </button>
                              <button
                                onClick={() => updateAttendance(member.id, 'late')}
                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                                  session[member.id]?.status === 'late' ? 'bg-yellow-500 text-white shadow-lg' : 'bg-gray-100 text-gray-400 hover:bg-yellow-100'
                                }`}
                                title="Late"
                              >
                                <Clock size={18} />
                              </button>
                              <button
                                onClick={() => updateAttendance(member.id, 'absent')}
                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                                  session[member.id]?.status === 'absent' ? 'bg-red-600 text-white shadow-lg' : 'bg-gray-100 text-gray-400 hover:bg-red-100'
                                }`}
                                title="Absent"
                              >
                                <UserX size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Weekly View */}
          {viewMode === 'weekly' && (
            <div className="bg-white rounded-2xl border overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <h3 className="font-black">Weekly Summary</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b text-[10px] font-black uppercase text-gray-400">
                    <tr><th className="px-4 py-3">Day</th><th className="px-4 py-3">Present</th><th className="px-4 py-3">Late</th><th className="px-4 py-3">Absent</th><th className="px-4 py-3">Rate</th></tr>
                  </thead>
                  <tbody>
                    {weeklyStats.map((day, idx) => (
                      <tr key={idx} className="border-b"><td className="px-4 py-3 font-black">{day.day}</td><td className="px-4 py-3 text-green-600">{day.present}</td><td className="px-4 py-3 text-yellow-600">{day.late}</td><td className="px-4 py-3 text-red-600">{day.absent}</td><td className="px-4 py-3 font-black">{Math.round(((day.present + day.late) / (day.total || 1)) * 100)}%</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Monthly View */}
          {viewMode === 'monthly' && (
            <div className="bg-white rounded-2xl border overflow-hidden">
              <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <button onClick={() => setSelectedMonth(m => m - 1)} className="p-1 hover:bg-gray-200 rounded"><ChevronLeft size={16} /></button>
                  <span className="font-black">{new Date(selectedYear, selectedMonth).toLocaleString('default', { month: 'long' })} {selectedYear}</span>
                  <button onClick={() => setSelectedMonth(m => m + 1)} className="p-1 hover:bg-gray-200 rounded"><ChevronRight size={16} /></button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b text-[10px] font-black uppercase text-gray-400">
                    <tr><th className="px-4 py-3">Date</th><th className="px-4 py-3">Present</th><th className="px-4 py-3">Late</th><th className="px-4 py-3">Absent</th><th className="px-4 py-3">Rate</th></tr>
                  </thead>
                  <tbody>
                    {monthlyStats.map((day, idx) => (
                      <tr key={idx} className="border-b"><td className="px-4 py-3 text-sm">{day.date}</td><td className="px-4 py-3 text-green-600">{day.present}</td><td className="px-4 py-3 text-yellow-600">{day.late}</td><td className="px-4 py-3 text-red-600">{day.absent}</td><td className="px-4 py-3 font-black">{Math.round(((day.present + day.late) / (day.total || 1)) * 100)}%</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </DashboardShell>
    </AuthGuard>
  );
}