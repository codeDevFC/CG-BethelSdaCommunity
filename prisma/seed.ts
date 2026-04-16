import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");
  
  // Hash passwords
  const adminPassword = await bcrypt.hash("admin@Bwcg777", 10);
  const pastorDanPassword = await bcrypt.hash("PastorDanM", 10);
  const pastorTMPassword = await bcrypt.hash("PastorMlalaziT", 10);
  const coordinator1Password = await bcrypt.hash("CG01@BWcg", 10);
  const coordinator2Password = await bcrypt.hash("CG02@BWcg7", 10);
  const coordinator3Password = await bcrypt.hash("CG03@BWcg2026", 10);
  const memberPassword = await bcrypt.hash("MemberUser@BWcg", 10);
  
  // Create Users
  const admin = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      email: "admin@bethelwillenhall.org.uk",
      passwordHash: adminPassword,
      name: "System Administrator",
      role: "ADMIN",
      isActive: true,
    }
  });
  console.log("✅ Admin user created");
  
  const pastorDan = await prisma.user.upsert({
    where: { username: "PastorDan" },
    update: {},
    create: {
      username: "PastorDan",
      email: "dan.majaducon@bethelwillenhall.org.uk",
      passwordHash: pastorDanPassword,
      name: "Pastor Dan Majaducon",
      role: "PASTOR",
      isActive: true,
    }
  });
  console.log("✅ Pastor Dan created");
  
  const pastorTM = await prisma.user.upsert({
    where: { username: "PastorTM" },
    update: {},
    create: {
      username: "PastorTM",
      email: "thando.mlalazi@bethelwillenhall.org.uk",
      passwordHash: pastorTMPassword,
      name: "Pastor Thando Mlalazi",
      role: "PASTOR",
      isActive: true,
    }
  });
  console.log("✅ Pastor Thando created");
  
  // Create Groups first (so we have IDs for coordinators)
  const group1 = await prisma.group.upsert({
    where: { id: "group-1" },
    update: {},
    create: {
      id: "group-1",
      name: "Bethel CareGroup-01",
      meetingDay: "Sunday",
      meetingTime: "14:00",
      location: "Willenhall Town Centre",
      description: "A caring community meeting in Willenhall",
      healthScore: 85,
    }
  });
  console.log("✅ Group 1 created");
  
  const group2 = await prisma.group.upsert({
    where: { id: "group-2" },
    update: {},
    create: {
      id: "group-2",
      name: "Bethel CareGroup-02",
      meetingDay: "Wednesday",
      meetingTime: "18:30",
      location: "Dudley Town Centre",
      description: "Wednesday evening fellowship in Dudley",
      healthScore: 78,
    }
  });
  console.log("✅ Group 2 created");
  
  const group3 = await prisma.group.upsert({
    where: { id: "group-3" },
    update: {},
    create: {
      id: "group-3",
      name: "Bethel CareGroup-03",
      meetingDay: "Tuesday",
      meetingTime: "19:00",
      location: "Birmingham City Centre",
      description: "Tuesday night Bible study in Birmingham",
      healthScore: 92,
    }
  });
  console.log("✅ Group 3 created");
  
  const group4 = await prisma.group.upsert({
    where: { id: "group-4" },
    update: {},
    create: {
      id: "group-4",
      name: "Bethel CareGroup-04",
      meetingDay: "Thursday",
      meetingTime: "19:30",
      location: "Wolverhampton City Centre",
      description: "Thursday prayer and fellowship",
      healthScore: 70,
    }
  });
  console.log("✅ Group 4 created");
  
  const group5 = await prisma.group.upsert({
    where: { id: "group-5" },
    update: {},
    create: {
      id: "group-5",
      name: "Bethel CareGroup-05",
      meetingDay: "Monday",
      meetingTime: "18:00",
      location: "Walsall Town Centre",
      description: "Monday evening discipleship",
      healthScore: 88,
    }
  });
  console.log("✅ Group 5 created");
  
  // Create Coordinators with group assignments
  const coordinator1 = await prisma.user.upsert({
    where: { username: "CG-coord-01" },
    update: {},
    create: {
      username: "CG-coord-01",
      email: "coordinator1@bethelwillenhall.org.uk",
      passwordHash: coordinator1Password,
      name: "Coordinator CG-01",
      role: "COORDINATOR",
      groupId: group1.id,
      isActive: true,
    }
  });
  console.log("✅ Coordinator 1 created (assigned to Group 1)");
  
  const coordinator2 = await prisma.user.upsert({
    where: { username: "CG-coord-02" },
    update: {},
    create: {
      username: "CG-coord-02",
      email: "coordinator2@bethelwillenhall.org.uk",
      passwordHash: coordinator2Password,
      name: "Coordinator CG-02",
      role: "COORDINATOR",
      groupId: group2.id,
      isActive: true,
    }
  });
  console.log("✅ Coordinator 2 created (assigned to Group 2)");
  
  const coordinator3 = await prisma.user.upsert({
    where: { username: "CG-coord-03" },
    update: {},
    create: {
      username: "CG-coord-03",
      email: "coordinator3@bethelwillenhall.org.uk",
      passwordHash: coordinator3Password,
      name: "Coordinator CG-03",
      role: "COORDINATOR",
      groupId: group3.id,
      isActive: true,
    }
  });
  console.log("✅ Coordinator 3 created (assigned to Group 3)");
  
  // Create Member user
  const member = await prisma.user.upsert({
    where: { username: "Member@BWcg" },
    update: {},
    create: {
      username: "Member@BWcg",
      email: "member@bethelwillenhall.org.uk",
      passwordHash: memberPassword,
      name: "Care Group Member",
      role: "MEMBER",
      groupId: group1.id,
      isActive: true,
    }
  });
  console.log("✅ Member user created (assigned to Group 1)");
  
  // Create Mission Stats for each group
  await prisma.missionStats.upsert({
    where: { groupId: group1.id },
    update: {},
    create: {
      groupId: group1.id,
      soulWinning: 8,
      baptisms: 3,
      outreachEvents: 12,
    }
  });
  console.log("✅ Mission stats for Group 1");
  
  await prisma.missionStats.upsert({
    where: { groupId: group2.id },
    update: {},
    create: {
      groupId: group2.id,
      soulWinning: 5,
      baptisms: 2,
      outreachEvents: 8,
    }
  });
  console.log("✅ Mission stats for Group 2");
  
  await prisma.missionStats.upsert({
    where: { groupId: group3.id },
    update: {},
    create: {
      groupId: group3.id,
      soulWinning: 12,
      baptisms: 4,
      outreachEvents: 15,
    }
  });
  console.log("✅ Mission stats for Group 3");
  
  await prisma.missionStats.upsert({
    where: { groupId: group4.id },
    update: {},
    create: {
      groupId: group4.id,
      soulWinning: 3,
      baptisms: 1,
      outreachEvents: 5,
    }
  });
  console.log("✅ Mission stats for Group 4");
  
  await prisma.missionStats.upsert({
    where: { groupId: group5.id },
    update: {},
    create: {
      groupId: group5.id,
      soulWinning: 6,
      baptisms: 2,
      outreachEvents: 10,
    }
  });
  console.log("✅ Mission stats for Group 5");
  
  console.log("\n🎉 Seeding complete!");
  console.log("\n📋 Login Credentials:");
  console.log("   Admin: admin / admin@Bwcg777");
  console.log("   Pastor Dan: PastorDan / PastorDanM");
  console.log("   Pastor Thando: PastorTM / PastorMlalaziT");
  console.log("   Coordinator 1: CG-coord-01 / CG01@BWcg");
  console.log("   Coordinator 2: CG-coord-02 / CG02@BWcg7");
  console.log("   Coordinator 3: CG-coord-03 / CG03@BWcg2026");
  console.log("   Member: Member@BWcg / MemberUser@BWcg");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
