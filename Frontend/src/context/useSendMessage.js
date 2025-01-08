import React, { useState } from 'react';
import useConversation from '../stateManage/useConversation.js';
import axios from 'axios';

function useSendMessage() {
    const [loading, setLoading] = useState(false);
    const {messages, setMessages, selectedConversation} = useConversation();
    // console.log(messages);
      const sendMessage = async (message)=>{
        setLoading(true);
        // console.log("meesage-:", message);
        // console.log("selecteCon: ", selectedConversation);
        
        
            try {
                const res = await axios.post(`/api/message/send/${selectedConversation._id}`, {message});
                // console.log("messageListCheck: ", res.data);
                setMessages([...messages, res.data]);
                
                
                setLoading(false);
            } catch (error) {
                console.log("Error in userGetMessage", error);
                setLoading(false);
            }
        
      };
     
   
  return {loading, sendMessage};
}

export default useSendMessage;
