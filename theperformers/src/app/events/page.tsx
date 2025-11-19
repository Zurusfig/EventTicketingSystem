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


export default async function EventsPage() {

  const events = (await getEvents()).data;

  // console.log(events);

  // Rotating pastel colors matching your mockup
  const colors: string[] = [
    "bg-[var(--sys-accent-lime)]",
    "bg-[var(--sys-accent-blue)]",
    "bg-[var(--sys-accent-purple)]",
    "bg-[var(--sys-accent-yellow)]",
  ];

  return (
    <div className="px-4 sm:px-10 py-8 min-h-screen w-full">
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