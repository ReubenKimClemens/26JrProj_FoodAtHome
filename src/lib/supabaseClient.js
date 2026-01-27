// This supabaseClient.js file creates and exports a ready-to-use Supabase client that our app 
// can use to interact with the database—handling authentication, queries, and real-time data; 
// so we don't have to repeatedly set up the connection wherever we need it.

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
