
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import EditTask from './EditTask.jsx'

export default function TaskList({tasks,toggleTask,editTask,updateTask,deleteTask,errors,validate}){
    if(tasks.length==0){
        return <p>No task.</p>
    }

    return(
        <div className="List">
            {tasks.map(task => (
                <div key={task.id} className="task-list">
                {task.isEdit ? (
                    <EditTask
                    task={task}
                    updateTask={updateTask}
                    errors={errors}
                    validate={validate}
                    />
                ) : (
                    <>
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                    />
                    <p
                        className={task.completed ? "completed" : "incompleted"}
                        onClick={() => toggleTask(task.id)}
                    >
                        {task.title}
                    </p>

                    <div className="icon-container">
                        <FontAwesomeIcon
                        className="edit-icon"
                        icon={faPenToSquare}
                        onClick={() => editTask(task.id)}
                        />
                        <FontAwesomeIcon
                        className="delete-icon"
                        icon={faTrash}
                        onClick={() => deleteTask(task.id)}
                        />
                    </div>

                    <div className="task-created">
                        <span className="createdAt">
                            {new Date(task.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    </>
                )}
                </div>
            ))}
    </div>
    )
}