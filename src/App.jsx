import { useState, useEffect } from 'react'
import './App.css'
import TaskForm from './TaskForm.jsx'
import TaskList from './TaskList.jsx'


export default function App() {
  const [tasks, setTasks] = useState(()=>{
    const savedTask = localStorage.getItem("tasks");
    return savedTask ? JSON.parse(savedTask) :[];
  });
  const [errors, setErrors] = useState({});
  const [filter,setFilter] = useState("all");


  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  //no null input
  const handleValidation = (value) => {
      const formErrors = {};
  
      //Name
      if(!value.trim()){
        formErrors.name= "Cannot be empty";
      }
      setErrors(formErrors)
      return Object.keys(formErrors).length ===0;
  }

  //addTask
  function addTask(value){
    const newTask = {
      id:Date.now(),title:value, completed:false, createdAt: new Date().toISOString(), isEdit:false
    }
    setTasks(prev=>{
      const updated=[...prev,newTask]
      console.log("Updated task:", updated);
      return updated;
    })
  }

  function toggleTask(id){
    setTasks(prev=>
      prev.map(task=>
        task.id === id? {...task, completed: !task.completed} :task
    ))
  }

  //deleteTask
  function deleteTask(id){
    setTasks(prev=>prev.filter(task=> task.id !== id))
  }

  //editTask
  function updateTask(id,newTasks){
    setTasks(prev=>
      prev.map(task=>
        task.id === id? {...task, title: newTasks,isEdit:false} :task
    ))
  }

  function editTask(id) {
  setTasks(prev =>
    prev.map(task =>
      task.id === id? { ...task, isEdit: !task.isEdit }: task
    )
  );
}

//filter
const filterTasks = tasks.filter(task=>{
  if (filter === "active") return !task.completed;
  if (filter === "completed") return task.completed;
  return true;
})

  return (
    <div className='App'>
      <h1>My Tasks</h1>
      <TaskForm 
      addTask={addTask}
      errors={errors}
      validate={handleValidation}/>

      <div className="filterBtn">

        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

      </div>
      <TaskList 
      tasks={filterTasks}
      toggleTask={toggleTask}
      editTask={editTask}
      updateTask={updateTask}
      deleteTask={deleteTask}
      errors={errors}
      validate={handleValidation}
      />
    </div>
  )
}


