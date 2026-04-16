"use client";
import { useState } from "react";
import { Users, Plus, Edit2, Trash2, Save, X, Phone } from "lucide-react";
import { GroupMember } from "@/lib/types";
import toast from "react-hot-toast";

interface MemberManagerProps {
  groupId: string;
  members: GroupMember[];
  onMembersChange: (members: GroupMember[]) => void;
  isLeader: boolean;
}

export default function MemberManager({ groupId, members, onMembersChange, isLeader }: MemberManagerProps) {
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState<GroupMember | null>(null);
  const [formData, setFormData] = useState<Partial<GroupMember>>({
    name: '',
    status: 'member',
    phone: '',
    notes: ''
  });

  const handleAddMember = () => {
    if (!formData.name?.trim()) {
      toast.error('Please enter a member name');
      return;
    }

    const newId = Math.max(...members.map(m => m.id), 0) + 1;
    const newMember: GroupMember = {
      id: newId,
      name: formData.name,
      status: formData.status as 'member' | 'seeker',
      history: Array(12).fill('P'),
      phone: formData.phone || '',
      notes: formData.notes || ''
    };

    onMembersChange([...members, newMember]);
    toast.success(`${newMember.name} added to group`);
    setShowModal(false);
    setFormData({ name: '', status: 'member', phone: '', notes: '' });
  };

  const handleEditMember = () => {
    if (!editingMember || !formData.name?.trim()) return;

    const updatedMembers = members.map(m =>
      m.id === editingMember.id ? { ...m, ...formData, name: formData.name! } : m
    );
    onMembersChange(updatedMembers);
    toast.success('Member updated');
    setEditingMember(null);
    setShowModal(false);
  };

  const openEditModal = (member: GroupMember) => {
    setEditingMember(member);
    setFormData({ name: member.name, status: member.status, phone: member.phone || '', notes: member.notes || '' });
    setShowModal(true);
  };

  return (
    <>
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b bg-gray-50/50 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Users size={20} className="text-[#012169]" />
            <h3 className="font-black text-xl">Members ({members.length})</h3>
          </div>
          {isLeader && (
            <button onClick={() => { setEditingMember(null); setFormData({name: '', status: 'member'}); setShowModal(true); }} className="bg-[#012169] text-white px-4 py-2 rounded-xl font-black text-xs flex items-center gap-2">
              <Plus size={14} /> Add Member
            </button>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-[10px] font-black uppercase text-gray-400">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Status</th>
                {isLeader && <th className="px-6 py-4 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-black">{member.name}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[9px] font-black px-2 py-1 rounded-full ${member.status === 'member' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {member.status}
                    </span>
                  </td>
                  {isLeader && (
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => openEditModal(member)} className="p-2 bg-gray-100 rounded-xl hover:bg-blue-100"><Edit2 size={14} /></button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6">
            <h3 className="text-2xl font-black mb-4">{editingMember ? 'Edit Member' : 'Add New Member'}</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full p-3 bg-gray-50 rounded-xl border" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <select className="w-full p-3 bg-gray-50 rounded-xl border" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})}>
                <option value="member">Member</option>
                <option value="seeker">Seeker</option>
              </select>
              <div className="flex gap-3">
                <button onClick={() => setShowModal(false)} className="flex-1 py-3 bg-gray-100 rounded-xl font-black">Cancel</button>
                <button onClick={editingMember ? handleEditMember : handleAddMember} className="flex-1 py-3 bg-[#012169] text-white rounded-xl font-black">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
