// lib/auth.ts
"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { User } from './types';

// Helper function to generate the password based on new rules
const generatePassword = (username: string, role: string) => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  
  if (role === 'pastor') {
    // Pastor'sName@BWcg777
    return `${username}@BWcg777`;
  } else if (role === 'coordinator' || role === 'elder' || role === 'deacon') {
    // Leader’sName@BWcg + current month (01, 02, etc.)
    return `${username}@BWcg${month}`;
  }
  // For members: username@member
  return `${username}@member`;
};

// Mock Users - In production, this would come from a database
const USERS: User[] = [
  { id: '1', name: 'System Administrator', username: 'admin', role: 'admin' },
  { id: '2', name: 'Pastor John', username: 'PastorJohn', role: 'pastor' },
  { id: '3', name: 'Pastor Michael', username: 'PastorMichael', role: 'pastor' },
  { id: '4', name: 'Coordinator Frank', username: 'FrankA', role: 'coordinator', groupId: '1' },
  { id: '5', name: 'Coordinator Felix', username: 'FelixB', role: 'coordinator', groupId: '1' },
  { id: '6', name: 'Elder Darlon', username: 'DarlonH', role: 'elder', groupId: '1' },
  { id: '7', name: 'Deacon Mary', username: 'MaryI', role: 'deacon', groupId: '2' },
  { id: '8', name: 'Member Frank', username: 'FrankBCG', role: 'member', groupId: '1' },
  { id: '9', name: 'Member Sarah', username: 'SarahBCG', role: 'member', groupId: '1' },
  { id: '10', name: 'Member Ben', username: 'BenBCG', role: 'member', groupId: '1' },
];

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (role: User['role'] | User['role'][]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('bethel_auth_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('bethel_auth_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    const cleanUsername = username.trim();
    const cleanPassword = password.trim();
    
    const foundUser = USERS.find(u => u.username.toLowerCase() === cleanUsername.toLowerCase());
    
    if (!foundUser) {
      toast.error('User not found. Please check your username.');
      return false;
    }

    const expectedPassword = generatePassword(foundUser.username, foundUser.role);
    
    if (cleanPassword === expectedPassword) {
      setUser(foundUser);
      localStorage.setItem('bethel_auth_user', JSON.stringify(foundUser));
      toast.success(`Welcome, ${foundUser.name}!`);
      return true;
    }
    
    toast.error('Invalid password. Check the format guide.');
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bethel_auth_user');
    toast.success('Logged out successfully');
    router.push('/login');
  };

  const hasPermission = (requiredRole: User['role'] | User['role'][]) => {
    if (!user) return false;
    if (user.role === 'admin') return true;
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    return roles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, hasPermission }}>
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
