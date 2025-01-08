import React, { useEffect, useState } from 'react';
import useConversation from '../stateManage/useConversation.js';
import axios from 'axios';

function useGetMessage() {
    const [loading, setLoading] = useState(false);
    const {messages, setMessages, selectedConversation} = useConversation();
    // console.log(messages);
    
    useEffect(() => {
      const getMessage = async ()=>{
        setLoading(true);
        // console.log("selecteCon: ", selectedConversation);
        // console.log(selectedConversation._id);
        if(selectedConversation && selectedConversation._id){
            try {
                const res = await axios.get(`/api/message/get/${selectedConversation._id}`, {
                  withCredentials: true, // Ensures the JWT cookie is included in the request
                  
              });
              // console.log("messageList: ", res.data);
                setMessages(res.data);
                
                setLoading(false);
            } catch (error) {
                console.log("Error in userGetMessage", error);
            }
        }
      };
      getMessage()
    }, [selectedConversation, setMessages]);
  return {
    loading,
    messages
    
  }
}

export default useGetMessage;

