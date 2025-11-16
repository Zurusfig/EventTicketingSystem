"use client";

import { Calendar, MapPin } from "lucide-react";

export type AdminEventCardProps = {
  id: string;
  title: string;
  date: string;
  location: string;
  color: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export default function AdminEventCard({
  id,
  title,
  date,
  location,
  color,
  onEdit,
  onDelete
}: AdminEventCardProps) {
  return (
    <div
      className={`
        ${color}
        rounded-xl shadow-md border border-gray-200
        p-4 flex flex-col
        h-[350px]
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

      {/* Buttons */}
      <div className="mt-auto flex justify-between pt-4">
        <button
          onClick={() => onEdit?.(id)}
          className="px-4 py-1 rounded-md bg-gray-900 text-white hover:bg-gray-700 transition"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete?.(id)}
          className="px-4 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}