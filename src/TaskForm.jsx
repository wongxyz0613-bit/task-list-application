import { useState } from 'react'

export default function TaskForm({addTask,errors,validate}){
    const [value, setValue] = useState('');

    function handleSubmit(e){
      
        e.preventDefault();
        if (!validate(value)) return;
          // add tasks
        addTask(value);
          // clear form after submission
        setValue('');
        
      };

    return(
        <form onSubmit={handleSubmit} className="TaskForm">
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="task-input" placeholder='Add your task'/>
            <button type="submit" className='task-btn'>Add Task</button>
            {errors.name&&(<span className="error-msg">{errors.name}</span>)}
        </form>
    )
}