"use client";

import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";

export type AdminEventCardProps = {
  id: string;
  title: string;
  date: string;
  location: string;
  posterPicture?: string;
  color: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export default function AdminEventCard({
  id,
  title,
  date,
  location,
  posterPicture,
  color,
  onEdit,
  onDelete
}: AdminEventCardProps) {

  const imageSrc =
    posterPicture && posterPicture.trim() !== ""
      ? posterPicture
      : "/images/slide1.jpg";

  return (
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
      {/* Poster */}
      <Image
        src={imageSrc}
        alt={title}
        width={280}
        height={150}
        className="w-full h-[60%] object-cover rounded-md mb-4"
      />

      {/* Title */}
      <h2 className="text-lg font-bold text-center mb-2 text-navy-color">{title}</h2>

      {/* Details */}
      <div className="text-sm text-gray-800 space-y-1">
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span>
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={16} />
          <span>{location}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-auto flex justify-between pt-4">
        <button
          onClick={() => onEdit?.(id)}
          className="cursor-pointer px-4 py-1 rounded-full bg-navy-color text-white hover:bg-navy-color/80 hover:scale-105 transition"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete?.(id)}
          className="cursor-pointer px-4 py-1 rounded-full bg-red-400 text-white hover:bg-red-500 hover:scale-105 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}