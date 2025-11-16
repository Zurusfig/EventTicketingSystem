"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const images = ["/images/slide1.jpg", "/images/slide2.jpg", "/images/slide3.jpg"];

export default function ImageSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500); // change every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden rounded-xl">
      <Image
        src={images[index]}
        alt="Slideshow"
        fill
        className="object-cover transition-opacity duration-700"
      />
    </div>
  );
}