import {Router} from 'express'
import {authMiddleware} from '../middleware/authMiddleware.js'
import {adminMiddleware} from '../middleware/adminMiddleware.js'
import { adminBookingStats, allBooking, cancelbooking, createBooking, getMyBooking, updateBookingStatus } from '../controllers/bookingController.js'

const router =Router()




router.post('/addbooking',authMiddleware,createBooking)

router.get('/mybooking',authMiddleware,getMyBooking)
router.delete('/cancelbooking/:id',authMiddleware,cancelbooking)
router.get('/admin/allbooking',authMiddleware,adminMiddleware,allBooking)
router.patch('/admin/updatebooking/:id',authMiddleware,adminMiddleware,updateBookingStatus)
router.get('/admin/bookingstats',authMiddleware,adminMiddleware,adminBookingStats)
export default router