"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function PortalPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    console.log("Portal page - Status:", status);
    console.log("Portal page - Session:", session);
    
    if (status === "loading") return;
    
    if (!session) {
      console.log("No session, redirecting to login");
      router.push("/login");
      return;
    }

    if (isRedirecting) return;
    setIsRedirecting(true);

    const userRole = session.user?.role?.toUpperCase();
    const userGroupId = session.user?.groupId;

    console.log("User Role:", userRole);
    console.log("User Group ID:", userGroupId);

    // Redirect based on role
    if (userRole === "ADMIN" || userRole === "PASTOR") {
      console.log("Redirecting to /groups");
      router.push("/groups");
    } else if (userGroupId && userGroupId !== "all" && userGroupId !== "undefined") {
      console.log(`Redirecting to /group/${userGroupId}`);
      router.push(`/group/${userGroupId}`);
    } else {
      console.log("No group assigned, redirecting to login");
      router.push("/login");
    }
  }, [session, status, router, isRedirecting]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#012169] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}
