import axios from "axios";

// const BASE_URL = "http://localhost:3000/cloudinary";
// const BASE_URL = "https://jippy.home.ngrok.app/cloudinary";
const BASE_URL =
  "https://jippyhome-be-node-express-mongodb.onrender.com/cloudinary";

// Uploads an image file to Cloudinary and returns the URL of the uploaded image.
export async function uploadImage(
  files: File[],
  folder: string
): Promise<string[]> {
  console.log("api - uploadImages - files:", files);
  const formData = new FormData();
  files.forEach((file) => formData.append("image", file));
  formData.append("folder", folder);

  try {
    const response = await axios.post(`${BASE_URL}/uploadimage`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Adjust based on your API response
    return response.data.urls;
  } catch (error) {
    console.error("Error uploading images:", error);
    throw new Error("Failed to upload images.");
  }
}

// Uploads an image file to Cloudinary and returns the URL of the uploaded image.
export async function uploadModel(file: File, folder: string): Promise<string> {
  const formData = new FormData();
  formData.append("model", file);
  formData.append("folder", folder);

  try {
    // console.log("Uploading file to Cloudinary:", file);

    const response = await axios.post(`${BASE_URL}/uploadmodel`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // console.log("Cloudinary POST Response:", response);

    return response.data.url;
  } catch (error) {
    console.error("Error uploading model:", error);
    throw new Error(
      "Failed to upload model. Please check the file and try again."
    );
  }
}
