import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

import { isSupabaseConfigured } from '@/integrations/supabase/client';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdminRole = async (userId: string) => {
    if (!isSupabaseConfigured) return false;
    try {
      const { data: rpcIsAdmin, error: rpcError } = await supabase.rpc('check_is_admin' as any);
      if (!rpcError) return !!rpcIsAdmin;

      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .maybeSingle();
      return data?.role === 'admin';
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    if (!isSupabaseConfigured) {
      // Demo Mode Initial Check
      const demoUser = localStorage.getItem('demo_user');
      if (demoUser) {
        const parsed = JSON.parse(demoUser);
        setUser(parsed);
        setSession({ user: parsed, access_token: 'demo', refresh_token: 'demo', expires_in: 3600, token_type: 'bearer' } as Session);
      }
      setLoading(false);
      return;
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          checkAdminRole(session.user.id).then(setIsAdmin);
        } else {
          setIsAdmin(false);
        }
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminRole(session.user.id).then(setIsAdmin);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    if (!isSupabaseConfigured) {
      const demoUser = {
        id: 'demo-' + Date.now(),
        email,
        user_metadata: { full_name: fullName },
        app_metadata: {},
        aud: 'authenticated',
        role: 'authenticated',
        created_at: new Date().toISOString()
      } as any as User;
      localStorage.setItem('demo_user', JSON.stringify(demoUser));
      setUser(demoUser);
      setSession({ user: demoUser, access_token: 'demo', refresh_token: 'demo', expires_in: 3600, token_type: 'bearer', created_at: new Date().toISOString() } as any as Session);
      return { error: null };
    }

    const redirectUrl = `${window.location.origin}/`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: { full_name: fullName },
      },
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      const demoUser = {
        id: 'demo-user',
        email,
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        role: 'authenticated',
        created_at: new Date().toISOString()
      } as any as User;
      localStorage.setItem('demo_user', JSON.stringify(demoUser));
      setUser(demoUser);
      setSession({ user: demoUser, access_token: 'demo', refresh_token: 'demo', expires_in: 3600, token_type: 'bearer', created_at: new Date().toISOString() } as any as Session);
      return { error: null };
    }


    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signOut = async () => {
    if (!isSupabaseConfigured) {
      localStorage.removeItem('demo_user');
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      return;
    }
    await supabase.auth.signOut();
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, isAdmin, signUp, signIn, signOut }}>
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
