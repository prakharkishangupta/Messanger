import React from "react";
import "./index.css";
import Right from "./home/right/right";
import Left from "./home/left/left";
import Logout from "./home/logout/Logout";
import Signup from "./components/signup";
import Login from "./components/login";
import { useAuth } from "./context/AuthProvider";
import { Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  const [authUser, setAuthUser] = useAuth();
  if(authUser){
    console.log("authUser : ", authUser.user.userName);
  }
  
  return (
    <Routes>
      <Route
        path="/"
        element={
          authUser ? (
            <div className="flex">
              <Logout />
              <Left />
              <Right />
            </div>
          ) : (
            <Navigate to={"/login"} />
          )
        }
      />

      <Route
        path="/login"
        element={authUser ? <Navigate to={"/"} /> : <Login />}
      />

      <Route
        path="/signup"
        element={authUser ? <Navigate to={"/"} />:<Signup />  }
      />
    </Routes>
  );
};

export default App;
