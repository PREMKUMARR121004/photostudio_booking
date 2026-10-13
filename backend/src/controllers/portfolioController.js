import Portfolio from "../model/portfolio.js";


export const addportfolio=async (req,res,next)=>{
    const{title,description,image}=req.body
    if(!title||!description||!image){
        return res.status(400).json("filll all the field")
    }
    try{
        const portfolioaddded=await Portfolio.create({
            title,
            description,
            image
        })
        return res.status(201).json(portfolioaddded)
    }catch(error){
        next(error)
    }
}

export const getPortfolio=async(req,res,next)=>{
    try{
        const fetchedPortfolio= await Portfolio.find()
        if(!fetchedPortfolio){
            return res.status(400).json({
                message:"Not Found"
            })

        }
        return res.status(200).json({
            data:fetchedPortfolio

        })
    }catch(error){
        next(error)
    }
}

export const deleteportfolio =async(req,res,next)=>{
    try{
        const portfoliodeleted=await Portfolio.findByIdAndDelete(req.params.id)
        if(!portfoliodeleted){
            return res.status(404).json({
                message:"Not Found"
            })
        }
    return res.status(200).json("Portfolio deleted")
    }
    catch(error){
        next(error)
    }
}

export const updateportfolio=async(req,res,next)=>{
    const {title,description,image}=req.body
    try{
        if(!title||!description||!image){
            return res.status(400).json("fill all field")
        }
        const updatedPortfolio=await Portfolio.findByIdAndUpdate(req.params.id,{title,description,image},{  returnDocument: 'after' ,runValidators:true})
        if(!updatedPortfolio){
            return res.status(400).json("not found")
        }
        return res.status(200).json(updatedPortfolio)
    }
    catch(error){
        next(error)
    }
}

// export const publicPortfolio=async(req,res,next)=>{
//     try{
//         const publicview=await Portfolio.find()
//         return res.status(200).json() 
//     }
// }