import { v4 as uuidv4 } from "uuid";

const CLOUD_NAME = "ddyoc0riz";
const UPLOAD_PRESET = "tummytracker";

export async function uploadImages(files) {
  const uploads = Array.from(files).slice(0, 5);

  const imageUrls = await Promise.all(
    uploads.map(async (file) => {
      const formData = new FormData();

      formData.append("file", file);
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

      return data.secure_url;
    })
  );

  return imageUrls;
}