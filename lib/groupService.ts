import { GroupData, GroupMember, GroupPillars, MissionStats, Rota, Prayer } from './types';

// Helper function to generate member history
const generateMemberHistory = (attendanceRate: number = 0.8): string[] => {
  const history: string[] = [];
  for (let i = 0; i < 12; i++) {
    history.push(Math.random() < attendanceRate ? 'P' : 'A');
  }
  return history;
};

// Create default members for a group
const createDefaultMembers = (groupId: string, groupNumber: number): GroupMember[] => {
  const members: GroupMember[] = [];
  
  // UK-based names for Bethel Willenhall
  const memberNames = [
    { name: "James Wilson", role: "leader", phone: "+44 7911 123401", email: "james.wilson@bethel.org.uk" },
    { name: "Sarah Johnson", role: "co-leader", phone: "+44 7911 123402", email: "sarah.johnson@bethel.org.uk" },
    { name: "David Brown", role: "member", phone: "+44 7911 123403", email: "david.brown@bethel.org.uk" },
    { name: "Emma Davis", role: "member", phone: "+44 7911 123404", email: "emma.davis@bethel.org.uk" },
    { name: "Michael Jones", role: "member", phone: "+44 7911 123405", email: "michael.jones@bethel.org.uk" },
    { name: "Lisa Taylor", role: "member", phone: "+44 7911 123406", email: "lisa.taylor@bethel.org.uk" },
    { name: "Robert Evans", role: "member", phone: "+44 7911 123407", email: "robert.evans@bethel.org.uk" },
    { name: "Claire Thomas", role: "member", phone: "+44 7911 123408", email: "claire.thomas@bethel.org.uk" },
    { name: "Paul Roberts", role: "member", phone: "+44 7911 123409", email: "paul.roberts@bethel.org.uk" },
    { name: "Helen Walker", role: "seeker", phone: "+44 7911 123410", email: "helen.walker@bethel.org.uk" },
    { name: "Andrew Hall", role: "seeker", phone: "+44 7911 123411", email: "andrew.hall@bethel.org.uk" },
    { name: "Michelle Green", role: "seeker", phone: "+44 7911 123412", email: "michelle.green@bethel.org.uk" },
  ];
  
  // Add leader and co-leader first
  for (let i = 0; i < 10; i++) {
    const isLeader = i === 0;
    const isCoLeader = i === 1;
    const isSeeker = i >= 9;
    members.push({
      id: i + 1,
      name: memberNames[i % memberNames.length].name,
      status: isSeeker ? "seeker" : "member",
      journeyStage: isLeader ? "member" : isCoLeader ? "member" : isSeeker ? "invited" : "member",
      history: generateMemberHistory(isLeader ? 0.95 : isCoLeader ? 0.9 : isSeeker ? 0.6 : 0.8),
      joinedDate: new Date(Date.now() - (i * 30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      phone: memberNames[i % memberNames.length].phone,
      email: memberNames[i % memberNames.length].email,
      notes: isLeader ? "Group leader" : isCoLeader ? "Co-leader" : "",
    });
  }
  
  return members;
};

// Create all 10 Bethel Care Groups
const createAllGroups = (): Record<string, GroupData> => {
  const groups: Record<string, GroupData> = {};
  
  const locations = [
    "Willenhall Town Centre", "Dudley Town Centre", "Birmingham City Centre", 
    "Wolverhampton City Centre", "Walsall Town Centre", "Coventry City Centre",
    "Sandwell Town Centre", "West Bromwich", "Stourbridge", "Halesowen"
  ];
  
  const meetingDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const meetingTimes = ['14:00', '18:30', '19:00', '19:30', '18:00', '19:00', '18:30', '19:30', '14:30', '18:00'];
  
  for (let i = 1; i <= 10; i++) {
    const id = i.toString();
    const groupNumber = i.toString().padStart(2, '0');
    
    groups[id] = {
      id: id,
      name: `Bethel CareGroup-${groupNumber}`,
      meetingDay: meetingDays[(i - 1) % meetingDays.length],
      meetingTime: meetingTimes[(i - 1) % meetingTimes.length],
      healthScore: 65 + Math.floor(Math.random() * 30),
      location: locations[(i - 1) % locations.length],
      leader: `Leader ${i}`,
      coLeader: `Co-Leader ${i}`,
      description: `A caring community of believers meeting weekly for fellowship, Bible study, and prayer in the ${locations[(i - 1) % locations.length]} area.`,
      pillars: { 
        fellowship: 60 + Math.floor(Math.random() * 35), 
        breakingBread: 55 + Math.floor(Math.random() * 35), 
        doctrine: 50 + Math.floor(Math.random() * 35), 
        prayer: 55 + Math.floor(Math.random() * 35) 
      },
      path: { 
        relationship: 60 + Math.floor(Math.random() * 35), 
        fellowship: 55 + Math.floor(Math.random() * 35), 
        belonging: 50 + Math.floor(Math.random() * 35), 
        discipleship: 45 + Math.floor(Math.random() * 35) 
      },
      missionStats: { 
        soulWinning: Math.floor(Math.random() * 15), 
        baptisms: Math.floor(Math.random() * 5), 
        outreachEvents: Math.floor(Math.random() * 12), 
        prayerRequests: Math.floor(Math.random() * 25), 
        answeredPrayers: Math.floor(Math.random() * 15) 
      },
      rotas: [
        { id: `${id}-rota-1`, date: new Date().toISOString().split('T')[0], study: "Opening the Word", catering: "Potluck" },
        { id: `${id}-rota-2`, date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], study: "Walking in Faith", catering: "Light Refreshments" },
        { id: `${id}-rota-3`, date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], study: "The Power of Prayer", catering: "Agape Feast" },
      ],
      prayers: [
        { id: 1, member: "Group", request: "For new members to join our fellowship", status: "Active", date: new Date().toISOString().split('T')[0], category: "Outreach", urgency: "medium" },
        { id: 2, member: "Leadership", request: "Wisdom for our group leaders", status: "Active", date: new Date().toISOString().split('T')[0], category: "Spiritual Growth", urgency: "high" },
        { id: 3, member: "Community", request: "For our local community outreach", status: "Active", date: new Date().toISOString().split('T')[0], category: "Outreach", urgency: "medium" },
      ],
      members: createDefaultMembers(id, i),
    };
  }
  
  return groups;
};

// Initialize all 10 groups
const initializeGroups = (): Record<string, GroupData> => {
  return createAllGroups();
};

// Load groups from localStorage or initialize
export const loadGroups = (): Record<string, GroupData> => {
  if (typeof window === 'undefined') return initializeGroups();
  
  const saved = localStorage.getItem('bethel_all_groups');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Ensure all 10 groups exist (if some were deleted, recreate them)
      const groups = initializeGroups();
      // Merge saved data with defaults (preserve customizations)
      Object.assign(groups, parsed);
      return groups;
    } catch (e) {
      return initializeGroups();
    }
  }
  const initial = initializeGroups();
  localStorage.setItem('bethel_all_groups', JSON.stringify(initial));
  return initial;
};

// Save all groups
export const saveGroups = (groups: Record<string, GroupData>) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('bethel_all_groups', JSON.stringify(groups));
};

// Get a single group
export const getGroup = (groupId: string): GroupData | null => {
  const groups = loadGroups();
  return groups[groupId] || null;
};

// Update a group
export const updateGroup = (groupId: string, updates: Partial<GroupData>): GroupData | null => {
  const groups = loadGroups();
  if (!groups[groupId]) return null;
  
  groups[groupId] = { ...groups[groupId], ...updates };
  saveGroups(groups);
  return groups[groupId];
};

// Add a member to a group
export const addMember = (groupId: string, member: Omit<GroupMember, 'id' | 'history'>): GroupMember | null => {
  const groups = loadGroups();
  if (!groups[groupId]) return null;
  
  const newId = Math.max(...groups[groupId].members.map(m => m.id), 0) + 1;
  const newMember: GroupMember = {
    id: newId,
    ...member,
    history: generateMemberHistory(0.8),
    joinedDate: new Date().toISOString().split('T')[0]
  };
  
  groups[groupId].members.push(newMember);
  saveGroups(groups);
  return newMember;
};

// Update a member
export const updateMember = (groupId: string, memberId: number, updates: Partial<GroupMember>): GroupMember | null => {
  const groups = loadGroups();
  if (!groups[groupId]) return null;
  
  const memberIndex = groups[groupId].members.findIndex(m => m.id === memberId);
  if (memberIndex === -1) return null;
  
  groups[groupId].members[memberIndex] = { ...groups[groupId].members[memberIndex], ...updates };
  saveGroups(groups);
  return groups[groupId].members[memberIndex];
};

// Delete a member
export const deleteMember = (groupId: string, memberId: number): boolean => {
  const groups = loadGroups();
  if (!groups[groupId]) return false;
  
  groups[groupId].members = groups[groupId].members.filter(m => m.id !== memberId);
  saveGroups(groups);
  return true;
};

// Add a prayer request
export const addPrayer = (groupId: string, prayer: Omit<Prayer, 'id'>): Prayer | null => {
  const groups = loadGroups();
  if (!groups[groupId]) return null;
  
  const newId = Math.max(...groups[groupId].prayers.map(p => p.id), 0) + 1;
  const newPrayer: Prayer = { id: newId, ...prayer };
  
  groups[groupId].prayers.push(newPrayer);
  saveGroups(groups);
  return newPrayer;
};

// Update a prayer
export const updatePrayer = (groupId: string, prayerId: number, updates: Partial<Prayer>): Prayer | null => {
  const groups = loadGroups();
  if (!groups[groupId]) return null;
  
  const prayerIndex = groups[groupId].prayers.findIndex(p => p.id === prayerId);
  if (prayerIndex === -1) return null;
  
  groups[groupId].prayers[prayerIndex] = { ...groups[groupId].prayers[prayerIndex], ...updates };
  saveGroups(groups);
  return groups[groupId].prayers[prayerIndex];
};

// Delete a prayer
export const deletePrayer = (groupId: string, prayerId: number): boolean => {
  const groups = loadGroups();
  if (!groups[groupId]) return false;
  
  groups[groupId].prayers = groups[groupId].prayers.filter(p => p.id !== prayerId);
  saveGroups(groups);
  return true;
};

// Add a rota entry
export const addRota = (groupId: string, rota: Omit<Rota, 'id'>): Rota | null => {
  const groups = loadGroups();
  if (!groups[groupId]) return null;
  
  const newRota: Rota = { id: `${groupId}-rota-${Date.now()}`, ...rota };
  groups[groupId].rotas.push(newRota);
  saveGroups(groups);
  return newRota;
};

// Update a rota
export const updateRota = (groupId: string, rotaId: string, updates: Partial<Rota>): Rota | null => {
  const groups = loadGroups();
  if (!groups[groupId]) return null;
  
  const rotaIndex = groups[groupId].rotas.findIndex(r => r.id === rotaId);
  if (rotaIndex === -1) return null;
  
  groups[groupId].rotas[rotaIndex] = { ...groups[groupId].rotas[rotaIndex], ...updates };
  saveGroups(groups);
  return groups[groupId].rotas[rotaIndex];
};

// Delete a rota
export const deleteRota = (groupId: string, rotaId: string): boolean => {
  const groups = loadGroups();
  if (!groups[groupId]) return false;
  
  groups[groupId].rotas = groups[groupId].rotas.filter(r => r.id !== rotaId);
  saveGroups(groups);
  return true;
};

// Update mission stats
export const updateMissionStats = (groupId: string, updates: Partial<MissionStats>): MissionStats | null => {
  const groups = loadGroups();
  if (!groups[groupId]) return null;
  
  groups[groupId].missionStats = { ...groups[groupId].missionStats, ...updates };
  saveGroups(groups);
  return groups[groupId].missionStats;
};

// Get all groups summary
export const getAllGroupsSummary = () => {
  const groups = loadGroups();
  return Object.values(groups).map(group => ({
    id: group.id,
    name: group.name,
    meetingDay: group.meetingDay,
    meetingTime: group.meetingTime,
    location: group.location,
    leader: group.leader,
    healthScore: group.healthScore,
    memberCount: group.members.length,
    soulWinning: group.missionStats.soulWinning,
    baptisms: group.missionStats.baptisms,
    seekers: group.members.filter(m => m.status === 'seeker').length,
    averageAttendance: Math.round(group.members.filter(m => 
      m.history.slice(-4).filter(h => h === 'P').length >= 2
    ).length / group.members.length * 100)
  }));
};
