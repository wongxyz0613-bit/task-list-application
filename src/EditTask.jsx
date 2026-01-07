import { useState } from 'react'

export default function EditTask({updateTask,task,errors,validate}){
    const [value, setValue] = useState(task.title);

    function handleSubmit(e){
      // prevent default action
        e.preventDefault();
        if (!validate(value)) return;
          // add todo
        updateTask(task.id,value);
          // clear form after submission
        
      };

    return(
        <form onSubmit={handleSubmit} className="TaskForm">
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="editTask-input" placeholder='Add your task'/>
            <button type="submit" className='editTask-btn'>Update Task</button>
            {errors.name&&(<span className="error-msg">{errors.name}</span>)}
        </form>
    )
}