"use client";
import { use, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/contexts/AuthContext";
import { getGroup } from "@/lib/groupService";
import Link from "next/link";
import { ArrowLeft, Calendar as CalendarIcon, Plus, Clock, MapPin, Users, Heart } from "lucide-react";
import toast from "react-hot-toast";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: string;
  description: string;
  location: string;
}

export default function CalendarPage() {
  const params = useParams();
  const groupId = params?.groupId as string;
  const { canAccessGroup, hasPermission } = useAuth();
  const [group, setGroup] = useState<any>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const isLeader = hasPermission(['coordinator', 'pastor', 'admin']);

  useEffect(() => {
    if (groupId && canAccessGroup(groupId)) {
      const data = getGroup(groupId);
      setGroup(data);
      loadEvents();
    }
  }, [groupId]);

  const loadEvents = () => {
    const saved = localStorage.getItem(`calendar_events_${groupId}`);
    if (saved) {
      setEvents(JSON.parse(saved));
    } else {
      // Sample events
      const sampleEvents: Event[] = [
        {
          id: "1",
          title: "Weekly Care Group Meeting",
          date: new Date().toISOString().split('T')[0],
          time: "19:00",
          type: "meeting",
          description: "Regular weekly gathering for fellowship and Bible study",
          location: group?.location || "Church Hall"
        },
        {
          id: "2",
          title: "Agape Feast",
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          time: "18:30",
          type: "agape",
          description: "Potluck dinner and fellowship",
          location: "Member's Home"
        },
        {
          id: "3",
          title: "Prayer Night",
          date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          time: "19:30",
          type: "prayer",
          description: "Special evening of prayer and intercession",
          location: "Church Hall"
        }
      ];
      setEvents(sampleEvents);
      localStorage.setItem(`calendar_events_${groupId}`, JSON.stringify(sampleEvents));
    }
  };

  const getEventTypeColor = (type: string) => {
    switch(type) {
      case 'meeting': return 'bg-blue-100 text-blue-700';
      case 'agape': return 'bg-red-100 text-red-700';
      case 'prayer': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredEvents = events.filter(e => e.date === selectedDate);
  const upcomingEvents = events.filter(e => new Date(e.date) >= new Date()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (!canAccessGroup(groupId)) {
    return (
      <AuthGuard>
        <DashboardShell>
          <div className="text-center py-20">
            <p className="text-gray-500">You don't have access to this group's calendar.</p>
          </div>
        </DashboardShell>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <DashboardShell>
        <div className="space-y-6 pb-20">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Link href={`/group/${groupId}`} className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CalendarIcon size={20} className="text-[#547189]" />
                <span className="text-[10px] font-black text-[#547189] uppercase tracking-wider">Schedule</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-black tracking-tighter" style={{ fontFamily: 'Georgia, serif' }}>
                Calendar
              </h1>
              <p className="text-gray-500 text-sm">{group?.name} • Upcoming events and meetings</p>
            </div>
          </div>

          {/* Date Picker */}
          <div className="glass-card p-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-3 glass-card border focus:border-[#547189] outline-none"
            />
          </div>

          {/* Events for selected date */}
          <div className="glass-card p-5">
            <h3 className="font-black text-lg mb-4">
              Events for {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h3>
            {filteredEvents.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No events scheduled for this day</p>
            ) : (
              <div className="space-y-3">
                {filteredEvents.map(event => (
                  <div key={event.id} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${getEventTypeColor(event.type)}`}>
                        {event.type.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500">{event.time}</span>
                    </div>
                    <h4 className="font-black">{event.title}</h4>
                    {event.location && (
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <MapPin size={10} /> {event.location}
                      </p>
                    )}
                    {event.description && (
                      <p className="text-xs text-gray-600 mt-2">{event.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upcoming Events */}
          <div className="glass-card p-5">
            <h3 className="font-black text-lg mb-4">Upcoming Events</h3>
            {upcomingEvents.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No upcoming events</p>
            ) : (
              <div className="space-y-3">
                {upcomingEvents.slice(0, 5).map(event => (
                  <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-black text-sm">{event.title}</p>
                      <p className="text-[10px] text-gray-500">
                        {new Date(event.date).toLocaleDateString()} • {event.time}
                      </p>
                    </div>
                    <span className={`text-[8px] font-black px-2 py-0.5 rounded-full ${getEventTypeColor(event.type)}`}>
                      {event.type}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DashboardShell>
    </AuthGuard>
  );
}
