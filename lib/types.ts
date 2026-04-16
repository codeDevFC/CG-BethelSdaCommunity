
export interface User {
  id: string;
  name: string;
  username: string;
  role: 'admin' | 'pastor' | 'coordinator' | 'elder' | 'deacon' | 'member';
  groupId?: string;
}

export interface GroupMember {
  id: number;
  name: string;
  status: 'member' | 'seeker';
  journeyStage?: string;
  milestone?: string | null;
  history: string[];
  phone?: string;
  email?: string;
  notes?: string;
  joinedDate?: string;
}

export interface GroupPillars {
  fellowship: number;
  breakingBread: number;
  doctrine: number;
  prayer: number;
}

export interface GroupPath {
  relationship: number;
  fellowship: number;
  belonging: number;
  discipleship: number;
}

export interface MissionStats {
  soulWinning: number;
  baptisms: number;
  outreachEvents: number;
  prayerRequests: number;
  answeredPrayers: number;
}

export interface Rota {
  id?: string;
  date: string;
  study: string;
  catering: string;
}

export interface Prayer {
  id: number;
  member: string;
  request: string;
  status: 'Active' | 'Answered';
  date: string;
  promise?: string;
  category?: string;
  urgency?: 'high' | 'medium' | 'low';
  answeredDate?: string;
  testimony?: string;
}

export interface GroupData {
  id: string;
  name: string;
  meetingDay: string;
  meetingTime: string;
  healthScore: number;
  pillars: GroupPillars;
  path: GroupPath;
  missionStats: MissionStats;
  rotas: Rota[];
  prayers: Prayer[];
  members: GroupMember[];
  description?: string;
  location?: string;
  leader?: string;
  coLeader?: string;
}

export interface Quarter {
  id: string;
  year: number;
  quarter: number;
  name: string;
  startDate: string;
  endDate: string;
}

export interface Meeting {
  id: string;
  date: string;
  week: number;
  day: string;
  topic: string;
  leader: string;
  attendance: number;
  notes: string;
  status: 'completed' | 'scheduled' | 'cancelled';
}

export interface Backslider {
  id: string;
  memberId: number;
  memberName: string;
  groupId: string;
  consecutiveAbsences: number;
  lastAttendance: string;
  alertLevel: 'warning' | 'critical' | 'recovered';
  notes: string;
  contactAttempts: number;
  lastContact: string | null;
}

export interface WeeklyReport {
  id: string;
  meetingId: string;
  weekNumber: number;
  date: string;
  topic: string;
  leader: string;
  attendance: number;
  prayerRequests: string[];
  answeredPrayers: string[];
  testimonies: string[];
  challenges: string[];
  observations: string;
  actionItems: string[];
  followUpNeeded: { member: string; reason: string }[];
  submittedBy: string;
  submittedAt: string;
  status: 'draft' | 'submitted' | 'approved';
}
