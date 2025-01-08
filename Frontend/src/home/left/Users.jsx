import React from 'react';
import User from './User';

import useGetAllUsers from '../../context/useGetAllUsers.js';

function Users() {
  const {users} = useGetAllUsers();
  console.log("users", users);
  
  return (
    <div style={{maxHeight:"calc(84vh - 2vh)"}} className='overflow-y-auto'>
      {users.map((currentUser, index)=>(
        <User key={index} user={currentUser} />
      ))}
    </div>
  );
}

export default Users;
