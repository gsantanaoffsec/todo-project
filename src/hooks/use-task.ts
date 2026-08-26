import { TASKS_KEY, TaskState, type Task } from '../models/task'
import useLocalStorage from './use-local-storage'

export default function useTask() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(TASKS_KEY, [])

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

  return {
    prepareTask,
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
