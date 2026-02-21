import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import Reveal from "./Reveal";
import vcb1 from "@/assets/qr2.png";
import vcb2 from "@/assets/qr1.png";

const bankAccounts = [



  {
    title: "Mừng cưới đến cô dâu",
    bank: "vietcombank",
    accountName: "TRAN VAN SANG",
    accountNumber: "1057868377",
    role: "groom",
    qrCode: vcb2,
  },
  {
    title: "Mừng cưới đến chú rể",
    bank: "vietcombank",
    accountName: "VO THI THUY DUNG",
    accountNumber: "1051234482",
    role: "bride",
    qrCode: vcb1,
  },

];

const GiftSection = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast({
      title: "Đã sao chép!",
      description: `Số tài khoản ${text} đã được sao chép.`,
    });
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="gift" className="py-20 md:py-32 bg-section-gradient overflow-hidden">
      <div className="container mx-auto px-4">
        <Reveal animation="fade-up">
          <h2 className="font-display text-4xl md:text-5xl text-center text-foreground mb-4">
            Hộp Mừng Cưới
          </h2>
        </Reveal>

        <Reveal animation="fade-up" delay={150}>
          <p className="font-body text-center text-muted-foreground max-w-lg mx-auto mb-12">
            Sự hiện diện của bạn là món quà quý giá nhất. Nếu bạn muốn gửi quà mừng,
            chúng tôi xin trân trọng đón nhận.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {bankAccounts.map((account, index) => (
            <Reveal
              key={index}
              animation={index === 0 ? "fade-right" : "fade-left"}
              delay={index * 200 + 200}
            >
              <div
                className={`bg-card rounded-2xl p-6 md:p-8 shadow-card border-2 hover:shadow-elegant hover:-translate-y-2 transition-all duration-500 ${account.role === "groom"
                  ? "border-primary/20 hover:border-primary/40"
                  : "border-wedding-rose/20 hover:border-wedding-rose/40"
                  }`}
              >
                <h3 className="font-display text-xl md:text-2xl text-center text-foreground mb-6">
                  {account.title}
                </h3>

                {/* QR Code Placeholder */}
                <div className="w-32 h-32 mx-auto mb-6 bg-secondary rounded-lg flex items-center justify-center overflow-hidden group">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/20 group-hover:from-primary/10 group-hover:to-primary/30 transition-all duration-500" />
                    <img src={account.qrCode} alt="QR Code" className="w-full h-full object-contain" />
                  </div>
                </div>

                <div className="space-y-3 text-center">
                  <div className="group">
                    <p className="font-body text-sm text-muted-foreground">
                      Ngân hàng
                    </p>
                    <p className="font-body font-semibold text-foreground group-hover:text-primary transition-colors">
                      {account.bank}
                    </p>
                  </div>
                  <div className="group">
                    <p className="font-body text-sm text-muted-foreground">
                      Tên tài khoản
                    </p>
                    <p className="font-body font-semibold text-foreground group-hover:text-primary transition-colors">
                      {account.accountName}
                    </p>
                  </div>
                  <div className="group">
                    <p className="font-body text-sm text-muted-foreground">
                      Số tài khoản
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <p className="font-body font-semibold text-foreground group-hover:text-primary transition-colors">
                        {account.accountNumber}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:scale-110 transition-transform"
                        onClick={() => copyToClipboard(account.accountNumber, index)}
                      >
                        {copiedIndex === index ? (
                          <Check className="w-4 h-4 text-primary animate-scale-in" />
                        ) : (
                          <Copy className="w-4 h-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GiftSection;
