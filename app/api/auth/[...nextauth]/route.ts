import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const USERS = [
  { id: "1", username: "admin", email: "admin@bethelwillenhall.org.uk", name: "System Administrator", role: "ADMIN", groupId: "all", isActive: true },
  { id: "2", username: "PastorDan", email: "dan.majaducon@bethelwillenhall.org.uk", name: "Pastor Dan Majaducon", role: "PASTOR", groupId: "all", isActive: true },
  { id: "3", username: "PastorTM", email: "thando.mlalazi@bethelwillenhall.org.uk", name: "Pastor Thando Mlalazi", role: "PASTOR", groupId: "all", isActive: true },
  { id: "4", username: "CG-coord-01", email: "coordinator1@bethelwillenhall.org.uk", name: "Coordinator CG-01", role: "COORDINATOR", groupId: "1", isActive: true },
  { id: "5", username: "Member@BWcg", email: "member@bethelwillenhall.org.uk", name: "Care Group Member", role: "MEMBER", groupId: "1", isActive: true },
];

const getPassword = (username: string, role: string): string => {
  const month = String(new Date().getMonth() + 1).padStart(2, '0');
  if (role === 'ADMIN') return 'admin@Bwcg777';
  if (role === 'PASTOR') return `${username}@BWcg777`;
  if (role === 'COORDINATOR') return `${username}@BWcg${month}`;
  return `${username}@member`;
};

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
          throw new Error("Please enter username and password");
        }

        const user = USERS.find(u => u.username.toLowerCase() === credentials.username.toLowerCase());
        
        if (!user) {
          throw new Error("User not found");
        }

        const expectedPassword = getPassword(user.username, user.role);
        
        if (credentials.password !== expectedPassword) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          groupId: user.groupId,
          username: user.username,
        };
      },
    }),
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
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
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
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
