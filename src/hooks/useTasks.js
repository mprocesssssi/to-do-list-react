import { useState, useRef, useCallback, useEffect, useMemo } from "react"
import useTasksLocalStorage from "./useTasksLocalStorage"
const useTasks = () => {
    const {
        savedTasks,
        saveTasks
    } = useTasksLocalStorage()
    const [tasks, setTasks] = useState(savedTasks ?? [
                {id: 'task-1', title:'Buy some milk', isDone: false},
                {id: 'task-2', title:'Buy coffe', isDone: true},
            ])

    
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [searchQeury, setSearchQeury] = useState('')

    const newTaskInputRef = useRef(null)
    
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

    const addTask = useCallback((title) => {
        const newTask = {
            id: crypto?.randomUUID() ?? Date.now().toString(),
            title,
            isDone: false
        }
        setTasks((prevTasks) => [...prevTasks, newTask])
        setNewTaskTitle('')
        setSearchQeury('')
        newTaskInputRef.current.focus()
    }, [])
    
    useEffect(() => {
      saveTasks(tasks)
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

    return {
        tasks,
        filteredTasks,
        deleteTask,
        deleteAllTasks,
        toggleTaskComplete,
        newTaskTitle,
        setNewTaskTitle,
        searchQeury,
        setSearchQeury,
        newTaskInputRef,
        addTask,
    }
}

export default useTasks