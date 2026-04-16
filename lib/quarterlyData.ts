// lib/quarterlyData.ts
import { Quarter, Meeting, Backslider, WeeklyReport } from './types';

export const QUARTERS: Quarter[] = [
  { id: '2026-q1', year: 2026, quarter: 1, name: 'Q1 2026 (Jan-Mar)', startDate: '2026-01-01', endDate: '2026-03-31' },
  { id: '2026-q2', year: 2026, quarter: 2, name: 'Q2 2026 (Apr-Jun)', startDate: '2026-04-01', endDate: '2026-06-30' },
  { id: '2026-q3', year: 2026, quarter: 3, name: 'Q3 2026 (Jul-Sep)', startDate: '2026-07-01', endDate: '2026-09-30' },
  { id: '2026-q4', year: 2026, quarter: 4, name: 'Q4 2026 (Oct-Dec)', startDate: '2026-10-01', endDate: '2026-12-31' }
];

export const DAY_NAMES: Record<number, string> = {
  0: 'Sunday', 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday'
};

export const GROUP_MEETING_DAYS: Record<string, number> = {
  '1': 0, '2': 3, '3': 2, '4': 0, '5': 1, '6': 5, '7': 2, '8': 4, '9': 0, '10': 6
};

export const generateQuarterlyMeetings = (groupId: string, quarter: Quarter): Meeting[] => {
  const meetings: Meeting[] = [];
  const startDate = new Date(quarter.startDate);
  const endDate = new Date(quarter.endDate);
  let week = 1;
  const meetingDay = GROUP_MEETING_DAYS[groupId] || 3;
  const meetingDayName = DAY_NAMES[meetingDay];
  const topics = [
    'The Power of Prayer', 'Understanding God\'s Word', 'Walking in Faith', 
    'Building Healthy Relationships', 'The Fruit of the Spirit', 'Overcoming Trials', 
    'Sharing Your Testimony', 'The Great Commission', 'Living a Life of Worship', 
    'Stewardship and Generosity', 'Finding Your Purpose', 'Community and Fellowship'
  ];
  
  let currentDate = new Date(startDate);
  while (currentDate.getDay() !== meetingDay) { 
    currentDate.setDate(currentDate.getDate() + 1); 
  }
  
  while (currentDate <= endDate) {
    meetings.push({
      id: `${groupId}-${quarter.id}-week${week}`,
      date: currentDate.toISOString().split('T')[0],
      week: week,
      day: meetingDayName,
      topic: topics[(week - 1) % topics.length],
      leader: 'Leader',
      attendance: Math.floor(Math.random() * 5) + 7,
      notes: '',
      status: currentDate < new Date() ? 'completed' : 'scheduled'
    });
    week++;
    currentDate.setDate(currentDate.getDate() + 7);
  }
  return meetings;
};

export const generateBacksliders = (groupId: string, members: any[], meetings: Meeting[]): Backslider[] => {
  const backsliders: Backslider[] = [];
  if (!members) return [];
  
  members.forEach(member => {
    if (Math.random() > 0.85) {
      backsliders.push({
        id: `${groupId}-${member.id}`,
        memberId: member.id,
        memberName: member.name,
        groupId,
        consecutiveAbsences: 3,
        lastAttendance: '2026-03-01',
        alertLevel: 'warning',
        notes: '',
        contactAttempts: 0,
        lastContact: null
      });
    }
  });
  return backsliders;
};

export const saveQuarterlyData = (groupId: string, key: string, data: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(`quarterly_${groupId}_${key}`, JSON.stringify(data));
  }
};

export const getQuarterlyData = (groupId: string, key: string) => {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(`quarterly_${groupId}_${key}`);
  return data ? JSON.parse(data) : null;
};

export const getWeeklyReports = (groupId: string): WeeklyReport[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem(`weekly_reports_${groupId}`);
  return saved ? JSON.parse(saved) : [];
};

export const saveWeeklyReport = (groupId: string, report: WeeklyReport) => {
  if (typeof window === 'undefined') return;
  const reports = getWeeklyReports(groupId);
  const existingIndex = reports.findIndex(r => r.meetingId === report.meetingId);
  const updatedReports = existingIndex >= 0 
    ? reports.map((r, i) => i === existingIndex ? report : r)
    : [...reports, report];
  localStorage.setItem(`weekly_reports_${groupId}`, JSON.stringify(updatedReports));
};

export const getWeeklyReportByMeeting = (groupId: string, meetingId: string): WeeklyReport | null => {
  const reports = getWeeklyReports(groupId);
  return reports.find(r => r.meetingId === meetingId) || null;
};
