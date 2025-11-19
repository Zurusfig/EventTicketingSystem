"use client";

import { useEffect, useState } from "react";
import AdminEventCard from "@/components/Admin/AdminEventCard";
import { useSession } from "next-auth/react";
import deleteEvent from "@/libs/deleteEvent";

type Event = {
  _id: string;
  name: string;
  eventDate: string;
  venue: string;
  posterPicture?: string;
};

export default function AdminManageEvents() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const colors = [
    "bg-[var(--sys-accent-lime)]",
    "bg-[var(--sys-accent-blue)]",
    "bg-[var(--sys-accent-purple)]",
    "bg-[var(--sys-accent-yellow)]",
  ];

  /** Fetch events */
  async function fetchEvents() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/events`, {
        cache: "no-store",
      });

      const json = await res.json();
      setEvents(json.data || []);
    } catch (err) {
      console.error("Error fetching admin events:", err);
    }
    setLoading(false);
  }

  /** Delete event */
  async function handleDelete(id: string) {
    if (!session?.user?.token) return alert("Not logged in");

    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      await deleteEvent(id, session.user.token);
      alert("Event deleted!");
      fetchEvents();
    } catch (err: any) {
      alert(err.message);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="px-4 sm:px-10 py-8 min-h-screen w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-center sm:text-left">
          Manage Events
        </h1>

        <button
          className="cursor-pointer px-4 py-2 bg-lime-color rounded-full text-navy-color font-semibold hover:bg-lime-color/80 hover:scale-105 transition-all duration-300"
          onClick={() => (window.location.href = "/admin/create-event")}
        >
          + Create Event
        </button>
      </div>

      {loading ? (
        <p className="text-center mt-10 text-lg text-gray-700">Loading events...</p>
      ) : (
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
              date={ev.eventDate}
              location={ev.venue}
              posterPicture={ev.posterPicture}
              color={colors[idx % colors.length]}
              onEdit={(id) => {
                window.location.href = `/admin/edit/${id}`;
              }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}