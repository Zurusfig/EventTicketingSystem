"use client";
import EditRequestCard from "@/components/EditRequestTickets/EditRequestCard";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function EditTicketPage() {
    const searchParams = useSearchParams();
    const ticketId = searchParams.get('ticketId');

    console.log("Ticket ID:", ticketId);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="px-10 py-10 min-h-screen w-full min-h-screen">
            {/* Title */}
            <h1 className="text-3xl font-bold mb-6 text-text-color">Request Tickets</h1>
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full flex-shrink-0">
                    <EditRequestCard ticketId={ticketId || null} /> 
                </div>
            </div>
        </div>
    );
}