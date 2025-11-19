"use client";
import { NumberField } from '@base-ui-components/react/number-field';
import { MinusIcon, PlusIcon, ArrowLeft } from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';
import updateTicketRequest from '@/libs/updateTicketRequest';
import deleteTicketRequest from '@/libs/deleteTicketRequest';
import { authOptions } from '@/app/api/auth/authOptions';
import { getServerSession } from 'next-auth';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import getTicket from '@/libs/getTicket';
import { Ticket } from '../Tickets/TicketCard';
import Link from 'next/link';

export default function EditRequestCard({ ticketId }: { ticketId: string | null }) {
    const id = React.useId();
    const [ticketAmount, setTicketAmount] = useState<number>(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingTicket, setIsLoadingTicket] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();
    const { data: session } = useSession();
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [eventName, setEventName] = useState<string | null>(null);
    const [eventDescription, setEventDescription] = useState<string | null>(null);

    // console.log("Ticket ID:", ticketId);

    const fetchTicket = async () => {
        if (!ticketId) {
            setError("Ticket ID is required");
            setIsLoadingTicket(false);
            return;
        }
        
        if (!session?.user?.token) {
            router.push('/login');
            setIsLoadingTicket(false);
            return;
        }

        setIsLoadingTicket(true);
        try {
            const ticketData = await getTicket(ticketId, session.user.token);
            // console.log("Ticket:", ticketData);
            setTicket(ticketData);
            setTicketAmount(ticketData.ticketAmount || 1);

            // console.log("Ticket Data: ", ticketData);
            //console.log("Event Name: ", ticketData.data.event.name);
            setEventName(ticketData.data.event.name);
            // console.log("Event Description: ", ticketData.data.event.description);
            setEventDescription(ticketData.data.event.description);
        } catch (error: any) {
            setError(error.message);
            console.error("Ticket fetch error:", error.message);
        } finally {
            setIsLoadingTicket(false);
        }
    }

    useEffect(() => {
        if (session?.user?.token) {
            fetchTicket();
        }
    }, [ticketId, session?.user?.token]);

    const handleEditRequest = async () => {

        if (!ticketId) {
            setError("Ticket ID is required");
            return;
        }

        if (!session?.user?.token) {
            router.push('/login');
            return;
        }

        setIsLoading(true);
        setError(null);
        setSuccess(false);

        // console.log("Event ID:", eventId);
        // console.log("Event Name:", eventName);
        // console.log("Ticket Amount:", ticketAmount);
        // console.log("Token:", session?.user?.token);

        // console.log("Creating ticket request for event:", eventId);
        
        try {
            const ticketRequest = await updateTicketRequest(ticketId, ticketAmount, session.user.token);
            //console.log("Ticket Request updated:", ticketRequest);
            //console.log("Ticket Request updated status:", ticketRequest.status);
            if (ticketRequest.success) {
                setSuccess(true);
                router.push('/tickets');
            } else {
                setError(ticketRequest.message);
                console.error("Ticket Request updated error:", ticketRequest.message);
            }
        } catch (error: any) {
            setError(error.message);
            console.error("Ticket Request updated error:", error.message);
        } finally {
            setIsLoading(false);
        }
    }

    const handleDeleteRequest = async () => {
        if (!ticketId) {
            setError("Ticket ID is required");
            return;
        }
        
        if (!session?.user?.token) {
            router.push('/login');
            return;
        }

        setIsLoading(true);
        setError(null);
        setSuccess(false);
        
        try {
            const ticketRequest = await deleteTicketRequest(ticketId, session.user.token);
            console.log("Ticket Request deleted:", ticketRequest);
            console.log("Ticket Request deleted status:", ticketRequest.status);
            if (ticketRequest.success) {
                setSuccess(true);
                router.push('/tickets');
            } else {
                setError(ticketRequest.message);
                console.error("Ticket Request deleted error:", ticketRequest.message);
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoadingTicket) {
        return (
            <div className="flex flex-col justify-evenly items-center bg-lime-color rounded-2xl shadow-md p-4 h-[400px] md:h-[500px] w-full">
                <div className="text-2xl font-bold text-center text-navy-color">Loading...</div>
            </div>
        );
    }

        return (
        <>
        <div className="relative flex flex-col justify-evenly items-center bg-lime-color rounded-2xl shadow-md p-4 h-[400px] md:h-[500px] w-full">
                <Link href="/tickets" className="absolute top-4 right-4">
                    <button 
                        className="cursor-pointer p-2 text-navy-color hover:bg-navy-color/10 rounded-full transition-colors"
                        aria-label="Go back"
                    >
                        <ArrowLeft size={24} />
                    </button>
                </Link>
                <div>
                    <div className="text-sm sm:text-sm md:text-lg text-center text-navy-color">Ticket For</div>
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center text-navy-color">{eventName}</div>
                    <div className="text-md sm:text-lg md:text-xl text-center text-navy-color">{eventDescription}</div>
                </div>
                <NumberField.Root 
                    id={id} 
                    value={ticketAmount}
                    onValueChange={(e) => {
                        const newValue = Number(e) || 1;  // Ensure value is never undefined
                        setTicketAmount(Math.min(5, Math.max(1, newValue)));  // Clamp between 1-5
                    }}
                    min={1} 
                    max={5} 
                    className="flex flex-col items-start gap-1"
                >
                    <NumberField.ScrubArea className="cursor-ew-resize">
                        <label htmlFor={id} className="cursor-ew-resize font-medium text-navy-color text-base md:text-lg lg:text-xl xl:text-2xl">
                            Ticket Amount (1-5)
                        </label>
                        <NumberField.ScrubAreaCursor className="filter">
                        </NumberField.ScrubAreaCursor>
                    </NumberField.ScrubArea>

                    <NumberField.Group className="flex">
                        <NumberField.Decrement 
                        className="cursor-pointer flex size-10 md:size-12 lg:size-14 xl:size-16 items-center justify-center rounded-tl-md rounded-bl-md bg-navy-color bg-clip-padding text-white select-none hover:bg-navy-color/90 active:bg-navy-color/90">
                            <MinusIcon className="text-white" />
                        </NumberField.Decrement>
                        <NumberField.Input 
                        className="bg-white h-10 md:h-12 lg:h-14 xl:h-16 w-32 md:w-40 lg:w-48 xl:w-60 border-t border-b border-gray-200 text-center text-lg md:text-xl lg:text-2xl xl:text-3xl text-navy-color tabular-nums focus:outline-none" 
                        />
                        <NumberField.Increment 
                        className="cursor-pointer flex size-10 md:size-12 lg:size-14 xl:size-16 items-center justify-center rounded-tr-md rounded-br-md bg-navy-color bg-clip-padding text-white select-none hover:bg-navy-color/90 active:bg-navy-color/90">
                            <PlusIcon className="text-white" />
                        </NumberField.Increment>
                    </NumberField.Group>
                </NumberField.Root>
                {error && (
                    <div className="text-red-600 text-sm font-semibold text-center">
                        {error}
                    </div>
                )}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button onClick={handleEditRequest} 
                    disabled={isLoading || ticketAmount < 1 || ticketAmount > 5}
                    className={`cursor-pointer bg-navy-color hover:scale-105 transition text-white font-semibold px-10 py-2 rounded-full shadow-md text-lg md:text-xl lg:text-2xl xl:text-3xl transition-all duration-100 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        {isLoading ? 'Processing...' : 'Edit Request'}
                    </button>
                    <button onClick={handleDeleteRequest} 
                    disabled={isLoading}
                    className={`cursor-pointer bg-red-400 hover:bg-red-500 hover:scale-105 transition text-white font-semibold px-10 py-2 rounded-full shadow-md text-lg md:text-xl lg:text-2xl xl:text-3xl transition-all duration-100 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        {isLoading ? 'Processing...' : 'Delete Request'}
                    </button>
                </div>    
            </div>
        </>
    );
}