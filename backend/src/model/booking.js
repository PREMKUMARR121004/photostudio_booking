import mongoose from "mongoose";


const bookingSchema=new mongoose.Schema({
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
         required:true
    },
    service:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Service",
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    time:{
       type:String,
       required:true 
    },
    status:{
        type:String,
        enum:["pending","rejected","accepted"],
        default:"pending"
    }

})


const Booking=mongoose.model("Booking",bookingSchema)


export default Booking