"use client";

import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { AuthContext } from './AuthContext';
import type { User, UserRole } from '@/types/auth';

// Mock users for demo
const mockUsers: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
  { id: '2', name: 'John Moderator', email: 'mod@example.com', role: 'moderator' },
  { id: '3', name: 'Jane User', email: 'user@example.com', role: 'user' },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check Cookies for saved user
    const savedUser = Cookies.get('auth_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app this would call your API
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'password') { // Mock password check
      setUser(foundUser);
      Cookies.set('auth_user', JSON.stringify(foundUser), { expires: 7 }); // Expires in 7 days
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('auth_user');
  };

  const hasPermission = (requiredRole: UserRole): boolean => {
    if (!user) return false;

    const roleHierarchy: Record<UserRole, number> = {
      user: 1,
      moderator: 2,
      admin: 3
    };

    return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
      hasPermission
    }}>
      {children}
    </AuthContext.Provider>
  );
}
