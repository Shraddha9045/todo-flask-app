import React, { useState } from 'react';

function AddTaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim(), priority);
      setTitle('');
      setPriority('medium');
    }
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="task-input"
      />
      <select 
        value={priority} 
        onChange={(e) => setPriority(e.target.value)}
        className="priority-select"
      >
        <option value="high">🔴 High</option>
        <option value="medium">🟡 Medium</option>
        <option value="low">🟢 Low</option>
      </select>
      <button type="submit" className="btn btn-add">
        Add Task
      </button>
    </form>
  );
}

export default AddTaskForm;