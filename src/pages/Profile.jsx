import React, { useContext, useEffect } from 'react'
import { Context } from '../main'
import Loader from '../components/Loader'
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const { user, loader } = useContext(Context);
  const { isAuth} = useContext(Context)

  if (!isAuth) return <Navigate to={'/login'} />
  return loader ? (<Loader />) : (
    <div className='profile'>
      <h1>Name : {user?.name}</h1>
      <h2>Email : {user?.email}</h2>
    </div>
  )
}

export default Profile
