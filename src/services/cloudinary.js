import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";

const CLOUD_NAME = "ddyoc0riz";
const UPLOAD_PRESET = "tummytracker";

async function compressImage(file) {
  return imageCompression(file, {
    maxSizeMB: 0.35,
    maxWidthOrHeight: 1200,
    useWebWorker: true,
  });
}

export async function uploadImages(files) {
  const uploads = Array.from(files).slice(0, 5);

  const imageUrls = await Promise.all(
    uploads.map(async (file) => {
      const formData = new FormData();
      const compressedFile = await compressImage(file);

      formData.append("file", compressedFile);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("public_id", uuidv4());

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Cloudinary upload failed:", data);
        throw new Error(data.error?.message || "Cloudinary upload failed");
      }

      return data.secure_url;
    })
  );

  return imageUrls.filter(Boolean);
}