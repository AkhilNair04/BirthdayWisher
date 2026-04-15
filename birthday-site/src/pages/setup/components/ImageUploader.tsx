import React, { useState } from "react";
import { uploadToCloudinary } from "../utils/cloudinary";

type Props = {
  images: string[];
  setImages: (imgs: string[]) => void;
};

const ImageUploader = ({ images, setImages }: Props) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 5) {
      alert("Max 5 images allowed.");
      return;
    }

    setUploading(true);
    try {
      const uploadPromises = files.map((file) => uploadToCloudinary(file));
      const urls = await Promise.all(uploadPromises);
      setImages([...images, ...urls]);
    } catch (err) {
      alert("Upload failed. Check your Cloudinary config.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-4 bg-white/5 p-4 rounded-2xl border border-white/10">
      <label className="text-[10px] font-bold uppercase text-pink-500 mb-2 block">
        Cloud Gallery {uploading && "(Uploading...)"}
      </label>
      
      <input 
        type="file" 
        multiple 
        accept="image/*" 
        onChange={handleFileChange}
        disabled={uploading}
        className="text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-pink-500/20 file:text-pink-400 hover:file:bg-pink-500/30 cursor-pointer"
      />

      <div className="grid grid-cols-5 gap-2 mt-4">
        {images.map((img, i) => (
          <div key={i} className="relative group aspect-square">
            <img src={img} className="w-full h-full object-cover rounded-lg border border-white/5" alt="Uploaded" />
            <button 
              onClick={() => setImages(images.filter((_, idx) => idx !== i))} 
              className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 text-[12px] flex items-center justify-center shadow-lg"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;