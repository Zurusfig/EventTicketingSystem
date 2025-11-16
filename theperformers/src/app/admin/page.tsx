'use client';
import AdminEventCard from "@/components/Admin/AdminEventCard";
import { use } from "react";

type Event = {
  _id: string;
  name: string;
  eventDate: string;
  venue: string;
};

// MOCK EVENTS
const mockEvents: Event[] = [
  { _id: "1", name: "Football Tryout", eventDate: "2025-12-15", venue: "CU Sports Complex" },
  { _id: "2", name: "Drama Club Audition", eventDate: "2025-12-20", venue: "Faculty of Arts Hall" },
  { _id: "3", name: "Music Festival", eventDate: "2026-01-05", venue: "Chula Park" },
  { _id: "4", name: "Chess Tournament", eventDate: "2026-02-10", venue: "Engineering Building" },
  { _id: "5", name: "Coding Bootcamp", eventDate: "2026-03-01", venue: "Tech Center Room 205" },
];

export default function AdminManageEvents() {
  const colors = [
    "bg-[var(--sys-accent-lime)]",
    "bg-[var(--sys-accent-blue)]",
    "bg-[var(--sys-accent-purple)]",
    "bg-[var(--sys-accent-yellow)]"
  ];

  return (
    <div className="px-4 sm:px-10 py-8 min-h-screen w-full
      bg-gradient-to-b from-white via-[#D4D4D4] to-[#999999]">

      {/* Title + Create Button Row */}
      <div className="flex flex-col sm:flex-row 
        sm:justify-between sm:items-center 
        gap-4 mb-6"
        >
        <h1 className="text-3xl font-bold text-center sm:text-left">
            Manage Events
        </h1>

        <button
            className="px-4 py-2 bg-lime-300 rounded-lg 
            text-black font-semibold w-[200px] sm:w-auto
            self-center sm:self-auto hover:bg-lime-400"
            onClick={() => window.location.href = '/admin/create-event'}
        >
            + Create Event
        </button>
      </div>

      {/* Cards Grid */}
      <div
        className="grid gap-8 
        grid-cols-[repeat(auto-fit,minmax(260px,1fr))]
        place-items-center"
      >
        {mockEvents.map((ev, idx) => (
          <AdminEventCard
            key={ev._id}
            id={ev._id}
            title={ev.name}
            date={new Date(ev.eventDate).toLocaleDateString()}
            location={ev.venue}
            color={colors[idx % colors.length]}
            onEdit={(id) => console.log("EDIT", id)}
            onDelete={(id) => console.log("DELETE", id)}
          />
        ))}
      </div>

    </div>
  );
}