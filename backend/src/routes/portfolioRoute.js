import {Router} from 'express'
import { addportfolio,getPortfolio,deleteportfolio, updateportfolio} from '../controllers/portfolioController.js'
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router =Router()

router.post('/admin/addportfolio',authMiddleware,adminMiddleware,addportfolio)
router.get('/admin/getportfolio',authMiddleware,adminMiddleware,getPortfolio)
router.delete('/admin/deleteportfolio/:id',authMiddleware,adminMiddleware,deleteportfolio)
router.put('/admin/updateportfolio/:id',authMiddleware,adminMiddleware, updateportfolio)
// router.get('/portfolio',)
export default router