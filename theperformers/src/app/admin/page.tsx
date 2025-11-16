"use client";

import { useEffect, useState } from "react";
import AdminEventCard from "@/components/Admin/AdminEventCard";

type Event = {
  _id: string;
  name: string;
  eventDate: string;
  venue: string;
};

// Fallback mock data
const mockEvents: Event[] = [
  { _id: "1", name: "Football Tryout", eventDate: "2025-12-15", venue: "CU Sports Complex" },
  { _id: "2", name: "Drama Club Audition", eventDate: "2025-12-20", venue: "Faculty of Arts Hall" },
  { _id: "3", name: "Music Festival", eventDate: "2026-01-05", venue: "Chula Park" },
  { _id: "4", name: "Chess Tournament", eventDate: "2026-02-10", venue: "Engineering Building" },
  { _id: "5", name: "Coding Bootcamp", eventDate: "2026-03-01", venue: "Tech Center Room 205" },
];

export default function AdminManageEvents() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [loading, setLoading] = useState(true);

  const colors = [
    "bg-[var(--sys-accent-lime)]",
    "bg-[var(--sys-accent-blue)]",
    "bg-[var(--sys-accent-purple)]",
    "bg-[var(--sys-accent-yellow)]",
  ];

  /** Fetch events from backend */
  async function fetchEvents() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/events`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const json = await res.json();

      if (json.success && Array.isArray(json.data)) {
        setEvents(json.data);
      } else {
        setEvents(mockEvents); // fallback
      }
    } catch (err) {
      console.error("API Error:", err);
      setEvents(mockEvents);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div
      className="px-4 sm:px-10 py-8 min-h-screen w-full
      bg-gradient-to-b from-white via-[#D4D4D4] to-[#999999]"
    >
      {/* Header Row */}
      <div
        className="flex flex-col sm:flex-row 
        sm:justify-between sm:items-center 
        gap-4 mb-6"
      >
        <h1 className="text-3xl font-bold text-center sm:text-left">
          Manage Events
        </h1>

        <button
          className="px-4 py-2 bg-lime-300 rounded-lg 
          text-black font-semibold w-[200px] sm:w-auto
          hover:bg-lime-400"
          onClick={() => (window.location.href = "/admin/create-event")}
        >
          + Create Event
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <p className="text-center mt-10 text-lg text-gray-700">
          Loading events...
        </p>
      )}

      {/* Cards Grid */}
      {!loading && (
        <div
          className="grid gap-8 
          grid-cols-[repeat(auto-fit,minmax(260px,1fr))]
          place-items-center"
        >
          {events.map((ev, idx) => (
            <AdminEventCard
              key={ev._id}
              id={ev._id}
              title={ev.name}
              date={new Date(ev.eventDate).toLocaleDateString()}
              location={ev.venue}
              color={colors[idx % colors.length]}
              onEdit={(id) => {
                window.location.href = `/admin/events/${id}/edit`;
              }}
              onDelete={(id) => {
                console.log("DELETE", id);
                // You can implement real delete API if you want
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}