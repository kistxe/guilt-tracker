import { useState, useMemo } from 'react'
import { Project, Task } from './types'
import { calculateProgress, addTask, toggleTask, removeTask } from './lib/progress'
import {
  getMotivationalMessage,
  getGuiltMeterColor,
} from './config/messages'
import { ProjectForm } from './components/ProjectForm'
import { ProjectList } from './components/ProjectList'
import { ProjectHeader } from './components/ProjectHeader'
import { GuiltMeter } from './components/GuiltMeter'
import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'
import { MotivationalMessage } from './components/MotivationalMessage'
import './App.css'

export function App() {
  const [projects, setProjects] = useState<Project[]>([])
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null)

  const currentProject = useMemo(
    () => projects.find((p) => p.id === currentProjectId),
    [projects, currentProjectId]
  )

  const progressState = useMemo(
    () => (currentProject ? calculateProgress(currentProject.tasks) : null),
    [currentProject]
  )

  const motivationalMessage = useMemo(
    () =>
      progressState
        ? getMotivationalMessage(progressState.guiltPercentage)
        : '',
    [progressState]
  )

  const guiltMeterColor = useMemo(
    () =>
      progressState
        ? getGuiltMeterColor(progressState.guiltPercentage)
        : '#e5e7eb',
    [progressState]
  )

  // Project management
  const handleAddProject = (
    name: string,
    description?: string,
    reward?: string,
    deadline?: string
  ) => {
    const newProject: Project = {
      id: Date.now().toString(),
      name,
      description,
      reward,
      deadline,
      tasks: [],
      createdAt: new Date().toISOString(),
    }
    const updatedProjects = [...projects, newProject]
    setProjects(updatedProjects)
    setCurrentProjectId(newProject.id)
  }

  const handleSelectProject = (projectId: string) => {
    setCurrentProjectId(projectId)
  }

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter((p) => p.id !== projectId))
    if (currentProjectId === projectId) {
      setCurrentProjectId(projects.length > 1 ? projects[0]!.id : null)
    }
  }

  // Task management
  const handleAddTask = (
    title: string,
    weight: number,
    description?: string
  ) => {
    if (!currentProject) return

    const updatedTasks = addTask(currentProject.tasks, title, weight, description)
    setProjects(
      projects.map((p) =>
        p.id === currentProject.id ? { ...p, tasks: updatedTasks } : p
      )
    )
  }

  const handleToggleTask = (taskId: string) => {
    if (!currentProject) return

    const updatedTasks = toggleTask(currentProject.tasks, taskId)
    setProjects(
      projects.map((p) =>
        p.id === currentProject.id ? { ...p, tasks: updatedTasks } : p
      )
    )
  }

  const handleRemoveTask = (taskId: string) => {
    if (!currentProject) return

    const updatedTasks = removeTask(currentProject.tasks, taskId)
    setProjects(
      projects.map((p) =>
        p.id === currentProject.id ? { ...p, tasks: updatedTasks } : p
      )
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Guilt Meter</h1>
        <p>Track your projects and lift the mental load</p>
      </header>

      <div className="app-container">
        <aside className="app-sidebar">
          <ProjectForm onAddProject={handleAddProject} />
          <ProjectList
            projects={projects}
            currentProjectId={currentProjectId}
            onSelectProject={handleSelectProject}
          />
        </aside>

        <main className="app-main">
          {currentProject ? (
            <div className="project-view">
              <ProjectHeader
                project={currentProject}
                onDeleteProject={handleDeleteProject}
              />

              {progressState && (
                <div className="progress-section">
                  <GuiltMeter
                    guiltPercentage={progressState.guiltPercentage}
                    color={guiltMeterColor}
                  />
                  <MotivationalMessage message={motivationalMessage} />

                  <div className="progress-stats">
                    <div className="stat">
                      <span className="stat-label">Completed</span>
                      <span className="stat-value">
                        {progressState.completedTasks}/
                        {progressState.totalTasks}
                      </span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Progress</span>
                      <span className="stat-value">
                        {progressState.progressPercentage}%
                      </span>
                    </div>
                    {currentProject.reward && (
                      <div className="stat">
                        <span className="stat-label">Reward</span>
                        <span className="stat-value">{currentProject.reward}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="tasks-section">
                <h2>Tasks</h2>
                <TaskForm onAddTask={handleAddTask} />
                <TaskList
                  tasks={currentProject.tasks}
                  onToggleTask={handleToggleTask}
                  onRemoveTask={handleRemoveTask}
                />
              </div>
            </div>
          ) : (
            <div className="empty-main">
              <div className="empty-illustration">
                <div className="emoji">📝</div>
              </div>
              <h2>No project selected</h2>
              <p>Create a new project or select one from the sidebar to get started</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
