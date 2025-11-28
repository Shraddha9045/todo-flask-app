import React from 'react';

function Header({ darkMode, toggleDarkMode, clearAllTasks }) {
  return (
    <header className="header">
      <h1>Todo App</h1>
      <div className="header-controls">
        <button 
          className="btn btn-theme" 
          onClick={toggleDarkMode}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
        <button 
          className="btn btn-clear" 
          onClick={clearAllTasks}
        >
          Clear All
        </button>
      </div>
    </header>
  );
}

export default Header;