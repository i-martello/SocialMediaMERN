import { config } from 'dotenv';
import {v2 as cloudinary} from "cloudinary"
config()
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const options = {
  unique_filename: true
}

const uploadImage = async (image) =>{ 
  try {
    const result = await cloudinary.uploader.upload(image, options)
    return result
  } catch (error) {
    console.log(error)
  }
};

const deleteImage = async (image)=>{
  try {
    const result = cloudinary.uploader.destroy(image)
    return result
  } catch (error) {
    console.log(error)
  }
}

export {uploadImage, deleteImage}

