import { GroupData, GroupMember } from './types';

const generateHistory = () => Array.from({ length: 12 }, () => Math.random() > 0.2 ? 'P' : 'A');

export const ALL_GROUPS: Record<string, GroupData> = {
  "1": {
    id: "1",
    name: "Victory Group",
    meetingDay: "Sunday",
    meetingTime: "3:00 PM",
    healthScore: 92,
    missionStats: { soulWinning: 8, baptisms: 3, outreachEvents: 12 },
    rotas: [
      { date: "Sun Mar 16", study: "Frank A", catering: "Agape Feast" },
      { date: "Sun Mar 23", study: "Felix B", catering: "Potluck" }
    ],
    members: [
      { id: 1, name: "Frank A", status: "member", history: generateHistory() },
      { id: 2, name: "Felix B", status: "member", history: generateHistory() },
      { id: 3, name: "Maa Ellen C", status: "member", history: generateHistory(), milestone: "60th Birthday: May 27" }
    ]
  },
  "2": {
    id: "2",
    name: "Faith Builders",
    meetingDay: "Wednesday",
    meetingTime: "6:30 PM",
    healthScore: 85,
    missionStats: { soulWinning: 5, baptisms: 2, outreachEvents: 8 },
    rotas: [{ date: "Wed Mar 19", study: "Michael A", catering: "Light Refreshments" }],
    members: [{ id: 1, name: "Michael A", status: "member", history: generateHistory() }]
  }
};

export const getGroupData = (id: string) => ALL_GROUPS[id] || ALL_GROUPS["1"];
export const getAllGroupsSummary = () => Object.values(ALL_GROUPS).map(g => ({
  id: g.id, name: g.name, meetingDay: g.meetingDay, healthScore: g.healthScore, 
  memberCount: g.members.length, soulWinning: g.missionStats.soulWinning, baptisms: g.missionStats.baptisms
}));
