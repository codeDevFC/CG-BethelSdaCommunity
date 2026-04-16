import { NextResponse } from "next/server";

// Mock data for Vercel build
const mockGroups = [
  { id: "1", name: "Bethel CareGroup-01", meetingDay: "Sunday", meetingTime: "14:00", location: "Willenhall", memberCount: 12, healthScore: 85 },
  { id: "2", name: "Bethel CareGroup-02", meetingDay: "Wednesday", meetingTime: "18:30", location: "Dudley", memberCount: 10, healthScore: 78 },
  { id: "3", name: "Bethel CareGroup-03", meetingDay: "Tuesday", meetingTime: "19:00", location: "Birmingham", memberCount: 15, healthScore: 92 },
  { id: "4", name: "Bethel CareGroup-04", meetingDay: "Thursday", meetingTime: "19:30", location: "Wolverhampton", memberCount: 8, healthScore: 70 },
  { id: "5", name: "Bethel CareGroup-05", meetingDay: "Monday", meetingTime: "18:00", location: "Walsall", memberCount: 11, healthScore: 88 }
];

export async function GET() {
  try {
    // Try to use Prisma if available and not in Vercel build
    if (process.env.VERCEL !== '1') {
      try {
        const { prisma } = await import("@/lib/prisma");
        const dbGroups = await prisma.group.findMany({
          select: {
            id: true,
            name: true,
            meetingDay: true,
            meetingTime: true,
            location: true,
            healthScore: true,
            _count: {
              select: { members: true }
            }
          }
        });
        
        const groups = dbGroups.map(group => ({
          id: group.id,
          name: group.name,
          meetingDay: group.meetingDay,
          meetingTime: group.meetingTime,
          location: group.location || "TBD",
          memberCount: group._count.members,
          healthScore: group.healthScore
        }));
        
        return NextResponse.json(groups);
      } catch (prismaError) {
        console.log("Prisma error, using mock data");
      }
    }
    
    return NextResponse.json(mockGroups);
  } catch (error) {
    console.error("Error fetching groups:", error);
    return NextResponse.json(mockGroups, { status: 200 });
  }
}
