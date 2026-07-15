import { createContext, useMemo } from "react";
import useTasks from "./useTasks";
import useIncompleteTaskScoll from "./useIncompleteTaskScoll";

export const TasksContext = createContext({})

export const TasksProvider = (props) => {
    const { children } = props

    const {
        tasks,
        filteredTasks,
        deleteTask,
        deleteAllTasks,
        toggleTaskComplete,
        searchQuery,
        setsearchQuery,
        newTaskInputRef,
        addTask,
        disappearingTaskId,
        appearingTaskId,
    } = useTasks()

    const {        
        firstIncompleteTaskId,
        firstIncompleteTaskRef,
    } = useIncompleteTaskScoll(tasks)

    const value = useMemo(() => ({
        tasks,
        filteredTasks,
        deleteTask,
        deleteAllTasks,
        toggleTaskComplete,
        searchQuery,
        setsearchQuery,
        newTaskInputRef,
        addTask,
        disappearingTaskId,
        appearingTaskId,
        firstIncompleteTaskId,
        firstIncompleteTaskRef,
    }), [
        tasks,
        filteredTasks,
        deleteTask,
        deleteAllTasks,
        toggleTaskComplete,
        searchQuery,
        setsearchQuery,
        newTaskInputRef,
        addTask,
        disappearingTaskId,
        appearingTaskId,
        firstIncompleteTaskId,
        firstIncompleteTaskRef,
    ])

    return (
        <TasksContext.Provider value={value}>
            { children }
        </TasksContext.Provider>
    )
}