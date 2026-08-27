import React from 'react'
import { delay } from '../helpers/utils'
import { TASKS_KEY, TaskState, type Task } from '../models/task'
import useLocalStorage from './use-local-storage'

export default function useTask() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(TASKS_KEY, [])

  const [isUpdatingTask, setIsUpdatingTask] = React.useState(false)

  const [isDeletingTask, setIsDeletingTask] = React.useState(false)

  function prepareTask() {
    setTasks([
      ...tasks,
      {
        id: Math.random().toString(36).substring(2, 9),
        title: '',
        state: TaskState.Creating,
      },
    ])
  }

  async function updateTask(id: string, payload: { title: Task['title'] }) {
    setIsUpdatingTask(true)

    await delay(1000)

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, state: TaskState.Created, ...payload } : task,
      ),
    )

    setIsUpdatingTask(false)
  }

  async function updateTaskStatus(id: string, concluded: boolean) {
    await delay(1000)
    setTasks(tasks.map((task) => (task.id === id ? { ...task, concluded } : task)))
  }

  async function deleteTask(id: string) {
    setIsDeletingTask(true)

    await delay(1000)

    // Faz um filtro de tudo que é != do id passado, ou seja, cria um array filtrado
    // excluindo o id passado, e salvando o novo array
    setTasks(tasks.filter((task) => task.id !== id))

    setIsDeletingTask(false)
  }

  return {
    prepareTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    isUpdatingTask,
    isDeletingTask,
  }
}

/*

Criação de um id no front-end

> Math.random()
0.5320637502721
> Math.random.toString
[Function: toString]
> Math.random().toString()
'0.6689434970244938'
> Math.random().toString(36)
'0.20s4me5veqj'
> Math.random().toString(36).substring(2, 9)
'g0cf0xe'

*/
