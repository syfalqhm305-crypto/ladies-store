import { supabase } from "./supabaseClient.js";

// نفس فكرة تخزين "مفتاح -> قيمة" المستخدمة في نسخة المعاينة،
// لكن هنا البيانات محفوظة فعليًا في قاعدة بيانات Supabase
// بحيث تظهر لكل زوّار الموقع ولوحة التحكم في نفس الوقت.

export async function loadJSON(key, fallback) {
  try {
    const { data, error } = await supabase
      .from("kv_store")
      .select("value")
      .eq("key", key)
      .maybeSingle();
    if (error || !data) return fallback;
    return JSON.parse(data.value);
  } catch (e) {
    return fallback;
  }
}

export async function saveJSON(key, value) {
  try {
    const { error } = await supabase
      .from("kv_store")
      .upsert({ key, value: JSON.stringify(value), updated_at: new Date().toISOString() });
    return !error;
  } catch (e) {
    return false;
  }
}
