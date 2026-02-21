import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { Check, X, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

type AttendanceStatus = "attending" | "not-attending" | "maybe" | null;

interface RSVPEntry {
  id: number;
  name: string;
  status: AttendanceStatus;
  message: string;
  createdAt: Date;
}

export const RSVPForm = () => {
  const [rsvpList, setRsvpList] = useState<RSVPEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<AttendanceStatus>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Kiểm tra xem Supabase đã được cấu hình chưa
  const isSupabaseConfigured = () => {
    return import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY;
  };

  // Load RSVP từ Supabase
  useEffect(() => {
    const loadRSVP = async () => {
      setIsLoading(true);

      if (isSupabaseConfigured()) {
        try {
          // Load từ Supabase
          const { data, error } = await supabase
            .from("rsvp")
            .select("*")
            .order("created_at", { ascending: false });

          if (error) {
            console.error("Lỗi khi load RSVP từ Supabase:", error);
            toast.error("Không thể tải danh sách RSVP. Vui lòng thử lại sau.");
            setRsvpList([]);
          } else if (data) {
            const converted = data.map((item: any) => ({
              id: item.id, // BIGSERIAL
              name: item.name, // TEXT NOT NULL
              status: item.status, // TEXT NOT NULL
              message: item.message || "", // TEXT (có thể null trong DB, convert thành empty string)
              createdAt: new Date(item.created_at), // TIMESTAMPTZ -> Date
            }));
            setRsvpList(converted);
          }
        } catch (error) {
          console.error("Lỗi khi load RSVP:", error);
          toast.error("Có lỗi xảy ra khi tải dữ liệu.");
          setRsvpList([]);
        }
      } else {
        // Nếu chưa cấu hình Supabase
        setRsvpList([]);
      }

      setIsLoading(false);
    };

    loadRSVP();

    // Real-time subscription nếu Supabase đã được cấu hình
    if (isSupabaseConfigured()) {
      const channel = supabase
        .channel("rsvp-changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "rsvp",
          },
          (payload) => {
            if (payload.eventType === "INSERT") {
              const newRSVP: RSVPEntry = {
                id: payload.new.id, // BIGSERIAL
                name: payload.new.name, // TEXT NOT NULL
                status: payload.new.status, // TEXT NOT NULL
                message: payload.new.message || "", // TEXT (có thể null)
                createdAt: new Date(payload.new.created_at), // TIMESTAMPTZ
              };
              setRsvpList((prev) => [newRSVP, ...prev]);
            } else if (payload.eventType === "DELETE") {
              setRsvpList((prev) => prev.filter((item) => item.id !== payload.old.id));
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

    if (!name.trim()) {
      toast.error("Vui lòng nhập tên của bạn");
      return;
    }

    if (!status) {
      toast.error("Vui lòng chọn trạng thái tham dự");
      return;
    }

    setIsSubmitting(true);

    try {
      if (isSupabaseConfigured()) {
        // Lưu vào Supabase
        // Đảm bảo message là null nếu rỗng (theo cấu trúc database)
        const messageValue = message.trim() || null;

        const { data, error } = await supabase
          .from("rsvp")
          .insert([
            {
              name: name.trim(), // TEXT NOT NULL
              status: status, // TEXT NOT NULL - 'attending' | 'not-attending' | 'maybe'
              message: messageValue, // TEXT - có thể null
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
          const newRSVP: RSVPEntry = {
            id: data.id,
            name: data.name,
            status: data.status,
            message: data.message || "",
            createdAt: new Date(data.created_at),
          };
          setRsvpList((prev) => [newRSVP, ...prev]);
        }

        toast.success("Cảm ơn bạn đã xác nhận! Dữ liệu đã được lưu và mọi người đều có thể thấy.");
      } else {
        toast.error("Supabase chưa được cấu hình. Vui lòng cấu hình VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY trong file .env");
      }
    } catch (error: any) {
      console.error("Lỗi khi lưu RSVP:", error);
      toast.error("Có lỗi xảy ra khi lưu xác nhận. Vui lòng thử lại.");
    } finally {
      // Reset form
      setName("");
      setMessage("");
      setStatus(null);
      setIsSubmitting(false);
    }
  };

  const statusOptions = [
    {
      value: "attending" as const,
      label: "Mình sẽ tham dự",
      icon: Check,
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      value: "not-attending" as const,
      label: "Thật tiếc mình bận mất rồi",
      icon: X,
      color: "bg-red-500 hover:bg-red-600",
    },
    {
      value: "maybe" as const,
      label: "Mình đang cân nhắc",
      icon: HelpCircle,
      color: "bg-amber-500 hover:bg-amber-600",
    },
  ];

  const getStatusLabel = (status: AttendanceStatus) => {
    const option = statusOptions.find((opt) => opt.value === status);
    return option?.label || "";
  };

  const getStatusColor = (status: AttendanceStatus) => {
    if (status === "attending") return "bg-green-500";
    if (status === "not-attending") return "bg-red-500";
    if (status === "maybe") return "bg-amber-500";
    return "bg-gray-500";
  };

  const getStatusIcon = (status: AttendanceStatus) => {
    if (status === "attending") return Check;
    if (status === "not-attending") return X;
    if (status === "maybe") return HelpCircle;
    return HelpCircle;
  };

  return (
    <section className="py-10 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">
              Xác Nhận Tham Dự
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Hãy xác nhận sự có mặt của bạn để chúng mình chuẩn bị đón tiếp một cách chu đáo nhất. Trân trọng!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="bg-card rounded-lg p-8 shadow-md space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Họ và tên *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nhập họ tên của bạn"
                    className="bg-background"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Bạn có thể tham dự không? *</Label>
                  <div className="grid gap-3">
                    {statusOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setStatus(option.value)}
                          className={`p-4 rounded-lg border-2 transition-all text-left flex items-center gap-3 ${status === option.value
                            ? "border-gold bg-gold/10 scale-105"
                            : "border-border hover:border-gold/50"
                            }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-full ${option.color} flex items-center justify-center text-white`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="font-medium">{option.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                >
                  {isSubmitting ? "Đang gửi..." : "Gửi xác nhận"}
                </Button>
              </form>
            </motion.div>

            {/* RSVP List */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {isLoading ? (
                  <div className="bg-card rounded-xl p-8 text-center border border-border">
                    <p className="text-muted-foreground">Đang tải...</p>
                  </div>
                ) : rsvpList.length === 0 ? (
                  <div className="bg-card rounded-xl p-8 text-center border border-border">
                    <p className="text-muted-foreground">
                      Chưa có xác nhận tham dự nào. Hãy là người đầu tiên xác nhận!
                    </p>
                  </div>
                ) : (
                  rsvpList.map((rsvp, index) => {
                    const StatusIcon = getStatusIcon(rsvp.status);
                    return (
                      <motion.div
                        key={rsvp.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-card rounded-xl p-4 md:p-5 shadow-md border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <p className="font-semibold text-foreground text-lg">
                            {rsvp.name}
                          </p>
                          <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(rsvp.status)} text-white text-xs font-medium`}>
                            <StatusIcon className="w-3 h-3" />
                            <span>{getStatusLabel(rsvp.status)}</span>
                          </div>
                        </div>
                        {rsvp.message && (
                          <p className="text-muted-foreground text-sm leading-relaxed mt-2">
                            {rsvp.message}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-3">
                          {new Date(rsvp.createdAt).toLocaleDateString("vi-VN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
