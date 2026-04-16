import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { FALLBACK_USERS } from "@/lib/constants";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: { 
        username: { label: "Username" }, 
        password: { label: "Password" } 
      },
      async authorize(credentials) {
        console.log("Authorize called with:", credentials?.username);
        
        if (!credentials?.username || !credentials?.password) {
          console.log("Missing credentials");
          throw new Error("Missing credentials");
        }

        const user = FALLBACK_USERS.find(
          u => u.username.toLowerCase() === credentials.username.toLowerCase()
        );

        console.log("Found user:", user?.username, "Role:", user?.role);

        if (!user || !user.isActive) {
          console.log("User not found or inactive");
          throw new Error("User not found");
        }

        if (credentials.password !== user.password) {
          console.log("Invalid password for user:", user.username);
          throw new Error("Invalid password");
        }

        console.log("Login successful for:", user.username);
        
        return { 
          id: user.id, 
          name: user.name, 
          email: user.email, 
          role: user.role, 
          groupId: user.groupId, 
          username: user.username 
        };
      },
    }),
  ],
  session: { 
    strategy: "jwt", 
    maxAge: 8 * 60 * 60 
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) { 
        token.role = user.role; 
        token.groupId = user.groupId; 
        token.id = user.id;
        token.username = user.username;
        console.log("JWT callback - setting token:", { role: token.role, groupId: token.groupId });
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) { 
        session.user.role = token.role; 
        session.user.groupId = token.groupId; 
        session.user.id = token.id;
        session.user.username = token.username;
        console.log("Session callback - setting session:", { role: session.user.role, groupId: session.user.groupId });
      }
      return session;
    },
  },
  pages: { 
    signIn: "/login", 
    error: "/login" 
  },
  secret: process.env.NEXTAUTH_SECRET || "bethel-secret-key-2026",
  trustHost: true,
  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
