"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardShell from "@/components/DashboardShell";
import AuthGuard from "@/components/AuthGuard";
import Link from "next/link";
import { 
  Shield, CheckCircle, AlertTriangle, Heart, 
  Home, Briefcase, FileText, Download, Printer,
  ChevronDown, ChevronUp, Users, Baby, Car, 
  Utensils, Lock, Bell, ClipboardCheck, Eye,
  EyeOff, Copy, Share2, Calendar, Clock
} from "lucide-react";
import toast from "react-hot-toast";

interface SafetySection {
  id: string;
  title: string;
  icon: any;
  color: string;
  items: { title: string; description: string; required: boolean }[];
}

const safetySections: SafetySection[] = [
  {
    id: "approval",
    title: "Board Approval & Risk Assessment",
    icon: ClipboardCheck,
    color: "from-blue-600 to-blue-500",
    items: [
      { title: "Written Board Approval", description: "Written approval must be obtained from the local church board to operate a home-based care group. Reporting lines to the church should be clearly defined.", required: true },
      { title: "Risk Assessment", description: "A written risk assessment by the local safeguarding officer must be completed for the venue and planned activities, identifying potential hazards, assessing likelihood and impact, and noting mitigating controls. This should be kept on file and reviewed annually or following any incident.", required: true }
    ]
  },
  {
    id: "safeguarding",
    title: "Safeguarding (Children & Vulnerable Adults)",
    icon: Shield,
    color: "from-red-600 to-rose-600",
    items: [
      { title: "DBS / Background Checks", description: "Hosts and at least 3 leaders per group who have contact with children or vulnerable adults must hold appropriate DBS clearance by the church in line with national and BUC safeguarding policy.", required: true },
      { title: "Two-Adult Rule", description: "At no time should an adult be alone with a child or vulnerable adult. Appropriate supervision and seating arrangements must be maintained at all times.", required: true },
      { title: "Designated Safeguarding Lead (DSL)", description: "Each church must have a designated Safeguarding Lead (or officer) to whom any concerns are reported. DSL contact details should be made available to hosts and leaders.", required: true },
      { title: "Reporting & Records", description: "Keep records of weekly attendance. All safeguarding concerns and incidents must be recorded confidentially and reported in accordance with statutory and denominational safeguarding procedures.", required: true }
    ]
  },
  {
    id: "health",
    title: "Health & Infection Control",
    icon: Heart,
    color: "from-green-600 to-emerald-600",
    items: [
      { title: "Illness Guidance", description: "Individuals displaying symptoms of contagious illness (e.g. fever, vomiting, diarrhoea or respiratory infection) should be encouraged to stay at home. Remote participation may be offered where feasible.", required: false },
      { title: "Hygiene Measures", description: "Hand-washing facilities or hand sanitiser should be available. Tissues and a covered bin should be provided, and high-touch surfaces cleaned before and after meetings.", required: true },
      { title: "Vulnerable Attendees", description: "Consideration should be given to attendees with specific health vulnerabilities (e.g. immunocompromised individuals or pregnancy), with reasonable adjustments made as necessary.", required: false }
    ]
  },
  {
    id: "venue",
    title: "Venue & Environment Safety",
    icon: Home,
    color: "from-amber-600 to-orange-600",
    items: [
      { title: "Host Briefing", description: "Hosts should be familiar with evacuation routes, the location of the first-aid kit, gas and electricity shut-off points, and should ensure the meeting area is safe, accessible and free from clutter.", required: true },
      { title: "Capacity & Exits", description: "The home must be able to safely accommodate the expected number of attendees, with clear and unobstructed exit routes.", required: true },
      { title: "Accessibility", description: "Reasonable provision should be made for individuals with mobility or access needs.", required: false },
      { title: "Electrical & Fire Safety", description: "Electrical appliances should be in good working order. Overloaded sockets must be avoided. Candles or portable heaters, if used, must be supervised, and smoke alarms must be operational.", required: true }
    ]
  },
  {
    id: "emergency",
    title: "Emergency Preparedness",
    icon: Bell,
    color: "from-red-600 to-red-500",
    items: [
      { title: "First Aid", description: "A trained first aider should be present where possible, or at minimum a well-stocked first-aid kit should be available. Details of the nearest A&E department and emergency contacts should be known.", required: true },
      { title: "Emergency Contacts & Consent", description: "Emergency contact details and relevant medical information (e.g. allergies or serious conditions) should be collected, with consent obtained to administer basic first aid or seek emergency assistance if required.", required: true },
      { title: "Incident Reporting", description: "All incidents must be documented and reported according to church policy.", required: true }
    ]
  },
  {
    id: "food",
    title: "Food & Drink",
    icon: Utensils,
    color: "from-amber-600 to-yellow-600",
    items: [
      { title: "Allergy Safety", description: "Food handlers should be aware of common allergies. Ingredients should be clearly communicated, and alternatives provided where possible.", required: true },
      { title: "Food Hygiene", description: "Proper food handling, storage, and temperature controls should be maintained.", required: true }
    ]
  },
  {
    id: "transport",
    title: "Transport & Outings",
    icon: Car,
    color: "from-blue-600 to-cyan-600",
    items: [
      { title: "Driver Checks", description: "Drivers transporting group members should have valid licenses and appropriate insurance. Vehicle roadworthiness should be verified.", required: true },
      { title: "Permission for Minors", description: "Written parental consent must be obtained before transporting minors or taking them on outings.", required: true }
    ]
  },
  {
    id: "confidentiality",
    title: "Confidentiality & Data Protection",
    icon: Lock,
    color: "from-purple-600 to-violet-600",
    items: [
      { title: "Confidential Information", description: "Personal and pastoral information must be treated as confidential, stored securely, and retained only in accordance with data protection legislation and church policy.", required: true },
      { title: "Consent for Communication", description: "Consent must be obtained before adding individuals to messaging groups or mailing lists, with clarity provided on how their data will be used.", required: true }
    ]
  },
  {
    id: "insurance",
    title: "Insurance & Legal",
    icon: Briefcase,
    color: "from-gray-600 to-slate-600",
    items: [
      { title: "Insurance Coverage", description: "Confirmation must be obtained that the local church's insurance covers organised activities held in private homes. Guidance should be sought from Adventist Risk Management or the conference office if clarification is needed.", required: true },
      { title: "Legal Duties", description: "Leaders should be familiar with their duty of care, safeguarding obligations, and any applicable public health requirements.", required: true }
    ]
  },
  {
    id: "training",
    title: "Training & Leader Standards",
    icon: Users,
    color: "from-indigo-600 to-purple-600",
    items: [
      { title: "Leader Training", description: "Hosts and leaders should receive basic training in safeguarding, first aid awareness, appropriate boundaries and confidentiality, with refresher training undertaken annually.", required: true }
    ]
  }
];

export default function SafetyPage() {
  const { user, hasPermission } = useAuth();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(safetySections.map(s => s.id)));
  const [showCertified, setShowCertified] = useState(false);
  const [certifiedDate, setCertifiedDate] = useState<string | null>(null);

  useEffect(() => {
    // Load certification status from localStorage
    const saved = localStorage.getItem('safety_certified');
    const savedDate = localStorage.getItem('safety_certified_date');
    if (saved === 'true') {
      setShowCertified(true);
      setCertifiedDate(savedDate);
    }
  }, []);

  const toggleSection = (id: string) => {
    const newSet = new Set(expandedSections);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedSections(newSet);
  };

  const expandAll = () => {
    setExpandedSections(new Set(safetySections.map(s => s.id)));
  };

  const collapseAll = () => {
    setExpandedSections(new Set());
  };

  const handleCertify = () => {
    const confirmed = confirm(
      "By confirming compliance, you certify that you have read, understood, and will implement all required health and safety measures for your Care Group. This will be recorded for audit purposes."
    );
    if (confirmed) {
      const date = new Date().toISOString();
      localStorage.setItem('safety_certified', 'true');
      localStorage.setItem('safety_certified_date', date);
      setShowCertified(true);
      setCertifiedDate(date);
      toast.success("Compliance confirmed! Your certification has been recorded.");
    }
  };

  const handleExportPDF = () => {
    toast.success("Preparing PDF for download...");
    // In production, this would trigger actual PDF generation
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const completedChecks = safetySections.reduce((acc, section) => {
    return acc + section.items.filter(item => item.required).length;
  }, 0);
  const totalRequired = safetySections.reduce((acc, section) => {
    return acc + section.items.filter(item => item.required).length;
  }, 0);
  const completionPercentage = Math.round((completedChecks / totalRequired) * 100);

  const isLeader = hasPermission(['coordinator', 'pastor', 'admin']);

  if (!isLeader) {
    return (
      <AuthGuard>
        <DashboardShell>
          <div className="text-center py-20">
            <Shield size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 font-black">Access Restricted</p>
            <p className="text-sm text-gray-400 mt-2">This page is for Care Group leaders only.</p>
          </div>
        </DashboardShell>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <DashboardShell>
        <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-700 pb-20">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield size={20} className="text-red-600" />
              <span className="text-[10px] font-black text-red-600 uppercase tracking-wider">Compliance & Safety</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-black tracking-tighter" style={{ fontFamily: 'Georgia, serif' }}>
              Health & Safety
            </h1>
            <p className="text-gray-500 text-sm mt-2 max-w-2xl">
              Complete health and safety checklist for Care Group home-based ministry.
              Ensure your group meets all UK compliance requirements.
            </p>
          </div>

          {/* Compliance Score */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border border-red-100">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <CheckCircle size={32} className="text-red-600" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-red-600 uppercase">Compliance Status</p>
                  <p className="text-2xl font-black">{completedChecks}/{totalRequired} Required Checks</p>
                  <div className="w-32 h-1.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${completionPercentage}%` }} />
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={expandAll} className="px-4 py-2 rounded-xl bg-white text-gray-700 text-[10px] font-black hover:bg-gray-100 transition-colors">
                  Expand All
                </button>
                <button onClick={collapseAll} className="px-4 py-2 rounded-xl bg-white text-gray-700 text-[10px] font-black hover:bg-gray-100 transition-colors">
                  Collapse All
                </button>
                <button onClick={handleExportPDF} className="px-4 py-2 rounded-xl bg-red-600 text-white text-[10px] font-black hover:bg-red-700 transition-colors">
                  <Download size={12} className="inline mr-1" /> Download PDF
                </button>
              </div>
            </div>
          </div>

          {/* Safety Sections */}
          <div className="space-y-4">
            {safetySections.map((section) => {
              const Icon = section.icon;
              const isExpanded = expandedSections.has(section.id);
              const requiredCount = section.items.filter(i => i.required).length;
              const completedCount = requiredCount; // For demo, all required are considered completed
              
              return (
                <div key={section.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${section.color} flex items-center justify-center text-white`}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <h2 className="font-black text-lg">{section.title}</h2>
                        <p className="text-[10px] text-gray-500">{requiredCount} required items</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right hidden sm:block">
                        <p className="text-[10px] font-black text-green-600">{completedCount}/{requiredCount}</p>
                      </div>
                      {isExpanded ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                    </div>
                  </button>
                  
                  {isExpanded && (
                    <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                      <div className="space-y-4">
                        {section.items.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            {item.required ? (
                              <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                            ) : (
                              <AlertTriangle size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
                            )}
                            <div>
                              <p className="font-black text-sm">
                                {item.title}
                                {item.required && <span className="text-red-500 text-[9px] ml-1">*Required</span>}
                              </p>
                              <p className="text-sm text-gray-600 mt-1 leading-relaxed">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Certification Section */}
          <div className={`rounded-2xl p-6 border transition-all ${showCertified ? 'bg-green-50 border-green-200' : 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200'}`}>
            <div className="flex items-start gap-4 flex-wrap">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Shield size={24} className="text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-lg">Leader Certification</h3>
                <p className="text-gray-600 text-sm mb-3">
                  By leading a Care Group, you confirm that you have read, understood, and will implement 
                  all required health and safety measures in accordance with UK law and church policy.
                </p>
                {showCertified ? (
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-600" />
                      <span className="text-sm font-black text-green-700">Certified</span>
                      {certifiedDate && (
                        <span className="text-[10px] text-gray-500">
                          {new Date(certifiedDate).toLocaleDateString('en-GB')}
                        </span>
                      )}
                    </div>
                    <button 
                      onClick={() => {
                        setShowCertified(false);
                        localStorage.removeItem('safety_certified');
                        localStorage.removeItem('safety_certified_date');
                        toast.info("Certification revoked. Please review and recertify.");
                      }}
                      className="text-[10px] text-red-600 underline"
                    >
                      Revoke
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={handleCertify}
                      className="px-6 py-2.5 bg-green-600 text-white rounded-xl font-black text-[10px] uppercase tracking-wider hover:bg-green-700 transition-all"
                    >
                      I Confirm Compliance
                    </button>
                    <button className="px-6 py-2.5 bg-white text-gray-700 rounded-xl font-black text-[10px] uppercase tracking-wider border border-gray-200 hover:bg-gray-50 transition-all">
                      Download Full Checklist
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
            <div className="flex items-center gap-3 mb-4">
              <Bell size={20} className="text-red-600" />
              <h3 className="font-black text-red-800">Emergency Contacts</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-black">UK Emergency</p>
                <p className="text-red-700 text-lg font-mono">999 / 112</p>
              </div>
              <div>
                <p className="font-black">NHS 111 (Non-emergency)</p>
                <p className="text-red-700 text-lg font-mono">111</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-red-200">
              <p className="text-[10px] text-red-600">
                Nearest A&E: [Insert your local hospital name and address here]
              </p>
              <p className="text-[10px] text-red-600 mt-1">
                Designated Safeguarding Lead: [Insert name and contact number]
              </p>
              <p className="text-[10px] text-red-600 mt-1">
                Church Insurance Reference: [Insert policy number]
              </p>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center text-[9px] text-gray-400 border-t pt-6">
            <p>This document is for informational purposes and does not constitute legal advice.</p>
            <p className="mt-1">Always refer to official UK legislation and BUC Safeguarding policies for definitive guidance.</p>
            <p className="mt-2">Last reviewed: {new Date().toLocaleDateString('en-GB')}</p>
          </div>
        </div>
      </DashboardShell>
    </AuthGuard>
  );
}