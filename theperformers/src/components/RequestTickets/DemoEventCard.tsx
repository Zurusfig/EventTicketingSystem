"use client";

import Link from "next/link";
import { Calendar, MapPin, User } from "lucide-react";
import Image from "next/image";

export type DemoEventCardProps = {
    eventData: {
        id: string;
        title: string;
        date: string;
        venue: string;
        organizer: string;
        posterPicture?: string;
    } | null;
};

export default function DemoEventCard({
    eventData
}: DemoEventCardProps) {
    if (eventData === null) {
        return (
            <div
            className="
            bg-bg-alternate-color
            rounded-2xl shadow-md border border-gray-200
            p-4 flex flex-col gap-3
            h-[500px]
            transition hover:scale-[1.03] hover:shadow-lg cursor-pointer
            w-full
            "
            >
                <div className="w-full h-[60%] bg-surface-color rounded-md mb-4 animate-pulse" />
                <h2 className="flex items-center justify-center text-lg font-bold text-center m-2 text-text-alternate-color/60 animate-pulse">Fetching event information...</h2>
            </div>
        )
    }

    const { id, title, date, venue, organizer, posterPicture } = eventData;

    return (
        <Link href={`/events/${id}`}>
            <div
                className="
            bg-bg-alternate-color
            rounded-2xl shadow-md border border-gray-200
            p-4 flex flex-col gap-3
            h-[500px]
            transition hover:scale-[1.03] hover:shadow-lg cursor-pointer
            w-full
            "
            >
                {/* Poster / Placeholder */}
                {posterPicture && (
                    <Image
                        src={posterPicture}
                        alt={title}
                        width={280}
                        height={150}
                        className="w-full h-[60%] object-cover rounded-md mb-4"
                    />)}
                {!posterPicture && (
                    <div className="w-full h-[60%] bg-surface-color rounded-md mb-4" />
                )}

                {/* Title */}
                <h2 className="text-lg font-bold text-center mb-2 text-text-alternate-color h-[10%]">{title}</h2>

                {/* Details */}
                <div className="text-sm text-text-alternate-color space-y-1">
                    <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{date}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{venue}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <User size={16} />
                        <span>{organizer}</span>
                    </div>
                </div>

            </div>
        </Link>
    );
}