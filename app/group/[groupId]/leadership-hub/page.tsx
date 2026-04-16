"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/contexts/AuthContext";
import { getGroup } from "@/lib/groupService";
import { 
  ClipboardList, AlertTriangle, Calendar, Edit2, Save, 
  Phone, MessageCircle, ChevronDown, ChevronUp
} from "lucide-react";
import toast from "react-hot-toast";

const QUARTERS = [
  { id: 'q1', name: 'Q1 (Jan-Mar)', startDate: '2026-01-01', endDate: '2026-03-31' },
  { id: 'q2', name: 'Q2 (Apr-Jun)', startDate: '2026-04-01', endDate: '2026-06-30' },
  { id: 'q3', name: 'Q3 (Jul-Sep)', startDate: '2026-07-01', endDate: '2026-09-30' },
  { id: 'q4', name: 'Q4 (Oct-Dec)', startDate: '2026-10-01', endDate: '2026-12-31' },
];

const generateWeeklyMeetings = (groupId: string, quarter: any, meetingDay: string) => {
  const meetings = [];
  const startDate = new Date(quarter.startDate);
  const endDate = new Date(quarter.endDate);
  let week = 1;
  const days: Record<string, number> = { Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 };
  const targetDay = days[meetingDay] || 3;
  let currentDate = new Date(startDate);
  while (currentDate.getDay() !== targetDay) { currentDate.setDate(currentDate.getDate() + 1); }
  const topics = ['Opening the Word', 'Walking in Faith', 'Building Community', 'The Power of Prayer', 'Sharing Your Testimony', 'Understanding Grace'];
  while (currentDate <= endDate && week <= 13) {
    meetings.push({
      id: `${groupId}-${quarter.id}-week${week}`,
      date: currentDate.toISOString().split('T')[0],
      week: week,
      topic: topics[(week - 1) % topics.length],
      status: currentDate < new Date() ? 'completed' : 'scheduled'
    });
    week++;
    currentDate.setDate(currentDate.getDate() + 7);
  }
  return meetings;
};

export default function LeadershipHubPage() {
  const params = useParams();
  const groupId = params?.groupId as string;
  const { canAccessGroup } = useAuth();
  const [group, setGroup] = useState<any>(null);
  const [meetings, setMeetings] = useState<any[]>([]);
  const [backsliders, setBacksliders] = useState<any[]>([]);
  const [selectedQuarter, setSelectedQuarter] = useState(QUARTERS[0]);
  const [showBacksliders, setShowBacksliders] = useState(true);
  const [showMeetings, setShowMeetings] = useState(true);
  const [editingMeeting, setEditingMeeting] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  useEffect(() => {
    if (groupId && canAccessGroup(groupId)) {
      setGroup(getGroup(groupId));
    }
  }, [groupId, canAccessGroup]);

  useEffect(() => {
    if (group) {
      const saved = localStorage.getItem(`quarterly_meetings_${groupId}_${selectedQuarter.id}`);
      if (saved) {
        setMeetings(JSON.parse(saved));
      } else {
        const generated = generateWeeklyMeetings(groupId, selectedQuarter, group.meetingDay);
        setMeetings(generated);
        localStorage.setItem(`quarterly_meetings_${groupId}_${selectedQuarter.id}`, JSON.stringify(generated));
      }
      const bs = (group.members || [])
        .filter((m: any) => (m.history?.slice(-4).filter((h: string) => h === 'A').length || 0) >= 2)
        .map((m: any) => ({ id: m.id, name: m.name, absences: m.history?.slice(-3).filter((h: string) => h === 'A').length || 0 }));
      setBacksliders(bs);
    }
  }, [group, selectedQuarter, groupId]);

  const handleSaveMeeting = () => {
    const updated = meetings.map(m => m.id === editingMeeting ? editForm : m);
    setMeetings(updated);
    localStorage.setItem(`quarterly_meetings_${groupId}_${selectedQuarter.id}`, JSON.stringify(updated));
    setEditingMeeting(null);
    toast.success('Meeting updated');
  };

  if (!group) return <div className="p-20 text-center font-black">Loading...</div>;

  return (
    <AuthGuard>
      <DashboardShell>
        <div className="space-y-8 pb-20">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-black uppercase" style={{ fontFamily: 'Georgia, serif' }}>Leadership Hub</h1>
            <select value={selectedQuarter.id} onChange={(e) => setSelectedQuarter(QUARTERS.find(q => q.id === e.target.value) || QUARTERS[0])} className="bg-white border rounded-xl px-4 py-2 font-black text-sm">
              {QUARTERS.map(q => <option key={q.id} value={q.id}>{q.name}</option>)}
            </select>
          </div>

          {backsliders.length > 0 && (
            <div className="bg-red-50 rounded-3xl p-6 border-2 border-red-200">
              <button onClick={() => setShowBacksliders(!showBacksliders)} className="w-full flex justify-between items-center text-left">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="text-red-600" />
                  <h3 className="text-xl font-black text-red-800 uppercase">Follow-up Required</h3>
                </div>
                {showBacksliders ? <ChevronUp /> : <ChevronDown />}
              </button>
              {showBacksliders && (
                <div className="mt-6 space-y-4">
                  {backsliders.map(b => (
                    <div key={b.id} className="bg-white rounded-2xl p-5 border-l-8 border-red-500 flex justify-between items-center">
                      <div>
                        <p className="font-black text-lg">{b.name}</p>
                        <p className="text-[10px] font-black text-red-600 uppercase">{b.absences} absences</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 bg-blue-50 text-blue-700 rounded-xl"><Phone size={16}/></button>
                        <button className="p-2 bg-green-50 text-green-700 rounded-xl"><MessageCircle size={16}/></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="bg-white rounded-3xl p-6 border shadow-sm">
            <button onClick={() => setShowMeetings(!showMeetings)} className="w-full flex justify-between items-center text-left">
              <div className="flex items-center gap-3">
                <Calendar className="text-[#012169]" />
                <h3 className="text-2xl font-black uppercase" style={{ fontFamily: 'Georgia, serif' }}>Quarterly Schedule</h3>
              </div>
              {showMeetings ? <ChevronUp /> : <ChevronDown />}
            </button>
            {showMeetings && (
              <div className="space-y-4 mt-6">
                {meetings.map(m => (
                  <div key={m.id} className="border rounded-2xl p-4">
                    {editingMeeting === m.id ? (
                      <div className="space-y-3">
                        <input type="text" value={editForm.topic} onChange={e => setEditForm({...editForm, topic: e.target.value})} className="w-full p-2 border rounded-xl" />
                        <div className="flex gap-2 justify-end">
                          <button onClick={() => setEditingMeeting(null)} className="px-4 py-2 bg-gray-100 rounded-xl text-xs font-black">Cancel</button>
                          <button onClick={handleSaveMeeting} className="px-4 py-2 bg-green-600 text-white rounded-xl text-xs font-black">Save</button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-black text-sm">{new Date(m.date).toLocaleDateString()}</p>
                          <p className="font-black text-lg">{m.topic}</p>
                        </div>
                        <button onClick={() => { setEditingMeeting(m.id); setEditForm(m); }} className="p-2 bg-gray-100 rounded-xl"><Edit2 size={16}/></button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-[#012169] rounded-3xl p-8 text-white">
            <div className="flex items-center gap-4 mb-6">
              <ClipboardList size={32} />
              <h3 className="text-2xl font-black uppercase" style={{ fontFamily: 'Georgia, serif' }}>Leadership Agenda</h3>
            </div>
            <div className="space-y-3">
              {["Opening Prayer", "Review Last Report", "Follow-up Status", "Next Week Planning"].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white/10 rounded-2xl">
                  <input type="checkbox" className="w-5 h-5" />
                  <p className="font-black text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DashboardShell>
    </AuthGuard>
  );
}
