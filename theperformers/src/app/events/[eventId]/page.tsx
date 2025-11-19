import { Calendar, MapPin, User, Ticket } from "lucide-react";
import ImageSlider from "@/components/ImageDisplay/ImageSilder";
import getEvent from "@/libs/getEvent";
import Link from "next/link";
import ScrollDisabler from "@/components/ScrollDisabler";
export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  // const e = (await getEvent(params.id)).data;
  const { eventId } = await params;
  const event = (await getEvent(eventId)).data;

  // console.log(event);


  return (
    <ScrollDisabler breakpoint={1050}>
    <div className="px-10 py-10 min-h-screen w-full min-h-screen">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-text-color">{event.name}</h1>

      {/* Main Container */}
      <div className="bg-bg-alternate-color p-6 rounded-xl shadow-lg flex flex-col lg:flex-row gap-6">

        {/* Poster */}
        <div className="flex-1 h-[60%] lg:h-full">
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
        <div className="min-h-[300px] flex-1 space-y-3 text-text-alternate-color text-lg md:text-xl lg:text-2xl">

          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <span>{new Date(event.eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
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
          <p className="text-text-alternate-color mt-4 leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>

      {/* Request Ticket Button */}
      <Link href={`/request-tickets?id=${eventId}&name=${event.name}`}>
        <div className="flex justify-center items-center m-8">
          {event.availableTicket > 0 ? <button className="cursor-pointer bg-lime-color hover:bg-lime-color/90 hover:scale-105 transition text-navy-color font-semibold px-10 py-3 rounded-full shadow-md text-lg md:text-xl lg:text-2xl xl:text-3xl transition-all duration-100">
            Request Ticket
          </button> : <button className="cursor-not-allowed bg-lime-color/70 text-navy-color/70 font-semibold px-10 py-3 rounded-full shadow-md text-lg md:text-xl lg:text-2xl xl:text-3xl transition-all duration-100">
            Event Sold Out
          </button>}
        </div>
      </Link>
    </div>
    </ScrollDisabler>
  );
}