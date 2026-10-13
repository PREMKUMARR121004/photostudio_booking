import express from 'express'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import serviceRoutes from './routes/serviceRoutes.js'
import portfolioRoutes from './routes/portfolioRoute.js'
import bookingRoutes from './routes/bookingRoutes.js'
import cors from 'cors'
import dotenv from 'dotenv'
const app=express()
app.use(express.json())
app.use(cors())
dotenv.config()
app.use('/api/auth',authRoutes)
app.use('/api/auth',userRoutes)
app.use('/api',adminRoutes)
app.use('/api',serviceRoutes)
app.use('/api',portfolioRoutes)
app.use('/api',bookingRoutes)

connectDB()
app.listen(5000,()=>{
    console.log("Server Running on port 5000");
    
})

