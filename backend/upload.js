import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (localPath) => {
  try {
    const res = await cloudinary.uploader.upload(localPath, {
      folder: 'dev_uploads',
    });
    console.log('Uploaded ✅:', res.secure_url);
  } catch (err) {
    console.error('Error ❌:', err);
  }
};

// Replace with your local image path
uploadImage('./assets/fs1.jpg');
