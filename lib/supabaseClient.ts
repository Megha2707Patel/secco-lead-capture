// Import Supabase client creator
import { createClient } from "@supabase/supabase-js";

// Get Supabase URL from .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

// Get Supabase public anon key from .env.local
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create Supabase client
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);