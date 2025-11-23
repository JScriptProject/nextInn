import React from 'react'
import { useSelector } from 'react-redux'
function DashboardUser() {
  const user = useSelector((state)=> state.user);
  return (
    <div className='bg-green-400'><h1>Hello You are on User dahsboard</h1>
    <p>{user.id}</p>
    <p>{user.firstname}</p>
    <p>{user.lastname}</p>
    <p>{user.mobile}</p>
    <p>{user.email}</p>
    <p>{user.city}</p>
    </div>
  )
}

export default DashboardUser