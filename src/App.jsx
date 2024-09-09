import React, { useState } from 'react'
import './App.css'

const App = () => {

  const [tasks, setTasks] = useState([
    { id: 1, text: 'Buy groceries' },
    { id: 2, text: 'Finish React project' },
    { id: 3, text: 'Read a book' }
  ])

  const [newTask, setNewTask] = useState('')
  const [editingTask, setEditingTask] = useState(null)
  const [editingText, setEditingText] = useState('')

  const saveTask = (id) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, text: editingText } : task )))
    setEditingTask(null)
    setEditingText('')
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const addTask = () => {
    if(newTask.trim()){
      setTasks([ ...tasks, { id: Date.now(), text: newTask } ])
      setNewTask('')
    }
  }

  const editTask = (id, text) => {
    setEditingTask(id)
    setEditingText(text)
  }



  return (
    <div className='App'>
      <h1>To-Do List App</h1>

      <input type="text" placeholder='Add a new task...' value={newTask} onChange={(e) => setNewTask(e.target.value)} />
      <button onClick={addTask} className='add-task'>Add Task</button>

      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {
            tasks.map((task) => (
              <tr key={task.id}>
                <td>
                  {
                    editingTask === task.id ? (
                      <input type="text" value={editingText} onChange={(e) => setEditingText(e.target.value)} />
                    ) : (
                      <span>{task.text}</span>
                    )
                  }
                </td>

                <td className='task-actions'>
                  {
                    editingTask === task.id ? (
                      <button className='save-task' onClick={() => saveTask(task.id)}>Save</button>
                    ) : (
                      <button className='edit-task' onClick={() => editTask(task.id, task.text)}>Edit</button>
                    )
                  }
                  <button className='delete-task' onClick={() => deleteTask(task.id)}>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default App