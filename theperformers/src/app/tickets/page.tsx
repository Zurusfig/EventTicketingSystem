"use client";
import TicketList from "@/components/Tickets/TicketList";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Ticket } from "@/components/Tickets/TicketCard";
import getUserTickets from "@/libs/getUserTickets";

export default function TicketsPage(){
    const { data: session } = useSession();
    const router = useRouter();
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    console.log(tickets);

    useEffect(() => {
        if (!session?.user?.token) {
            router.push("/api/auth/signin");
            return;
        }
        fetchTickets();
    }, [session]);
    
    const fetchTickets = async () => {
        if (!session?.user?.token) return;

        setIsLoading(true);
        setError(null);
        try {
            const response = await getUserTickets(session?.user?.token || '');
            
            if (response && response.data) {
                // Filter out any tickets with null user or event (defensive programming)
                const validTickets = response.data.filter((ticket: Ticket) => 
                    ticket && ticket.event && ticket.event._id && ticket.user && ticket.user._id
                );
                
                setTickets(validTickets);
                console.log("Valid tickets:", validTickets);
                
                // Show warning if some tickets were filtered out
                if (validTickets.length < response.data.length) {
                    console.warn(`Filtered out ${response.data.length - validTickets.length} invalid tickets`);
                }
            } else if (response && !response.success) {
                // Backend returned error but we handled it gracefully
                setTickets([]);
                setError(response.message || "No tickets available");
            } else {
                setTickets([]);
            }
        } catch (error: any) {
            console.error("Fetch tickets error:", error);
            setError(error.message || "Failed to fetch tickets. Please try again.");
            setTickets([]);
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className="px-10 py-10 min-h-screen w-full min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-text-color">Manage Tickets</h1>
            {isLoading && <div className="flex justify-center items-center h-full text-text-color">
                Loading...
                </div>}
            {error && <div className="flex justify-center items-center h-full text-red-500">Error: {error}</div>}
            {!isLoading && !error && <TicketList tickets={tickets} />}
        </div>
    )
}