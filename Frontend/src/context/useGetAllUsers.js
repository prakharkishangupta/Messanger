import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
// import User from './User';

function useGetAllUsers() {
    const [users, setUsers] = useState([]);
    const[loading, setLoading] = useState([]);
    useEffect(() => {
        const getUserDetails = async ()=>{
            setLoading(true);
            try {
              const token = Cookies.get("jwt");
              
              const result = await axios.get("/api/user/getUserProfile", {
                  withCredentials: true, // Ensures the JWT cookie is included in the request
                  
              });
              
              setUsers(result.data)
              setLoading(false);
              // console.log("users: ", result.data);
              
            } catch (error) {
              console.log("getUserError: ", error);
            }
          }
          getUserDetails();
    }, []);
    return{
      users,
      loading
    }
  
}

export default useGetAllUsers;
