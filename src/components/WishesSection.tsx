import { useState, useEffect } from "react";
import { Send, User, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "@/hooks/use-toast";
import Reveal from "./Reveal";
import { supabase } from "@/lib/supabase";

const suggestedWishes = [
  "Chúc mừng hạnh phúc! Chúc hai bạn trăm năm hạnh phúc!",
  "Chúc mừng ngày trọng đại tới hai bạn. Hạnh phúc bền lâu và trọn vẹn nhé!",
  "Chúc mừng hạnh phúc hai bạn. Chúc hai bạn bên nhau đầu bạc răng long!",
  "Chúc hai bạn ngày vui hạnh phúc. Hãy yêu thương nhau thật nhiều!",
];

interface Wish {
  id: number;
  name: string;
  message: string;
  createdAt: Date;
}

const initialWishes: Wish[] = [
  {
    id: 1,
    name: "Ngòng Ngọc",
    message: "Đã quá cô ơiiiii 😍😍😍 Bác chúc cô trăm năm hạnh phúc nhaaaa! Mãi yêu 💕💕💕",
    createdAt: new Date(),
  },
  {
    id: 2,
    name: "Mai dắm",
    message: "Đẹp quạ 🫶🏻🎊",
    createdAt: new Date(),
  },
  {
    id: 3,
    name: "CEO của Biihappy",
    message: '"Một cuộc hôn nhân thành công đòi hỏi phải yêu nhiều lần, và luôn ở cùng một người" - Chúc cho hai bạn sẽ có được một cuộc hôn nhân viên mãn, trăm năm hạnh phúc!',
    createdAt: new Date(),
  },
];

// Kiểm tra xem Supabase đã được cấu hình chưa
const isSupabaseConfigured = () => {
  return import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY;
};

const WishesSection = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load wishes từ Supabase
  useEffect(() => {
    const loadWishes = async () => {
      setIsLoading(true);

      if (isSupabaseConfigured()) {
        try {
          // Load từ Supabase
          const { data, error } = await supabase
            .from("wishes")
            .select("*")
            .order("created_at", { ascending: false });

          if (error) {
            console.error("Lỗi khi load wishes từ Supabase:", error);
            toast({
              title: "Lỗi",
              description: "Không thể tải danh sách lời chúc. Vui lòng thử lại sau.",
              variant: "destructive",
            });
            setWishes(initialWishes);
          } else if (data) {
            // Convert từ Supabase format (created_at) sang local format (createdAt)
            const converted = data.map((item: any) => ({
              id: item.id, // BIGSERIAL
              name: item.name, // TEXT NOT NULL
              message: item.message, // TEXT NOT NULL
              createdAt: new Date(item.created_at), // TIMESTAMPTZ -> Date
            }));
            setWishes(converted);
          }
        } catch (error) {
          console.error("Lỗi khi load wishes:", error);
          toast({
            title: "Lỗi",
            description: "Có lỗi xảy ra khi tải dữ liệu.",
            variant: "destructive",
          });
          setWishes(initialWishes);
        }
      } else {
        // Nếu chưa cấu hình Supabase, dùng initial wishes
        setWishes(initialWishes);
      }

      setIsLoading(false);
    };

    loadWishes();

    // Real-time subscription nếu Supabase đã được cấu hình
    if (isSupabaseConfigured()) {
      const channel = supabase
        .channel("wishes-changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "wishes",
          },
          (payload) => {
            if (payload.eventType === "INSERT") {
              const newWish: Wish = {
                id: payload.new.id, // BIGSERIAL
                name: payload.new.name, // TEXT NOT NULL
                message: payload.new.message, // TEXT NOT NULL
                createdAt: new Date(payload.new.created_at), // TIMESTAMPTZ
              };
              setWishes((prev) => [newWish, ...prev]);
            } else if (payload.eventType === "DELETE") {
              setWishes((prev) => prev.filter((item) => item.id !== payload.old.id));
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) {
      toast({
        title: "Vui lòng điền đầy đủ thông tin",
        description: "Hãy nhập tên và lời chúc của bạn.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (isSupabaseConfigured()) {
        // Lưu vào Supabase
        const { data, error } = await supabase
          .from("wishes")
          .insert([
            {
              name: name.trim(), // TEXT NOT NULL
              message: message.trim(), // TEXT NOT NULL
              // created_at sẽ tự động được set bởi database (DEFAULT NOW())
            },
          ])
          .select()
          .single();

        if (error) {
          throw error;
        }

        // Convert và thêm vào state (real-time sẽ tự động cập nhật, nhưng thêm ngay để UX tốt hơn)
        if (data) {
          const newWish: Wish = {
            id: data.id,
            name: data.name,
            message: data.message,
            createdAt: new Date(data.created_at),
          };
          setWishes((prev) => [newWish, ...prev]);
        }

        toast({
          title: "Cảm ơn bạn!",
          description: "Lời chúc của bạn đã được gửi và lưu thành công. Mọi người đều có thể thấy!",
        });
      } else {
        toast({
          title: "Lỗi",
          description: "Supabase chưa được cấu hình. Vui lòng cấu hình VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY trong file .env",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Lỗi khi lưu wish:", error);
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi lưu lời chúc. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      // Reset form
      setName("");
      setMessage("");
      setIsSubmitting(false);
    }
  };

  const selectSuggestedWish = (wish: string) => {
    setMessage(wish);
  };

  return (
    <section id="wishes" className="py-20 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <Reveal animation="fade-up">
          <h2 className="font-display text-4xl md:text-5xl text-center text-foreground mb-12">
            Gửi Lời Chúc
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Form */}
          <Reveal animation="fade-right" delay={200}>
            <div className="order-2 lg:order-1">
              <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 md:p-8 shadow-card">
                <div className="space-y-6">
                  {/* Name Input */}
                  <div>
                    <label className="font-body text-sm font-medium text-foreground mb-2 block">
                      Tên của bạn
                    </label>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nhập tên của bạn"
                        className="pl-10 font-body focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="font-body text-sm font-medium text-foreground mb-2 block">
                      Lời chúc
                    </label>
                    <div className="relative group">
                      <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Viết lời chúc của bạn..."
                        className="pl-10 min-h-[120px] font-body focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Suggested Wishes */}
                  <div>
                    <p className="font-body text-sm text-muted-foreground mb-3">
                      Gợi ý lời chúc:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedWishes.map((wish, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => selectSuggestedWish(wish)}
                          className="text-xs font-body bg-secondary hover:bg-primary hover:text-primary-foreground px-3 py-1.5 rounded-full transition-all duration-300 hover:scale-105"
                        >
                          {wish.substring(0, 30)}...
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full font-body bg-primary hover:bg-primary/90 hover:scale-[1.02] transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Đang gửi...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Gửi lời chúc
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </Reveal>

          {/* Wishes List */}
          <Reveal animation="fade-left" delay={400}>
            <div className="order-1 lg:order-2">
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {isLoading ? (
                  <div className="bg-card rounded-xl p-8 text-center border border-border">
                    <p className="text-muted-foreground">Đang tải...</p>
                  </div>
                ) : wishes.length === 0 ? (
                  <div className="bg-card rounded-xl p-8 text-center border border-border">
                    <p className="text-muted-foreground">
                      Chưa có lời chúc nào. Hãy là người đầu tiên gửi lời chúc!
                    </p>
                  </div>
                ) : (
                  wishes.map((wish, index) => (
                    <div
                      key={wish.id}
                      className="bg-card rounded-xl p-4 md:p-5 shadow-soft border border-border hover:shadow-card hover:-translate-y-1 transition-all duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <p className="font-body font-semibold text-foreground mb-2">
                        {wish.name}
                      </p>
                      <p className="font-body text-muted-foreground text-sm leading-relaxed">
                        {wish.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-3">
                        {new Date(wish.createdAt).toLocaleDateString("vi-VN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default WishesSection;
