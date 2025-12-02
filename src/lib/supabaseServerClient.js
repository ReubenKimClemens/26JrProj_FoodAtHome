import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Supabase URL or service key is missing. Make sure SUPABASE_URL and SUPABASE_SERVICE_KEY exist in .env.local'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);