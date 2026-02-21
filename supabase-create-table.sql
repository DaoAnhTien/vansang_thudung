-- Tạo table rsvp với đầy đủ các cột cần thiết
-- Chạy SQL này trong Supabase SQL Editor

-- Xóa table cũ nếu đã tồn tại (CẨN THẬN: Sẽ xóa hết dữ liệu!)
-- DROP TABLE IF EXISTS public.rsvp CASCADE;

-- Tạo table mới với đầy đủ các cột
CREATE TABLE IF NOT EXISTS public.rsvp (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('attending', 'not-attending', 'maybe')),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo index để query nhanh hơn
CREATE INDEX IF NOT EXISTS idx_rsvp_created_at ON public.rsvp(created_at DESC);

-- Bật Row Level Security
ALTER TABLE public.rsvp ENABLE ROW LEVEL SECURITY;

-- Xóa các policy cũ nếu có
DROP POLICY IF EXISTS "Allow public read access" ON public.rsvp;
DROP POLICY IF EXISTS "Allow public insert" ON public.rsvp;

-- Policy: Cho phép mọi người đọc
CREATE POLICY "Allow public read access" ON public.rsvp
  FOR SELECT
  USING (true);

-- Policy: Cho phép mọi người insert
CREATE POLICY "Allow public insert" ON public.rsvp
  FOR INSERT
  WITH CHECK (true);

-- Kiểm tra table đã được tạo đúng chưa
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'rsvp' 
ORDER BY ordinal_position;
