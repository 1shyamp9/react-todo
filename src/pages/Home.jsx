import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Context, server } from '../main';
import { toast } from 'react-hot-toast'; 
import Task from '../components/Task';
import { Navigate } from 'react-router-dom';

const Home = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false); 
  const { isAuth} = useContext(Context)
  
  const handleUpdate = async(id) => {
    try {
      const {data} = await axios.put(`${server}/tasks/${id}`,{},{
        withCredentials:true
      })
      setRefresh((prev) => !prev);
      toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  const handleDelete = async(id) => {
    try {
      const {data} = await axios.delete(`${server}/tasks/${id}`,{
        withCredentials:true
      })
      setRefresh((prev) => !prev);
      toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  const handleTasks = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${server}/tasks/new`, { title, desc },
        {
          headers: {
            "Content-Type": "application/json"
          }, withCredentials: true,
        })
      toast.success(data.message);
      setTitle('');
      setDesc('');
      setLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message)
      setLoading(false);
    }
  }
  useEffect(() => {
    axios.get(`${server}/tasks/mytasks`, {
      withCredentials: true
    })
    .then((res) => {
      setTasks(res.data.tasks)
    }).catch((error) => {
      console.log(error);
    })
  }, [refresh])
  
  if (!isAuth) return <Navigate to={'/login'} /> 
  return (
    <div className='todo'>
      <form onSubmit={handleTasks}>
        <input type="text" placeholder='Title' required value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder='Description' required value={desc} onChange={(e) => setDesc(e.target.value)} />
        <button type="submit" disabled={loading}>Add Task</button>
      </form>
      <div className="tasks">
        {
          tasks.map((i) => (
            <Task key={i._id} id={i._id} title={i.title} desc={i.desc} handleDelete={handleDelete} handleUpdate={handleUpdate} isCompleted={i.isCompleted}/>
          ))
        }
      </div>
    </div>
  )
}

export default Home
