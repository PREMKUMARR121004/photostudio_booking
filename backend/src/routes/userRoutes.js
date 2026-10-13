import { Router } from "express";
import { getProfile, updateprofile } from "../controllers/userController.js";
import {authMiddleware} from '../middleware/authMiddleware.js'
const router =Router()

router.get('/profile',authMiddleware,getProfile)
router.patch('/updateprofile',authMiddleware,updateprofile)


export default router