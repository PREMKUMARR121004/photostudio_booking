import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useAuth from '../Context/useAuth'
function Portfolio() {
    const[portfolio,setPortfolio]=useState([])
    const[edit,setEdit]=useState("")
    const[title,setTitle]=useState("")
    const[description,setDescription]=useState("")
    const[image,setImage]=useState("")
    const {token}=useAuth()
 async function fetchedPortfolio(){
    try{

   
    const response=await axios.get('http://localhost:5000/api/admin/getportfolio',{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })  
    console.log(response.data)
    setPortfolio(response.data.data)
 }
 catch(error){
    console.log(error.message);
    
 }
 }
 useEffect(()=>{
    if(token){

    fetchedPortfolio()
    }
 },[token])

 async function handleDelete(id){
    try{
   await axios.delete(`http://localhost:5000/api/admin/deleteportfolio/${id}`,{
    headers:{
        Authorization:`Bearer ${token}`
    }
   })
    setPortfolio((preportfolio)=>
        preportfolio.filter((d)=>d._id!==id)
    )}
    catch(error){
        console.log(error.message)
    }

 }
function handleEdit(data){
    setEdit(data)
    setTitle(data.title)
    setDescription(data.description)
    setImage(data.image)

 }
 async function handleUpdate(event,id){
    event.preventDefault()
    const updatedPortfolio={
        title,
        description,
        image
    }
    try{

    
   await axios.put(`http://localhost:5000/api/admin/updateportfolio/${id}`,updatedPortfolio,{
        headers:{
            Authorization:`Bearer ${token}`
        }

    }) 
        setEdit(null)
        setTitle("")
        setDescription("")
        setImage("")
        await fetchedPortfolio()
    
      } catch(error){
        console.log(error.message)
        
      }
      
 }
 
  return (
    <div>
        {portfolio.map((data)=>(
            <div key={data._id}>
            <div>{data.title}</div>
            <div>{data.description}</div>
            <div>{data.image}</div>
            <button className='border-2 bg-blue-500' onClick={()=>handleDelete(data._id)}>Delete</button>
            <button className='border-2 bg-blue-500' onClick={()=>handleEdit(data)}>Edit</button>
            </div>
        ))
        }
        {edit && (
            <div>
            <form onSubmit={(event)=>{handleUpdate(event,edit._id)}}>
            <label>Title</label>
            <input type='text'value={title} onChange={(event)=>{setTitle(event.target.value)}}></input>
            <label>Description</label>
            <input type='text'value={description} onChange={(event)=>{setDescription(event.target.value)}}></input>
            <label>Image</label>
            <input type='text'value={image} onChange={(event)=>{setImage(event.target.value)}}></input>
             <button type='submit' className='border-2 bg-blue-500'>Edit</button>
            </form>
            </div>
        )}
    </div>
  )
}

export default Portfolio