import { Badge, Button, Col, Row, Stack } from "react-bootstrap"
import { useTodo } from "./TodoLayout"
import { Link } from "react-router-dom"

export function Todos() {
    const todo = useTodo()

    return (
    <>
    <Row className="align-items-center mb-4">
        <Col>
        <h1>{todo.title}</h1>
        {
            todo.tags.length > 0 && (
                <Stack
                gap={1}
                direction="horizontal"
                className="justify-content-center flex-wrap"
              >
                
                {todo.tags.map((tag) => (
                  <Badge key={tag.id} className="text-truncate">
                    {tag.label}
                  </Badge>
                ))}
              </Stack>
            )
        }
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button variant="primary">Create</Button>
              <Button variant="outline-secondary">Edit Tags</Button>
            </Link>
          </Stack>
        </Col>
    </Row>
    </>
    )
}