import React, { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
    const [tasks, setTasks]= useState([]);
      useEffect(() => {
        fetch('http://localhost:6001/tasks')
        .then(r=>r.json())
        .then(data=>setTasks(data))
        
      }, []);
 function toggleComplete(id){
const task= tasks.find((t)=> t.id === id)

fetch(`http://localhost:6001/tasks/${id}`, {
    method: "PATCH",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify({ completed : !task.completed})
})
.then((response)=> response.json())
.then((updatedTask)=> {
    setTasks(tasks.map((t)=> (t.id === id ? updatedTask : t)))
})
 }
 function addTask(title) {
  fetch("http://localhost:6001/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({title: title, completed: false }),
  })
  .then((r)=> r.json())
  .then((newTask)=> {
    setTasks([...tasks, newTask])
  })
}
    return(
        <TaskContext.Provider value={{tasks, toggleComplete, addTask}}>{children}</TaskContext.Provider>
    )
}
