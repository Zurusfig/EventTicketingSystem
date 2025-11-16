"use client";

import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";

export type EventCardProps = {
  id: string;
  title: string;
  date: string;
  location: string;
  posterPicture?: string;
  color: string;
};

export default function EventCard({
  id,
  title,
  date,
  location,
  posterPicture,
  color
}: EventCardProps) {
  const imageSrc =
    posterPicture && posterPicture.trim() !== ""
      ? posterPicture
      : "/images/slide1.jpg";

  return (
    <Link href={`/events/${id}`}>
      <div
        className={`
          ${color}
          rounded-2xl shadow-md border border-gray-200
          p-4 flex flex-col gap-3
          h-[420px]
          transition hover:scale-[1.03] hover:shadow-lg cursor-pointer
          w-full max-w-[360px]
        `}
      >
        {/* Poster / Placeholder */}
        <Image
          src={imageSrc}
          alt={title}
          width={280}
          height={150}
          className="w-full h-[50%] lg:h-[60%] xl:h-[70%] object-cover rounded-md mb-4"
        />

        {/* Title */}
        <h2 className="text-lg font-bold text-center mb-2 text-navy-color">{title}</h2>

        {/* Details */}
        <div className="text-sm text-gray-800 space-y-1">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{date}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{location}</span>
          </div>
        </div>

        <p className="text-center mt-auto text-gray-700 text-sm underline">
          Click to learn more…
        </p>
      </div>
    </Link>
  );
}