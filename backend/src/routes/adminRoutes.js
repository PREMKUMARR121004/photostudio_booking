import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { getDashboard } from "../controllers/adminController.js";

const router=Router()

router.get('/admin/dashboard',authMiddleware,adminMiddleware,getDashboard)


export default router