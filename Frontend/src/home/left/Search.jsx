import React, { useState } from 'react';
import { IoSearchCircle } from "react-icons/io5";
import useConversation from "../../stateManage/useConversation.js"
import useGetAllUsers from '../../context/useGetAllUsers.js';
import toast from 'react-hot-toast';
function Search() {
    const [search, setSearch] = useState();
    const {users, loading} = useGetAllUsers();
    const {setSelectedConversation} = useConversation();
  return (
    <div className='h-[10vh]'>
    <div className='px-8 py-4'>
        <form onSubmit={((e)=>{
            e.preventDefault();
            if(!search) return;
            const conversation = users.find((user)=>{
                return user.userName.toLowerCase().includes(search.toLowerCase());
            })
            console.log("conversation", conversation);
            if(conversation){
                setSelectedConversation(conversation);
                setSearch("");
            }
            else{
                toast.error("User not found")
            }
        })}>
            <div className='flex space-x-4'>
                <label className="input input-bordered flex items-center gap-2 w-[80%]">
                    <input type="text" className="grow" placeholder="Search" value={search} onChange={(e)=> setSearch(e.target.value)} />
                    
                </label>
                <button>
                    <IoSearchCircle className=' text-5xl p-2 hover:bg-gray-600 rounded-full duration-300 ' />
                </button>
            </div>
            
        </form>
      
    </div>
    </div>
  );
}

export default Search;
