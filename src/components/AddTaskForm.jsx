import Button from "./Button";
import Field from "./Field";

const AddTaskForm = (props) => {
    const {
        addTask,
        newTaskTitle,
        setNewTaskTitle,
        newTaskInputRef
    } = props

    const onSubmit = (event) => {
        event.preventDefault()
        addTask()
    }
    return (
        <form className="todo__form"onSubmit={onSubmit}>
            <Field
                className="todo__label"
                label="New task title"
                id="new-task"
                ref={newTaskInputRef}
                value={newTaskTitle}
                onChange={(event) => setNewTaskTitle(event.target.value)}
            />
            <Button type="submit">Add</Button>
        </form>
    )
}

export default AddTaskForm
