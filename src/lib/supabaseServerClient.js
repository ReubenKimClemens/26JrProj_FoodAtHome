// This supabaseServerClient.js file creates a Supabase client specifically for server-side code, letting our 
// backend routes or server endpoints securely access the database for things like authentication, queries, or 
// server-only operations.

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Supabase URL or service key is missing. Make sure SUPABASE_URL and SUPABASE_SERVICE_KEY exist in .env.local'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);