import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

// Define user type for TypeScript
interface AppUser {
  id: string;
  username: string;
  email: string;
  name: string;
  role: string;
  groupId: string | null;
  password: string;
  isActive: boolean;
}

// Fallback users for when database is not available
const FALLBACK_USERS: AppUser[] = [
  { id: "1", username: "admin", email: "admin@bethelwillenhall.org.uk", name: "System Administrator", role: "ADMIN", groupId: "all", password: "admin@Bwcg777", isActive: true },
  { id: "2", username: "PastorDan", email: "dan.majaducon@bethelwillenhall.org.uk", name: "Pastor Dan Majaducon", role: "PASTOR", groupId: "all", password: "PastorDan@BWcg777", isActive: true },
  { id: "3", username: "PastorTM", email: "thando.mlalazi@bethelwillenhall.org.uk", name: "Pastor Thando Mlalazi", role: "PASTOR", groupId: "all", password: "PastorTM@BWcg777", isActive: true },
  { id: "4", username: "CG-coord-01", email: "coordinator1@bethelwillenhall.org.uk", name: "Coordinator CG-01", role: "COORDINATOR", groupId: "1", password: "CG-coord-01@BWcg04", isActive: true },
  { id: "5", username: "CG-coord-02", email: "coordinator2@bethelwillenhall.org.uk", name: "Coordinator CG-02", role: "COORDINATOR", groupId: "2", password: "CG-coord-02@BWcg04", isActive: true },
  { id: "6", username: "CG-coord-03", email: "coordinator3@bethelwillenhall.org.uk", name: "Coordinator CG-03", role: "COORDINATOR", groupId: "3", password: "CG-coord-03@BWcg04", isActive: true },
  { id: "7", username: "CG-coord-04", email: "coordinator4@bethelwillenhall.org.uk", name: "Coordinator CG-04", role: "COORDINATOR", groupId: "4", password: "CG-coord-04@BWcg04", isActive: true },
  { id: "8", username: "CG-coord-05", email: "coordinator5@bethelwillenhall.org.uk", name: "Coordinator CG-05", role: "COORDINATOR", groupId: "5", password: "CG-coord-05@BWcg04", isActive: true },
  { id: "9", username: "CG-coord-06", email: "coordinator6@bethelwillenhall.org.uk", name: "Coordinator CG-06", role: "COORDINATOR", groupId: "6", password: "CG-coord-06@BWcg04", isActive: true },
  { id: "10", username: "CG-coord-07", email: "coordinator7@bethelwillenhall.org.uk", name: "Coordinator CG-07", role: "COORDINATOR", groupId: "7", password: "CG-coord-07@BWcg04", isActive: true },
  { id: "11", username: "Member01", email: "member1@bethelwillenhall.org.uk", name: "Member One", role: "MEMBER", groupId: "1", password: "Member01@member", isActive: true },
];

function getPassword(username: string, role: string): string {
  const month = String(new Date().getMonth() + 1).padStart(2, '0');
  if (role === 'ADMIN') return 'admin@Bwcg777';
  if (role === 'PASTOR') return `${username}@BWcg777`;
  if (role === 'COORDINATOR') return `${username}@BWcg${month}`;
  return `${username}@member`;
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          console.log("Missing credentials");
          throw new Error("Please enter username and password");
        }

        const username = credentials.username.toLowerCase();
        const password = credentials.password;

        // Try database first
        let user = null;
        try {
          user = await prisma.user.findUnique({
            where: { username: username },
          });
        } catch (dbError) {
          console.log("Database error, using fallback:", dbError);
        }

        // Fallback to hardcoded users
        let appUser = user ? {
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name,
          role: user.role,
          groupId: user.groupId,
          password: getPassword(user.username, user.role),
          isActive: user.isActive,
        } : FALLBACK_USERS.find(u => u.username.toLowerCase() === username);

        if (!appUser || !appUser.isActive) {
          console.log("User not found or inactive");
          throw new Error("User not found");
        }

        // Check password
        const expectedPassword = appUser.password;
        let isValid = password === expectedPassword;

        // Also check dynamic password for coordinators (month changes)
        if (!isValid && appUser.role === 'COORDINATOR') {
          const dynamicPassword = `${appUser.username}@BWcg${String(new Date().getMonth() + 1).padStart(2, '0')}`;
          isValid = password === dynamicPassword;
        }

        if (!isValid) {
          console.log("Invalid password for user:", appUser.username);
          throw new Error("Invalid password");
        }

        console.log("Login successful:", appUser.username, "Role:", appUser.role);

        return {
          id: appUser.id,
          name: appUser.name,
          email: appUser.email,
          role: appUser.role,
          groupId: appUser.groupId === "all" ? "all" : appUser.groupId,
          username: appUser.username,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
    maxAge: 8 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.role = user.role;
        token.groupId = user.groupId;
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.groupId = token.groupId;
        session.user.id = token.id;
        session.user.username = token.username;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "bethel-secret-2026",
  trustHost: true,
  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };