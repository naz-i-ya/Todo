import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import NewTodo from "./NewTodo";
import { useLocalStorage } from "./useLocalStorage";
import { useMemo } from 'react'
import { v4 as uuidV4 } from "uuid"
import TodoList from "./TodoList";
import { TodoLayout } from "./TodoLayout";
import { Todos } from "./Todos";

export type Todo = {
  id: string
} & TodoData

export type RawTodo = {
  id: string
} & RawTodoData

export type RawTodoData = {
  title: string
  body: string
  tagIds: string[]
}


export type TodoData = {
  title: string
  body: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}

function App() {
  const [todos, setTodos] = useLocalStorage<RawTodo[]>('todos', [])
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])

  const todoWithTags = useMemo(() => {
    return todos.map( note => {
      return {...note, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
    })
  }, [todos, tags])


  function onCreateTodo({ tags, ...data}: TodoData) {
    setTodos(prv => {
      return [...prv, {...data, id: uuidV4(), tagIds: tags.map(tag => tag.id)},
      ]
    })
  }

  function addTag(tag: Tag) {
    setTags(prv => [...prv, tag])
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<TodoList availableTags={tags} todos={todoWithTags}/>} />
        <Route path="/new" element={<NewTodo onSubmit={onCreateTodo} onAddTag={addTag} availableTags={tags}/>} />
        <Route path="/:id" element={<TodoLayout todos={todoWithTags} />}>
          <Route index element={<Todos />} />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
