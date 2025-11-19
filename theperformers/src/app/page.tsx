"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ScrollDisabler from "@/components/ScrollDisabler";
export default function Home() {
  const images = [
    "/images/slide1.jpg",
    "/images/slide2.jpg",
    "/images/slide3.jpg",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);


  return (
    <ScrollDisabler>
    <div
      className="min-h-screen w-full"
    >

      {/* ---------- MAIN CONTENT (Centered) ---------- */}
      <div className="flex flex-col items-center mt-35">

        <h1 className="text-4xl font-bold text-center text-[#222] text-text-color">
          Welcome to The Performers
        </h1>

        <p className="text-center text-text-color/80 mt-3">
          Every Ticket, One Request Away.
        </p>

        <div className="mt-10 min-w-[95%] sm:min-w-[600px] max-w-[600px] h-[400px] bg-white p-6 rounded-md shadow-md relative overflow-hidden">
          <Image
            src={images[index]}
            alt="Slideshow"
            fill
            className="object-cover transition duration-70000"
          />
        </div>

        <button className="cursor-pointer mt-8 px-10 py-3 rounded-full 
          bg-lime-color hover:bg-lime-color/90 hover:scale-105 transition text-[#222] font-semibold shadow"
          onClick={() => window.location.href = '/events'}>
          Get Started
        </button>

      </div>
    </div>
    </ScrollDisabler>
  );
}