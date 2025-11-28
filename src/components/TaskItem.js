import React, { useState } from 'react';

function TaskItem({ task, onDelete, onEdit, onToggleComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleEdit = () => {
    if (editTitle.trim()) {
      onEdit(task.id, editTitle.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '🟡';
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} priority-${task.priority || 'medium'}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="task-checkbox"
        />
        
        <span className="priority-badge">
          {getPriorityIcon(task.priority || 'medium')}
        </span>
        
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleEdit()}
            className="edit-input"
            autoFocus
          />
        ) : (
          <div className="task-info">
            <span className="task-title">{task.title}</span>
            <span className="task-priority">{task.priority || 'medium'}</span>
          </div>
        )}
      </div>

      <div className="task-actions">
        {isEditing ? (
          <>
            <button onClick={handleEdit} className="btn btn-save">
              ✓
            </button>
            <button onClick={handleCancel} className="btn btn-cancel">
              ✕
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => setIsEditing(true)} 
              className="btn btn-edit"
            >
              ✏️
            </button>
            <button 
              onClick={() => onDelete(task.id)} 
              className="btn btn-delete"
            >
              🗑️
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskItem;