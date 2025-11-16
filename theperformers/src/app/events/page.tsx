import EventCard from "@/components/UpcomingEvent/EventCard";
import { mock } from "node:test";

type Event = {
  _id: string;
  name: string;
  eventDate: string;
  venue: string;
  posterPicture?: string;
};

// MOCK EVENTS (fallback when API not working)
const mockEvents: Event[] = [
  {
    _id: "1",
    name: "Football Tryout",
    eventDate: "2025-12-15",
    venue: "CU Sports Complex",
  },
  {
    _id: "2",
    name: "Drama Club Audition",
    eventDate: "2025-12-20",
    venue: "Faculty of Arts Hall",
  },
  {
    _id: "3",
    name: "Music Festival",
    eventDate: "2026-01-05",
    venue: "Chula Park",
  },
  {
    _id: "4",
    name: "Chess Tournament",
    eventDate: "2026-02-10",
    venue: "Engineering Building",
  },
  {
    _id: "5",
    name: "Coding Bootcamp",
    eventDate: "2026-03-01",
    venue: "Tech Center Room 205",
  }
];

// FETCH EVENTS (with failsafe)
async function fetchEvents(): Promise<Event[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/events`,
      { next: { revalidate: 10 } }
    );

    if (!res.ok) return mockEvents;

    const json = await res.json();
    if (!json.data || !Array.isArray(json.data)) return mockEvents;

    return json.data;
  } catch (err) {
    return mockEvents;
  }
}

export default async function EventsPage() {
  //const events = await fetchEvents();
  const events = mockEvents;

  // Rotating pastel colors matching your mockup
  const colors = [
    "bg-[var(--sys-accent-lime)]",
    "bg-[var(--sys-accent-blue)]",
    "bg-[var(--sys-accent-purple)]",
    "bg-[var(--sys-accent-yellow)]",
  ];

  return (
    <div className="px-4 sm:px-10 py-8 min-h-screen w-full 
  bg-gradient-to-b from-white via-[#D4D4D4] to-[#999999]
  
">
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">Upcoming Events</h1>

      <div
        className="grid gap-8 
        grid-cols-[repeat(auto-fit,minmax(260px,1fr))]
        place-items-center"
      >
        {events.map((ev, idx) => (
          <EventCard
            key={ev._id}
            id={ev._id}
            title={ev.name}
            date={new Date(ev.eventDate).toLocaleDateString()}
            location={ev.venue}
            color={colors[idx % colors.length]}
          />
        ))}
      </div>
    </div>
  );
}