-- SQL Migration để tạo table RSVP trong Supabase
-- Chạy SQL này trong Supabase SQL Editor: https://app.supabase.com/project/_/sql

-- Tạo table rsvp
CREATE TABLE IF NOT EXISTS public.rsvp (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('attending', 'not-attending', 'maybe')),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo index để query nhanh hơn
CREATE INDEX IF NOT EXISTS idx_rsvp_created_at ON public.rsvp(created_at DESC);

-- Cho phép public insert và select (để mọi người có thể xem và thêm RSVP)
-- Nếu bạn muốn bảo mật hơn, có thể thêm Row Level Security (RLS)
ALTER TABLE public.rsvp ENABLE ROW LEVEL SECURITY;

-- Policy: Cho phép mọi người đọc
CREATE POLICY "Allow public read access" ON public.rsvp
  FOR SELECT
  USING (true);

-- Policy: Cho phép mọi người insert
CREATE POLICY "Allow public insert" ON public.rsvp
  FOR INSERT
  WITH CHECK (true);

-- Nếu bạn muốn chỉ cho phép insert, không cho update/delete:
-- CREATE POLICY "Allow public insert only" ON public.rsvp
--   FOR INSERT
--   WITH CHECK (true);
