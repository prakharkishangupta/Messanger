import React, { useEffect, useRef } from 'react';
import Message from './Message';
import useGetMessage from '../../context/useGetMessage.js';
// import Loading from '../../components/loading.jsx';
import useGetSocketMessage from '../../context/useGetSocketMessage.js';

function Messages() {
  const {messages, loading} = useGetMessage();
  const messageList = messages?.messages || [];
  console.log("messages", messages);
  console.log("messageList", messageList);
  useGetSocketMessage();

  const lastMsgRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if(lastMsgRef.current){
        lastMsgRef.current.scrollIntoView({
          behavior:"smooth"
        })
      }
    }, 100);
  }, [messageList]);
  
  return (
    <>
    {!loading && messageList.length>0 && (messageList.map((message)=>{
      return (
        <div key={message._id} ref={lastMsgRef}>
          <Message  message={message} />
        </div>
      )
    })) }
    
    <div style={{minHeight:"calc(92vh - 14vh)"}} className='p-4 overflow-y-auto'>
        
        {!loading && messageList.length === 0 && (<div><p className='text-center font-bold mt-[20%]'>Say Hi!</p> </div>) }
        


    </div>
    </>
  );
}

export default Messages;
