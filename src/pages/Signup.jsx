import React, { useContext, useState } from 'react'
import { Context, server } from '../main'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Link, Navigate } from 'react-router-dom'

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuth, setisAuth, loader, setLoader } = useContext(Context)

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoader(true)
    try {
      const { data } = await axios.post(`${server}/users/create`, { name, email, password },
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
      toast.error("Some Error")
      console.log(error);
      setisAuth(false)
      setLoader(false)
    }
  }
  if (isAuth) return <Navigate to={'/'} />
  return (
    <div className='signup'>
      <h1>Registration</h1>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder='Name' required value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='Password' required value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" disabled={loader}>Register</button>
        <div>
          Already an account ? <Link to={"/login"}>login</Link>
        </div>
      </form>
    </div>
  )
}

export default Signup
