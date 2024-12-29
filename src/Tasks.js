import React from 'react'

const Tasks = ({tasks, isComplete, onDelete}) => {
  
  return (
    <div>

  {tasks.map(task => 
    <div key={task.id} className='task'>
       <span>{task.complete ? <s>{task.text}</s> : task.text}</span> 
           <div className='buttons'>
           <button className='complete' onClick={() => isComplete(task.id)}>{task.complete ? 'Undo' : 'complete'}</button>
           <button className='delete' onClick={() => onDelete(task.id)}>Delete</button>
           </div>
    
    </div>
  )}
    </div>
  )
}

export default Tasks