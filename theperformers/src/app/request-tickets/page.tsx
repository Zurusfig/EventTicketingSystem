"use client";
import DemoEventCard from "@/components/RequestTickets/DemoEventCard";
import getEvent from "@/libs/getEvent";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import type { DemoEventCardProps } from "@/components/RequestTickets/DemoEventCard";
import RequestCard from "@/components/RequestTickets/RequestCard";


export default function RequestPage() {
    const searchParams = useSearchParams();
    const eventId = searchParams.get('id');
    const eventName = searchParams.get('name');
    const [eventInfo, setEventInfo] = useState<DemoEventCardProps | null>(null);

    useEffect(() => {
        const fetchEvent = async () => {
            // console.log(eventId);
            const event = await getEvent(eventId as string);
            console.log("Event:", event);
            if (!event.data) {
                setEventInfo(null);
                return;
            }
            setEventInfo({
                eventData: {
                    id: event.data._id,
                    title: event.data.name,
                    date: new Date(event.data.eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                    venue: event.data.venue,
                    organizer: event.data.organizer,
                    posterPicture: event.data.posterPicture,
                    description: event.data.description,
                    availableTicket: event.data.availableTicket,
                }
            });
        };
        fetchEvent();
    }, [eventId]);

    return (
        <div className="px-10 py-10 min-h-screen w-full min-h-screen">
            {/* Title */}
            <h1 className="text-3xl font-bold mb-6 text-text-color">Request Tickets</h1>
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/3 flex-shrink-0">
                    {eventInfo && <DemoEventCard eventData={eventInfo.eventData} />}
                    {!eventInfo && <DemoEventCard eventData={null} />}
                </div>
                <div className="w-full sm:w-2/3 flex-shrink-0">
                    <RequestCard eventName={eventName || eventInfo?.eventData?.title || ''} 
                    eventId={eventId || eventInfo?.eventData?.id || ''} />
                </div>
            </div>
        </div>
    );
}