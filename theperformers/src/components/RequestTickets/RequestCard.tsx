import { NumberField } from '@base-ui-components/react/number-field';
import { MinusIcon, PlusIcon } from 'lucide-react';
import React from 'react';

export default function RequestCard({ eventName }: { eventName: string }) {
    const id = React.useId();
    return (
        <>
        <div className="flex flex-col justify-evenly items-center bg-lime-color rounded-2xl shadow-md border border-gray-200 p-4 h-[400px] md:h-[500px] w-full">
                <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center text-navy-color m-4 mx-6">{eventName}</div>
                <NumberField.Root id={id} defaultValue={1} min={1} max={5} className="flex flex-col items-start gap-1">
                    <NumberField.ScrubArea className="cursor-ew-resize">
                        <label htmlFor={id} className="cursor-ew-resize font-medium text-navy-color text-base md:text-lg lg:text-xl xl:text-2xl">
                            Ticket Amount (1-5)
                        </label>
                        <NumberField.ScrubAreaCursor className="filter">
                        </NumberField.ScrubAreaCursor>
                    </NumberField.ScrubArea>

                    <NumberField.Group className="flex">
                        <NumberField.Decrement className="cursor-pointer flex size-10 md:size-12 lg:size-14 xl:size-16 items-center justify-center rounded-tl-md rounded-bl-md bg-navy-color bg-clip-padding text-white select-none hover:bg-navy-color/90 active:bg-navy-color/90">
                            <MinusIcon className="text-white" />
                        </NumberField.Decrement>
                        <NumberField.Input className="h-10 md:h-12 lg:h-14 xl:h-16 w-32 md:w-40 lg:w-48 xl:w-60 border-t border-b border-gray-200 text-center text-lg md:text-xl lg:text-2xl xl:text-3xl text-navy-color tabular-nums focus:outline-none" />
                        <NumberField.Increment className="cursor-pointer flex size-10 md:size-12 lg:size-14 xl:size-16 items-center justify-center rounded-tr-md rounded-br-md bg-navy-color bg-clip-padding text-white select-none hover:bg-navy-color/90 active:bg-navy-color/90">
                            <PlusIcon className="text-white" />
                        </NumberField.Increment>
                    </NumberField.Group>
                </NumberField.Root>
                <div className="flex justify-center gap-2">
                <button className="cursor-pointer bg-navy-color hover:scale-105 transition text-white font-semibold px-10 py-3 rounded-full shadow-md text-lg md:text-xl lg:text-2xl xl:text-3xl transition-all duration-100">
                    Confirm Request
                </button>
            </div>       
        </div>
        </>
    );
}