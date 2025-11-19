"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const CLOUD_NAME = "dkhggwcub";
const UPLOAD_PRESET = "unsigned_preset";

type EventData = {
  _id: string;
  name: string;
  description: string;
  eventDate: string;
  venue: string;
  organizer: string;
  availableTicket: number;
  posterPicture?: string;
};

export default function EditEventForm({ eventId }: { eventId: string }) {
  const { data: session } = useSession();

  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);

  // Form States
  const [name, setName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [availableTicket, setAvailableTicket] = useState<number | "">("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // ------------------------------------------------------
  // Fetch event details
  // ------------------------------------------------------
  async function loadEvent() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/events/${eventId}`
      );
      const json = await res.json();

      if (json.success) {
        const ev = json.data;
        setEvent(ev);

        // Pre-fill form
        setName(ev.name);
        setEventDate(ev.eventDate.slice(0, 10)); // yyyy-MM-dd
        setDescription(ev.description);
        setVenue(ev.venue);
        setOrganizer(ev.organizer);
        setAvailableTicket(ev.availableTicket);
        setImageUrl(ev.posterPicture || null);
      }
    } catch (e) {
      console.error("Error loading event:", e);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadEvent();
  }, []);

  // ------------------------------------------------------
  // Upload new image to Cloudinary
  // ------------------------------------------------------
  async function uploadToCloudinary(file: File) {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();

      if (data.secure_url) {
        setImageUrl(data.secure_url);
      } else {
        alert("Image upload failed");
      }
    } catch (err) {
      alert("Cloudinary upload error");
    } finally {
      setUploading(false);
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    uploadToCloudinary(file);
  }

  // ------------------------------------------------------
  // Submit update
  // ------------------------------------------------------
  async function handleSubmit() {
    const token = session?.user?.token;
    if (!token) return alert("Please login again");

    if (!name || !eventDate || !venue || !organizer) {
      return alert("Please fill all required fields");
    }

    const body = {
      name,
      description,
      eventDate,
      venue,
      organizer,
      availableTicket: Number(availableTicket) || 0,
      posterPicture: imageUrl,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/events/${eventId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      const json = await res.json();
      console.log("UPDATE RESPONSE:", json);

      if (!res.ok) {
        alert(json.message || "Failed to update event");
        return;
      }

      alert("Event updated successfully!");
      window.location.href = "/admin";
    } catch (err) {
      alert("Server error");
    }
  }

  if (loading) return <p className="p-10 text-center">Loading event…</p>;

  return (
    <div className="w-full bg-purple-300 p-6 sm:p-10 rounded-xl shadow-lg border">


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT SIDE */}
        <div className="md:col-span-2 space-y-4">

          <div>
            <label className="font-semibold">Name *</label>
            <input
              className="w-full mt-1 px-4 py-2 rounded-md border"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">Date *</label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">Venue *</label>
            <input
              className="w-full mt-1 px-4 py-2 rounded-md border"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">Organizer *</label>
            <input
              className="w-full mt-1 px-4 py-2 rounded-md border"
              value={organizer}
              onChange={(e) => setOrganizer(e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">Available Tickets</label>
            <input
              type="number"
              className="w-full mt-1 px-4 py-2 rounded-md border"
              value={availableTicket}
              onChange={(e) =>
                setAvailableTicket(e.target.value === "" ? "" : Number(e.target.value))
              }
            />
          </div>

          <div>
            <label className="font-semibold">Description</label>
            <textarea
              className="w-full mt-1 px-4 py-2 rounded-md border h-[180px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="flex flex-col items-center">

          <div className="relative w-full h-[180px] bg-white rounded-lg border flex items-center justify-center overflow-hidden">
            {!imageUrl ? (
              <p className="text-gray-500 text-sm">No image uploaded</p>
            ) : (
              <img src={imageUrl} className="w-full h-full object-cover" />
            )}
          </div>

          <input
            type="file"
            id="imgUpload"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

          {!imageUrl ? (
            <label
              htmlFor="imgUpload"
              className={`mt-3 px-4 py-2 bg-gray-200 rounded-md cursor-pointer ${
                uploading ? "opacity-50 pointer-events-none" : "hover:bg-gray-300"
              }`}
            >
              {uploading ? "Uploading..." : "Upload Image"}
            </label>
          ) : (
            <button
              onClick={() => {
                setImageUrl(null);
                setImageFile(null);
              }}
              className="mt-3 px-4 py-2 bg-red-400 text-white rounded-md hover:bg-red-500"
            >
              Delete Image
            </button>
          )}
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={handleSubmit}
          disabled={uploading}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold"
        >
          Save Changes
        </button>

        <button
          onClick={() => (window.location.href = "/admin")}
          className="px-6 py-2 bg-red-400 text-white rounded-lg font-semibold"
        >
          Cancel
        </button>
      </div>

    </div>
  );
}