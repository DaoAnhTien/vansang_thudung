import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import musicUrl from "@/assets/audio.mp3";

const MusicPlayer = (
  { isPlaying, toggleMusic }: { isPlaying: boolean, toggleMusic: () => void }
) => {

  const audioRef = useRef<HTMLAudioElement>(null);





  return (
    <>
      <audio ref={audioRef} src={musicUrl} preload="auto" />


      <button
        onClick={toggleMusic}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${isPlaying
          ? 'bg-primary text-primary-foreground'
          : 'bg-background text-foreground border border-primary/30'
          }`}
        aria-label={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
      >
        {isPlaying ? (
          <div className="relative">
            <Volume2 className="w-6 h-6" />
            {/* Animated rings when playing */}
            <span className="absolute -inset-2 rounded-full border-2 border-primary-foreground/30 animate-ping" />
          </div>
        ) : (
          <VolumeX className="w-6 h-6" />
        )}
      </button>

      {/* Music visualization bars when playing */}
      {isPlaying && (
        <div className="fixed bottom-6 right-[88px] z-50 flex items-end gap-1 h-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-1 bg-primary rounded-full animate-pulse"
              style={{
                height: `${Math.random() * 20 + 10}px`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default MusicPlayer;
