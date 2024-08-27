import * as cloudinaryAPI from "../api/cloudinary";

// Uploads an image to Cloudinary and returns the URL of the uploaded image
export async function uploadImage(file: File, folder: string): Promise<string> {
  try {
    // console.log("service/cloudinary file: ", file);
    // console.log("service/cloudinary folder: ", folder);
    const url = await cloudinaryAPI.uploadImage(file, folder);
    return url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}
