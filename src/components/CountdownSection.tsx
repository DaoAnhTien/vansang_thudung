import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Reveal from "./Reveal";
import gallery1 from "@/assets/img12.jpg";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownSection = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const weddingDate = new Date("2026-02-26T11:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const scrollToWishes = () => {
    const element = document.querySelector("#wishes");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const timeBlocks = [
    { value: timeLeft.days, label: "Ngày" },
    { value: timeLeft.hours, label: "Giờ" },
    { value: timeLeft.minutes, label: "Phút" },
    { value: timeLeft.seconds, label: "Giây" },
  ];

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: `url(${gallery1})`,
            transform: "translateZ(0)",
            WebkitTransform: "translateZ(0)",
          }}
        />
      </div>
      <div className="absolute inset-0 bg-hero-overlay" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-primary-foreground">
        <Reveal animation="zoom-in">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4 text-shadow">
            The Big Day!
          </h2>
        </Reveal>

        <Reveal animation="fade-up" delay={150}>
          <div className="inline-block bg-primary-foreground/10 backdrop-blur-sm rounded-lg px-6 py-2 mb-6">
            <span className="font-body text-sm tracking-[0.2em] uppercase">Save the Date</span>
          </div>
        </Reveal>

        <Reveal animation="fade-up" delay={250}>
          <h3 className="font-display text-2xl md:text-3xl mb-4">
            Văn Sáng & Thuỳ Dung
          </h3>
        </Reveal>

        <Reveal animation="fade-up" delay={350}>
          <p className="font-body text-primary-foreground/80 max-w-lg mx-auto mb-8">
            Một lời chúc của bạn chắc chắn sẽ làm cho đám cưới của chúng tôi có thêm một niềm hạnh phúc!
          </p>
        </Reveal>

        <Reveal animation="fade-up" delay={450}>
          <Button
            onClick={scrollToWishes}
            variant="outline"
            className="border-2 border-primary-foreground/80 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 font-body tracking-wider mb-8"
          >
            Gửi lời chúc
          </Button>
        </Reveal>

        <Reveal animation="fade-up" delay={500}>
          <p className="font-display text-xl mb-8">Ngày 26 Tháng 02 Dương Lịch 2026 (âm lịch: ngày 10 tháng 01 năm Bính Ngọ)</p>
        </Reveal>

        {/* Countdown */}
        <div className="flex justify-center gap-4 md:gap-8">
          {timeBlocks.map((block, index) => (
            <Reveal key={index} animation="zoom-in" delay={600 + index * 100}>
              <div className="text-center">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-primary-foreground/10 backdrop-blur-sm rounded-xl flex items-center justify-center mb-2 border border-primary-foreground/20 hover:scale-110 transition-transform duration-300">
                  <span className="font-display text-3xl md:text-5xl font-light">
                    {block.value.toString().padStart(2, "0")}
                  </span>
                </div>
                <span className="font-body text-xs md:text-sm text-primary-foreground/80">
                  {block.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;
