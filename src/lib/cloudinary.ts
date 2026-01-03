import { v2 as cloudinary } from "cloudinary";

// Validate environment variables
if (!process.env.CLOUDINARY_CLOUD_NAME) {
  throw new Error("CLOUDINARY_CLOUD_NAME is not set in environment variables");
}
if (!process.env.CLOUDINARY_API_KEY) {
  throw new Error("CLOUDINARY_API_KEY is not set in environment variables");
}
if (!process.env.CLOUDINARY_API_SECRET) {
  throw new Error("CLOUDINARY_API_SECRET is not set in environment variables");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (file: Blob): Promise<string | null> => {
  if (!file) {
    console.warn("uploadOnCloudinary: No file provided");
    return null;
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { 
          resource_type: "auto",
          folder: "snapcart", // Optional: organize uploads in a folder
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else if (result?.secure_url) {
            resolve(result.secure_url);
          } else {
            console.error("Cloudinary upload: No secure_url in result");
            reject(new Error("Upload failed: No URL returned"));
          }
        }
      );
      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error("uploadOnCloudinary error:", error);
    throw error; // Re-throw to let the caller handle it
  }
};

export default uploadOnCloudinary;
