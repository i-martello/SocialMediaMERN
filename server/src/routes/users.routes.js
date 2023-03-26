import ctrlUsers from '../controllers/auth.controller.js'
import {Router} from 'express';
const router = Router();


router.post('/registro', ctrlUsers.signup)
  
router.post("/login",  ctrlUsers.singin );

router.get("/logout", ctrlUsers.logout)

router.get("/validateJWT", ctrlUsers.validateJWT)

export default router