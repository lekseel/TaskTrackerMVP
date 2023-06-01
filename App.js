import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState('');

  // Fetch all tasks from the backend API
  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.log(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { title, description, dueDate, tags };
    // Make a POST request to the backend API to create a new task
    fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    })
      .then(response => response.json())
      .then(data => {
        console.log('New task created:', data);
        // Reset form fields
        setTitle('');
        setDescription('');
        setDueDate('');
        setTags('');
        // Refresh the task list
        setTasks([...tasks, data]);
      })
      .catch(error => console.log(error));
  };

  const handleEditTask = (taskId, updatedTask) => {
    // Make a PUT request to the backend API to update the task
    fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Task updated:', data);
        // Update the task in the task list
        const updatedTasks = tasks.map(task => (task.id === taskId ? data : task));
        setTasks(updatedTasks);
      })
      .catch(error => console.log(error));
  };

  const handleDeleteTask = (taskId) => {
    // Make a DELETE request to the backend API to delete the task
    fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'DELETE'
    })
      .then(() => {
        console.log('Task deleted:', taskId);
        // Remove the task from the task list
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          placeholder="Due Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
      <div className="task-list">
        {tasks.map(task => (
          <div key={task.id} className="task-item">
            <h3>{task
