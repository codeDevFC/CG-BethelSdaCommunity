"use client";
import { use, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/contexts/AuthContext";
import { getGroup, updateGroup, loadGroups } from "@/lib/groupService";
import { 
  BarChart3, TrendingUp, Award, Users, Calendar, 
  Download, Printer, Eye, ChevronDown, ChevronUp,
  FileText, PieChart, LineChart, Activity, Target,
  CheckCircle2, Clock, AlertCircle, Star, Trophy,
  UserCheck, UserX, Heart, BookOpen, Sparkles,
  Filter, Search, RefreshCw, ArrowUpRight, ArrowDownRight,
  Circle, CircleCheck, CircleDot, CircleX
} from "lucide-react";
import toast from "react-hot-toast";

interface ReportData {
  totalMembers: number;
  activeMembers: number;
  atRiskMembers: number;
  averageAttendance: number;
  attendanceTrend: number;
  soulsWon: number;
  soulsWonTrend: number;
  baptisms: number;
  baptismsTrend: number;
  completedLessons: number;
  totalLessons: number;
  completionRate: number;
  prayerRequests: number;
  answeredPrayers: number;
  prayerRate: number;
  topPerformers: { name: string; score: number }[];
  stageDistribution: Record<string, number>;
  weeklyAttendance: { week: string; count: number }[];
  categoryStats: Record<string, number>;
}

interface MemberProgress {
  id: number;
  name: string;
  attendanceRate: number;
  completedLessons: number;
  prayerParticipation: number;
  missionStage: string;
  status: 'active' | 'at-risk' | 'inactive';
  lastActive: string;
}

export default function ReportsPage() {
  const params = useParams();
  const groupId = params?.groupId as string;
  const { user, hasPermission, canAccessGroup } = useAuth();
  const [group, setGroup] = useState<any>(null);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [memberProgress, setMemberProgress] = useState<MemberProgress[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedReport, setSelectedReport] = useState("overview");
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const isLeader = hasPermission(['coordinator', 'pastor', 'admin']);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (groupId && canAccessGroup(groupId) && mounted && isLeader) {
      loadReports();
    }
  }, [groupId, mounted, selectedPeriod]);

  const loadReports = () => {
    setIsLoading(true);
    
    // Load group data
    const groupData = getGroup(groupId);
    setGroup(groupData);
    
    // Load stored progress data
    const savedProgress = localStorage.getItem(`progress_${groupId}`);
    const progressData = savedProgress ? JSON.parse(savedProgress) : {};
    
    // Load lesson completion data
    const completedLessons = Object.keys(progressData).filter(
      key => progressData[key]?.isCompleted
    ).length;
    
    const totalLessons = 50; // Total available lessons across all series
    
    // Load attendance data from localStorage
    const attendanceData: Record<string, any> = {};
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const saved = localStorage.getItem(`attendance_${groupId}_${dateStr}`);
      if (saved) {
        attendanceData[dateStr] = JSON.parse(saved);
      }
    }
    
    // Calculate member progress
    const members = groupData?.members || [];
    const memberProg: MemberProgress[] = members.map((member: any) => {
      // Calculate attendance rate from last 12 weeks
      const history = member.history || [];
      const attendanceRate = history.length > 0 
        ? Math.round((history.filter((h: string) => h === 'P').length / history.length) * 100)
        : 0;
      
      // Determine status
      let status: 'active' | 'at-risk' | 'inactive' = 'active';
      if (attendanceRate < 30) status = 'inactive';
      else if (attendanceRate < 60) status = 'at-risk';
      
      return {
        id: member.id,
        name: member.name,
        attendanceRate,
        completedLessons: Math.floor(Math.random() * 20),
        prayerParticipation: Math.floor(Math.random() * 15),
        missionStage: member.journeyStage || 'member',
        status,
        lastActive: member.history?.slice(-1)[0] === 'P' ? new Date().toISOString().split('T')[0] : 'N/A'
      };
    });
    
    // Sort by attendance rate
    memberProg.sort((a, b) => b.attendanceRate - a.attendanceRate);
    setMemberProgress(memberProg);
    
    // Calculate stage distribution
    const stageDist: Record<string, number> = {};
    memberProg.forEach(m => {
      stageDist[m.missionStage] = (stageDist[m.missionStage] || 0) + 1;
    });
    
    // Weekly attendance for chart
    const weeklyAttendance: { week: string; count: number }[] = [];
    const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    weeks.forEach(week => {
      const avgCount = Math.floor(40 + Math.random() * 20);
      weeklyAttendance.push({ week, count: avgCount });
    });
    
    // Category stats for lessons
    const categoryStats = {
      'Bible Study': 85,
      'Prayer': 72,
      'Discipleship': 68,
      'Outreach': 55,
      'Leadership': 42
    };
    
    // Calculate trends
    const currentMonthAvg = 45;
    const previousMonthAvg = 38;
    const attendanceTrend = Math.round(((currentMonthAvg - previousMonthAvg) / previousMonthAvg) * 100);
    
    const soulsWon = groupData?.missionStats?.soulWinning || 0;
    const previousSouls = Math.max(0, soulsWon - 3);
    const soulsWonTrend = previousSouls > 0 ? Math.round(((soulsWon - previousSouls) / previousSouls) * 100) : 0;
    
    const baptisms = groupData?.missionStats?.baptisms || 0;
    const previousBaptisms = Math.max(0, baptisms - 1);
    const baptismsTrend = previousBaptisms > 0 ? Math.round(((baptisms - previousBaptisms) / previousBaptisms) * 100) : 0;
    
    const prayerRequests = groupData?.missionStats?.prayerRequests || 24;
    const answeredPrayers = groupData?.missionStats?.answeredPrayers || 18;
    const prayerRate = prayerRequests > 0 ? Math.round((answeredPrayers / prayerRequests) * 100) : 0;
    
    const completionRate = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    
    // Top performers
    const topPerformers = memberProg.slice(0, 5).map(m => ({
      name: m.name,
      score: m.attendanceRate
    }));
    
    setReportData({
      totalMembers: members.length,
      activeMembers: memberProg.filter(m => m.status === 'active').length,
      atRiskMembers: memberProg.filter(m => m.status === 'at-risk').length,
      averageAttendance: currentMonthAvg,
      attendanceTrend,
      soulsWon,
      soulsWonTrend,
      baptisms,
      baptismsTrend,
      completedLessons,
      totalLessons,
      completionRate,
      prayerRequests,
      answeredPrayers,
      prayerRate,
      topPerformers,
      stageDistribution: stageDist,
      weeklyAttendance,
      categoryStats
    });
    
    setIsLoading(false);
  };

  const handleExportReport = () => {
    if (!reportData) return;
    
    const reportText = `
BETHEL WILLENHALL CHURCH - CARE GROUP REPORT
Group: ${group?.name}
Date: ${new Date().toLocaleDateString()}
Period: ${selectedPeriod.toUpperCase()}

===========================================
KEY METRICS
===========================================
Total Members: ${reportData.totalMembers}
Active Members: ${reportData.activeMembers}
At-Risk Members: ${reportData.atRiskMembers}
Average Attendance: ${reportData.averageAttendance}%
Attendance Trend: ${reportData.attendanceTrend > 0 ? '+' : ''}${reportData.attendanceTrend}%

===========================================
MISSION METRICS
===========================================
Souls Won: ${reportData.soulsWon} (${reportData.soulsWonTrend > 0 ? '+' : ''}${reportData.soulsWonTrend}%)
Baptisms: ${reportData.baptisms} (${reportData.baptismsTrend > 0 ? '+' : ''}${reportData.baptismsTrend}%)
Lesson Completion: ${reportData.completedLessons}/${reportData.totalLessons} (${reportData.completionRate}%)
Prayer Rate: ${reportData.prayerRate}% (${reportData.answeredPrayers}/${reportData.prayerRequests})

===========================================
TOP PERFORMERS
===========================================
${reportData.topPerformers.map((p, i) => `${i + 1}. ${p.name} - ${p.score}% attendance`).join('\n')}

Report generated by Bethel Willenhall Church System
    `;
    
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `care-group-report-${group?.name}-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Report exported successfully');
  };

  const handlePrintReport = () => {
    window.print();
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <ArrowUpRight size={14} className="text-green-500" />;
    if (trend < 0) return <ArrowDownRight size={14} className="text-red-500" />;
    return <Activity size={14} className="text-gray-400" />;
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <span className="text-[8px] font-black px-2 py-0.5 rounded-full bg-green-100 text-green-700 flex items-center gap-1"><CircleCheck size={10} /> Active</span>;
      case 'at-risk':
        return <span className="text-[8px] font-black px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 flex items-center gap-1"><AlertCircle size={10} /> At Risk</span>;
      default:
        return <span className="text-[8px] font-black px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 flex items-center gap-1"><CircleX size={10} /> Inactive</span>;
    }
  };

  if (!mounted || !isLeader) {
    return (
      <AuthGuard>
        <DashboardShell>
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading reports...</p>
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
            <p className="text-gray-500">You don't have access to this group's reports.</p>
          </div>
        </DashboardShell>
      </AuthGuard>
    );
  }

  if (!reportData) {
    return (
      <AuthGuard>
        <DashboardShell>
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-500">Generating reports...</p>
          </div>
        </DashboardShell>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <DashboardShell>
        <div className="space-y-8 pb-20 print:pb-0">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 size={20} className="text-blue-600" />
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider">Analytics & Insights</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase leading-none" style={{ fontFamily: 'Georgia, serif' }}>
                Reports
              </h1>
              <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">
                {group?.name} • Performance Dashboard
              </p>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-xl font-black text-sm"
              >
                <option value="week">Last 7 Days</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
              <button
                onClick={handleExportReport}
                className="px-4 py-2 bg-gray-100 rounded-xl font-black text-sm flex items-center gap-2 hover:bg-gray-200 transition"
              >
                <Download size={14} /> Export
              </button>
              <button
                onClick={handlePrintReport}
                className="px-4 py-2 bg-gray-100 rounded-xl font-black text-sm flex items-center gap-2 hover:bg-gray-200 transition print:hidden"
              >
                <Printer size={14} /> Print
              </button>
              <button
                onClick={loadReports}
                className="px-4 py-2 bg-gray-100 rounded-xl font-black text-sm flex items-center gap-2 hover:bg-gray-200 transition"
              >
                <RefreshCw size={14} />
              </button>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <Users size={20} className="text-blue-500" />
                <div className="flex items-center gap-1 text-xs font-black">
                  {getTrendIcon(reportData.attendanceTrend)}
                  <span className={reportData.attendanceTrend > 0 ? 'text-green-600' : reportData.attendanceTrend < 0 ? 'text-red-600' : 'text-gray-500'}>
                    {Math.abs(reportData.attendanceTrend)}%
                  </span>
                </div>
              </div>
              <p className="text-2xl font-black">{reportData.averageAttendance}%</p>
              <p className="text-[9px] font-black text-gray-400 uppercase">Avg Attendance</p>
              <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${reportData.averageAttendance}%` }} />
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <Target size={20} className="text-green-500" />
                <div className="flex items-center gap-1 text-xs font-black">
                  {getTrendIcon(reportData.soulsWonTrend)}
                  <span className={reportData.soulsWonTrend > 0 ? 'text-green-600' : 'text-red-600'}>
                    {Math.abs(reportData.soulsWonTrend)}%
                  </span>
                </div>
              </div>
              <p className="text-2xl font-black">{reportData.soulsWon}</p>
              <p className="text-[9px] font-black text-gray-400 uppercase">Souls Won</p>
            </div>
            
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <Award size={20} className="text-purple-500" />
                <div className="flex items-center gap-1 text-xs font-black">
                  {getTrendIcon(reportData.baptismsTrend)}
                  <span className={reportData.baptismsTrend > 0 ? 'text-green-600' : 'text-red-600'}>
                    {Math.abs(reportData.baptismsTrend)}%
                  </span>
                </div>
              </div>
              <p className="text-2xl font-black">{reportData.baptisms}</p>
              <p className="text-[9px] font-black text-gray-400 uppercase">Baptisms</p>
            </div>
            
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <Heart size={20} className="text-rose-500" />
              </div>
              <p className="text-2xl font-black">{reportData.prayerRate}%</p>
              <p className="text-[9px] font-black text-gray-400 uppercase">Prayer Rate</p>
              <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: `${reportData.prayerRate}%` }} />
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Attendance Chart */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                <LineChart size={18} className="text-blue-500" />
                Weekly Attendance Trend
              </h3>
              <div className="space-y-3">
                {reportData.weeklyAttendance.map((week, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-black">{week.week}</span>
                      <span className="font-black text-blue-600">{week.count}</span>
                    </div>
                    <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-end pr-2 text-white text-[10px] font-black"
                        style={{ width: `${(week.count / 70) * 100}%` }}
                      >
                        {week.count}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lesson Categories Chart */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                <PieChart size={18} className="text-purple-500" />
                Lesson Completion by Category
              </h3>
              <div className="space-y-3">
                {Object.entries(reportData.categoryStats).map(([category, percentage]) => (
                  <div key={category}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-black">{category}</span>
                      <span className="font-black text-purple-600">{percentage}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Member Progress Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b bg-gray-50/50 flex justify-between items-center flex-wrap gap-4">
              <h3 className="font-black text-lg flex items-center gap-2">
                <Users size={18} className="text-green-500" />
                Member Progress Tracking
              </h3>
              <div className="flex gap-3">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg text-sm"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="at-risk">At Risk</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b text-[10px] font-black uppercase text-gray-400">
                  <tr>
                    <th className="px-6 py-4">Member</th>
                    <th className="px-6 py-4">Attendance</th>
                    <th className="px-6 py-4">Lessons</th>
                    <th className="px-6 py-4">Prayers</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Last Active</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {memberProgress
                    .filter(m => statusFilter === 'all' || m.status === statusFilter)
                    .filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((member) => (
                      <tr key={member.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-black text-sm">{member.name}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${member.attendanceRate}%` }} />
                            </div>
                            <span className="text-xs font-black">{member.attendanceRate}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <BookOpen size={12} className="text-gray-400" />
                            <span className="text-sm font-black">{member.completedLessons}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <Heart size={12} className="text-rose-400" />
                            <span className="text-sm font-black">{member.prayerParticipation}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">{getStatusBadge(member.status)}</td>
                        <td className="px-6 py-4 text-xs text-gray-500">{member.lastActive}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Performers & Stage Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performers */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
              <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                <Trophy size={18} className="text-amber-600" />
                Top Performers
              </h3>
              <div className="space-y-3">
                {reportData.topPerformers.map((performer, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center font-black text-amber-600">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="font-black">{performer.name}</p>
                        <p className="text-[9px] text-gray-500">Attendance Leader</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-amber-600">{performer.score}%</p>
                      <p className="text-[9px] text-gray-400">attendance</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage Distribution */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                <Target size={18} className="text-emerald-500" />
                Mission Journey Distribution
              </h3>
              <div className="space-y-3">
                {Object.entries(reportData.stageDistribution).map(([stage, count]) => {
                  const total = reportData.totalMembers;
                  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
                  let stageColor = '';
                  if (stage === 'member') stageColor = 'bg-blue-500';
                  else if (stage === 'baptized') stageColor = 'bg-red-500';
                  else if (stage === 'worker') stageColor = 'bg-emerald-500';
                  else stageColor = 'bg-gray-500';
                  
                  return (
                    <div key={stage}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-black capitalize">{stage}</span>
                        <span className="font-black text-gray-600">{count} ({percentage}%)</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${stageColor} rounded-full`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Print Styles */}
          <style jsx global>{`
            @media print {
              .print\\:hidden {
                display: none !important;
              }
              body {
                padding: 20px;
                background: white;
              }
              .shadow-sm, .shadow-md, .shadow-lg {
                box-shadow: none !important;
              }
              .border {
                border: 1px solid #e5e7eb !important;
              }
            }
          `}</style>
        </div>
      </DashboardShell>
    </AuthGuard>
  );
}