-- Tạo table wishes với đầy đủ các cột cần thiết
-- Chạy SQL này trong Supabase SQL Editor

-- Tạo table mới cho wishes
CREATE TABLE IF NOT EXISTS public.wishes (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo index để query nhanh hơn
CREATE INDEX IF NOT EXISTS idx_wishes_created_at ON public.wishes(created_at DESC);

-- Bật Row Level Security
ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;

-- Xóa các policy cũ nếu có
DROP POLICY IF EXISTS "Allow public read access" ON public.wishes;
DROP POLICY IF EXISTS "Allow public insert" ON public.wishes;

-- Policy: Cho phép mọi người đọc
CREATE POLICY "Allow public read access" ON public.wishes
  FOR SELECT
  USING (true);

-- Policy: Cho phép mọi người insert
CREATE POLICY "Allow public insert" ON public.wishes
  FOR INSERT
  WITH CHECK (true);

-- Kiểm tra table đã được tạo đúng chưa
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'wishes' 
ORDER BY ordinal_position;
