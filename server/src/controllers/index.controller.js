import modelImage from '../models/images.js';
  
  let ctrl = {}  
  
  ctrl.index = async (req, res)=>{
  const images = await modelImage.find().sort({createdAt: -1})
  res.json(images)
  }

  ctrl.details = async (req,res)=>{
    const user = global.verifySession;
    const oneImage = await modelImage.findOne({cloud_id: req.params.id}) 
    res.json({oneImage, user})
  }

export default ctrl;