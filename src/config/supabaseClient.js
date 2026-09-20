import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
// Note: User provided REACT_APP_SUPABASE_PUBLISHABLE_KEY but usually it's ANON_KEY for standard usage.
const supabaseKey = process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
