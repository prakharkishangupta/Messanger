import React, { useState } from 'react';
import { MdSend } from "react-icons/md";
import useSendMessage from '../../context/useSendMessage.js';
import useGetMessage from '../../context/useGetMessage.js';
function Type() {
  const {loading, sendMessage} = useSendMessage();
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) =>{
    e.preventDefault();
    // if (!message.trim()) return;
    // console.log("message: ", message);
    await sendMessage(message);
    setMessage("")
  }
  return (
    <>
        <form onSubmit={handleSubmit}>
          <div className='flex p-4 space-x-4 h-[8vh] mb-4'>
              <label  className=" input input-bordered rounded-3xl flex items-center gap-2 w-[70%] bg-gray-800" >
                  <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} className="bg-gray-300 grow" placeholder="Type here" />
                  
              </label>
              <button
                type="submit"
                className="text-5xl"
                disabled={!message.trim() || loading} // Disable button if no input or loading
              >
                <MdSend />
              </button>
          </div>
        </form>
    </>
  );
}

export default Type;
