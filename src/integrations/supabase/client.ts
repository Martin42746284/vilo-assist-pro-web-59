// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://sccapngueymqymwtrwem.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjY2Fwbmd1ZXltcXltd3Ryd2VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MTM0NTAsImV4cCI6MjA2NjA4OTQ1MH0.WKkq3rqUr5neLL5nZHqZ6KdlZJQtDM8t3t-16UtiBIM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);