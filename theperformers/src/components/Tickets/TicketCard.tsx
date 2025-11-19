import { Calendar, MapPin, Ticket } from "lucide-react";
import Link from "next/link";

export interface Ticket {
    _id: string;
    event: Event;
    ticketAmount: number;
    createdAt: string;
    updatedAt: string;
}

interface Event {
    _id: string;
    name: string;
    description: string;
    eventDate: string;
    venue: string;
}

export default function TicketCard({ ticket,color }: { ticket: Ticket, color: string }) {
    return (
        <div className={`${color} rounded-xl p-6 shadow-md w-full`}>
                <div className="flex flex-col sm:flex-row gap-2 sm:justify-between justify-center items-center text-bold">           
                    <div className="flex flex-col gap-2 items-center sm:items-start mr-4">
                        <div className="text-2xl font-black text-navy-color hover:text-navy-color/80 cursor-pointer text-center sm:text-left">
                            <Link href={`/events/${ticket.event._id}`}>
                                {ticket.event.name}
                            </Link>
                        </div>
                        <div className="text-sm text-navy-color flex flex-row gap-2 text-center sm:text-left">
                            {ticket.event.description}
                        </div>
                        <div className="text-sm text-navy-color flex flex-row gap-2 text-center sm:text-left">
                            <Calendar size={16} />
                            Event Date: {new Date(ticket.event.eventDate).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-navy-color flex flex-row gap-2 text-center sm:text-left">
                            <MapPin size={16}/>
                            {ticket.event.venue}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 items-center sm:items-end mt-4 sm:mt-0">
                        <div className="flex flex-col gap-2 items-center sm:items-end">
                            <div className="text-sm text-navy-color flex flex-row gap-2 text-center sm:text-right text-nowrap">
                                <Ticket size={16} />
                                {ticket.ticketAmount} / 5 tickets requested
                            </div>
                            <div className="text-sm text-navy-color flex flex-row gap-2 text-center sm:text-right">
                                {/* <Calendar size={16} /> */}
                                Date Requested: {new Date(ticket.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                        <Link href={``}>
                            <button className="bg-red-400 text-white px-6 py-2 rounded-full hover:scale-105 hover:bg-red-500 transition-all duration-300 cursor-pointer">
                                <p className="text-sm text-center sm:text-left">Edit / Remove </p>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
    )
}

