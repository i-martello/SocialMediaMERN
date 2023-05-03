import {Router} from 'express';
import ctrlIndex from '../controllers/index.controller.js';
import upload from '../utils/multer.js';
import ctrlPosts from '../controllers/posts.controller.js'


const router = Router();


  router.get('/',ctrlIndex.index)

  router.post('/publicar',upload.single("Value"), ctrlPosts.uploaded)

  router.get('/imagenes/:id', ctrlIndex.details)

  router.delete('/imagenes/:id', ctrlPosts.Remove)

export default router
