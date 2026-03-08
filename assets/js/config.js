const supabaseUrl = "https://eenlpvlwyoxajlcikmzi.supabase.co";
const supabaseKey = "sb_publishable_9arPz9Gw94ymewnxj7rzbA_S6F5DxEE";

const { createClient } = supabase;

const supabaseClient = createClient(supabaseUrl, supabaseKey);