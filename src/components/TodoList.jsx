import { memo } from "react";
import TodoItem from "./TodoItem";

const TodoList = (props) => {
  console.log('TodoList')
  const {
    tasks = [],
    filteredTasks,
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
    onDeleteTaskButtonClick,
    onTaskCompleteChange,
  } = props

  const hasTasks = tasks.length > 0
  const idEmptyFilteredTasks = filteredTasks?.length === 0

  if (!hasTasks) {
      return <div className="todo__empty-message">Задач пока нет</div>
  }
  if (hasTasks && idEmptyFilteredTasks) {
    return <div className="todo__empty-message">Задачи не найдены</div>
  }
  return (
    <ul className="todo__list">
      {(filteredTasks ?? tasks).map((task) => (
        <TodoItem
          className="todo__item"
          key={task.id} {...task}
          ref={task.id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}
          onDeleteTaskButtonClick={onDeleteTaskButtonClick}
          onTaskCompleteChange={onTaskCompleteChange}
        />
      ))}
    </ul>
  )
}

export default memo(TodoList)