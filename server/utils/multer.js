import multer from "multer";

import path from 'path';

export default multer({

  storage: multer.diskStorage({}),

  fileFilter: (req,file, cb)=>{
  
    let ext = path.extname(file.originalname)

    if(ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".png" && ext !== ".gif"){

      cb(
        new Error(
          "Que intentas subir mogolico?"
        ), false);
      return;
    }
    cb(null, true)
  }
})