#!/bin/bash
setup-database.sh - Initialize Prisma and Database Schema
set -e
echo "📦 Setting up database schema..."
Install Prisma dependencies
npm install -D prisma @prisma/client bcryptjs
npm install -D @types/bcryptjs
Initialize Prisma
npx prisma init --force
Create prisma directory if not exists
mkdir -p prisma
Create schema file
cat << 'SCHEMA_EOF' > prisma/schema.prisma
generator client {
provider = "prisma-client-js"
}
datasource db {
provider = "postgresql"
url      = env("DATABASE_URL")
}
model User {
id           String   @id @default(cuid())
username     String   @unique
email        String   @unique
passwordHash String
name         String
role         Role     @default(MEMBER)
groupId      String?
group        Group?   @relation(fields: [groupId], references: [id])
createdAt    DateTime @default(now())
updatedAt    DateTime @updatedAt
lastLogin    DateTime?
isActive     Boolean  @default(true)
sessions     Session[]
studyProgress StudyProgress[]
}
model Session {
id           String   @id @default(cuid())
userId       String
user         User     @relation(fields: [userId], references: [id])
sessionToken String   @unique
expires      DateTime
createdAt    DateTime @default(now())
}
model Group {
id           String   @id @default(cuid())
name         String
meetingDay   String
meetingTime  String
location     String?
description  String?
healthScore  Int      @default(70)
createdAt    DateTime @default(now())
updatedAt    DateTime @updatedAt
members      Member[]
leaders      User[]
prayers      Prayer[]
attendances  Attendance[]
missionStats MissionStats?
}
model Member {
id            Int      @id @default(autoincrement())
groupId       String
group         Group    @relation(fields: [groupId], references: [id])
name          String
status        Status   @default(MEMBER)
journeyStage  String   @default("member")
phone         String?
email         String?
notes         String?
joinedDate    DateTime @default(now())
attendances   Attendance[]
prayerRequests PrayerRequest[]
}
model Attendance {
id         Int      @id @default(autoincrement())
memberId   Int
member     Member   @relation(fields: [memberId], references: [id])
groupId    String
group      Group    @relation(fields: [groupId], references: [id])
date       DateTime @default(now())
status     AttendanceStatus @default(PRESENT)
notes      String?
@@unique([memberId, date])
}
model Prayer {
id           Int      @id @default(autoincrement())
groupId      String
group        Group    @relation(fields: [groupId], references: [id])
memberName   String
request      String
status       PrayerStatus @default(ACTIVE)
isPrivate    Boolean  @default(false)
category     String?
urgency      String   @default("medium")
createdAt    DateTime @default(now())
answeredAt   DateTime?
testimony    String?
}
model StudyProgress {
id         Int      @id @default(autoincrement())
userId     String
user       User     @relation(fields: [userId], references: [id])
groupId    String
seriesId   String
lessonId   Int
completed  Boolean  @default(false)
completedAt DateTime?
notes      String?
@@unique([userId, seriesId, lessonId])
}
model MissionStats {
id              Int    @id @default(autoincrement())
groupId         String @unique
group           Group  @relation(fields: [groupId], references: [id])
soulWinning     Int    @default(0)
baptisms        Int    @default(0)
outreachEvents  Int    @default(0)
prayerRequests  Int    @default(0)
answeredPrayers Int    @default(0)
updatedAt       DateTime @updatedAt
}
enum Role {
ADMIN
PASTOR
COORDINATOR
ELDER
DEACON
MEMBER
}
enum Status {
MEMBER
SEEKER
}
enum AttendanceStatus {
PRESENT
LATE
ABSENT
EXCUSED
}
enum PrayerStatus {
ACTIVE
ANSWERED
ARCHIVED
}
SCHEMA_EOF
Create .env file template
cat << 'ENV_EOF' > .env.example
Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/bethel_db"
NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
Security
BCRYPT_ROUNDS=10
JWT_EXPIRY="8h"
ENV_EOF
Generate Prisma client
npx prisma generate
echo "✅ Database schema created successfully!"
echo ""
echo "Next steps:"
echo "1. Update .env file with your database URL"
echo "2. Run: npx prisma migrate dev --name init"
echo "3. Run: npx prisma db seed (after creating seed script)"
