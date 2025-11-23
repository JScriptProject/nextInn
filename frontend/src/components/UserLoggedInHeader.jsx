import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function UserLoggedInHeader({user}) {

    const [isHovered, setIsHovered] = useState(false);
    const {firstname, lastname, email, city, mobile} = user;
  return (
    <div>
        <div className="user-container flex flex-row md:flex-col gap-3 md:gap-1 items-center justify-center" onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>
            <div className="img-avatar w-[35px] h-[35px]">
                <img src="https://res.cloudinary.com/dbwtdkirs/image/upload/v1763907749/user-avatar_uxhwys.png" alt="" className='rounded-full' />
            </div>
            <h4 className='text-amber-50 text-sm'>{firstname}</h4>
        </div>
        {isHovered && <div className='user-avatar-hover'> 
            <Link to ="">Profile</Link>
            <h4>Logout</h4>
        </div>}
    </div>
  )
}

export default UserLoggedInHeader