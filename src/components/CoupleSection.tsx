import groomImage from "@/assets/avatar1.png";
import brideImage from "@/assets/avatar2.png";
import Reveal from "./Reveal";

const CoupleSection = () => {
  return (
    <section
      id="couple"
      className="py-20 md:py-32 bg-section-gradient overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Couple Cards */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 max-w-5xl mx-auto mb-20">

          {/* ===== GROOM ===== */}
          <Reveal animation="fade-right" delay={100}>
            <div className="text-center group">
              <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-6">

                {/* Outer gradient ring */}
                <div
                  className="
                  absolute -inset-[6px]
                  rounded-full
                  bg-gradient-to-br from-primary via-primary/40 to-transparent
                  opacity-70 group-hover:opacity-100
                  group-hover:rotate-6
                  transition-all duration-700
                "
                />

                {/* Inner glass ring */}
                <div
                  className="
                  absolute -inset-[2px]
                  rounded-full
                  border border-primary/30
                  backdrop-blur-sm
                  group-hover:border-primary/60
                  transition-all duration-500
                "
                />

                <img
                  src={groomImage}
                  alt="Chú rể - Văn Sáng"
                  className="
                    w-full h-full object-cover rounded-full
                    border-4 border-white
                    shadow-[0_10px_40px_rgba(0,0,0,0.12)]
                    relative z-10
                    group-hover:scale-105
                    transition-all duration-700
                  "
                />

                {/* decorative dots */}
                <div className="absolute -top-2 left-1/2 w-2 h-2 bg-primary rounded-full animate-ping" />
                <div className="absolute bottom-0 right-4 w-2 h-2 bg-primary/70 rounded-full animate-ping delay-150" />
              </div>

              <h3 className="font-display text-2xl md:text-3xl text-foreground mb-1">
                Văn Sáng
              </h3>

              <p className="font-body text-primary text-sm tracking-wider uppercase mb-2">
                Chú rể
              </p>
            </div>
          </Reveal>

          {/* ===== BRIDE ===== */}
          <Reveal animation="fade-left" delay={300}>
            <div className="text-center group">
              <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-6">

                {/* Outer gradient ring */}
                <div
                  className="
                  absolute -inset-[6px]
                  rounded-full
                  bg-gradient-to-br from-wedding-rose via-wedding-rose/40 to-transparent
                  opacity-70 group-hover:opacity-100
                  group-hover:-rotate-6
                  transition-all duration-700
                "
                />

                {/* Inner glass ring */}
                <div
                  className="
                  absolute -inset-[2px]
                  rounded-full
                  border border-wedding-rose/30
                  backdrop-blur-sm
                  group-hover:border-wedding-rose/60
                  transition-all duration-500
                "
                />

                <img
                  src={brideImage}
                  alt="Cô dâu - Thuỳ Dung"
                  className="
                    w-full h-full object-cover rounded-full
                    border-4 border-white
                    shadow-[0_10px_40px_rgba(0,0,0,0.12)]
                    relative z-10
                    group-hover:scale-105
                    transition-all duration-700
                  "
                />

                {/* decorative dots */}
                <div className="absolute -top-2 right-1/2 w-2 h-2 bg-wedding-rose rounded-full animate-ping" />
                <div className="absolute bottom-0 left-4 w-2 h-2 bg-wedding-rose/70 rounded-full animate-ping delay-150" />
              </div>

              <h3 className="font-display text-2xl md:text-3xl text-foreground mb-1">
                Thuỳ Dung
              </h3>

              <p className="font-body text-wedding-rose text-sm tracking-wider uppercase mb-2">
                Cô dâu
              </p>
            </div>
          </Reveal>
        </div>

        {/* ===== MESSAGE ===== */}
        <Reveal animation="fade-up" delay={200}>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
              Văn Sáng & Thuỳ Dung
            </h2>

            <p className="font-body text-muted-foreground leading-relaxed mb-6">
              Thật vui vì được gặp và đón tiếp các bạn trong một dịp đặc biệt như đám cưới của chúng tôi.
              Chúng tôi muốn gửi đến bạn những lời cảm ơn sâu sắc nhất và để bạn biết chúng tôi rất hạnh phúc
              khi thấy bạn ở đó. Cảm ơn các bạn rất nhiều vì sự hiện diện cùng những lời chúc tốt đẹp mà
              bạn đã dành cho chúng tôi!
            </p>

            <p className="font-display text-xl text-primary italic">
              Văn Sáng & Thuỳ Dung
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CoupleSection;
