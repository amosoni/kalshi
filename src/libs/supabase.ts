import { createClient } from '@supabase/supabase-js';
// import { Env } from './Env';

// Create Supabase client
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  },
);

// Database types (will be generated from your schema)
export type Database = {
  public: {
    Tables: {
      counter: {
        Row: {
          id: number;
          count: number;
          updated_at: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          count?: number;
          updated_at?: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          count?: number;
          updated_at?: string;
          created_at?: string;
        };
      };
    };
  };
};
