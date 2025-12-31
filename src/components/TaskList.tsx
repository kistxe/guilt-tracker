import { Task } from '../types'
import './TaskList.css'

interface TaskListProps {
  tasks: Task[]
  onToggleTask: (taskId: string) => void
  onRemoveTask: (taskId: string) => void
}

/**
 * List of tasks with toggle and delete functionality
 */
export function TaskList({
  tasks,
  onToggleTask,
  onRemoveTask,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks yet. Add one to get started!</p>
      </div>
    )
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`task-item ${task.completed ? 'completed' : ''}`}
        >
          <div className="task-content">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleTask(task.id)}
              className="task-checkbox"
              aria-label={`Toggle task: ${task.title}`}
            />
            <div className="task-text">
              <div className="task-title">{task.title}</div>
              {task.description && (
                <div className="task-description">{task.description}</div>
              )}
              {task.weight !== 1 && (
                <div className="task-weight">Weight: {task.weight}</div>
              )}
            </div>
          </div>
          <button
            onClick={() => onRemoveTask(task.id)}
            className="task-delete-btn"
            aria-label={`Delete task: ${task.title}`}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
