"use client";
import DemoEventCard from "@/components/RequestTickets/DemoEventCard";
import getEvent from "@/libs/getEvent";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

import type { DemoEventCardProps } from "@/components/RequestTickets/DemoEventCard";

export default function RequestPage() {
    const searchParams = useSearchParams();
    const eventId = searchParams.get('id');
    const [eventInfo, setEventInfo] = useState<DemoEventCardProps | null>(null);
    useEffect(() => {
        const fetchEvent = async () => {
            const event = await getEvent(eventId as string);
            if (!event.data) {
                setEventInfo(null);
                return;
            }
            setEventInfo({
                eventData: {
                    id: event.data._id,
                    title: event.data.name,
                    date: event.data.eventDate,
                    venue: event.data.venue,
                    organizer: event.data.organizer,
                }
            });
        };
        fetchEvent();
    }, [eventId]);

    return (
        <div className="px-10 py-10 min-h-screen w-full min-h-screen">
            {/* Title */}
            <h1 className="text-3xl font-bold mb-6 text-text-color">Request Tickets</h1>
            {eventInfo && <DemoEventCard eventData={eventInfo.eventData} />}
            {!eventInfo && <DemoEventCard eventData={null} />}
        </div>
    );
}