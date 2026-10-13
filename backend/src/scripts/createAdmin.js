import User from "../model/User.js";
import bcrypt from 'bcrypt'
import connectDB from "../config/db.js";
import dotenv from 'dotenv'

dotenv.config()
if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
  console.error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env')
  process.exit(1)
}
await connectDB()
const adminExists=await User.exists({role:"admin"})
if(adminExists){
    console.log("admin already exist");
    process.exit()
    
}

    const name="Murugan"
    const email=process.env.ADMIN_EMAIL
    const password=process.env.ADMIN_PASSWORD
    const hashedPassword=await bcrypt.hash(password,10)
    const role="admin"
     const adminRegistered=await User.create({
        name,
        email,
        password:hashedPassword,
        role

     })
     console.log("admin created successfully");
     process.exit()

