import mongoose from "mongoose";

const serviceSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        enum:["Wedding","Birthday","Portrait","Function"]
       
    },
    description:{
        type:String,
        required:true
    },
   price:{
    type:Number,
    min:5000,
    required:true
   },
  
},{
    timestamps:true
})

const Service=mongoose.model("Service",serviceSchema)


export default Service