export const TASKS_KEY='tasks'

export enum TaskState {
  Creating = 'creating',
  Created = 'created',
}

// Qual o motivo da criação do modelo ?
// Pois essa task será usada em vários lugares da aplicação

// Interface de front-end

export interface Task {
  id: string
  title: string
  concluded?: boolean
  state?: TaskState 
}
