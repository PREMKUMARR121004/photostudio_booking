import User from "../model/User.js"
export const getProfile=async (req,res,next)=>{

     try{
        const userprofile=await User.findById(req.user.userId)
    if(!userprofile){
        return res.status(400).json("Not Found")

    }
    return res.status(200).json({name:userprofile.name,
            email:userprofile.email,
            role:userprofile.role
    })
    

     }catch(error){
        next(error)
     }
   

}

export const updateprofile=async(req,res,next)=>{
    if(!req.user.userId){
        return res.status(404).json("ypu are not logged in")
    }
    const {name,email}=req.body
    if(!name || !email){
        return res.status(400).json("fill the field")
    }
    try{
        const updatedProfile=await User.findByIdAndUpdate(req.user.userId,{name,email},{returnDocument:'after'})
         if(!updatedProfile){
            return res.status(404).json("not found the user")
         }
         return res.status(200).json(
            {name:updatedProfile.name,
            email:updatedProfile.email
    })
    }
    catch(error){
        next(error)
    }
}