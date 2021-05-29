import { Alert, Card, Button } from "react-bootstrap";

function Todo({todo, completeTodo, removeTodo}) {
    return (
    <Card style={{width:'100%'}} className="todo d-flex p-6">
        <Card.Body>
            <Card.Title>
                {todo.ID + ' - ' +todo.emailUser+ ' - '+ todo.criacao}
            </Card.Title>
                {todo.isCompleted != 'false'
                    ? <Alert variant='success'> Done </Alert> 
                    : <Alert variant='danger'> Chamado Aberto </Alert> }
            <div className='d-flex flex-row justify-content-between'>
                <Button className='p-2' variant="info" >Info</Button>
                <Button className='p-2' variant="success" onClick={() => completeTodo(todo.ID)}>Complete</Button>
                <Button className='p-2' variant="danger" onClick={()=> removeTodo(todo.ID)}>Delete</Button>
            </div>
        </Card.Body>
    </Card>
    );
}

export default Todo;