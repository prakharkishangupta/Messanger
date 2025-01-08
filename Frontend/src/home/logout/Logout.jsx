import React from 'react';
import { TbLogout2 } from "react-icons/tb";
import { useAuth } from "../../context/AuthProvider";
import axios from 'axios';

export default function Logout() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  const handleLogout = async ()=>{
    try {
      
      await axios.get("/api/user/logout", {
          withCredentials: true, // Ensures the JWT cookie is included in the request
      });
      setAuthUser(null)
      localStorage.removeItem('messanger')
      alert("You have been logged out successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to logout, try again later!");
    }
    
  }
  return (
    <>
        <div className="w-[4%]  bg-slate-950 text-white flex flex-col justify-end">
            <div className='p-3 align-bottom'>
                <button onClick={handleLogout}>
                    <TbLogout2 className=' text-5xl text-align-center px-3 hover:bg-gray-600  rounded-lg duration-300 ' />
                </button>
            </div>
            
        </div>
    </>
  );
}
