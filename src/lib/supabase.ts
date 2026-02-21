import { createClient } from "@supabase/supabase-js";

// Lấy từ environment variables hoặc config
// Bạn cần thay đổi các giá trị này với thông tin Supabase của bạn
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "⚠️ Supabase chưa được cấu hình. Vui lòng thêm VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY vào file .env"
  );
}

// Khởi tạo Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions cho RSVP table
export interface RSVPEntry {
  id: number;
  name: string;
  status: "attending" | "not-attending" | "maybe";
  message: string;
  created_at: string;
}
