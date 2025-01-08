import React from 'react';
import PropTypes from 'prop-types';
import useConversation from '../../stateManage/useConversation.js';
import { useSocketContext } from '../../context/socketContext.jsx';

function User({user}) {
  const {selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id == user._id;
  const {socket, onlineUser} = useSocketContext();
  const isOnline = onlineUser.includes(user._id);
  return (
    <div className={`hover:bg-slate-600 duration-300 ${isSelected? "bg-slate-700": ""}`} onClick = {()=>setSelectedConversation(user)} >
      <div className='flex px-8 py-4 space-x-4 cursor-pointer hover:bg-slate-600'>
          <div className={`avatar ${isOnline? "online":""} `}>
              <div className="w-14 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
          </div>
          <div >
              <h1>{user.userName}</h1>
              <span>{user.email}</span>
          </div>
      </div>
    </div>
  );
}

// PropTypes validation
User.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    userName: PropTypes.string.isRequired,   // Ensure 'name' is a string and required
    email: PropTypes.string.isRequired,  // Ensure 'email' is a string and required
    avatar: PropTypes.string,            // 'avatar' is optional but should be a string
  }).isRequired, // 'user' prop itself is required
};

export default User;
