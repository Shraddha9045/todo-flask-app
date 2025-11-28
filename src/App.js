import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const addTask = (title, priority = 'medium') => {
    const newTask = {
      id: Date.now(),
      title,
      priority,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id, newTitle) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, title: newTitle } : task
    ));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const clearAllTasks = () => {
    setTasks([]);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
      (filterStatus === 'completed' && task.completed) ||
      (filterStatus === 'pending' && !task.completed);
    return matchesSearch && matchesFilter;
  });

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length
  };

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <Header 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode}
        clearAllTasks={clearAllTasks}
      />
      <div className="container">
        <div className="stats-bar">
          <div className="stat">
            <span className="stat-number">{taskStats.total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat">
            <span className="stat-number">{taskStats.completed}</span>
            <span className="stat-label">Done</span>
          </div>
          <div className="stat">
            <span className="stat-number">{taskStats.pending}</span>
            <span className="stat-label">Pending</span>
          </div>
        </div>
        
        <div className="controls">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <AddTaskForm onAddTask={addTask} />
        <TaskList 
          tasks={filteredTasks}
          onDeleteTask={deleteTask}
          onEditTask={editTask}
          onToggleComplete={toggleComplete}
        />
      </div>
    </div>
  );
}

export default App;