import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom";
import { Todo } from "./App";

type TodoLayoutProps = {
    todos: Todo[]
}


export function TodoLayout ({ todos }: TodoLayoutProps) {
const { id } = useParams()

const todo = todos.find(n => n.id === id)

if(todo === null) return <Navigate to='/' replace />

return <Outlet  context={todo}/>
}

export function useTodo() {
    return useOutletContext<Todo>()
}