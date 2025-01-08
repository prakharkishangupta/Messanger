import React, { createContext, useContext, useState } from 'react';
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({children})=> {
    
    const initialUserState = Cookies.get("jwt") || localStorage.getItem("messanger");
    console.log("jwtToken: ",Cookies.get("jwt"));
    
    const [authUser, setAuthUser] =  useState(initialUserState? JSON.parse(initialUserState):undefined)
    console.log(authUser);
  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = ()=> useContext(AuthContext) ;
