import Field from "@/shared/ui/Field"
import { useContext } from "react";
import { TasksContext } from "@/entities/todo/model/TasksContext";

const SearchTaskForm = (props) => {
    const { styles } = props
    const {
        searchQuery,
        setsearchQuery,
    } = useContext(TasksContext)
    return (
        <form className={styles.form}
        onSubmit={(event) => event.preventDefault()}
        >
          <Field 
          onChange={(event) => setsearchQuery(event.target.value)}
          className={styles.field}
          label="Search task"
          id="search-task"
          type="search"
          value={searchQuery}
          />
      </form>
    )
}

export default SearchTaskForm