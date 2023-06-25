import TodoForm from './TodoForm'
import { TodoData, Tag } from './App'

type NewTodoProps = {
  onSubmit: (data: TodoData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

const NewTodo = ({ onSubmit, onAddTag, availableTags }: NewTodoProps) => {
  return (
    <div>
      <h1 className='mb-4'>
        New Todo
      </h1>
      <TodoForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags}/>
    </div>
  )
}

export default NewTodo