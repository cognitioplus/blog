import { createClient } from '@supabase/supabase-js';


// Initialize Supabase client
// Using direct values from project configuration
const supabaseUrl = 'https://mzzaoegsndhinavymzll.supabase.co';
const supabaseKey = 'sb_publishable_HOMW5SXXZWHAS5INpu0ocA_WEl9RYQU';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };