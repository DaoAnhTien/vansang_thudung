import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Heart, ZoomIn } from "lucide-react";
import Reveal from "./Reveal";
import gallery1 from "@/assets/img1.jpg";
import gallery2 from "@/assets/img2.jpg";
import gallery3 from "@/assets/img3.jpg";
import gallery4 from "@/assets/img4.jpg";
import gallery5 from "@/assets/img5.jpg";
import gallery6 from "@/assets/img6.jpg";
import gallery7 from "@/assets/img7.jpg";
import gallery8 from "@/assets/img8.jpg";
import gallery9 from "@/assets/img9.jpg";
import gallery10 from "@/assets/img10.jpg";

const images = [
  { src: gallery1, alt: "Ảnh cưới 1", caption: "Khoảnh khắc đáng nhớ", size: "large" },
  { src: gallery2, alt: "Ảnh cưới 2", caption: "Tình yêu bất tận", size: "small" },
  { src: gallery3, alt: "Ảnh cưới 3", caption: "Hạnh phúc viên mãn", size: "medium" },
  { src: gallery4, alt: "Ảnh cưới 4", caption: "Bên nhau trọn đời", size: "small" },
  { src: gallery5, alt: "Ảnh cưới 5", caption: "Ngày về chung đôi", size: "medium" },
  { src: gallery6, alt: "Ảnh cưới 6", caption: "Yêu thương mãi mãi", size: "small" },
  { src: gallery7, alt: "Ảnh cưới 7", caption: "Khoảnh khắc ngọt ngào", size: "large" },
  { src: gallery8, alt: "Ảnh cưới 8", caption: "Hạnh phúc trọn vẹn", size: "medium" },
  { src: gallery9, alt: "Ảnh cưới 9", caption: "Tình yêu vĩnh cửu", size: "small" },
  { src: gallery10, alt: "Ảnh cưới 10", caption: "Ngày trọng đại", size: "medium" },
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handlePrevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    }
  };

  const handleNextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1);
    }
  };

  const getSizeClasses = (size: string) => {
    switch (size) {

      default:
        return "md:col-span-2 md:row-span-2 aspect-[3/4]";
    }
  };

  return (
    <section id="gallery" className="py-20 md:py-32 bg-gradient-to-b from-background via-secondary/30 to-background overflow-hidden">
      <div className="container mx-auto px-4">
        <Reveal animation="fade-up">
          <div className="text-center mb-16">
            <span className="text-primary font-medium tracking-widest uppercase text-sm">Hình ảnh cưới</span>
            <h2 className="font-display text-4xl md:text-6xl text-foreground mt-2 mb-4">
              Album Hình Cưới
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
              <Heart className="w-5 h-5 text-primary fill-primary/30" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
          </div>
        </Reveal>

        {/* Mosaic Grid Gallery - So le đẹp mắt với hiệu ứng */}
        <div className="max-w-[90rem] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-2">
            {images.map((image, index) => {
              // Delay animation cho từng ảnh để tạo stagger effect
              const animationDelay = index * 50;

              return (
                <Reveal
                  key={index}
                  animation="zoom-in"
                  delay={200 + animationDelay}
                >
                  <div
                    className={`relative group cursor-pointer overflow-hidden rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ${getSizeClasses(image.size)}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    {/* Image với hiệu ứng parallax nhẹ */}
                    <div className="relative w-full h-full overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                      />

                      {/* Shine effect khi hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>

                    {/* Overlay với hiệu ứng fade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Caption với slide up animation */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-out">
                      <p className="text-primary-foreground font-display text-sm md:text-lg text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                        {image.caption}
                      </p>
                    </div>

                    {/* Zoom icon với bounce effect */}
                    <div className="absolute top-4 right-4 w-8 h-8 md:w-10 md:h-10 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100 group-hover:rotate-12">
                      <ZoomIn className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
                    </div>

                    {/* Decorative border với glow effect */}
                    <div className="absolute inset-0 border-2 border-primary/50 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[0_0_20px_rgba(var(--primary),0.3)] group-hover:shadow-[0_0_30px_rgba(var(--primary),0.5)]" />

                    {/* Sparkle effect */}
                    <div className="absolute top-2 left-2 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" />
                    <div className="absolute bottom-2 right-2 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 animate-ping" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/95 backdrop-blur-sm p-4 animate-fade-in"
            onClick={() => setSelectedImage(null)}
            style={{
              animation: 'fade-in 0.3s ease-out'
            }}
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 text-primary-foreground/80 hover:text-primary-foreground transition-colors z-10 p-2 rounded-full bg-foreground/50 hover:bg-foreground/70"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation buttons */}
            <button
              className="absolute left-4 md:left-8 text-primary-foreground/80 hover:text-primary-foreground transition-colors z-10 p-3 rounded-full bg-foreground/50 hover:bg-foreground/70"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              className="absolute right-4 md:right-8 text-primary-foreground/80 hover:text-primary-foreground transition-colors z-10 p-3 rounded-full bg-foreground/50 hover:bg-foreground/70"
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Image container */}
            <div
              className="relative max-w-5xl max-h-[85vh] animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-16 left-0 right-0 text-center">
                <p className="text-primary-foreground font-display text-2xl">
                  {images[selectedImage].caption}
                </p>
                <p className="text-primary-foreground/60 text-sm mt-2">
                  {selectedImage + 1} / {images.length}
                </p>
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(index);
                  }}
                  className={`w-12 h-12 rounded-md overflow-hidden transition-all duration-300 ${selectedImage === index
                    ? 'ring-2 ring-primary scale-110'
                    : 'opacity-50 hover:opacity-100'
                    }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
