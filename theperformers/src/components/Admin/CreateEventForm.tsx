"use client";

import { useState } from "react";

export default function CreateEventForm() {
  const [name, setName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [detail, setDetail] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  /** Handle Upload */
  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;

    const newImages = [...images];
    for (let f of files) {
      const url = URL.createObjectURL(f);
      newImages.push(url);
    }

    setImages(newImages);

    // show first newly uploaded image
    setIndex(newImages.length - files.length);
  }

  /** Delete image */
  function removeImage(i: number) {
    const updated = images.filter((_, idx) => idx !== i);
    setImages(updated);

    if (index >= updated.length) {
      setIndex(0);
    }
  }

  return (
    <div
      className="w-full bg-purple-300 p-6 sm:p-10 rounded-xl 
      shadow-lg border"
    >
      {/* GRID: LEFT FORM + RIGHT IMAGE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="md:col-span-2 space-y-4">

          {/* NAME */}
          <div>
            <label className="font-semibold">Name</label>
            <input
              className="w-full mt-1 px-4 py-2 rounded-md border"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Event Name"
            />
          </div>

          {/* DATE */}
          <div>
            <label className="font-semibold">Date</label>
            <input
              type="date"
              className="w-full mt-1 px-4 py-2 rounded-md border"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </div>

          {/* DETAILS */}
          <div>
            <label className="font-semibold">Detail</label>
            <textarea
              className="w-full mt-1 px-4 py-2 rounded-md border h-[180px]"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="Enter event details..."
            />
          </div>

        </div>

        {/* RIGHT SIDE: IMAGE SLIDER */}
        <div className="flex flex-col items-center">

          {/* IMAGE BOX */}
          <div className="relative w-full h-[180px] bg-white rounded-lg border flex items-center justify-center overflow-hidden">

            {images.length === 0 ? (
              <p className="text-gray-500 text-sm">No image selected</p>
            ) : (
              <>
                <img
                  src={images[index]}
                  className="w-full h-full object-cover rounded-lg"
                />

                {/* remove button */}
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded"
                >
                  Remove
                </button>
              </>
            )}

          </div>

          {/* DOT INDICATOR */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-3">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-3 h-3 rounded-full transition 
                  ${i === index ? "bg-black scale-110" : "bg-gray-400"}`}
                />
              ))}
            </div>
          )}

          {/* UPLOAD BUTTON */}
          <input
            type="file"
            multiple
            accept="image/*"
            id="imgUpload"
            className="hidden"
            onChange={handleImageUpload}
          />

          <label
            htmlFor="imgUpload"
            className="mt-3 px-4 py-2 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300"
          >
            Add Image
          </label>

        </div>

      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8">
        <button className="px-6 py-2 bg-lime-300 rounded-lg font-semibold">
          Create Event
        </button>
        <button className="px-6 py-2 bg-red-400 text-white rounded-lg font-semibold">
          Cancel
        </button>
      </div>
    </div>
  );
}