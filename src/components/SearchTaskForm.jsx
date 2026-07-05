import Field from "./Field"

const SearchTaskForm = (props) => {
    const {
        searchQeury,
        setSearchQeury
    } = props
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