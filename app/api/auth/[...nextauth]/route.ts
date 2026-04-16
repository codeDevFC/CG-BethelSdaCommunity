import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { FALLBACK_USERS } from "@/lib/constants";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: { username: { label: "Username" }, password: { label: "Password" } },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = FALLBACK_USERS.find(
          u => u.username.toLowerCase() === credentials.username.toLowerCase()
        );

        if (!user || !user.isActive) {
          throw new Error("User not found");
        }

        if (credentials.password !== user.password) {
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
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 8 * 60 * 60 },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) { 
        token.role = user.role; 
        token.groupId = user.groupId; 
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) { 
        session.user.role = token.role; 
        session.user.groupId = token.groupId; 
        session.user.id = token.id;
        session.user.username = token.username;
      }
      return session;
    },
  },
  pages: { signIn: "/login", error: "/login" },
  secret: process.env.NEXTAUTH_SECRET || "bethel-secret-key-2026",
  trustHost: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
