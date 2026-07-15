import { useRef } from "react"

const useIncompleteTaskScoll = (tasks)=> {
    const firstIncompleteTaskRef = useRef(null)
    const firstIncompleteTaskId = tasks.find(({isDone}) => !isDone)?.id

    return {
        firstIncompleteTaskId,
        firstIncompleteTaskRef
    }
}

export default useIncompleteTaskScoll