import React from 'react'
import { createContext ,useState} from 'react'
import axios from 'axios'

   export const Authcontext =createContext()
  
   function AuthProvider({children}){
    const [token,setToken] =useState(localStorage.getItem("token"))
    const [role,setRole] =useState(localStorage.getItem("role"))
 
async function login(email, password) {
  const user = {
    email,
    password
  }

 const response = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/auth/login`,
  user
)

  localStorage.setItem('token', response.data.token)
  localStorage.setItem('role', response.data.role)

  setToken(response.data.token)
  setRole(response.data.role)

  return response.data
}
    function logout(){
        localStorage.removeItem("token")
         localStorage.removeItem("role")
         setToken("")
         setRole("")
         
    }
    return(
        <Authcontext.Provider value={{
            token,role,setRole,setToken,login,logout
        }}>

            {children}
        </Authcontext.Provider>
    )

   }
export default AuthProvider
