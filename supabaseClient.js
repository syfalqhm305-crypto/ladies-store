import { createClient } from "@supabase/supabase-js";

// هذه القيم تُقرأ من إعدادات المشروع في Vercel (Environment Variables)
// شاهدي ملف "دليل النشر.md" لمعرفة من أين تحصلين عليها بالضبط.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
