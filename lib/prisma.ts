import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Mock Prisma Client for build time
class MockPrismaClient {
  user = {
    findUnique: async () => null,
    findMany: async () => [],
    create: async () => ({}),
    update: async () => ({}),
    delete: async () => ({})
  };
  group = {
    findUnique: async () => null,
    findMany: async () => [],
    create: async () => ({}),
    update: async () => ({}),
    delete: async () => ({})
  };
  member = {
    findUnique: async () => null,
    findMany: async () => [],
    create: async () => ({}),
    update: async () => ({}),
    delete: async () => ({})
  };
  prayer = {
    findUnique: async () => null,
    findMany: async () => [],
    create: async () => ({}),
    update: async () => ({}),
    delete: async () => ({})
  };
  missionStats = {
    findUnique: async () => null,
    findMany: async () => [],
    create: async () => ({}),
    update: async () => ({}),
    delete: async () => ({})
  };
  studyProgress = {
    findUnique: async () => null,
    findMany: async () => [],
    create: async () => ({}),
    update: async () => ({}),
    delete: async () => ({})
  };
  
  async $connect() {
    return;
  }
  
  async $disconnect() {
    return;
  }
}

// Only create PrismaClient if we're not in a build environment
let prismaClient: PrismaClient | null = null;

if (typeof window === 'undefined' && process.env.NODE_ENV !== 'production') {
  // Development environment
  if (!globalForPrisma.prisma) {
    try {
      globalForPrisma.prisma = new PrismaClient();
    } catch (e) {
      console.warn("PrismaClient initialization failed:", e);
    }
  }
  prismaClient = globalForPrisma.prisma || null;
} else if (process.env.NODE_ENV === 'production' && process.env.VERCEL !== '1') {
  // Production but not Vercel
  try {
    prismaClient = new PrismaClient();
  } catch (e) {
    console.warn("PrismaClient initialization failed:", e);
  }
}

// For Vercel builds, use mock client
const isVercelBuild = process.env.VERCEL === '1';
export const prisma = isVercelBuild ? new MockPrismaClient() as unknown as PrismaClient : prismaClient;

export default prisma;
