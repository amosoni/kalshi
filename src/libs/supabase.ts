import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
