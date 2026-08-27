import useLocalStorage from './use-local-storage'
import { TASKS_KEY, TaskState, type Task } from '../models/task'
import React from 'react'
import { delay } from '../helpers/utils'

export default function useTasks() {
  // Padrão -> chave:valor
  // Listagem das tasks
  // Hook de leitura apenas
  const [tasksData] = useLocalStorage<Task[]>(TASKS_KEY, [])

  // Estado que o componente realmente usa/exibe
  const [tasks, setTasks] = React.useState<Task[]>([])

  const [isLoadingTasks, setIsLoadingTasks] = React.useState(true)

  async function fetchTasks() {
    if (isLoadingTasks) {
      console.time('Carregando tasks...')
      await delay(2000)
      setIsLoadingTasks(false)
      console.timeEnd('Carregando tasks...')
    }

    setTasks(tasksData)
  }

  /*

  * Quando o useEffet roda ?
  * Sempre na primeira vez que o componente aparece na tela
  * De novo, toda vez que algum valor dentro do array [tasksData] for diferente do que era na renderização anterior

  * Por que isso importa: sem o useEffect, você não teria controle de "quando" rodar fetchTasks() — 
  * ele rodaria toda vez que o componente renderiza por qualquer motivo. Com o useEffect e essa dependência, 
  * ele só roda quando o dado que importa (tasksData, vindo do localStorage) realmente mudou.

  */

  React.useEffect(() => {
    fetchTasks()
    // Array de dependências, coisas que se mudarem, fazem o useEffect rodar de novo
  }, [tasksData])

  return {
    tasks,
    createdTasksCount: tasks.filter((task) => task.state === TaskState.Created).length,
    concludedTasksCount: tasks.filter((task) => task.concluded).length,
    isLoadingTasks,
  }
}
