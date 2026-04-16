"use client";
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
const { user, loading } = useAuth();
if (loading) {
return (
<div className="min-h-screen flex items-center justify-center bg-white">
<div className="text-center">
<div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
<p className="text-gray-500 font-black uppercase tracking-widest text-[10px]">
Loading secure portal...
</p>
</div>
</div>
);
}
if (!user) {
return null;
}
return (
<>
<Toaster position="top-right" toastOptions={{ duration: 3000 }} />
{children}
</>
);
}
