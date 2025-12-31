import { useState } from 'react'
import './TaskForm.css'

interface TaskFormProps {
  onAddTask: (
    title: string,
    weight: number,
    description?: string
  ) => void
}

/**
 * Form to add a new task
 */
export function TaskForm({ onAddTask }: TaskFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [weight, setWeight] = useState(1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onAddTask(title, weight, description)
      setTitle('')
      setDescription('')
      setWeight(1)
      setIsOpen(false)
    }
  }

  return (
    <div className="task-form">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="add-task-btn"
        >
          + Add Task
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="task-form-fields">
          <input
            type="text"
            placeholder="Task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            autoFocus
          />
          <textarea
            placeholder="Description (optional)..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-textarea"
            rows={2}
          />
          <div className="form-group">
            <label htmlFor="weight">Weight (default: 1)</label>
            <input
              id="weight"
              type="number"
              min="1"
              max="100"
              value={weight}
              onChange={(e) => setWeight(Math.max(1, parseInt(e.target.value) || 1))}
              className="form-input-number"
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Add Task
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
