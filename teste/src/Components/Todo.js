import { Alert, Card, Button } from "react-bootstrap";

function Todo({todo, index, completeTodo, removeTodo}) {
    return (
    <Card style={{width:'100%'}} className="todo d-flex p-6">
        <Card.Body>
            <Card.Title>
                {index + ' - ' +todo.text}
            </Card.Title>
                {todo.isCompleted 
                    ? <Alert variant='success'> Done </Alert> 
                    : <Alert variant='danger'> To Do </Alert> }
            <div className='d-flex flex-row justify-content-between'>
                <Button className='p-2' variant="info" >Info</Button>
                <Button className='p-2' variant="success" onClick={() => completeTodo(index)}>Complete</Button>
                <Button className='p-2' variant="danger" onClick={()=> removeTodo(index)}>Delete</Button>
            </div>
        </Card.Body>
    </Card>
    );
}

export default Todo;