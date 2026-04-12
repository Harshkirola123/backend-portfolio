import cloudinary from "../config/cloudnarry";

export const uploadToCloudinary = async (
  files: Express.Multer.File[],
  folder: string = "projects",
): Promise<string[]> => {
  if (!files || files.length === 0) return [];

  const uploadPromises = files.map((file) =>
    cloudinary.uploader.upload(file.path, {
      folder,
    }),
  );

  const uploadedImages = await Promise.all(uploadPromises);

  return uploadedImages.map((img) => img.secure_url);
};
