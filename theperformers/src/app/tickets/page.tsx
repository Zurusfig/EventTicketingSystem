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
            const respone = await getUserTickets(session?.user?.token || '');
            setTickets(respone.data);
            console.log("Tickets:", respone.data);
        } catch (error: any) {
            setError(error.message);
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