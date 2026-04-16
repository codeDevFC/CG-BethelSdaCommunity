"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import Link from "next/link";
import { 
  BookOpen, BookText, Heart, Star, Target, 
  ChevronRight, Search, Sparkles, 
  ChevronDown, ChevronUp, ArrowLeft, LayoutGrid,
  Cross, Info, Church, ScrollText
} from "lucide-react";

const bibleQuickInsights = [
  {
    id: 1,
    title: "Verse of the Day",
    verse: "John 3:16",
    text: "For God so loved the world that he gave his one and only Son...",
    category: "Scripture"
  },
  {
    id: 2,
    title: "Weekly Reflection",
    verse: "Philippians 4:13",
    text: "I can do all things through Christ who strengthens me.",
    category: "Encouragement"
  },
  {
    id: 3,
    title: "Memory Verse",
    verse: "Romans 8:28",
    text: "And we know that in all things God works for the good of those who love him...",
    category: "Memory"
  }
];

const resources = [
  {
    id: 1,
    title: "Bible Study Guides",
    description: "In-depth study materials for personal and group study",
    icon: BookOpen,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    items: ["Old Testament Survey", "New Testament Survey", "Topical Studies"]
  },
  {
    id: 2,
    title: "Prayer Resources",
    description: "Guides and journals to deepen your prayer life",
    icon: Heart,
    color: "text-red-400",
    bgColor: "bg-red-400/10",
    items: ["Prayer Journal", "30 Days of Prayer", "Intercessory Guide"]
  },
  {
    id: 3,
    title: "Discipleship Materials",
    description: "Resources for spiritual growth and mentorship",
    icon: Target,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    items: ["One-on-One Guides", "Small Group Curriculum", "Growth Track"]
  },
  {
    id: 4,
    title: "Theological Library",
    description: "Articles and essays on key theological topics",
    icon: BookText,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    items: ["Systematic Theology", "Church History", "Apologetics"]
  },
  {
    id: 5,
    title: "Worship Resources",
    description: "Song lyrics, chord charts, and worship guides",
    icon: Sparkles,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    items: ["Song Library", "Worship Set Lists", "Original Compositions"]
  },
  {
    id: 6,
    title: "Biblical Languages",
    description: "Tools for studying Greek and Hebrew",
    icon: ScrollText,
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    items: ["Greek Word Studies", "Hebrew Lexicon", "Interlinear Bible"]
  }
];

export default function ResourcesCornerPage() {
  const params = useParams();
  const groupId = params.groupId;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedResource, setExpandedResource] = useState<number | null>(null);

  const categories = ["All", "Scripture", "Study", "Prayer", "Worship", "Theology"];

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Header */}
        <div className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link 
                  href={`/group/${groupId}/study-hub`}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-white">Resources Corner</h1>
                  <p className="text-gray-400 text-sm">Equipping you for every good work</p>
                </div>
              </div>
              
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#547189] transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-[#547189] text-white shadow-lg"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Quick Insights Section */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Church className="w-6 h-6 text-[#547189]" />
              <h2 className="text-xl font-bold text-white">Quick Bible Insights</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {bibleQuickInsights.map((insight) => (
                <div
                  key={insight.id}
                  className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[#547189]/50 transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <ScrollText className="w-5 h-5 text-[#547189]" />
                      <span className="text-xs font-medium text-[#547189] uppercase tracking-wider">
                        {insight.category}
                      </span>
                    </div>
                    <Cross className="w-4 h-4 text-gray-500 group-hover:text-[#547189] transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{insight.title}</h3>
                  <p className="text-[#547189] font-medium mb-2">{insight.verse}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{insight.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Resources Grid */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <LayoutGrid className="w-6 h-6 text-[#547189]" />
              <h2 className="text-xl font-bold text-white">Study Resources</h2>
            </div>
            
            {filteredResources.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No resources found matching your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => {
                  const Icon = resource.icon;
                  const isExpanded = expandedResource === resource.id;
                  
                  return (
                    <div
                      key={resource.id}
                      className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#547189]/50 transition-all group"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-3 rounded-lg ${resource.bgColor}`}>
                            <Icon className={`w-6 h-6 ${resource.color}`} />
                          </div>
                          <button
                            onClick={() => setExpandedResource(isExpanded ? null : resource.id)}
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </button>
                        </div>
                        
                        <h3 className="text-lg font-bold text-white mb-2">{resource.title}</h3>
                        <p className="text-gray-400 text-sm mb-4">{resource.description}</p>
                        
                        {isExpanded && (
                          <div className="mt-4 pt-4 border-t border-white/10">
                            <ul className="space-y-2">
                              {resource.items.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                                  <ChevronRight className="w-3 h-3 text-[#547189]" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                            <button className="mt-4 w-full px-4 py-2 bg-[#547189]/20 hover:bg-[#547189]/30 text-[#547189] rounded-lg text-sm font-medium transition-colors">
                              Access Resource
                            </button>
                          </div>
                        )}
                        
                        {!isExpanded && (
                          <button className="mt-2 text-[#547189] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                            Learn More <ChevronRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Info Banner */}
          <div className="mt-12 p-6 bg-gradient-to-r from-[#547189]/20 to-[#C8102E]/20 rounded-xl border border-white/10">
            <div className="flex items-start gap-4">
              <Info className="w-6 h-6 text-[#547189] flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-white font-bold mb-2">Need More Resources?</h3>
                <p className="text-gray-300 text-sm mb-3">
                  Our team is constantly updating this corner with new materials. 
                  If you can't find what you're looking for, please reach out to your group leader.
                </p>
                <button className="text-[#547189] text-sm font-medium hover:underline">
                  Request Resource →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}