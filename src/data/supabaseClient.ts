import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

// Use placeholder credentials to prevent initialization crash if env variables are missing
const dummyUrl = 'https://placeholder-project.supabase.co';
const dummyKey = 'placeholder-key';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL and Anon Key are missing in environment variables. Using placeholder values to prevent startup crash.');
}

export const supabase = createClient(supabaseUrl || dummyUrl, supabaseAnonKey || dummyKey);
