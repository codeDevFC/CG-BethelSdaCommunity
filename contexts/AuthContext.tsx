"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
import { User } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (role: User['role'] | User['role'][]) => boolean;
  canAccessGroup: (groupId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') {
      setLoading(true);
      return;
    }

    if (session?.user) {
      setUser({
        id: session.user.id as string,
        name: session.user.name as string,
        username: session.user.username as string || session.user.email as string,
        role: (session.user.role as User['role']) || 'member',
        groupId: session.user.groupId as string,
      });
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [session, status]);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Login is handled by NextAuth, this is just a wrapper
    return true;
  };

  const logout = () => {
    signOut({ callbackUrl: '/login' });
  };

  const hasPermission = (requiredRole: User['role'] | User['role'][]) => {
    if (!user) return false;
    if (user.role === 'admin') return true;
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    return roles.includes(user.role);
  };

  const canAccessGroup = (groupId: string) => {
    if (!user) return false;
    if (user.role === 'admin' || user.role === 'pastor') return true;
    return user.groupId === groupId;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, hasPermission, canAccessGroup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
