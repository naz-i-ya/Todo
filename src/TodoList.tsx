import { Col, Row, Stack, Button, Form, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { useState, useMemo } from "react";
import { Tag } from "./App";
import styles from "./TodoList.module.css";

type SimplifiedTodo = {
  tags: Tag[];
  title: string;
  id: string;
};

type TodoListProps = {
  availableTags: Tag[];
  todos: SimplifiedTodo[];
};

const TodoList = ({ availableTags, todos }: TodoListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      return (
        (title === "" ||
          todo.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            todo.tags.some((todoTag) => todoTag.id === tag.id)
          ))
      ); //all tags match
    });
  }, [title, selectedTags, todos]);

  return (
    <div>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Todos</h1>
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
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                isMulti
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredTodos.map((note) => (
          <Col key={note.id}>
            <TodoCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TodoList;

function TodoCard({ id, title, tags }: SimplifiedTodo) {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
    >
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <span className="fs-5">{title}</span>
          {tags.length > 0 && (
            <Stack
              gap={1}
              direction="horizontal"
              className="justify-content-center flex-wrap"
            >
              {tags.map((tag) => (
                <Badge key={tag.id} className="text-truncate">
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}
