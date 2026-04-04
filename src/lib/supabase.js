import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://uonnzayemmpyrnmriohl.supabase.co",
  "sb_publishable_bSequIq-vUjJFmdczLgSgQ_QQhNAWtx"
);

// NEXT_PUBLIC_SUPABASE_URL=https://uonnzayemmpyrnmriohl.supabase.co
// NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_bSequIq-vUjJFmdczLgSgQ_QQhNAWtx

export default supabase;