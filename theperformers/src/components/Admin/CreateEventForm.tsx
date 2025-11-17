"use client";

import { useState } from "react";

export default function CreateEventForm() {
  const [name, setName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [availableTicket, setAvailableTicket] = useState<number | "">("");

  const [images, setImages] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  /** Upload multiple images */
  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;

    const arr = [...images];
    for (let file of files) {
      arr.push(URL.createObjectURL(file));
    }
    setImages(arr);
  }

  /** Remove a specific image */
  function removeImage(i: number) {
    const updated = images.filter((_, idx) => idx !== i);
    setImages(updated);

    if (index >= updated.length) setIndex(0);
  }

  /** Submit event to backend */
  async function handleSubmit() {
    if (!name || !eventDate || !venue || !organizer) {
      alert("Please fill all required fields!");
      return;
    }

    const body = {
      name,
      description,
      eventDate,
      venue,
      organizer,
      availableTicket: Number(availableTicket) || 0,
      posterPicture: images, // matches backend
    };

    try {
      const token = localStorage.getItem("token"); // MUST be admin token

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // REQUIRED BY BACKEND
          },
          body: JSON.stringify(body),
        }
      );

      const json = await res.json();

      if (!res.ok) {
        alert(json.message || "Failed to create event.");
        return;
      }

      alert("Event created successfully!");
      window.location.href = "/admin/manage-events";

    } catch (err) {
      alert("Server error");
    }
  }

  return (
    <div className="w-full bg-purple-300 p-6 sm:p-10 rounded-xl shadow-lg border">

      {/* GRID layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT SIDE FORM */}
        <div className="md:col-span-2 space-y-4">

          {/* NAME */}
          <div>
            <label className="font-semibold">Name *</label>
            <input
              className="w-full mt-1 px-4 py-2 rounded-md border"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Event Name"
            />
          </div>

          {/* DATE */}
          <div>
            <label className="font-semibold">Date *</label>
            <input
              type="date"
              className="w-full mt-1 px-4 py-2 rounded-md border"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </div>

          {/* VENUE */}
          <div>
            <label className="font-semibold">Venue *</label>
            <input
              className="w-full mt-1 px-4 py-2 rounded-md border"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              placeholder="CU Sports Complex"
            />
          </div>

          {/* ORGANIZER */}
          <div>
            <label className="font-semibold">Organizer *</label>
            <input
              className="w-full mt-1 px-4 py-2 rounded-md border"
              value={organizer}
              onChange={(e) => setOrganizer(e.target.value)}
              placeholder="Event Organizer"
            />
          </div>

          {/* TICKETS */}
          <div>
            <label className="font-semibold">Available Tickets</label>
            <input
              type="number"
              className="w-full mt-1 px-4 py-2 rounded-md border"
              value={availableTicket}
              onChange={(e) =>
                setAvailableTicket(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              placeholder="Number of tickets"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="font-semibold">Description</label>
            <textarea
              className="w-full mt-1 px-4 py-2 rounded-md border h-[180px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter event details..."
            />
          </div>
        </div>

        {/* RIGHT SIDE IMAGE UPLOAD */}
        <div className="flex flex-col items-center">

          {/* Image preview */}
          <div className="relative w-full h-[180px] bg-white rounded-lg border flex items-center justify-center overflow-hidden">
            {images.length === 0 ? (
              <p className="text-gray-500 text-sm">No image selected</p>
            ) : (
              <>
                <img
                  src={images[index]}
                  className="w-full h-full object-cover rounded-lg"
                />

                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded"
                >
                  Remove
                </button>
              </>
            )}
          </div>

          {/* Slider dots */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-3">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-3 h-3 rounded-full ${
                    index === i ? "bg-black" : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Upload button */}
          <input
            type="file"
            id="imgUpload"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />

          <label
            htmlFor="imgUpload"
            className="mt-3 px-4 py-2 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300"
          >
            Add Images
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8">

        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-lime-300 rounded-lg font-semibold"
        >
          Create Event
        </button>

        <button className="px-6 py-2 bg-red-400 text-white rounded-lg font-semibold">
          Cancel
        </button>

      </div>

    </div>
  );
}