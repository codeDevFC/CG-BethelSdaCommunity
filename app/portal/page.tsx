"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FALLBACK_GROUPS } from "@/lib/constants";

export default function PortalPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/login");
      return;
    }

    const userRole = session.user?.role;
    const userGroupId = session.user?.groupId;

    // Redirect to appropriate page based on role
    if (userRole === "ADMIN" || userRole === "PASTOR") {
      router.push("/groups");
    } else if (userGroupId && userGroupId !== "all") {
      router.push(`/group/${userGroupId}`);
    } else {
      // If member has no group, show group selection
      router.push("/login");
    }
  }, [session, status, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#012169] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}
