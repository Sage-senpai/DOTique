import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { useAuthStore } from '../store/authStore';

type AuthContextType = {
  user: any | null;
  signInWithZkLogin: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const setUser = useAuthStore((s: any) => s.setUser);
const user = useAuthStore((s: any) => s.user);

  useEffect(() => {
    supabase.auth.getSession().then((r) => {
      if ((r as any).data?.session?.user) {
        setUser((r as any).data.session.user);
      }
    });
  }, []);

  const signInWithZkLogin = async () => {
    setLoading(true);
    try {
      // Placeholder: call zkLogin SDK to derive polkadot address + exchange auth
      // For now, fallback to Supabase magic link (dev use)
      const { error } = await supabase.auth.signInWithOtp({ email: 'dev@dotique.test' });
      if (error) throw error;
      alert('Check your email for sign in (dev flow). Replace with zkLogin flow.');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const authValue: AuthContextType = { user, signInWithZkLogin, signOut };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ custom hook to use auth
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
