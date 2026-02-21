import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="font-display text-lg text-primary-foreground">S</span>
          <Heart className="w-4 h-4 text-wedding-rose" fill="currentColor" />
          <span className="font-display text-lg text-primary-foreground">D</span>
        </div>
        <p className="font-body text-sm text-primary-foreground/80">
          Rất hân hạnh đón tiếp trong dịp đặc biệt của chúng tôi!
        </p><p className="font-body text-sm text-primary-foreground/80">
          Xin chân thành cảm ơn!
        </p>
        <p className="font-body text-xs text-primary-foreground/60 mt-2">
          Ngày 26 Tháng 02 Dương Lịch 2026 (âm lịch: ngày 10 tháng 01 năm Bính Ngọ)
        </p>
      </div>
    </footer>
  );
};

export default Footer;
