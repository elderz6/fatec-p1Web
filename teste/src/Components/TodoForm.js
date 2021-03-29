import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

function TodoForm({ addTodo }) {
    const [value, setValue] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        addTodo(value);
        setValue('');
    }

    return (
    <Card>
    <Card.Body>
        <Card.Title>
            Add Todo
        </Card.Title>
        <Form className='formContainer' onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="New Todo"
                    value={value}
                    onChange={e => setValue(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </Card.Body>
    </Card>
    )
}

export default TodoForm;