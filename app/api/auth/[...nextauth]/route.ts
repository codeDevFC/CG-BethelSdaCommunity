import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// Mock users for build time
const mockUsers = [
  { id: "1", username: "admin", passwordHash: "$2b$10$4DFJXrJGp4Am7vM0mf1BGeI2t6bPEZNAyCKvRN20eqlOJKZa1B5K2", name: "System Administrator", role: "ADMIN", isActive: true }
];

let prisma: any = null;

// Try to import prisma dynamically
try {
  const { prisma: prismaClient } = await import("@/lib/prisma");
  prisma = prismaClient;
} catch (error) {
  console.log("Prisma not available, using mock data");
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        groupId: { label: "Group ID", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        let user = null;
        
        // Try to get user from database
        if (prisma) {
          user = await prisma.user.findUnique({
            where: { username: credentials.username },
          });
        } else {
          // Use mock user for build
          user = mockUsers.find(u => u.username === credentials.username);
        }

        if (!user || !user.isActive) {
          throw new Error("User not found");
        }

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          groupId: user.groupId,
          username: user.username
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.groupId = user.groupId;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.groupId = token.groupId as string;
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
