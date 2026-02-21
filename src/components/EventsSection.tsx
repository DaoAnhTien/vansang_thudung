import { Calendar, MapPin, Clock } from "lucide-react";
import { Button } from "./ui/button";
import Reveal from "./Reveal";
import venueImage from "@/assets/venue.jpg";

const events = [
  {
    title: "LỄ Vu Quy",
    date: "Ngày 25/02/2026 (âm lịch: ngày 09 tháng 01 năm Bính Ngọ)",
    time: "Vào lúc 11h",
    venue: "Tư gia nhà gái",
    address: "Thôn Vĩnh Phúc, xã Đức Quang, tỉnh Hà Tĩnh",
    mapLink: "https://www.google.com/maps?q=18.56690266424763,105.65248253819898",
  },
  {
    title: "LỄ Thành Hôn",
    date: "Ngày 26/02/2026 (âm lịch: ngày 10 tháng 01 năm Bính Ngọ)",
    time: "Vào lúc 11h",
    venue: "Sảnh 1, tầng 1, khách sạn Hoàng Quân",
    address: "Số 58 đường Nguyễn Đổng Chi, phường Nam Hồng Lĩnh, Hà Tĩnh",
    mapLink: "https://www.google.com/maps?q=18.52557478223395,105.70177933380131",
  },
];

const EventsSection = () => {
  return (
    <section id="events" className="py-20 md:py-32 bg-section-gradient overflow-hidden">
      <div className="container mx-auto px-4">
        <Reveal animation="fade-up">
          <h2 className="font-display text-4xl md:text-5xl text-center text-foreground mb-4">
            Sự Kiện Cưới
          </h2>
        </Reveal>

        <Reveal animation="fade-up" delay={150}>
          <p className="font-body text-center text-muted-foreground max-w-xl mx-auto mb-12">
            Tình yêu đích thực đứng về phía nhau trong những ngày tốt đẹp và sát cánh hơn trong những ngày tồi tệ.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {events.map((event, index) => (
            <Reveal
              key={index}
              animation={index === 0 ? "fade-right" : "fade-left"}
              delay={index * 200}
            >
              <div className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-2">
                {/* Event Image */}
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <img
                    src={venueImage}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 right-4 font-display text-xl md:text-2xl text-primary-foreground">
                    {event.title}
                  </h3>
                </div>

                {/* Event Details */}
                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 group">
                      <Calendar className="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="font-body font-semibold text-foreground">
                        {event.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 group">
                      <Clock className="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="font-body text-foreground">{event.time}</span>
                    </div>
                    <div className="flex items-start gap-3 group">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div>
                        <p className="font-body font-semibold text-foreground">
                          {event.venue}
                        </p>
                        <p className="font-body text-sm text-muted-foreground">
                          {event.address}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      className="flex-1 font-body bg-primary hover:bg-primary/90 hover:scale-105 transition-transform"
                      onClick={() => window.open(event.mapLink, "_blank")}
                    >
                      Xem bản đồ
                    </Button>
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

export default EventsSection;
