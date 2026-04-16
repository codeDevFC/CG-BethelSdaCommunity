"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { ArrowLeft, LogOut, Shield } from "lucide-react";

export default function PastorDashboard() {
  const router = useRouter();
  const { logout, user, hasPermission, loading } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!hasPermission(['admin', 'pastor'])) {
        router.push('/');
      } else {
        setIsAuthorized(true);
      }
    }
  }, [loading, hasPermission, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#012169] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/" className="text-sm text-gray-500 hover:text-[#C8102E] mb-2 inline-block">
              ← Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-[#012169]">Pastor Dashboard</h1>
            <p className="text-gray-500 mt-2">Welcome, {user?.name}</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <Shield size={32} className="text-[#012169]" />
            <h2 className="text-2xl font-bold">Admin Access</h2>
          </div>
          <p className="text-gray-600">Your pastor dashboard is ready. More features coming soon.</p>
        </div>
      </div>
    </div>
  );
}
