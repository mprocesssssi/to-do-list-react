import { useState, useRef, useCallback, useEffect, useMemo } from "react"
import tasksAPI from "../api/tasksAPI"

const useTasks = () => {
    const [tasks, setTasks] = useState([])
    
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [searchQeury, setSearchQeury] = useState('')

    const newTaskInputRef = useRef(null)
    
    const deleteAllTasks = useCallback(() => {
        const isConfirme = confirm('Are u sure?')

        if (isConfirme) {
            tasksAPI.deleteAll(tasks)
                .then(() => setTasks([]))
        }
    }, [tasks])

    const deleteTask = useCallback((taskId) => {
        tasksAPI.delete(taskId).then(() => {
            setTasks(
                tasks.filter((task) => task.id !== taskId)
            )
        })
    },[tasks])

    const toggleTaskComplete = useCallback((taskId, isDone) => {
        
        tasksAPI.toggleComplete(taskId, isDone).then(() => {
            setTasks(
                tasks.map((task) => {
                    if (task.id === taskId) {
                        return { ...task, isDone}
                    }
                    return task
                })
            )
        })
    }, [tasks])

    const addTask = useCallback((title) => {
        const newTask = {
            title,
            isDone: false
        }

       tasksAPI.add(newTask) .then((addedTask) => {
            setTasks((prevTasks) => [...prevTasks, addedTask])
            setNewTaskTitle('')
            setSearchQeury('')
        })
        newTaskInputRef.current.focus()
    }, [])
    
    useEffect(() => {
        newTaskInputRef.current.focus()
        tasksAPI.getAll().then(setTasks)
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