/**
 * Core domain types for Guilt Meter application
 */

export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  weight: number // Contribution to overall progress (default: 1)
}

export interface Project {
  id: string
  name: string
  description?: string
  tasks: Task[]
  reward?: string
  deadline?: string // ISO date string
  createdAt: string // ISO date string
}

export interface MotivationalMessage {
  minGuilt: number // percentage
  maxGuilt: number // percentage
  messages: string[]
}

export interface ProgressState {
  totalTasks: number
  completedTasks: number
  totalWeight: number
  completedWeight: number
  progressPercentage: number // 0-100, based on weight
  guiltPercentage: number // 100 - progressPercentage
}
