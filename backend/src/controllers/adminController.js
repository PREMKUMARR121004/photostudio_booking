import User from "../model/User.js"
export const getDashboard=async(req,res,next)=>{
    try{
         const admin =await User.findById(req.user.userId)
    if(!admin){
        return res.status(400).json("Not found")
    }
     return res.status(200).json({
        name:admin.name,
        role:admin.role
    })

    }
    catch(error){
        next(error)
    }
   

   
   
}