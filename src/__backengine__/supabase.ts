import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const supabaseUrl = "undefined";
const supabaseAnonKey = "undefined";

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export { supabase };
