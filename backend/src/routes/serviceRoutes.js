import { Router } from "express";
import { addService,deleteService,getServices, updateservices } from "../controllers/serviceController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";


const router =Router()


router.post('/admin/addservice',authMiddleware,adminMiddleware,addService)
router.get('/admin/getservices',authMiddleware,adminMiddleware,getServices)
router.put('/admin/updateservices/:id',authMiddleware,adminMiddleware,updateservices)
router.delete('/admin/deleteservice/:id',authMiddleware,adminMiddleware,deleteService)
router.get('/getservices',getServices)
export default router