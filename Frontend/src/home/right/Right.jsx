import React from 'react';
import ChatUser from './ChatUser';
import Messages from './Messages';
import Type from './Type';
import useConversation from '../../stateManage/useConversation.js';
import Loading from '../../components/loading.jsx';
import { useAuth } from '../../context/AuthProvider';

export default function Right() {
  const {selectedConversation } = useConversation();

  return (
    <>
    {!selectedConversation?(<NoChat></NoChat>):(<>
      <div className="w-[70%]  bg-slate-950 text-white">
        <ChatUser/>
        
        <div style={{maxHeight:"calc(92vh - 14vh)"}} className='p-4 overflow-y-auto'>
          <Messages/>
          
        </div>
        <Type/>
      </div>
  </>)}

  </>

    
  );
}

const NoChat = ()=>{
  const [authUser] = useAuth();
  console.log("authUser: ", authUser);

  return(
    <>
      <div className='flex h-screen ml-[25%] mt-[25%] text-center justify-center'>
        <h1 className='font-semibold text-xl'>Welcome  <span>{authUser.user.userName}</span>
        <br />Select a chat to start messaging.
        </h1>
      </div>
    </>
  )
}