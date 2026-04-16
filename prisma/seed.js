import { PrismaClient } from "@prisma/client";

// For Prisma v7, we need to pass the datasource url
const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL || "file:./dev.db",
});

async function main() {
  console.log("🌱 Seeding database...");
  
  try {
    // Create admin user (without password hash for now)
    const admin = await prisma.user.upsert({
      where: { username: "admin" },
      update: {},
      create: {
        username: "admin",
        email: "admin@bethelwillenhall.org.uk",
        passwordHash: "temp_hash",
        name: "System Administrator",
        role: "ADMIN",
        isActive: true,
      }
    });
    
    console.log("✅ Admin user created - Username: admin");
    
    // Create sample groups
    const groups = [
      { name: "Bethel CareGroup-01", meetingDay: "Sunday", meetingTime: "14:00", location: "Willenhall" },
      { name: "Bethel CareGroup-02", meetingDay: "Wednesday", meetingTime: "18:30", location: "Dudley" },
      { name: "Bethel CareGroup-03", meetingDay: "Tuesday", meetingTime: "19:00", location: "Birmingham" },
      { name: "Bethel CareGroup-04", meetingDay: "Thursday", meetingTime: "19:30", location: "Wolverhampton" },
      { name: "Bethel CareGroup-05", meetingDay: "Monday", meetingTime: "18:00", location: "Walsall" },
    ];
    
    for (const groupData of groups) {
      const group = await prisma.group.create({
        data: {
          name: groupData.name,
          meetingDay: groupData.meetingDay,
          meetingTime: groupData.meetingTime,
          location: groupData.location,
          healthScore: 70 + Math.floor(Math.random() * 20),
        }
      });
      
      // Create mission stats for group
      await prisma.missionStats.create({
        data: {
          groupId: group.id,
          soulWinning: Math.floor(Math.random() * 10),
          baptisms: Math.floor(Math.random() * 3),
        }
      });
      
      console.log(`✅ Group created: ${group.name}`);
    }
    
    console.log("🎉 Seeding complete!");
  } catch (error) {
    console.error("Error during seeding:", error.message);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
