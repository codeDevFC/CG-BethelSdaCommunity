"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/contexts/AuthContext";
import { loadGroups, saveGroups, updateGroup, getAllGroupsSummary } from "@/lib/groupService";
import { Plus, Edit2, Save, X, Users, Calendar, Clock, ChevronLeft } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AdminGroupsPage() {
  const { hasPermission } = useAuth();
  const router = useRouter();
  const [groups, setGroups] = useState<any[]>([]);
  const [editingGroup, setEditingGroup] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");

  useEffect(() => {
    if (!hasPermission(['admin'])) {
      router.push('/');
      return;
    }
    loadGroupsList();
  }, [hasPermission]);

  const loadGroupsList = () => {
    setGroups(getAllGroupsSummary());
  };

  const handleEditGroup = (group: any) => {
    const fullGroup = loadGroups()[group.id];
    setEditingGroup(group.id);
    setEditForm(fullGroup);
  };

  const handleSaveGroup = () => {
    if (editingGroup) {
      updateGroup(editingGroup, editForm);
      toast.success('Group updated');
      setEditingGroup(null);
      loadGroupsList();
    }
  };

  const handleAddGroup = () => {
    if (!newGroupName.trim()) return;
    const groupsObj = loadGroups();
    const newId = (Object.keys(groupsObj).length + 1).toString();
    groupsObj[newId] = {
      id: newId,
      name: newGroupName,
      meetingDay: "Wednesday",
      meetingTime: "7:00 PM",
      healthScore: 70,
      missionStats: { soulWinning: 0, baptisms: 0 },
      members: [],
      rotas: []
    };
    saveGroups(groupsObj);
    toast.success('Group created');
    setShowAddModal(false);
    setNewGroupName("");
    loadGroupsList();
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 p-6 lg:p-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/pastor-dashboard" className="inline-flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase mb-4">
                <ChevronLeft size={14} /> Back
              </Link>
              <h1 className="text-4xl lg:text-5xl font-black uppercase" style={{ fontFamily: 'Georgia, serif' }}>
                Manage Groups
              </h1>
            </div>
            <button onClick={() => setShowAddModal(true)} className="bg-[#012169] text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2">
              <Plus size={18} /> New Group
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {groups.map((group) => (
              <div key={group.id} className="bg-white rounded-3xl border p-6">
                {editingGroup === group.id ? (
                  <div className="space-y-4">
                    <input type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full p-3 bg-gray-50 rounded-xl border" />
                    <div className="flex justify-end gap-3">
                      <button onClick={() => setEditingGroup(null)} className="px-4 py-2 bg-gray-100 rounded-xl font-black text-sm">Cancel</button>
                      <button onClick={handleSaveGroup} className="px-4 py-2 bg-green-600 text-white rounded-xl font-black text-sm">Save</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-black">{group.name}</h3>
                      <p className="text-xs text-gray-500">{group.meetingDay}s at {group.meetingTime}</p>
                    </div>
                    <button onClick={() => handleEditGroup(group)} className="p-2 bg-gray-100 rounded-xl"><Edit2 size={16} /></button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6">
            <h3 className="text-2xl font-black mb-4">New Care Group</h3>
            <input type="text" value={newGroupName} onChange={e => setNewGroupName(e.target.value)} placeholder="Group Name" className="w-full p-3 bg-gray-50 rounded-xl border mb-4" />
            <div className="flex gap-3">
              <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 bg-gray-100 rounded-xl font-black">Cancel</button>
              <button onClick={handleAddGroup} className="flex-1 py-3 bg-[#012169] text-white rounded-xl font-black">Create</button>
            </div>
          </div>
        </div>
      )}
    </AuthGuard>
  );
}
