import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        minlength:3,
        maxlength:30,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        minlength:8,
        required:true
    },
    role:{
        type:String,
        enum:["customer","admin"],
        default:"customer"
       

    }

})

const User=mongoose.model('User',userSchema)

export default User