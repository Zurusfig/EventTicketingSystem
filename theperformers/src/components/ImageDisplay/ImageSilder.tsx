"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ImageSliderProps = {
  images: string[]; 
};

export default function ImageSlider({ images }: ImageSliderProps) {
  const [index, setIndex] = useState(0);

  // Auto slide only if >1 image
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (idx: number) => setIndex(idx);

  return (
    <div className="w-full h-full flex flex-col items-center select-none">
      {/* Image container */}
      <div className="w-full h-[300px] lg:h-[360px] relative overflow-hidden rounded-xl shadow-md bg-gray-200">
        <Image
          src={images[index]}
          alt="Event Slide"
          fill
          className="object-cover transition-opacity duration-700"
        />
      </div>

      {/* Dot Indicators */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`w-3 h-3 rounded-full transition 
                ${i === index ? "bg-gray-700" : "bg-gray-300"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}