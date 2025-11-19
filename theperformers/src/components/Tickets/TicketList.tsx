import { Ticket } from "./TicketCard"
import TicketCard from "./TicketCard"

export default function TicketList({ tickets }: { tickets: Ticket[] }) {
    
    const colors: string[] = [
        "bg-lime-color",
        "bg-blue-color",
        "bg-purple-color",
        "bg-yellow-color",
    ];
    
    return (
        <div>
            <div className="flex flex-col gap-4 w-full">
                {tickets.map((ticket: Ticket, idx: number) => (
                    <TicketCard key={ticket._id} ticket={ticket} color={colors[idx % colors.length]} />
                ))}
            </div>
        </div>
    )
}