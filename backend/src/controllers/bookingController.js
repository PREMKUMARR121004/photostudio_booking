import Booking from "../model/booking.js";

import Service from '../model/Service.js'


export const createBooking=async(req,res,next)=>{
    if(!req.user?.userId){
        return res.status(401).json({
            message:"Register and Login first there is no user like that"
        })
    }
    const{service,date,time}=req.body
   
     
    if(!service ||!date||!time){
        return res.status(400).json("fill all the field")

    }
     const today=new Date()
    today.setHours(0,0,0,0)

    if(new Date(date)<today){
        return res.status(400).json("cannot book a past date")
    }
    try{
      
      const serviceSearch= await Service.findById(service)
      if(!serviceSearch){
        return res.status(404).json("service not available")
      }
      const existingBooking=await Booking.findOne({
        date:date,
        time:time,
        status:{$in:["pending","accepted"]}
      })
      if(existingBooking){
        return res.status(400).json("this date and time already booked by other customer")
      }
      const addedBooking=await Booking.create({
        customer:req.user.userId,
        service,
        date,
        time,
      })
     return res.status(201).json({message:"booked",
     booking:addedBooking
     })
    }catch(error){
        next(error)
    }

}

export const getMyBooking= async(req,res,next)=>{
    if(!req.user?.userId){
        return res.status(401).json("your not log in")

    }
    const customerId=req.user.userId
    try{

   
    const gotMybooking = await Booking.find({customer:customerId}).populate("service")
    if(!gotMybooking){
        return res.status(400).json("your not booked anything")
    }
    return res.status(200).json(gotMybooking)
 }
 catch(error){
    next(error)


 }


}

export const cancelbooking=async(req,res,next)=>{
    if(!req.user.userId){
        return res.status(401).json("your not logged-in")
    }
    try{
   const ToDeleteBooking=await Booking.findById(req.params.id)
   if(!ToDeleteBooking){
    return res.status(404).json("Booking Not Found")
   }
   if(ToDeleteBooking.customer.toString()!==req.user.userId.toString()){
    return res.status(403).json("your not a customer for this booking")

   }
   await Booking.findByIdAndDelete(req.params.id)
   return res.status(200).json("deleted the booking Sucessfully")
} catch(error){
    next(error)
}
}


export const allBooking=async(req,res,next)=>{
    try{
        const gotallBooking =await Booking.find().populate("service").populate("customer","-password")
        if(gotallBooking.length===0){
            return res.status(404).json("no booking available")
        }
        return res.status(200).json(gotallBooking)
    }
    catch(error){
        next(error)
    }
}

export const updateBookingStatus=async(req,res,next)=>{
    const {status}=req.body
    try{
        if(status!=="accepted" && status!=="rejected"){
                return res.status(400).json("give correct update")
        }
    const updateBooking=await Booking.findByIdAndUpdate(req.params.id,{status},{returnDocument:'after'})
    if(!updateBooking){
        return res.status(404).json("not found")
    }
    return res.status(200).json(updateBooking)
    }catch(error){
        next(error)
    }

}

export const adminBookingStats=async(req,res,next)=>{
    try{
    
      const BookingStats=await Booking.aggregate([
        {

       
        $facet:{
            total:[{
                $count:"count"
            }],
           status:[
            {
                $group:{
                    _id:"$status",
                    count:{$sum:1}
                }
            }
           ]


        }
         }
      ])
      return res.status(200).json(BookingStats)
    }catch(error){
        next(error)
    }
}
