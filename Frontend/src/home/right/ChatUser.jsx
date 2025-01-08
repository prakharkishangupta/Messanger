import React from 'react';
import useConversation from '../../stateManage/useConversation';
import { useSocketContext } from '../../context/socketContext';
import { useAuth } from '../../context/AuthProvider';

function ChatUser() {
  const {selectedConversation} = useConversation();
  console.log("sc: ", selectedConversation);
  const {onlineUser} = useSocketContext();
  // const getOnlineUserStatus = (userId)=>{
  //   return onlineUser.includes(userId)?"Online":"Offline";
  // }
  const isOnline = onlineUser.includes(selectedConversation._id);
   
  return (
    <div className='flex space-x-4 h-[12vh] py-4 px-6 bg-gray-900 hover:bg-gray-600'>
        <div className={`avatar ${isOnline?"online":""}`}>
            <div className="w-14 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
        </div>
        <div >
            <h1 className='text-xl'>{selectedConversation?.userName || "Prakhar Kumar Gupta"}</h1>
            <span className='text-sm '>{isOnline?"Online": "Offline"}</span>
        </div>  
    </div>
  );
} 

export default ChatUser;
