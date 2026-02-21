import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CoupleSection from "@/components/CoupleSection";
import CountdownSection from "@/components/CountdownSection";
import GallerySection from "@/components/GallerySection";
import EventsSection from "@/components/EventsSection";
import WishesSection from "@/components/WishesSection";
import GiftSection from "@/components/GiftSection";
import Footer from "@/components/Footer";
import FloatingHearts from "@/components/FloatingHearts";
import MusicPlayer from "@/components/MusicPlayer";

import { useEffect, useState, useRef } from "react";
import musicUrl from "@/assets/audio.mp3";
import { RSVPForm } from "@/components/RSVPForm";

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Khởi tạo audio
    try {
      audioRef.current = new Audio(musicUrl);
      audioRef.current.loop = true;
      audioRef.current.volume = 0;   // để fade in
    } catch (err) {
      console.error("Lỗi khởi tạo audio:", err);
    }

    // Các event hợp lệ để kích hoạt media
    const events = [
      "touchstart",
      "pointerdown",
      "click",
      "touchend",
    ];

    const startAudio = async () => {
      if (!audioRef.current) return;

      try {
        await audioRef.current.play();
        setIsPlaying(true);

        // Fade in âm lượng
        let vol = 0;
        const fade = setInterval(() => {
          vol += 0.1;
          if (audioRef.current) {
            audioRef.current.volume = Math.min(vol, 0.5);
          }
          if (vol >= 0.5) clearInterval(fade);
        }, 150);

        removeEvents();
      } catch (err) {
        console.log("Chưa cho phép phát nhạc:", err);
      }
    };

    const addEvents = () => {
      events.forEach(e =>
        document.addEventListener(e, startAudio, { once: true })
      );
    };

    const removeEvents = () => {
      events.forEach(e =>
        document.removeEventListener(e, startAudio)
      );
    };

    addEvents();

    return () => {
      removeEvents();
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MusicPlayer isPlaying={isPlaying} toggleMusic={toggleMusic} />

      <FloatingHearts />
      <Navbar />

      <HeroSection />
      <CoupleSection />
      <CountdownSection />
      <GallerySection />
      <EventsSection />
      <WishesSection />
      <RSVPForm />
      <GiftSection />
      <Footer />
    </div>
  );
};

export default Index;
