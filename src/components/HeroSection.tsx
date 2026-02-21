import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import heroImage from "@/assets/hero-wedding.jpg";

const HeroSection = () => {
  const scrollToWishes = () => {
    const element = document.querySelector("#wishes");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-hero-overlay" />

      {/* Decorative Leaves */}
      <div className="absolute top-20 left-10 md:left-20 w-32 md:w-48 opacity-80 animate-sway">
        <svg viewBox="0 0 200 200" className="text-primary-foreground/30">
          <path
            fill="currentColor"
            d="M100,10 Q130,50 100,90 Q70,50 100,10 M90,80 Q60,120 30,100 M110,80 Q140,120 170,100"
          />
        </svg>
      </div>
      <div className="absolute top-20 right-10 md:right-20 w-32 md:w-48 opacity-80 animate-sway" style={{ animationDelay: "1s" }}>
        <svg viewBox="0 0 200 200" className="text-primary-foreground/30 transform scale-x-[-1]">
          <path
            fill="currentColor"
            d="M100,10 Q130,50 100,90 Q70,50 100,10 M90,80 Q60,120 30,100 M110,80 Q140,120 170,100"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-primary-foreground px-4 max-w-4xl mx-auto">
        <p className="font-body text-sm md:text-base tracking-[0.3em] uppercase mb-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Save the Date
        </p>

        <h1 className="font-display text-4xl md:text-5xl lg:text-5xl font-light mb-4 text-shadow-lg animate-fade-in" style={{ animationDelay: "0.4s" }}>
          Văn Sáng <span className="font-normal">&</span> Thuỳ Dung
        </h1>

        <div className="w-24 h-0.5 bg-primary-foreground/60 mx-auto mb-6 animate-fade-in" style={{ animationDelay: "0.6s" }} />

        <p className="font-display text-xl md:text-2xl lg:text-3xl mb-8 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          Ngày 26 Tháng 02 Dương Lịch 2026 (âm lịch: ngày 10 tháng 01 năm Bính Ngọ)
        </p>

        <Button
          onClick={scrollToWishes}
          variant="outline"
          size="lg"
          className="border-2 border-primary-foreground/80 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 font-body tracking-wider px-8 py-6 animate-fade-in"
          style={{ animationDelay: "1s" }}
        >
          GỬI LỜI CHÚC
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground animate-float">
        <ChevronDown className="w-8 h-8" />
      </div>
    </section>
  );
};

export default HeroSection;
