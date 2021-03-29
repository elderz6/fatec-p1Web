import { Alert, Card, Button } from "react-bootstrap";

function Todo({todo, index, completeTodo, removeTodo}) {
    return (
    <Card className="todo col-4">
        <Card.Body>
            <Card.Title>
                {index + ' - ' +todo.text}
            </Card.Title>
            <Card.Text>
                {todo.isCompleted 
                    ? <Alert variant='success'> Done </Alert> 
                    : <Alert variant='danger'> To Do </Alert> }
            </Card.Text>
            <div className=''>
                <Button className='col-4' variant="info" >Info</Button>
                <Button className='col-4' variant="success" onClick={() => completeTodo(index)}>Complete</Button>
                <Button className='col-4' variant="danger" onClick={()=> removeTodo(index)}>Delete</Button>
            </div>
        </Card.Body>
    </Card>
    );
}

export default Todo;