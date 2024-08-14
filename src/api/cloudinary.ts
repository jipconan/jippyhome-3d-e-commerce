const BASE_URL = "http://localhost:3000/api/cloudinary";

// Uploads an image file to Cloudinary and returns the URL of the uploaded image.
export async function uploadImage(file: File, folder: string): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("folder", folder);

  try {
    console.log("Uploading file to Cloudinary:", file);
    const response = await fetch(`${BASE_URL}/upload`, {
      method: "POST",
      body: formData,
    });
    console.log("Cloudinary POST Response:", response);

    if (!response.ok) {
      throw new Error(
        "Failed to upload image. Please check the file and try again."
      );
    }
    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}
