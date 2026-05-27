import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

function isValidEnvValue(value: string | undefined) {
  return Boolean(value && value.trim() && value !== 'not-configured');
}

export const isSupabaseConfigured =
  isValidEnvValue(supabaseUrl) && 
  (supabaseUrl?.startsWith('http://') || supabaseUrl?.startsWith('https://')) &&
  isValidEnvValue(supabaseAnonKey);

export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl! : 'https://placeholder.supabase.co',
  isSupabaseConfigured ? supabaseAnonKey! : 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  },
);

export function getSiteUrl() {
  const configuredUrl = import.meta.env.VITE_PUBLIC_SITE_URL as string | undefined;

  if (configuredUrl && configuredUrl !== 'not-configured') {
    return configuredUrl.replace(/\/$/, '');
  }

  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  return 'http://localhost:5173';
}
