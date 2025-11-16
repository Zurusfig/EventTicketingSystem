"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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
    <main
      className="min-h-screen w-full 
      bg-gradient-to-b 
      from-white 
      via-[#D4D4D4] 
      to-[#999999]"
    >
      {/* ---------- TOP LEFT NAV ---------- */}
      <div className="pt-5 pl-10 flex items-center gap-6 text-[#999999]">
        <div className="text-4xl font-extrabold text-lime-400">TP</div>
        <div className="text-lg cursor-pointer hover:text-black">
          Manage Event
        </div>
        <div className="text-lg cursor-pointer hover:text-black">
          Manage Ticket Request
        </div>
      </div>

      {/* ---------- MAIN CONTENT (Centered) ---------- */}
      <div className="flex flex-col items-center mt-10">

        <h1 className="text-4xl font-bold text-center text-[#222] text-black">
          Welcome to The Performers
        </h1>

        <p className="text-center text-gray-700 mt-3">
          Every Ticket, One Request Away.
        </p>

        <div className="mt-10 w-[600px] h-[400px] bg-white rounded-md shadow-md relative overflow-hidden">
          <Image
            src={images[index]}
            alt="Slideshow"
            fill
            className="object-cover transition duration-700"
          />
        </div>

        <button className="mt-8 px-10 py-3 rounded-full 
          bg-lime-400 hover:bg-lime-500 transition text-[#222] font-semibold shadow"
          onClick={() => window.location.href = '/upcoming_event'}>
          Get Started
        </button>

      </div>
    </main>
  );
}