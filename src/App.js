import React, { useState } from 'react'
import { useReducer } from 'react'
import Tasks from './Tasks';


const ACTIONS = {
  ADDING_TASK:'add-task',
  CHECK_COMPLETE_TASK:'complete-task',
  DELETE_TASK:'delete-task'
}

let nextId = 2;
const initialState = [
  {id:0,text:'coding for 4 hours', complete: false},
  {id:1,text:'Taking break', complete: false},
  {id:2,text:'coding for 2 hours', complete: false}

]


function reducer(tasks, actions){
   switch(actions.type){
      case ACTIONS.ADDING_TASK:
        return [
          ...tasks,
          {
            id:nextId++,
            text:actions.payload.text,
            complete:false
          }
        ];
      
     case ACTIONS.CHECK_COMPLETE_TASK:
      return tasks.map((task, index) => {
        return index === actions.payload.id ? {...task, complete: !task.complete} : task
      })
     
     case ACTIONS.DELETE_TASK:
      return tasks.filter((_, index) => index !== actions.payload.id)
     
     default:
      throw new Error('UnKown action passed')
   }
}
const App = () => {
  const [tasks, dispatch] = useReducer(reducer, initialState);
  const [text, setText] = useState('')

 tasks.sort((a,b) => a.id - b.id)

  function handleInputChange(e){
       setText(e.target.value)
       
  }


  function handleSubmit(e){
    e.preventDefault();
    dispatch({
      type:ACTIONS.ADDING_TASK,
      payload:{text}
    })
    
  }

  function updateCompleteTask(taskId){
    dispatch({
      type:ACTIONS.CHECK_COMPLETE_TASK,
      payload:{id:taskId}
    })
  }

  function onDelete(taskId){
    dispatch({
      type:ACTIONS.DELETE_TASK,
      payload:{id:taskId}
    })
  }
  return (
    <div>
      <div className="container">
     <h1>Add Task</h1>
       <form onSubmit={handleSubmit}>
        <input
        type="text"
        onChange={handleInputChange}
        placeholder="Enter your Task"
         required
        />
        <button type='submit'>Add task</button>
       </form>
      </div>

      <Tasks 
       tasks={tasks}
       isComplete={updateCompleteTask}
      onDelete = {onDelete}
      />
      
    </div>
  )
}

export default App