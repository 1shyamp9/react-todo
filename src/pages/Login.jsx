import React, { useContext, useState } from 'react'
import { Context, server } from '../main';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuth, setisAuth, loader, setLoader } = useContext(Context)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoader(true)
    try {
      const { data } = await axios.post(`${server}/users/login`, { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      toast.success(data.message);
      setisAuth(true)
      setLoader(false)
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error);
      setisAuth(false)
      setLoader(false)
    }
  }
  if (isAuth) return <Navigate to={'/'} />
  return (
    <div className='signup Login'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='Password' required value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" disabled={loader}>Login</button>
        <div>
          Haven't account ? <Link to={'/signup'}>Signup</Link>
        </div>
      </form>
    </div>
  )
}

export default Login
