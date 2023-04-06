import modelImage from '../models/images.js';
import { uploadImage, deleteImage } from '../utils/cloudinary.js';

let ctrlPosts = {}

  ctrlPosts.uploaded = async (req, res)=>{
  const {title, description} = req.body
  if(!req.file){
    return res.send('Subi una foto duro')
  } 
  try { 

    const cloudinary_image = await uploadImage(req.file.path)

    const newImage = await new modelImage({
      title,
      description,
      cloud_id: cloudinary_image.public_id,
      url: cloudinary_image.secure_url      
    });
    await newImage.save()
    console.log("guardado con exito", newImage)

  } catch (error) {
    console.log(error)
  } 
    
    res.json({success: 'imagen enviada'})
  }


  ctrlPosts.Remove = async (req,res)=>{

    if( global.verifySession === modelImage.user){
    const deleteImg = await modelImage.findOneAndRemove({cloud_id: req.params.id})

    res.json(deleteImg)

    deleteImage(req.params.id)
    } else {
      res.end()    }
  }

export  default ctrlPosts