import * as cloudinaryAPI from "../api/cloudinary";

// Uploads an image to Cloudinary and returns the URL of the uploaded image
export async function uploadImage(
  files: File[],
  folder: string
): Promise<string[]> {
  // Change return type to string[] for multiple URLs
  try {
    // Call the API function which handles multiple files
    const urls = await cloudinaryAPI.uploadImage(files, folder);
    return urls;
  } catch (error) {
    console.error("Error uploading images:", error);
    throw error;
  }
}
// Uploads an image to Cloudinary and returns the URL of the uploaded image
export async function uploadModel(file: File, folder: string): Promise<string> {
  try {
    // console.log("service/cloudinary file: ", file);
    // console.log("service/cloudinary folder: ", folder);
    const url = await cloudinaryAPI.uploadModel(file, folder);
    return url;
  } catch (error) {
    console.error("Error uploading model:", error);
    throw error;
  }
}
