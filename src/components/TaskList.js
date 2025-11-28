import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onDeleteTask, onEditTask, onToggleComplete }) {
  if (tasks.length === 0) {
    return (
      <div className="no-tasks">
        <p>No tasks yet. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDeleteTask}
          onEdit={onEditTask}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
}

export default TaskList;