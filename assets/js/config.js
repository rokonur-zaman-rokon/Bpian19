import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const SUPABASE_URL = "https://eenlpvlwyoxajlcikmzi.supabase.co"

const SUPABASE_KEY = "sb_publishable_9arPz9Gw94ymewnxj7rzbA_S6F5DxEE"

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

window.supabase = supabase