import React, { useEffect } from 'react';
import useConversation from '../stateManage/useConversation.js';
import { useSocketContext } from './socketContext.jsx';
import sound from "../assets/iAudio.mp3"

function useGetSocketMessage() {
    const {socket} = useSocketContext();
    const {messages, setMessages} = useConversation();
    useEffect(() => {
      socket.on("newMessage", (newMessage)=>{
        console.log("newMessagecheck", newMessage.newMessage);
        const notification = new Audio(sound);
        console.log("notificaton: ", notification);
        notification.play();
        
        setMessages([...messages, newMessage])
        console.log("mess", messages);
      })
      return ()=> {socket.off("newMessage")};
    }, [socket, messages, setMessages]);
  
}

export default useGetSocketMessage;
