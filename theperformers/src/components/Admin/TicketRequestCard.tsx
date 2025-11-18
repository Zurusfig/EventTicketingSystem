"use client";

import { Ticket } from "lucide-react";

type CardProps = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  used: number;
  total: number;
  image: string; 
  color: string;
};

export default function TicketRequestCard({
  title,
  subtitle,
  description,
  used,
  total,
  image,
  color,
}: CardProps) {
  return (
    <div className="items-center flex flex-col">
      <div
        className={`w-80 sm:w-full rounded-xl shadow-md p-4 sm:p-6 ${color} 
        flex flex-col sm:flex-row gap-4 px-5 py-5`}
      >
        {/* Thumbnail IMAGE (same size + same classes as before) */}
        <div
          className="w-full sm:w-60 h-32 bg-white rounded-lg  
          flex flex-col items-center sm:items-start overflow-hidden"
        >
          <img
            src={image}
            alt="Thumbnail"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text content — UNCHANGED */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2
              className="text-xl font-semibold flex flex-col 
            items-center sm:items-start text-white"
            >
              {title}
            </h2>
            <h3
              className="font-bold text-lg mt-1 flex flex-col 
            items-center sm:items-start"
            >
              {subtitle}
            </h3>
            <p className="text-sm mt-2">{description}</p>
          </div>
        </div>

        {/* Right Side — UNCHANGED */}
        <div className="flex sm:flex-col justify-between items-end gap-3 min-w-[120px]">
          <div className="flex items-center gap-1 text-xs sm:text-sm font-semibold">
            <Ticket className="w-4 h-4" />
            <span>
              {used}/{total} Tickets
            </span>
          </div>

          <div className="flex sm:flex-col gap-2">
            <button className="px-4 py-1 sm:py-2 bg-slate-800 text-white rounded-md font-medium text-sm">
              Edit
            </button>
            <button className="px-4 py-1 sm:py-2 bg-red-500 text-white rounded-md font-medium text-sm">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}