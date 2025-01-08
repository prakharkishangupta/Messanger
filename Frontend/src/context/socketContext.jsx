import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider.jsx";
import io from "socket.io-client"
import PropTypes from "prop-types"; 

const socketContext = createContext();

export const useSocketContext = ()=>{
    return useContext(socketContext)
}

export const SocketProvider = ({children})=>{
    const [socket, setSocket] = useState(null);
    const[onlineUser, setOnlineUser] = useState([]);
    const [authUser]  = useAuth();
    useEffect(() => {
        if (authUser) {
            const socket = io("http://localhost:5000", {
                query: {
                    userId: authUser.user._id
                },
                
            })
            setSocket(socket)
            socket.on("getOnline", (users)=>{
                setOnlineUser(users)
                console.log("socket disconnected", socket.id);
            })
            return () => {
                socket.close(); // Cleanup on unmount
            }
        }
        else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return(
        <socketContext.Provider value={{socket, onlineUser}}>
            {children}
        </socketContext.Provider>
    )
}

SocketProvider.propTypes = {
    children: PropTypes.node.isRequired,
};