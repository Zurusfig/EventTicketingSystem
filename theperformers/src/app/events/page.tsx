import EventCard from "@/components/UpcomingEvent/EventCard";
import getEvents from "@/libs/getEvents";

type Event = {
  _id: string;
  name: string;
  description: string;
  eventDate: string;
  venue: string;
  organizer: string;
  availableTicket: number;
  posterPicture?: string;
};

// MOCK EVENTS (fallback when API not working)
const mockEvents: Event[] = [
  {
    _id: "1",
    name: "Football Tryout",
    description:
      "Showcase your football skills and join the university team tryouts.",
    eventDate: "2025-12-15",
    venue: "CU Sports Complex",
    organizer: "CU Sports Club",
    availableTicket: 500,
  },
  {
    _id: "2",
    name: "Drama Club Audition",
    description:
      "Auditions for the upcoming university stage production. All years welcome.",
    eventDate: "2025-12-20",
    venue: "Faculty of Arts Hall",
    organizer: "CU Drama Society",
    availableTicket: 500,
  },
  {
    _id: "3",
    name: "Music Festival",
    description:
      "An evening of performances by campus bands and orchestras.",
    eventDate: "2026-01-05",
    venue: "Chula Park",
    organizer: "CU Music Club",
    availableTicket: 500,
  },
  {
    _id: "4",
    name: "Chess Tournament",
    description:
      "Test your strategy in the annual inter-faculty chess tournament.",
    eventDate: "2026-02-10",
    venue: "Engineering Building",
    organizer: "CU Board Games Club",
    availableTicket: 500,
  },
  {
    _id: "5",
    name: "Coding Bootcamp",
    description:
      "Intensive hands-on workshop covering modern web development practices.",
    eventDate: "2026-03-01",
    venue: "Tech Center Room 205",
    organizer: "CU Computer Club",
    availableTicket: 500,
  }
];

export default async function EventsPage() {

  const events = (await getEvents()).data;

  console.log(events);

  // Rotating pastel colors matching your mockup
  const colors: string[] = [
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
        {events.map((ev: Event, idx: number) => (
          <EventCard
            key={ev._id}
            id={ev._id}
            title={ev.name}
            date={new Date(ev.eventDate).toLocaleDateString()}
            location={ev.venue}
            posterPicture={ev.posterPicture || ""}
            color={colors[idx % colors.length]}
        />
      ))}
    </div>
  </div>
);
}