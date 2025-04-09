// components/ImageSlider.tsx
"use client";

import { useState, useEffect } from "react";
import styles from "./ImageSlider.module.css";
import Image from "next/image";

// Define the type for image objects if you want more structure
interface Slide {
  src: string;
  alt: string;
}

// Use direct image URLs instead of Google redirect links
const images: Slide[] = [
  {
    src: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b",
    alt: "Mountain landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1558979158-65a1eaa08691",
    alt: "River view",
  },
];

const ImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToPrevious = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number): void => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles.slider}>
      <div className={styles.slides}>
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          fill
          style={{ objectFit: "cover" }}
          priority={currentIndex === 0}
        />
      </div>

      <button className={styles.prev} onClick={goToPrevious}>
        ❮
      </button>
      <button className={styles.next} onClick={goToNext}>
        ❯
      </button>

      <div className={styles.dots}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              currentIndex === index ? styles.active : ""
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
