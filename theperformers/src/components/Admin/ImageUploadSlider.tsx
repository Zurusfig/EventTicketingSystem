"use client";

import Image from "next/image";
import { useState } from "react";

export default function ImageUploadSlider() {
  const [images, setImages] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;

    const newImgs = [...images];
    for (let file of files) {
      const url = URL.createObjectURL(file);
      newImgs.push(url);
    }
    setImages(newImgs);

    // always show first uploaded image
    setIndex(newImgs.length - files.length);
  }

  function removeImage(i: number) {
    const newImgs = images.filter((_, idx) => idx !== i);
    setImages(newImgs);
    if (index >= newImgs.length) setIndex(0);
  }

  return (
    <div className="flex flex-col items-center">

      {/* IMAGE PREVIEW BOX */}
      <div className="relative w-full h-[180px] bg-white rounded-lg border flex items-center justify-center overflow-hidden">
        {images.length === 0 ? (
          <p className="text-gray-500 text-sm">No image selected</p>
        ) : (
          <>
            <Image
              src={images[index]}
              alt="Preview"
              fill
              className="object-cover rounded-lg"
            />

            {/* Remove Button */}
            <button
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded"
            >
              Remove
            </button>
          </>
        )}
      </div>

      {/* DOT INDICATORS */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full ${
                i === index ? "bg-black" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}

      {/* Upload Button */}
      <input
        type="file"
        accept="image/*"
        multiple
        id="uploadInput"
        className="hidden"
        onChange={handleUpload}
      />

      <label
        htmlFor="uploadInput"
        className="mt-3 px-4 py-2 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300"
      >
        Add Images
      </label>
    </div>
  );
}