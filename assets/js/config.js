import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eenlpvlwyoxajlcikmzi.supabase.co';
const supabaseAnonKey = 'sb_publishable_9arPz9Gw94ymewnxj7rzbA_S6F5DxEE';

// Use the global 'supabase' object provided by the CDN script
const supabase = supabase.createClient(supabaseUrl, supabaseAnonKey);

// Make it globally accessible for auth.js
window.supabase = supabase;