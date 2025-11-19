import { Calendar, MapPin, Ticket, UserIcon } from "lucide-react";
import Link from "next/link";
import Divider from '@mui/material/Divider';

export interface Ticket {
    _id: string;
    event: Event;
    ticketAmount: number;
    user: User;
    createdAt: string;
    updatedAt: string;
}

interface User {
    _id: string;
    name: string;
    email: string;
    tel: string;
    role: string;
}

interface Event {
    _id: string;
    name: string;
    description: string;
    eventDate: string;
    venue: string;
}

export default function TicketCard({ ticket,color }: { ticket: Ticket, color: string }) {

    if (!ticket || !ticket.event || !ticket.event._id) {
        return (
            <div className={`${color} rounded-xl p-6 shadow-md w-full`}>
                <div className="text-red-600">Invalid ticket data</div>
            </div>
        );
    }

    console.log("Ticket user name", ticket.user?.name);
    
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
                            Event Date: <span className="font-bold">{new Date(ticket.event.eventDate).toLocaleDateString()}</span>
                        </div>
                        <div className="text-sm text-navy-color flex flex-row gap-2 text-center sm:text-left">
                            <MapPin size={16}/>
                            Venue: <span className="font-bold">{ticket.event.venue}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 items-center sm:items-end mt-4 sm:mt-0">
                        <div className="w-full sm:hidden">
                            <Divider orientation="horizontal" variant="middle" flexItem />
                        </div>
                        <div className="flex flex-col gap-2 items-center sm:items-end w-full">
                            <div className="text-sm text-navy-color flex flex-row gap-2 text-center sm:text-right text-nowrap">
                                <Ticket size={16} />
                                <span className="font-bold">{ticket.ticketAmount} / 5 tickets requested</span>
                            </div>
                            <div className="text-sm text-navy-color flex flex-row gap-2 text-center sm:text-right whitespace-nowrap">
                                {/* <Calendar size={16} /> */}
                                Date Requested:
                                <span className="font-bold">{new Date(ticket.createdAt).toLocaleDateString()}</span>
                            </div>
                            {ticket.user?.name && ticket.user.name !== undefined && (
                                <div className="text-sm text-navy-color flex flex-row gap-2 text-center sm:text-right">
                                    <UserIcon size={16} />
                                    Requested by: <span className="font-bold">{ticket.user.name}</span>
                                </div>
                            )}
                        </div>
                        <Link href={`/edit-ticket?ticketId=${ticket._id}`}>
                            <button className="bg-red-400 text-white px-6 py-2 rounded-full hover:scale-105 hover:bg-red-500 transition-all duration-300 cursor-pointer">
                                <p className="text-sm text-center sm:text-left">Edit / Remove </p>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
    )
}

