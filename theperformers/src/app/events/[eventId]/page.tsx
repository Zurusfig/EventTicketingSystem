import { Calendar, MapPin, User, Ticket } from "lucide-react";
import ImageSlider from "@/components/ImageDisplay/ImageSilder";

// -------- MOCK FALLBACK DATA --------
const mockEvent = {
  _id: "1",
  name: "Football Tryout",
  eventDate: "2025-12-15",
  venue: "CU Sports Complex",
  organizer: "Organizer Name",
  availableTicket: 3,
  description:
    "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
  posterPicture: "",
};

// -------- FETCH REAL EVENT --------
async function fetchEvent(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/events/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) return mockEvent;

    const json = await res.json();
    return json.data || mockEvent;
  } catch {
    return mockEvent;
  }
}

export default async function EventDetailPage({
  params,
}: {
  params: { id: string };
}) {
  //const event = await fetchEvent(params.id);
  const event = mockEvent;

  return (
    <div className="px-10 py-10 min-h-screen w-full 
      bg-gradient-to-b 
      from-white 
      via-[#D4D4D4] 
      to-[#999999] min-h-screen">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">{event.name}</h1>

      {/* Main Container */}
      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col lg:flex-row gap-6">

        {/* Poster */}
        <div className="flex-1 min-w-[300px]">
        <ImageSlider
          images={
            event.posterPicture
              ? event.posterPicture.includes(",")
                ? event.posterPicture.split(",") // multiple images
                : [event.posterPicture] // single image
              : [
                  "/images/slide1.jpg",
                  "/images/slide2.jpg",
                  "/images/slide3.jpg",
                ] // fallback mock images
          }
        />
      </div>

        {/* Event Info */}
        <div className="flex-1 space-y-3 text-gray-800">

          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <span>{new Date(event.eventDate).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={18} />
            <span>{event.venue}</span>
          </div>

          <div className="flex items-center gap-2">
            <User size={18} />
            <span>{event.organizer || "Organizer"}</span>
          </div>

          <div className="flex items-center gap-2">
            <Ticket size={18} />
            <span>{event.availableTicket} Tickets Left</span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-700 mt-4 leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>

      {/* Request Ticket Button */}
      <div className="mt-8 flex justify-center">
        <button className="bg-lime-400 hover:bg-lime-500 transition text-black font-semibold px-10 py-3 rounded-full shadow-md">
          Request Ticket
        </button>
      </div>
    </div>
  );
}