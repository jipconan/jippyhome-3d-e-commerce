import axios from "axios";

// const BASE_URL = "http://localhost:3000/api/cloudinary";
// const BASE_URL =
//   "https://jippyhome-be-node-express-mongodb.onrender.com/api/cloudinary";
const BASE_URL = "https://jippy.home.ngrok.app/api/cloudinary";

// Uploads an image file to Cloudinary and returns the URL of the uploaded image.
export async function uploadImage(file: File, folder: string): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("folder", folder);

  try {
    // console.log("Uploading file to Cloudinary:", file);

    const response = await axios.post(`${BASE_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // console.log("Cloudinary POST Response:", response);

    return response.data.url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error(
      "Failed to upload image. Please check the file and try again."
    );
  }
}
