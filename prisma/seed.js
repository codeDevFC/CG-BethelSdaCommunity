const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.studyProgress.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.prayer.deleteMany();
  await prisma.missionStats.deleteMany();
  await prisma.user.deleteMany();
  await prisma.group.deleteMany();

  console.log("✅ Cleared existing data");

  // Create groups
  const groups = [
    { id: "group-1", name: "01 - Bethel Care Group", meetingDay: "Sunday", meetingTime: "14:00", location: "Willenhall", healthScore: 92, memberCount: 12 },
    { id: "group-2", name: "02 - Faith Community", meetingDay: "Wednesday", meetingTime: "18:30", location: "Dudley", healthScore: 85, memberCount: 10 },
    { id: "group-3", name: "03 - Hope Fellowship", meetingDay: "Tuesday", meetingTime: "19:00", location: "Birmingham", healthScore: 78, memberCount: 15 },
    { id: "group-4", name: "04 - Grace Circle", meetingDay: "Thursday", meetingTime: "19:30", location: "Wolverhampton", healthScore: 70, memberCount: 8 },
    { id: "group-5", name: "05 - Love Alliance", meetingDay: "Monday", meetingTime: "18:00", location: "Walsall", healthScore: 88, memberCount: 11 },
    { id: "group-6", name: "06 - Joy Gathering", meetingDay: "Saturday", meetingTime: "10:00", location: "Coventry", healthScore: 75, memberCount: 9 },
    { id: "group-7", name: "07 - Peace Circle", meetingDay: "Tuesday", meetingTime: "19:30", location: "Sandwell", healthScore: 82, memberCount: 13 },
  ];

  for (const group of groups) {
    await prisma.group.upsert({
      where: { id: group.id },
      update: {},
      create: group,
    });
    console.log(`✅ Created group: ${group.name}`);
  }

  // Create users with simple password hashes (for demo purposes)
  // In production, use bcrypt properly
  const users = [
    { username: "admin", email: "admin@bethelwillenhall.org.uk", passwordHash: "admin@Bwcg777", name: "System Administrator", role: "ADMIN", groupId: null, isActive: true },
    { username: "PastorDan", email: "dan.majaducon@bethelwillenhall.org.uk", passwordHash: "PastorDan@BWcg777", name: "Pastor Dan Majaducon", role: "PASTOR", groupId: null, isActive: true },
    { username: "PastorTM", email: "thando.mlalazi@bethelwillenhall.org.uk", passwordHash: "PastorTM@BWcg777", name: "Pastor Thando Mlalazi", role: "PASTOR", groupId: null, isActive: true },
    { username: "CG-coord-01", email: "coordinator1@bethelwillenhall.org.uk", passwordHash: "CG-coord-01@BWcg04", name: "Coordinator CG-01", role: "COORDINATOR", groupId: "group-1", isActive: true },
    { username: "CG-coord-02", email: "coordinator2@bethelwillenhall.org.uk", passwordHash: "CG-coord-02@BWcg04", name: "Coordinator CG-02", role: "COORDINATOR", groupId: "group-2", isActive: true },
    { username: "CG-coord-03", email: "coordinator3@bethelwillenhall.org.uk", passwordHash: "CG-coord-03@BWcg04", name: "Coordinator CG-03", role: "COORDINATOR", groupId: "group-3", isActive: true },
    { username: "Member01", email: "member1@bethelwillenhall.org.uk", passwordHash: "Member01@member", name: "Member One", role: "MEMBER", groupId: "group-1", isActive: true },
    { username: "Member02", email: "member2@bethelwillenhall.org.uk", passwordHash: "Member02@member", name: "Member Two", role: "MEMBER", groupId: "group-2", isActive: true },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { username: user.username },
      update: {},
      create: user,
    });
    console.log(`✅ Created user: ${user.username} (${user.role})`);
  }

  // Create mission stats for each group
  for (const group of groups) {
    await prisma.missionStats.upsert({
      where: { groupId: group.id },
      update: {},
      create: {
        groupId: group.id,
        soulWinning: Math.floor(Math.random() * 15),
        baptisms: Math.floor(Math.random() * 5),
        outreachEvents: Math.floor(Math.random() * 12),
        prayerRequests: Math.floor(Math.random() * 20),
        answeredPrayers: Math.floor(Math.random() * 10),
      },
    });
    console.log(`✅ Created mission stats for ${group.name}`);
  }

  console.log("✅ Seeding complete!");
  console.log("");
  console.log("🔐 Test Credentials:");
  console.log("   Admin:      admin / admin@Bwcg777");
  console.log("   Pastor:     PastorDan / PastorDan@BWcg777");
  console.log("   Coordinator: CG-coord-01 / CG-coord-01@BWcg04");
  console.log("   Member:     Member01 / Member01@member");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
