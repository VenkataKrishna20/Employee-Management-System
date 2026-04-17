import React, { useEffect } from 'react'
import { useAuth } from '../context/authContext'


function AdminDashboard() {
  const {user} = useAuth()

  // useEffect(()=>{
  //   if(!user && !loading){
  //     navigate('/login')
  //   }
  // },[user, loading,navigate]);

  // if(loading){
  //   return <div>Loading....</div>
  // }
  
  // if(!user){
  //   return <Navigate to="/login"/>
  // }

  return (
    <div>
      <h6>AdminDashBoard {user &&  user.name} </h6>
    </div>
  )
}

export default AdminDashboard
