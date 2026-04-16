"use client";
import { use, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/contexts/AuthContext";
import { getGroup, updateGroup } from "@/lib/groupService";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Shield, Crown, Heart, Mail, Phone, 
  MessageCircle, Edit2, Save, X, UserPlus, Trash2,
  MoreVertical, Clock, Calendar, Award, Target, Church,
  Users, Star, Sparkles, Lock, Key, CheckCircle2,
  Copy, Eye, EyeOff, AlertCircle, UserCheck, UserX
} from "lucide-react";
import toast from "react-hot-toast";

// Team Member Interface
interface TeamMember {
  id: string;
  role: string;
  name: string;
  firstName: string;
  lastName: string;
  responsibility: string;
  email: string;
  phone: string;
  joinedDate: string;
  isActive: boolean;
  username: string;
  password?: string;
  permissions: ('admin' | 'pastor' | 'coordinator' | 'elder' | 'deacon' | 'member')[];
}

// Pastor Interface
interface Pastor {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'senior-pastor' | 'associate-pastor';
  groupIds: string[];
  joinedDate: string;
  isActive: boolean;
  username: string;
  password?: string;
}

// Helper function to generate username from name
const generateUsername = (firstName: string, lastName: string): string => {
  // Take first 7 letters: if name has less than 7, take remaining from surname
  const combined = firstName + lastName;
  const username = combined.slice(0, 7);
  return username;
};

// Helper function to generate password for team members
const generateTeamPassword = (firstName: string, lastName: string, role: string): string => {
  const username = generateUsername(firstName, lastName);
  if (role === 'pastor') {
    return `${username}@BWcg777`;
  } else if (role === 'coordinator' || role === 'elder' || role === 'deacon') {
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    return `${username}@BWcg${month}`;
  }
  return `${username}@member`;
};

// Default Pastors
const DEFAULT_PASTORS: Pastor[] = [
  {
    id: 'pastor-1',
    name: 'Pastor Dan Majaducon',
    firstName: 'Dan',
    lastName: 'Majaducon',
    email: 'dan.majaducon@bethelwillenhall.org.uk',
    phone: '+44 7911 123456',
    role: 'senior-pastor',
    groupIds: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    joinedDate: '2023-01-01',
    isActive: true,
    username: generateUsername('Dan', 'Majaducon'),
  },
  {
    id: 'pastor-2',
    name: 'Pastor Thando Mlalazi',
    firstName: 'Thando',
    lastName: 'Mlalazi',
    email: 'thando.mlalazi@bethelwillenhall.org.uk',
    phone: '+44 7911 123457',
    role: 'associate-pastor',
    groupIds: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    joinedDate: '2023-06-01',
    isActive: true,
    username: generateUsername('Thando', 'Mlalazi'),
  }
];

// Default Leadership Team
const DEFAULT_LEADERS: TeamMember[] = [
  {
    id: 'coord-1',
    role: 'Group Coordinator',
    name: 'Frank Adams',
    firstName: 'Frank',
    lastName: 'Adams',
    responsibility: 'Oversees all Care Groups and coordinates activities across groups',
    email: 'frank.adams@bethelwillenhall.org.uk',
    phone: '+44 7911 123458',
    joinedDate: '2023-01-15',
    isActive: true,
    username: generateUsername('Frank', 'Adams'),
    permissions: ['coordinator'],
  },
  {
    id: 'coord-2',
    role: 'Assistant Coordinator',
    name: 'Felix Cobby',
    firstName: 'Felix',
    lastName: 'Cobby',
    responsibility: 'Supports coordinator and manages discipleship training',
    email: 'felix.cobby@bethelwillenhall.org.uk',
    phone: '+44 7911 123459',
    joinedDate: '2023-02-20',
    isActive: true,
    username: generateUsername('Felix', 'Cobby'),
    permissions: ['coordinator'],
  },
  {
    id: 'coord-3',
    role: 'Discipleship Coordinator',
    name: 'Maa Ellen Chen',
    firstName: 'Ellen',
    lastName: 'Chen',
    responsibility: 'Manages FAST discipleship program and mentor matching',
    email: 'ellen.chen@bethelwillenhall.org.uk',
    phone: '+44 7911 123460',
    joinedDate: '2023-03-10',
    isActive: true,
    username: generateUsername('Ellen', 'Chen'),
    permissions: ['coordinator'],
  },
  {
    id: 'coord-4',
    role: 'Prayer Coordinator',
    name: 'Sarah Davis',
    firstName: 'Sarah',
    lastName: 'Davis',
    responsibility: 'Manages prayer requests, prayer chain, and intercessory teams',
    email: 'sarah.davis@bethelwillenhall.org.uk',
    phone: '+44 7911 123461',
    joinedDate: '2023-04-05',
    isActive: true,
    username: generateUsername('Sarah', 'Davis'),
    permissions: ['coordinator'],
  },
  {
    id: 'coord-5',
    role: 'Worship Coordinator',
    name: 'Ben Edwards',
    firstName: 'Ben',
    lastName: 'Edwards',
    responsibility: 'Coordinates worship teams and music for gatherings',
    email: 'ben.edwards@bethelwillenhall.org.uk',
    phone: '+44 7911 123462',
    joinedDate: '2023-05-12',
    isActive: true,
    username: generateUsername('Ben', 'Edwards'),
    permissions: ['coordinator'],
  }
];

// Team Card Component Props
interface TeamCardProps {
  member: TeamMember;
  isLeader: boolean;
  isEditing: boolean;
  editForm: Partial<TeamMember>;
  onEdit: (member: TeamMember) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
  setEditForm: (form: Partial<TeamMember>) => void;
}

// Pastor Card Component
function PastorCard({ pastor, isLeader }: { pastor: Pastor; isLeader: boolean }) {
  const [showPassword, setShowPassword] = useState(false);
  const password = generateTeamPassword(pastor.firstName, pastor.lastName, 'pastor');
  const username = pastor.username;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  return (
    <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-purple-700 to-indigo-700 p-5 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <Church size={28} className="text-[#8DC63F]" />
            </div>
            <div>
              <p className="text-[10px] font-black text-purple-200 uppercase tracking-wider">
                {pastor.role === 'senior-pastor' ? 'Senior Pastor' : 'Associate Pastor'}
              </p>
              <p className="font-black text-xl">{pastor.name}</p>
            </div>
          </div>
          <div className="bg-white/20 px-3 py-1 rounded-full text-[9px] font-black">
            Oversees All Groups
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Mail size={14} className="text-gray-400" />
            <span className="text-gray-600">{pastor.email}</span>
            <button onClick={() => copyToClipboard(pastor.email, 'Email')} className="ml-auto text-gray-400 hover:text-purple-600">
              <Copy size={12} />
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone size={14} className="text-gray-400" />
            <span className="text-gray-600">{pastor.phone}</span>
            <button onClick={() => copyToClipboard(pastor.phone, 'Phone')} className="ml-auto text-gray-400 hover:text-purple-600">
              <Copy size={12} />
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar size={14} className="text-gray-400" />
            <span className="text-gray-600">Joined {new Date(pastor.joinedDate).toLocaleDateString('en-GB')}</span>
          </div>
          
          {/* Login Credentials Section */}
          <div className="mt-4 pt-4 border-t border-purple-100">
            <p className="text-[10px] font-black text-purple-600 uppercase mb-2 flex items-center gap-1">
              <Key size={10} /> Login Credentials
            </p>
            <div className="bg-purple-50 rounded-xl p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black text-gray-500">Username:</span>
                <code className="text-xs font-mono bg-white px-2 py-1 rounded">{username}</code>
                <button onClick={() => copyToClipboard(username, 'Username')} className="text-gray-400 hover:text-purple-600">
                  <Copy size={10} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black text-gray-500">Password:</span>
                <code className="text-xs font-mono bg-white px-2 py-1 rounded">
                  {showPassword ? password : '••••••••••••'}
                </code>
                <button onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-purple-600">
                  {showPassword ? <EyeOff size={10} /> : <Eye size={10} />}
                </button>
                <button onClick={() => copyToClipboard(password, 'Password')} className="text-gray-400 hover:text-purple-600">
                  <Copy size={10} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-4 pt-4 border-t border-purple-100">
          <button className="flex-1 py-2 bg-purple-600 text-white rounded-xl text-[10px] font-black flex items-center justify-center gap-1 hover:bg-purple-700 transition">
            <Mail size={12} /> Email
          </button>
          <button className="flex-1 py-2 bg-green-600 text-white rounded-xl text-[10px] font-black flex items-center justify-center gap-1 hover:bg-green-700 transition">
            <MessageCircle size={12} /> Message
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Team Card Component
function TeamCard({ member, isLeader, isEditing, editForm, onEdit, onSave, onCancel, onDelete, setEditForm }: TeamCardProps) {
  const [showPassword, setShowPassword] = useState(false);
  const password = generateTeamPassword(member.firstName, member.lastName, 'coordinator');
  const username = member.username;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  return (
    <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-5 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Users size={24} className="text-[#8DC63F]" />
            </div>
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.role || ''}
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                  className="bg-white/20 rounded-lg px-2 py-1 text-sm font-black text-white"
                />
              ) : (
                <p className="text-[10px] font-black text-[#8DC63F] uppercase tracking-wider">{member.role}</p>
              )}
              {isEditing ? (
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    value={editForm.firstName || ''}
                    onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value, name: `${e.target.value} ${editForm.lastName || ''}` })}
                    placeholder="First Name"
                    className="bg-white/20 rounded-lg px-2 py-1 text-sm font-black text-white w-28"
                  />
                  <input
                    type="text"
                    value={editForm.lastName || ''}
                    onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value, name: `${editForm.firstName || ''} ${e.target.value}` })}
                    placeholder="Last Name"
                    className="bg-white/20 rounded-lg px-2 py-1 text-sm font-black text-white w-28"
                  />
                </div>
              ) : (
                <p className="font-black text-lg">{member.name}</p>
              )}
            </div>
          </div>
          {isLeader && !isEditing && (
            <div className="flex gap-1">
              <button onClick={() => onEdit(member)} className="p-1.5 bg-white/20 rounded-lg hover:bg-white/30 transition">
                <Edit2 size={14} />
              </button>
              <button onClick={onDelete} className="p-1.5 bg-white/20 rounded-lg hover:bg-red-500 transition">
                <Trash2 size={14} />
              </button>
            </div>
          )}
          {isEditing && (
            <div className="flex gap-1">
              <button onClick={onSave} className="p-1.5 bg-green-500 rounded-lg hover:bg-green-600 transition">
                <Save size={14} />
              </button>
              <button onClick={onCancel} className="p-1.5 bg-gray-500 rounded-lg hover:bg-gray-600 transition">
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="p-5">
        {isEditing ? (
          <textarea
            value={editForm.responsibility || ''}
            onChange={(e) => setEditForm({ ...editForm, responsibility: e.target.value })}
            className="w-full p-2 bg-gray-50 rounded-xl text-sm border focus:border-red-600 outline-none mb-3"
            rows={2}
          />
        ) : (
          <p className="text-sm text-gray-600 mb-4">{member.responsibility}</p>
        )}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <Mail size={14} className="text-gray-400" />
            {isEditing ? (
              <input
                type="email"
                value={editForm.email || ''}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                className="flex-1 bg-gray-50 rounded-lg px-2 py-1 text-xs"
              />
            ) : (
              <span className="text-gray-500">{member.email}</span>
            )}
            {!isEditing && member.email && (
              <button onClick={() => copyToClipboard(member.email, 'Email')} className="text-gray-400 hover:text-purple-600">
                <Copy size={10} />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Phone size={14} className="text-gray-400" />
            {isEditing ? (
              <input
                type="tel"
                value={editForm.phone || ''}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                className="flex-1 bg-gray-50 rounded-lg px-2 py-1 text-xs"
                placeholder="+44 7911 123456"
              />
            ) : (
              <span className="text-gray-500">{member.phone}</span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Calendar size={14} className="text-gray-400" />
            <span className="text-gray-500">Joined {new Date(member.joinedDate).toLocaleDateString('en-GB')}</span>
          </div>
        </div>

        {/* Login Credentials for Leaders */}
        {isLeader && !isEditing && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-[9px] font-black text-gray-400 uppercase mb-2 flex items-center gap-1">
              <Key size={9} /> Login Credentials
            </p>
            <div className="bg-gray-50 rounded-xl p-2 space-y-1">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-black text-gray-500">Username:</span>
                <code className="font-mono">{username}</code>
                <button onClick={() => copyToClipboard(username, 'Username')} className="text-gray-400 hover:text-purple-600">
                  <Copy size={9} />
                </button>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-black text-gray-500">Password:</span>
                <code className="font-mono">{showPassword ? password : '••••••••'}</code>
                <div className="flex gap-1">
                  <button onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-purple-600">
                    {showPassword ? <EyeOff size={9} /> : <Eye size={9} />}
                  </button>
                  <button onClick={() => copyToClipboard(password, 'Password')} className="text-gray-400 hover:text-purple-600">
                    <Copy size={9} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
          <button className="flex-1 py-2 bg-blue-50 text-blue-700 rounded-xl text-[10px] font-black flex items-center justify-center gap-1 hover:bg-blue-100 transition">
            <Mail size={12} /> Email
          </button>
          <button className="flex-1 py-2 bg-green-50 text-green-700 rounded-xl text-[10px] font-black flex items-center justify-center gap-1 hover:bg-green-100 transition">
            <MessageCircle size={12} /> Message
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function TeamPage() {
  const params = useParams();
  const groupId = params?.groupId as string;
  const { user, hasPermission, canAccessGroup } = useAuth();
  const [group, setGroup] = useState<any>(null);
  const [pastors, setPastors] = useState<Pastor[]>(DEFAULT_PASTORS);
  const [leaders, setLeaders] = useState<TeamMember[]>(DEFAULT_LEADERS);
  const [editingMember, setEditingMember] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<TeamMember>>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMember, setNewMember] = useState({
    role: 'Coordinator',
    firstName: '',
    lastName: '',
    responsibility: '',
    email: '',
    phone: '',
    joinedDate: new Date().toISOString().split('T')[0],
  });
  const [mounted, setMounted] = useState(false);

  const isLeader = hasPermission(['coordinator', 'pastor', 'admin']);

  useEffect(() => {
    setMounted(true);
    if (groupId && canAccessGroup(groupId)) {
      const data = getGroup(groupId);
      setGroup(data);
    }
  }, [groupId]);

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member.id);
    setEditForm(member);
  };

  const handleSave = () => {
    if (!editForm.firstName?.trim()) {
      toast.error('Please enter a first name');
      return;
    }
    
    const updatedLeaders = leaders.map(m => 
      m.id === editingMember 
        ? { 
            ...m, 
            ...editForm, 
            name: `${editForm.firstName} ${editForm.lastName}`,
            username: generateUsername(editForm.firstName || m.firstName, editForm.lastName || m.lastName)
          } 
        : m
    );
    setLeaders(updatedLeaders);
    
    // Save to localStorage for persistence
    localStorage.setItem(`team_leaders_${groupId}`, JSON.stringify(updatedLeaders));
    
    // Refresh users in auth context
    refreshUsers();
    
    setEditingMember(null);
    setEditForm({});
    toast.success('Team member updated successfully');
  };

  const handleAdd = () => {
    if (!newMember.firstName?.trim()) {
      toast.error('Please enter a first name');
      return;
    }
    
    const fullName = `${newMember.firstName} ${newMember.lastName}`;
    const newId = (Math.max(...leaders.map(m => parseInt(m.id.split('-')[1] || '0')), 0) + 1).toString();
    const newTeamMember: TeamMember = {
      id: `coord-${newId}`,
      role: newMember.role,
      name: fullName,
      firstName: newMember.firstName,
      lastName: newMember.lastName,
      responsibility: newMember.responsibility,
      email: newMember.email,
      phone: newMember.phone,
      joinedDate: newMember.joinedDate,
      isActive: true,
      username: generateUsername(newMember.firstName, newMember.lastName),
      permissions: ['coordinator'],
    };
    
    setLeaders(prev => [...prev, newTeamMember]);
    localStorage.setItem(`team_leaders_${groupId}`, JSON.stringify([...leaders, newTeamMember]));
    
    // Refresh users in auth context
    refreshUsers();
    
    setShowAddModal(false);
    setNewMember({
      role: 'Coordinator',
      firstName: '',
      lastName: '',
      responsibility: '',
      email: '',
      phone: '',
      joinedDate: new Date().toISOString().split('T')[0],
    });
    toast.success(`${fullName} added to the team`);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove ${name} from the team?`)) {
      const updatedLeaders = leaders.filter(m => m.id !== id);
      setLeaders(updatedLeaders);
      localStorage.setItem(`team_leaders_${groupId}`, JSON.stringify(updatedLeaders));
      
      // Refresh users in auth context
      refreshUsers();
      
      toast.success(`${name} removed from team`);
    }
  };

  if (!mounted || !group) {
    return (
      <AuthGuard>
        <DashboardShell>
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading team...</p>
          </div>
        </DashboardShell>
      </AuthGuard>
    );
  }

  if (!canAccessGroup(groupId)) {
    return (
      <AuthGuard>
        <DashboardShell>
          <div className="text-center py-20">
            <p className="text-gray-500">You don't have access to this group's team page.</p>
          </div>
        </DashboardShell>
      </AuthGuard>
    );
  }

  const activeLeaders = leaders.filter(m => m.isActive);
  const coordinators = activeLeaders.filter(m => m.role === 'Group Coordinator' || m.role === 'Assistant Coordinator');
  const ministryLeads = activeLeaders.filter(m => !['Group Coordinator', 'Assistant Coordinator'].includes(m.role));

  return (
    <AuthGuard>
      <DashboardShell>
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield size={20} className="text-red-600" />
                <span className="text-[10px] font-black text-red-600 uppercase tracking-wider">Leadership Team</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-none" style={{ fontFamily: 'Georgia, serif' }}>
                Core Team
              </h1>
              <p className="text-gray-500 text-sm mt-2">{group?.name} • Pastors & Leadership Team</p>
            </div>
            {isLeader && (
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-red-600 text-white px-5 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-red-700 transition flex items-center gap-2"
              >
                <UserPlus size={14} /> Add Team Member
              </button>
            )}
          </div>

          {/* Pastors Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Church size={20} className="text-purple-600" />
              <h2 className="text-xl font-black tracking-tighter uppercase">Pastoral Team</h2>
              <span className="text-[9px] font-black text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">{pastors.length} Pastors</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pastors.map((pastor) => (
                <PastorCard key={pastor.id} pastor={pastor} isLeader={isLeader} />
              ))}
            </div>
          </div>

          {/* Leadership Section */}
          {coordinators.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Crown size={20} className="text-yellow-600" />
                <h2 className="text-xl font-black tracking-tighter uppercase">Group Leadership</h2>
                <span className="text-[9px] font-black text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded-full">{coordinators.length} Leaders</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {coordinators.map((member) => (
                  <TeamCard
                    key={member.id}
                    member={member}
                    isLeader={isLeader}
                    isEditing={editingMember === member.id}
                    editForm={editForm}
                    onEdit={handleEdit}
                    onSave={handleSave}
                    onCancel={() => { setEditingMember(null); setEditForm({}); }}
                    onDelete={() => handleDelete(member.id, member.name)}
                    setEditForm={setEditForm}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Ministry Coordinators Section */}
          {ministryLeads.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Target size={20} className="text-blue-600" />
                <h2 className="text-xl font-black tracking-tighter uppercase">Ministry Coordinators</h2>
                <span className="text-[9px] font-black text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">{ministryLeads.length} Coordinators</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ministryLeads.map((member) => (
                  <TeamCard
                    key={member.id}
                    member={member}
                    isLeader={isLeader}
                    isEditing={editingMember === member.id}
                    editForm={editForm}
                    onEdit={handleEdit}
                    onSave={handleSave}
                    onCancel={() => { setEditingMember(null); setEditForm({}); }}
                    onDelete={() => handleDelete(member.id, member.name)}
                    setEditForm={setEditForm}
                  />
                ))}
              </div>
            </div>
          )}

          {/* CLEAR Framework Card */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-black mb-6 flex items-center gap-2">
              <Heart size={20} className="text-[#8DC63F]" />
              CLEAR Leadership Framework
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { letter: 'C', word: 'Community', desc: 'Sense of belonging' },
                { letter: 'L', word: 'Leadership', desc: 'Spiritual direction' },
                { letter: 'E', word: 'Evangelism', desc: 'Soul-winning focus' },
                { letter: 'A', word: 'Accountability', desc: 'Spiritual growth' },
                { letter: 'R', word: 'Reproduction', desc: 'Training leaders' }
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2 font-black text-xl text-[#8DC63F]">
                    {item.letter}
                  </div>
                  <p className="font-black text-sm">{item.word}</p>
                  <p className="text-[9px] text-gray-400 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Password Reference Card */}
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <Key size={20} className="text-blue-600" />
              <h3 className="font-black text-blue-800">Login Credentials Reference</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white rounded-xl p-3">
                <p className="font-black text-blue-800 mb-1">Pastors</p>
                <code className="text-[10px] text-gray-600">Username: First7Letters(Name+Surname)</code>
                <code className="text-[10px] text-gray-600 block mt-1">Password: Username@BWcg777</code>
                <p className="text-[9px] text-gray-500 mt-2">Example: DanMajaducon → DanMaja@BWcg777</p>
              </div>
              <div className="bg-white rounded-xl p-3">
                <p className="font-black text-blue-800 mb-1">Coordinators/Leaders</p>
                <code className="text-[10px] text-gray-600">Username: First7Letters(Name+Surname)</code>
                <code className="text-[10px] text-gray-600 block mt-1">Password: Username@BWcg{String(new Date().getMonth() + 1).padStart(2, '0')}</code>
                <p className="text-[9px] text-gray-500 mt-2">Example: FrankAdams → FrankAd@BWcg04</p>
              </div>
              <div className="bg-white rounded-xl p-3">
                <p className="font-black text-blue-800 mb-1">Members</p>
                <code className="text-[10px] text-gray-600">Username: FirstNameBCG</code>
                <code className="text-[10px] text-gray-600 block mt-1">Password: Username@member</code>
                <p className="text-[9px] text-gray-500 mt-2">Example: FrankBCG@member</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Member Modal */}
        <AnimatePresence>
          {showAddModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
                  <h3 className="text-2xl font-black">Add Team Member</h3>
                  <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-xl">
                    <X size={20} />
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">First Name *</label>
                      <input
                        type="text"
                        value={newMember.firstName}
                        onChange={(e) => setNewMember({ ...newMember, firstName: e.target.value })}
                        className="w-full p-3 bg-gray-50 rounded-xl border focus:border-red-600 outline-none"
                        placeholder="First name"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Last Name</label>
                      <input
                        type="text"
                        value={newMember.lastName}
                        onChange={(e) => setNewMember({ ...newMember, lastName: e.target.value })}
                        className="w-full p-3 bg-gray-50 rounded-xl border focus:border-red-600 outline-none"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Role</label>
                    <select
                      value={newMember.role}
                      onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                      className="w-full p-3 bg-gray-50 rounded-xl border focus:border-red-600 outline-none"
                    >
                      <option value="Group Coordinator">Group Coordinator</option>
                      <option value="Assistant Coordinator">Assistant Coordinator</option>
                      <option value="Discipleship Coordinator">Discipleship Coordinator</option>
                      <option value="Prayer Coordinator">Prayer Coordinator</option>
                      <option value="Worship Coordinator">Worship Coordinator</option>
                      <option value="Outreach Coordinator">Outreach Coordinator</option>
                      <option value="Hospitality Coordinator">Hospitality Coordinator</option>
                      <option value="Communications Coordinator">Communications Coordinator</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Responsibility</label>
                    <input
                      type="text"
                      value={newMember.responsibility}
                      onChange={(e) => setNewMember({ ...newMember, responsibility: e.target.value })}
                      className="w-full p-3 bg-gray-50 rounded-xl border focus:border-red-600 outline-none"
                      placeholder="Brief description of role"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Email</label>
                    <input
                      type="email"
                      value={newMember.email}
                      onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                      className="w-full p-3 bg-gray-50 rounded-xl border focus:border-red-600 outline-none"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Phone (UK)</label>
                    <input
                      type="tel"
                      value={newMember.phone}
                      onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                      className="w-full p-3 bg-gray-50 rounded-xl border focus:border-red-600 outline-none"
                      placeholder="+44 7911 123456"
                    />
                  </div>
                  <div className="bg-blue-50 rounded-xl p-3">
                    <p className="text-[10px] font-black text-blue-600 mb-1 flex items-center gap-1">
                      <Key size={10} /> Auto-generated Credentials
                    </p>
                    <p className="text-[9px] text-gray-600">
                      Username: <strong>{generateUsername(newMember.firstName || 'First', newMember.lastName || 'Last')}</strong>
                    </p>
                    <p className="text-[9px] text-gray-600">
                      Password: <strong>{generateUsername(newMember.firstName || 'First', newMember.lastName || 'Last')}@BWcg{String(new Date().getMonth() + 1).padStart(2, '0')}</strong>
                    </p>
                  </div>
                </div>
                <div className="sticky bottom-0 bg-white border-t p-6 flex gap-3">
                  <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 bg-gray-100 rounded-xl font-black text-sm">
                    Cancel
                  </button>
                  <button onClick={handleAdd} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-black text-sm flex items-center justify-center gap-2">
                    <UserPlus size={14} /> Add Member
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </DashboardShell>
    </AuthGuard>
  );
}