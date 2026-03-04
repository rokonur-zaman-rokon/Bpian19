import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eenlpvlwyoxajlcikmzi.supabase.co'
const supabaseAnonKey = 'sb_publishable_9arPz9Gw94ymewnxj7rzbA_S6F5DxEE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)