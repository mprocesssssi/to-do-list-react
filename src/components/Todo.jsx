import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import AddTaskForm from "./AddTaskForm";
import SearchTaskForm from "./SearchTaskForm";
import TodoInfo from "./TodoInfo";
import TodoList from "./TodoList";
import Button from "./Button";

const Todo = () => {
    
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

    // const filterTask = (query) => {
    //     console.log(`Поиск: ${query}`)
    // }

    const addTask = () => {
        // const newTaskTitle = newTaskInputRef.current.value;
        if (newTaskTitle.trim().length > 0) {
            const newTask = {
                id: crypto?.randomUUID() ?? Date.now().toString(),
                title: newTaskTitle,
                isDone: false
            }
            setTasks([...tasks, newTask])
            setNewTaskTitle('')
            // newTaskInputRef.current.value = ''
            setSearchQeury('')
            newTaskInputRef.current.focus()
        }
    }
    
    useEffect(() => {
      console.log('Сохраняем', tasks)
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    useEffect(() => {
        newTaskInputRef.current.focus()
    },[])
    
    // const renderCount = useRef(0)

    // useEffect(() => {
    //     renderCount.current++
    //     console.log('компонент отрендерился: ',  renderCount.current)
    // })

    
    const filteredTasks = useMemo(() => {
        const clearSearchQuery = searchQeury.trim().toLowerCase()
        return clearSearchQuery.length > 0 
            ? tasks.filter(({title}) => title.toLowerCase().includes(searchQeury))
            : null
    }, [searchQeury, tasks])



    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm
                addTask={addTask}
                newTaskInputRef={newTaskInputRef}
                newTaskTitle={newTaskTitle}
                setNewTaskTitle={setNewTaskTitle}
            />
            <SearchTaskForm
                searchQeury={searchQeury}
                setSearchQeury={setSearchQeury}
            />
            <TodoInfo
                total={tasks.length}
                done={tasks.filter(({ isDone }) => isDone).length}
                onDeleteAllButtonClick={deleteAllTasks}
            />
            <Button
                onClick={()=>firstIncompleteTaskRef.current?.scrollIntoView({behavior:'smooth'})}
            >
                Show first incomplete task
            </Button>
            <TodoList 
                tasks={tasks}
                filteredTasks={filteredTasks}
                firstIncompleteTaskRef={firstIncompleteTaskRef}
                firstIncompleteTaskId={firstIncompleteTaskId}
                onDeleteTaskButtonClick={deleteTask}
                onTaskCompleteChange={toggleTaskComplete}
            />     
        </div>
    )
}

export default Todo