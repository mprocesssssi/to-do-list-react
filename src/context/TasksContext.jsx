import { createContext } from "react";
import useTasks from "../hooks/useTasks";
import useIncompleteTaskScoll from "../hooks/useIncompleteTaskScoll";

export const TasksContext = createContext({})

export const TasksProvider = (props) => {
    const { children } = props

    const {
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
    } = useTasks()

    const {
        
        firstIncompleteTaskId,
        firstIncompleteTaskRef,
    } = useIncompleteTaskScoll(tasks)

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