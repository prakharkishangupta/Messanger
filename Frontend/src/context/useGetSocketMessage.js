import React, { useEffect } from 'react';
import useConversation from '../stateManage/useConversation.js';
import { useSocketContext } from './socketContext.jsx';
import sound from "../assets/notiAudio.mp3"

function useGetSocketMessage() {
    const {socket} = useSocketContext();
    const {messages, setMessages} = useConversation();
    useEffect(() => {
      socket.on("newMessage", (newMessage)=>{
        const notification = new Audio(sound);
        notification.play();
        console.log("newMessage", newMessage);
        setMessages([...messages, newMessage])
      })
      return ()=> {socket.off("newMessage")};
    }, [messages, setMessages, socket]);
  
}

export default useGetSocketMessage;
