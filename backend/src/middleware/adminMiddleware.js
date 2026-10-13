

export const adminMiddleware=(req,res,next)=>{
    if(req.user.role==="admin"){
        console.log("your admin");
        
       return  next()
    }
    return res.status(403).json("Your not an admin")
}