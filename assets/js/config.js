// assets/js/config.js
const supabaseUrl = 'https://eenlpvlwyoxajlcikmzi.supabase.co';
const supabaseAnonKey = 'sb_publishable_9arPz9Gw94ymewnxj7rzbA_S6F5DxEE';

// The CDN script creates a global 'supabase' object.
// We use it to initialize the client and attach it to 'window' so other scripts can see it.
window.supabaseClient = supabase.createClient(supabaseUrl, supabaseAnonKey);