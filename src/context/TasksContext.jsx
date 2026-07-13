import { createContext, useState, useRef, useCallback, useEffect, useMemo } from "react";

export const TasksContext = createContext({})

export const TasksProvider = (props) => {
    const { children } = props

        const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks')
        if (savedTasks) {
            return JSON.parse(savedTasks)
        }
        return [
            {id: 'task-1', title:'Buy some milk', isDone: false},
            {id: 'task-2', title:'Buy coffe', isDone: true},
        ]
    })

    
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [searchQeury, setSearchQeury] = useState('')

    const newTaskInputRef = useRef(null)
    const firstIncompleteTaskRef = useRef(null)

    const firstIncompleteTaskId = tasks.find(({isDone}) => !isDone)?.id

    const deleteAllTasks = useCallback(() => {
        console.log('Удаление всех задач')
        const isConfirme = confirm('Are u sure?')
        if (isConfirme) {
            setTasks([])
        }
    }, [])

    const deleteTask = useCallback((taskId) => {
        console.log('Удаление задачу с id = ', taskId)
        setTasks(
            tasks.filter((task) => task.id !== taskId)
        )
    },[tasks])

    const toggleTaskComplete = useCallback((taskId, isDone) => {
        console.log(`Задача ${isDone ? 'выполнена' : 'не выполнена' }`)
        setTasks(
            tasks.map((task) => {
                if (task.id === taskId) {
                    return { ...task, isDone}
                }
                return task
            })
        )
    }, [tasks])

    const addTask = useCallback(() => {
        if (newTaskTitle.trim().length > 0) {
            const newTask = {
                id: crypto?.randomUUID() ?? Date.now().toString(),
                title: newTaskTitle,
                isDone: false
            }
            setTasks((prevTasks) => [...prevTasks, newTask])
            setNewTaskTitle('')
            setSearchQeury('')
            newTaskInputRef.current.focus()
        }
    }, [newTaskTitle])
    
    useEffect(() => {
      console.log('Сохраняем', tasks)
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    useEffect(() => {
        newTaskInputRef.current.focus()
    },[])
         
    const filteredTasks = useMemo(() => {
        const clearSearchQuery = searchQeury.trim().toLowerCase()
        return clearSearchQuery.length > 0 
            ? tasks.filter(({title}) => title.toLowerCase().includes(searchQeury))
            : null
    }, [searchQeury, tasks])

    return (
        <TasksContext.Provider
            value={{
                tasks,
                filteredTasks,
                firstIncompleteTaskId,
                firstIncompleteTaskRef,
                deleteTask,
                deleteAllTasks,
                toggleTaskComplete,

                newTaskTitle,
                setNewTaskTitle,
                searchQeury,
                setSearchQeury,
                newTaskInputRef,
                addTask,
            }}
        >
            { children }
        </TasksContext.Provider>
    )
}