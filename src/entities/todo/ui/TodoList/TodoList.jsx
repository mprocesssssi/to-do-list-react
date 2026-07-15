import { memo, useContext } from "react"
import { TodoItem, TasksContext } from '@/entities/todo'

const TodoList = (props) => {
  const { styles } = props
  const {
    tasks,
    filteredTasks,
  } = useContext(TasksContext)

  const hasTasks = tasks.length > 0
  const idEmptyFilteredTasks = filteredTasks?.length === 0

  if (!hasTasks) {
      return <div className={styles.emptyMessage}>Задач пока нет</div>
  }
  if (hasTasks && idEmptyFilteredTasks) {
    return <div className={styles.emptyMessage}>Задачи не найдены</div>
  }
  return (
    <ul className={styles.list}>
      {(filteredTasks ?? tasks).map((task) => (
        <TodoItem
          className={styles.item}
          key={task.id}
          {...task}
        />
      ))}
    </ul>
  )
}

export default memo(TodoList)