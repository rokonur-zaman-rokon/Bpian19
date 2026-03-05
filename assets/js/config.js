// Remove 'import' and 'export'—they don't work with standard CDN scripts
const supabaseUrl = 'https://eenlpvlwyoxajlcikmzi.supabase.co';
const supabaseAnonKey = 'sb_publishable_9arPz9Gw94ymewnxj7rzbA_S6F5DxEE';

// Initialize and attach to the window object so auth.js can see it
window.supabase = supabase.createClient(supabaseUrl, supabaseAnonKey);