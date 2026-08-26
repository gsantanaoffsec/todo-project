import useLocalStorage from './use-local-storage'
import { TASKS_KEY, type Task } from '../models/task'

export default function useTasks() {
  // Padrão -> chave:valor
  // Listagem das tasks
  const [tasks] = useLocalStorage<Task[]>(TASKS_KEY, [])

  return {
    tasks,
    tasksCount: tasks.length,
    concludeTasksCount: tasks.filter((task) => task.concluded).length,
  }
}
