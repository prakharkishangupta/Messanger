import React from 'react';
import PropTypes from 'prop-types';

function Message({message}) {
  // console.log("message: ", message);

  const authUser = JSON.parse(localStorage.getItem("messanger")); 
  // console.log("authUser", authUser);
  const itsMe = message.senderId === authUser.user._id;
  const chatSide = itsMe? "chat-end":"chat-start";
  const chatColor = itsMe? "bg-blue-400": "bg-grey-400";
  const createdAt = new Date(message.createdAt);
  const formatedTime = createdAt.toLocaleTimeString([], {
    hour:"2-digit",
    minute:"2-digit"
  })
 
  return (
    <>
        <div className={`chat ${chatSide}`}>
            <div className={`chat-bubble chat-bubble-info text-white ${chatColor}`}>{message.message}</div>
            <div>{formatedTime}</div>
        </div>
        
        
        

    </>
  );
}

// PropTypes validation
Message.propTypes = {
  message: PropTypes.shape({
    message: PropTypes.string.isRequired,
    senderId: PropTypes.string.isRequired,
    createdAt:PropTypes.string.isRequired
  }).isRequired, // 'user' prop itself is required
};

export default Message;
