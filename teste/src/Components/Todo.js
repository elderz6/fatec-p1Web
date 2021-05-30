import { Alert, Card, Button, Modal, Table, Form } from "react-bootstrap";
import { useState } from 'react'

function Todo({todo, updateTodo, removeTodo}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [detalhes, setDetalhes] = useState(todo.descricao);

    const handleUpdate = () => {
        updateTodo(todo.ID, detalhes);
        handleClose();
    }

    return (
    <Card style={{width:'100%'}} className="todo d-flex p-6">
        <Card.Body>
            <Card.Title>
                {todo.ID + ' - ' +todo.emailUser+ ' - '+ todo.criacao}
            </Card.Title>
                {todo.isCompleted !== 'false'
                    ? <Alert variant='success'> Done </Alert> 
                    : <Alert variant='danger'> Chamado Aberto </Alert> }
            <div className='d-flex flex-row justify-content-between'>
                <Button className='p-2' variant="info" onClick={handleShow}>Info</Button>
                <Button className='p-2' variant="success" onClick={() => updateTodo(todo.ID)}>Complete</Button>
                <Button className='p-2' variant="danger" onClick={()=> removeTodo(todo.ID)}>Delete</Button>
            </div>
        </Card.Body>
        
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalhes do Chamado {todo.ID}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Concluido</th>
                    <th>Gravidade</th>
                    <th>Tipo</th>
                    <th>Email</th>
                    <th>Criação</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{todo.ID}</td>
                    <td>{todo.isCompleted}</td>
                    <td>{todo.gravidade}</td>
                    <td>{todo.tipo}</td>
                    <td>{todo.emailUser}</td>
                    <td>{todo.criacao}</td>
                    </tr>
                </tbody>
            </Table>
            <Form>
            <Form.Label>Descrição do Chamado</Form.Label>
            <Form.Control required as="textarea" rows={5} 
            style={{"resize":"none"}} 
            value={detalhes} onChange={e => setDetalhes(e.target.value)}/>
            </Form>
            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
    );
}

export default Todo;