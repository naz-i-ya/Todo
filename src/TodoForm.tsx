import { Form, Stack, Row, Col, Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"

import CreateableReactSelect from 'react-select/creatable'

import { FormEvent, useRef, useState } from "react"
import { TodoData,Tag } from "./App"
import { v4 as uuidV4 } from "uuid"

type TodoFormProps = {
    onSubmit: (data: TodoData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}


const TodoForm = ({ onSubmit, onAddTag, availableTags }: TodoFormProps) => {
    const titleRef = useRef<HTMLInputElement>(null)
    const bodyRef = useRef<HTMLTextAreaElement>(null)

    const [selectedTags, setSelectedTags] = useState<Tag[]>([])

    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        onSubmit({
            title: titleRef.current!.value,
            body: bodyRef.current!.value,
            tags: selectedTags,
        })

        navigate('..');
    }

  return (
    <Form onSubmit={handleSubmit}>
        <Stack gap={4}>
           <Row>
            <Col>
            <Form.Group controlId='title'>
                <Form.Label>Title</Form.Label>
                <Form.Control required ref={titleRef} />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId='tags'>
                <Form.Label>Tags</Form.Label>
                <CreateableReactSelect
                onCreateOption={label => {
                    const newTag = { id: uuidV4(), label}

                    onAddTag(newTag)
                    setSelectedTags(prv => [...prv, newTag])
                }}
                 isMulti value={selectedTags.map(tag => {return { label: tag.label, value: tag.id}})}

                 options={availableTags.map(tag => {
                    return { label: tag.label, value: tag.id}
                 })}
                onChange={tags => {setSelectedTags(tags.map(tag => { return { label: tag.label, id: tag.value}}))}}
                />

            </Form.Group>
            </Col>
           </Row>
           <Form.Group controlId="body">
            <Form.Label>Body</Form.Label>
            <Form.Control required as='textarea' rows={15} ref={bodyRef}/>
           </Form.Group>
        </Stack>
        <Stack direction='horizontal' gap={2} className="justify-content-end">
            <Button type='submit' variant="primary">Save</Button>
            <Link to='..'>
            <Button type='button'variant="outline-secondary">Cancel</Button>
            </Link>
        </Stack>
    </Form>
  )
}

export default TodoForm