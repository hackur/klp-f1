import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL or Anon Key is missing from environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Optional: If you need a server-side client with the service role key
// const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
// export const supabaseAdmin = supabaseServiceRoleKey
//   ? createClient(supabaseUrl, supabaseServiceRoleKey)
//   : null;
