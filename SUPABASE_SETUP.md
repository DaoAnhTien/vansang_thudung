# Hướng dẫn Setup Supabase cho Wedding RSVP

## Bước 1: Tạo tài khoản Supabase

1. Truy cập https://supabase.com
2. Đăng ký/Đăng nhập tài khoản
3. Tạo một project mới

## Bước 2: Lấy thông tin API

1. Vào **Settings** > **API** trong project của bạn
2. Copy các giá trị sau:
   - **Project URL** (VITE_SUPABASE_URL)
   - **anon/public key** (VITE_SUPABASE_ANON_KEY)

## Bước 3: Tạo file .env

Tạo file `.env` trong thư mục root của project với nội dung:

```env
VITE_SUPABASE_URL=your-project-url-here
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Lưu ý:** Đừng commit file `.env` vào git! File này đã được thêm vào `.gitignore`

## Bước 4: Tạo Database Table

1. Vào **SQL Editor** trong Supabase Dashboard
2. Copy nội dung từ file `supabase-setup.sql`
3. Paste vào SQL Editor và chạy (Run)

Hoặc chạy SQL sau:

```sql
CREATE TABLE IF NOT EXISTS public.rsvp (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('attending', 'not-attending', 'maybe')),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_rsvp_created_at ON public.rsvp(created_at DESC);

ALTER TABLE public.rsvp ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.rsvp
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert" ON public.rsvp
  FOR INSERT
  WITH CHECK (true);
```

## Bước 5: Cài đặt dependencies

```bash
npm install
```

## Bước 6: Chạy ứng dụng

```bash
npm run dev
```

## Tính năng

✅ **Lưu trữ trên cloud**: Dữ liệu được lưu trong Supabase database
✅ **Real-time sync**: Tự động cập nhật khi có RSVP mới (không cần refresh)
✅ **Chia sẻ**: Mọi người đều có thể xem danh sách RSVP
✅ **Fallback**: Nếu chưa cấu hình Supabase, sẽ tự động dùng localStorage

## Troubleshooting

### Lỗi "Supabase chưa được cấu hình"
- Kiểm tra file `.env` đã được tạo chưa
- Kiểm tra các biến `VITE_SUPABASE_URL` và `VITE_SUPABASE_ANON_KEY` đã đúng chưa
- Restart dev server sau khi thêm `.env`

### Lỗi khi insert vào database
- Kiểm tra RLS policies đã được tạo chưa
- Kiểm tra table `rsvp` đã được tạo chưa
- Kiểm tra console để xem lỗi chi tiết

### Real-time không hoạt động
- Kiểm tra Realtime đã được bật trong Supabase Dashboard (Settings > API > Realtime)
- Kiểm tra table `rsvp` đã enable Realtime chưa
