"use client";

import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";

export type EventCardProps = {
  id: string;
  title: string;
  date: string;
  location: string;
  color: string;
};

export default function EventCard({
  id,
  title,
  date,
  location,
  color
}: EventCardProps) {
  return (
    <Link href={`/events/${id}`}>
      <div
        className={`
          ${color}
          rounded-xl shadow-md border border-gray-200
          p-4 flex flex-col
          h-[350px]
          transition hover:scale-[1.03] cursor-pointer
          w-[280px]
        `}
      >
        {/* Poster Placeholder */}
        <div className="w-full h-[150px] bg-white rounded-md mb-4" />

        {/* Title */}
        <h2 className="text-lg font-bold text-center mb-2">{title}</h2>

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