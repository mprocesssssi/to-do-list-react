import Field from "./Field"
import { useContext } from "react";
import { TasksContext } from "../context/TasksContext";

const SearchTaskForm = (props) => {
    const {
        searchQeury,
        setSearchQeury
    } = useContext(TasksContext)
    return (
        <form className="todo__form"
        onSubmit={(event) => event.preventDefault()}
        >
          <Field 
          onChange={(event) => setSearchQeury(event.target.value)}
          className="todo__field"
          label="Search task"
          id="search-task"
          type="search"
          value={searchQeury}
          />
      </form>
    )
}

export default SearchTaskForm