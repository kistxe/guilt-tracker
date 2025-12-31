import { useState } from 'react'
import { Project } from '../types'
import './ProjectHeader.css'

interface ProjectHeaderProps {
  project: Project
  onDeleteProject: (id: string) => void
}

/**
 * Project header with name, description, deadline, and reward
 */
export function ProjectHeader({ project, onDeleteProject }: ProjectHeaderProps) {
  const [showDelete, setShowDelete] = useState(false)

  const deadline = project.deadline
    ? new Date(project.deadline)
    : null

  const isOverdue = deadline && deadline < new Date()

  return (
    <div className="project-header">
      <div className="project-info">
        <h1 className="project-name">{project.name}</h1>
        {project.description && (
          <p className="project-description">{project.description}</p>
        )}
        <div className="project-meta">
          {project.reward && (
            <div className="project-reward">
              🎁 Reward: {project.reward}
            </div>
          )}
          {deadline && (
            <div className={`project-deadline ${isOverdue ? 'overdue' : ''}`}>
              📅 Due: {deadline.toLocaleDateString()}
              {isOverdue && ' (overdue)'}
            </div>
          )}
        </div>
      </div>
      <div className="project-actions">
        {!showDelete ? (
          <button
            onClick={() => setShowDelete(true)}
            className="delete-project-btn"
            title="Delete project"
          >
            🗑️
          </button>
        ) : (
          <div className="delete-confirm">
            <p>Delete project?</p>
            <button
              onClick={() => {
                onDeleteProject(project.id)
                setShowDelete(false)
              }}
              className="confirm-delete"
            >
              Yes
            </button>
            <button
              onClick={() => setShowDelete(false)}
              className="cancel-delete"
            >
              No
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
