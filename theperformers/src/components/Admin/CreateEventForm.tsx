"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

const CLOUD_NAME = "dkhggwcub";
const UPLOAD_PRESET = "unsigned_preset";

export default function CreateEventForm() {
  const { data: session } = useSession();

  const [name, setName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [availableTicket, setAvailableTicket] = useState<number | "">("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // --------------------------
  // Upload image to Cloudinary
  // --------------------------
  async function uploadToCloudinary(file: File) {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.secure_url) {
        setImageUrl(data.secure_url);
      } else {
        alert("Cloudinary upload failed");
      }
    } catch (err) {
      alert("Cloudinary upload error");
    } finally {
      setUploading(false);
    }
  }

  // --------------------------
  // Handle user selecting file
  // --------------------------
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    uploadToCloudinary(file); // upload immediately
  }

  // --------------------------
  // Submit to backend
  // --------------------------
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
      posterPicture: imageUrl, // Cloudinary URL
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      const json = await res.json();
      console.log("STATUS:", res.status, json);

      if (!res.ok) {
        alert(json.message || "Failed to create event");
        return;
      }

      alert("Event created successfully!");
      window.location.href = "/admin";
    } catch (err) {
      alert("Server error");
    }
  }

  return (
    <div className="w-full bg-lime-color p-6 sm:p-10 rounded-xl shadow-lg border text-navy-color">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4">

          <div>
            <label className="font-semibold">Name *</label>
            <input
              className="w-full mt-1 px-4 py-2 rounded-md bg-white text-navy-color"
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
              className="w-full mt-1 px-4 py-2 rounded-md border bg-white text-navy-color"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">Organizer *</label>
            <input
              className="w-full mt-1 px-4 py-2 rounded-md border bg-white text-navy-color"
              value={organizer}
              onChange={(e) => setOrganizer(e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">Available Tickets</label>
            <input
              type="number"
              className="w-full mt-1 px-4 py-2 rounded-md border bg-white text-navy-color"
              value={availableTicket}
              onChange={(e) =>
                setAvailableTicket(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
            />
          </div>

          <div>
            <label className="font-semibold">Description</label>
            <textarea
              className="w-full mt-1 px-4 py-2 rounded-md border h-[180px] bg-white text-navy-color"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        {/* RIGHT SIDE (1 image) */}
        <div className="flex flex-col items-center">
        <div className="relative w-full min-h-[250px] max-h-[300px] bg-white rounded-lg border flex items-center justify-center overflow-hidden bg-white text-navy-color">
            {!imageUrl ? (
              <p className="text-navy-color text-sm">No image uploaded</p>
            ) : (
              <img src={imageUrl} className="w-full h-full object-cover" />
            )}
          </div>

  {/* Hidden input */}
  <input
    type="file"
    id="imgUpload"
    accept="image/*"
    className="hidden"
    onChange={handleImageChange}
  />

  {/* Button switches based on whether image exists */}
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
      className="cursor-pointer mt-3 px-4 py-2 bg-red-400 text-white rounded-full hover:bg-red-500 hover:scale-105 transition"
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
          className="cursor-pointer px-6 py-2 bg-navy-color/80 hover:bg-navy-color text-white rounded-full font-semibold hover:scale-105 transition"
        >
          Create Event
        </button>

        <button
          onClick={() => (window.location.href = "/admin")}
          className="cursor-pointer px-6 py-2 bg-red-400 text-white rounded-full font-semibold hover:bg-red-500 hover:scale-105 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}