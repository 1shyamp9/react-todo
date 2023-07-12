import React from 'react'

const Task = ({id,title,desc,isCompleted,handleUpdate,handleDelete}) => {
    return (
        <div className='task'>
            <div className="div1">
                <h1>{title}</h1>
                <h2>{desc}</h2>
            </div>
            <div className="div2">
                <input  onChange={()=>handleUpdate(id)} type="checkbox" checked={isCompleted}/>
                <button onClick={()=>handleDelete(id)}>Delete</button>
            </div>
        </div>
    )
}

export default Task
