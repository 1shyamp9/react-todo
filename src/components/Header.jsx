import React, { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context, server } from '../main'
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Header = () => {
  const { isAuth, setisAuth , loader , setLoader } = useContext(Context)
  const handleLogout = async () => { 
    setLoader(true)
    try {
      await axios.get(`${server}/users/logout` ,
      { 
        withCredentials: true,
      }
      )
      toast.success("Logged out Successfully");
      setisAuth(false)
      setLoader(false)
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error);
      setisAuth(true)
      setLoader(false)
    }
  } 
  return (
    <nav>
      <div>
        <h1>MERN TODO APP</h1>
      </div>
      <article>
        <Link to={'/'}>Todos</Link>
        <Link to={'/profile'}>Profile</Link>
        {
          isAuth ? <button onClick={handleLogout} disabled={loader}>Logout</button>: <Link to={'/login'}>Login</Link> 
        }
        {/* {
          isAuth ? <button>Logout</button>: <Link to={'/login'}>Login</Link> 
        } */}
      </article>
    </nav>
  )
}

export default Header
