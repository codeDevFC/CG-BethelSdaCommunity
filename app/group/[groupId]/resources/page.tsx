"use client";
import { use, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/contexts/AuthContext";
import { getGroup } from "@/lib/groupService";
import Link from "next/link";
import { 
  ArrowLeft, Library, BookOpen, FileText, Users, Heart, 
  Target, Shield, Crown, Sparkles, Search, ChevronRight,
  Download, Printer, Copy, Share2
} from "lucide-react";
import toast from "react-hot-toast";

const resources = [
  {
    id: "cg-handbook",
    title: "Care Group Leader Handbook",
    description: "Complete guide for leading effective Care Groups",
    category: "Leadership",
    icon: Shield,
    type: "PDF",
    downloadable: true
  },
  {
    id: "fast-discipleship",
    title: "FAST Discipleship Guide",
    description: "Step-by-step discipleship process",
    category: "Discipleship",
    icon: Users,
    type: "PDF",
    downloadable: true
  },
  {
    id: "prayer-guide",
    title: "Prayer Ministry Guide",
    description: "Guide for leading prayer meetings and intercession",
    category: "Prayer",
    icon: Heart,
    type: "PDF",
    downloadable: true
  },
  {
    id: "outreach-planner",
    title: "Community Outreach Planner",
    description: "Plan and execute effective outreach events",
    category: "Outreach",
    icon: Target,
    type: "Template",
    downloadable: true
  },
  {
    id: "leadership-agenda",
    title: "Leadership Meeting Agenda",
    description: "30-minute leadership meeting template",
    category: "Leadership",
    icon: Shield,
    type: "Template",
    downloadable: true
  },
  {
    id: "bible-reading-plan",
    title: "Yearly Bible Reading Plan",
    description: "Chronological Bible reading plan",
    category: "Bible Study",
    icon: BookOpen,
    type: "PDF",
    downloadable: true
  },
  {
    id: "testimony-guide",
    title: "Sharing Your Testimony Guide",
    description: "How to write and share your testimony",
    category: "Evangelism",
    icon: Sparkles,
    type: "Guide",
    downloadable: true
  },
  {
    id: "new-member-guide",
    title: "New Member Welcome Guide",
    description: "Resources for integrating new members",
    category: "Discipleship",
    icon: Users,
    type: "PDF",
    downloadable: true
  }
];

const categories = ["All", "Leadership", "Discipleship", "Prayer", "Outreach", "Bible Study", "Evangelism"];

export default function ResourcesPage() {
  const params = useParams();
  const groupId = params?.groupId as string;
  const { canAccessGroup } = useAuth();
  const [group, setGroup] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    if (groupId && canAccessGroup(groupId)) {
      const data = getGroup(groupId);
      setGroup(data);
    }
  }, [groupId]);

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (title: string) => {
    toast.success(`Downloading ${title}...`);
  };

  if (!canAccessGroup(groupId)) {
    return (
      <AuthGuard>
        <DashboardShell>
          <div className="text-center py-20">
            <p className="text-gray-500">You don't have access to this group's resources.</p>
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
                <Library size={20} className="text-[#547189]" />
                <span className="text-[10px] font-black text-[#547189] uppercase tracking-wider">Resource Library</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-black tracking-tighter" style={{ fontFamily: 'Georgia, serif' }}>
                Resources
              </h1>
              <p className="text-gray-500 text-sm">{group?.name} • Tools and training materials</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 glass-card border focus:border-[#547189] outline-none text-sm"
                />
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase whitespace-nowrap transition-all ${
                    selectedCategory === cat 
                      ? "bg-[#547189] text-white shadow-md" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredResources.map((resource) => {
              const Icon = resource.icon;
              return (
                <div key={resource.id} className="glass-card p-5 hover:bg-white/70 transition group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#547189]/10 flex items-center justify-center">
                      <Icon size={20} className="text-[#547189]" />
                    </div>
                    <span className="text-[8px] font-black px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                      {resource.type}
                    </span>
                  </div>
                  <h3 className="font-black text-lg">{resource.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 mb-4">{resource.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-gray-400">{resource.category}</span>
                    <button
                      onClick={() => handleDownload(resource.title)}
                      className="flex items-center gap-1 text-[10px] font-black text-[#547189] hover:underline"
                    >
                      <Download size={12} /> Download
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-16 glass-card">
              <Library size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-gray-400 font-black">No resources found</p>
            </div>
          )}
        </div>
      </DashboardShell>
    </AuthGuard>
  );
}
