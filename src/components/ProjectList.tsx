import './ProjectList.css'
import { Project } from '../types'

interface ProjectListProps {
  projects: Project[]
  currentProjectId: string | null
  onSelectProject: (projectId: string) => void
}

/**
 * Sidebar list of all projects
 */
export function ProjectList({
  projects,
  currentProjectId,
  onSelectProject,
}: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="project-list-empty">
        <p>No projects yet</p>
      </div>
    )
  }

  return (
    <div className="project-list">
      {projects.map((project) => (
        <button
          key={project.id}
          onClick={() => onSelectProject(project.id)}
          className={`project-list-item ${
            currentProjectId === project.id ? 'active' : ''
          }`}
        >
          <div className="project-list-name">{project.name}</div>
          <div className="project-list-tasks">
            {project.tasks.length} tasks
          </div>
        </button>
      ))}
    </div>
  )
}
