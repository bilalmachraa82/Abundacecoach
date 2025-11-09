import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { User } from '@supabase/supabase-js';
import { withRateLimit } from '../../utils/rateLimiter';
import { logger } from '../../utils/logger';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state (signed in, signed out, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    signIn: async (email: string, password: string) => {
      try {
        await withRateLimit('LOGIN', email, async () => {
          const { error } = await supabase.auth.signInWithPassword({ email, password });
          if (error) throw error;
        });
      } catch (error) {
        logger.error('Sign in failed', error as Error, { email });
        throw error;
      }
    },
    signUp: async (email: string, password: string) => {
      try {
        await withRateLimit('SIGNUP', email, async () => {
          const { error } = await supabase.auth.signUp({ email, password });
          if (error) throw error;
        });
      } catch (error) {
        logger.error('Sign up failed', error as Error, { email });
        throw error;
      }
    },
    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
