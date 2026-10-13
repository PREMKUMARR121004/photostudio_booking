import Service from "../model/Service.js";

export const addService=async(req,res,next)=>{
   const {name,description,price}=req.body
 try{
    if(!name || !description || !price){
     return res.status(400).json("all field should be field")
    }
    const serivesAdded=await Service.create({
        name,
        description,
        price,
        

    })
    return res.status(201).json(serivesAdded)
 }catch(error){
    next(error)
 }
}
export const getServices=async(req,res,next)=>{
   try{
      const Servicegetted=await Service.find()
      return res.status(200).json(Servicegetted)

   }
   catch(error){
      next(error)
   }
}
export const updateservices=async(req,res,next)=>{
   const{name,description,price}=req.body
   try{
      if(!name||!description||!price){
         return res.status(400).json("all field should be filled")
      }
   const updatedServices=await Service.findByIdAndUpdate(req.params.id,{name,description,price},{new:true,runValidators: true})
   if(!updatedServices){
    return res.status(404).json("not found")
   } 
   return res.status(200).json(updatedServices)
 }catch(error){
   next(error)
 }

}

export const deleteService=async(req,res,next)=>{
  try{
   const serviceDeleted=await Service.findByIdAndDelete(req.params.id)
    if(!serviceDeleted){
      return res.status(404).json("Not found")
    }
    return res.status(200).json("Deleted sucessfully")
  }catch(error){
   next(error)
  }
}