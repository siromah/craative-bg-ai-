import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { getSiteUrl, isSupabaseConfigured, supabase } from '../lib/supabase';

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (
    email: string,
    password: string,
    fullName: string,
  ) => Promise<{ error: Error | null; needsEmailConfirmation: boolean }>;
  signOut: () => Promise<{ error: Error | null }>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  updatePassword: (password: string) => Promise<{ error: Error | null }>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function configError() {
  return new Error(
    'Authentication is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      if (!isSupabaseConfigured) {
        if (mounted) {
          setSession(null);
          setUser(null);
          setLoading(false);
        }
        return;
      }

      const { data, error } = await supabase.auth.getSession();

      if (!mounted) return;

      if (error) {
        console.error('Failed to load auth session:', error.message);
      }

      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      setLoading(false);
    }

    loadSession();

    if (!isSupabaseConfigured) {
      return () => {
        mounted = false;
      };
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      loading,
      isConfigured: isSupabaseConfigured,

      async signIn(email, password) {
        if (!isSupabaseConfigured) {
          return { error: configError() };
        }

        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        return { error: error as Error | null };
      },

      async signUp(email, password, fullName) {
        if (!isSupabaseConfigured) {
          return { error: configError(), needsEmailConfirmation: false };
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
            emailRedirectTo: `${getSiteUrl()}/profile`,
          },
        });

        return {
          error: error as Error | null,
          needsEmailConfirmation: Boolean(data.user && !data.session),
        };
      },

      async signOut() {
        if (!isSupabaseConfigured) {
          return { error: configError() };
        }

        const { error } = await supabase.auth.signOut();
        return { error: error as Error | null };
      },

      async resetPassword(email) {
        if (!isSupabaseConfigured) {
          return { error: configError() };
        }

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${getSiteUrl()}/reset-password`,
        });

        return { error: error as Error | null };
      },

      async updatePassword(password) {
        if (!isSupabaseConfigured) {
          return { error: configError() };
        }

        const { error } = await supabase.auth.updateUser({
          password,
        });

        return { error: error as Error | null };
      },
    }),
    [session, user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
