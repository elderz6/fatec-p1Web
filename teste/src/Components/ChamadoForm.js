import { Form, Button } from "react-bootstrap";
import { AuthApi } from '../AuthApi';
import React, { useContext } from 'react';

const ChamadoForm = () =>{
    const api = useContext(AuthApi);
    return(
        <>
        <Form>
            <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control required value={api.nome} disabled/>
            </Form.Group>
            <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control required value={api.email} disabled/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Tipo de problema</Form.Label>
                <Form.Control required as='select'>
                    <option>Hardware</option>
                    <option>Software</option>
                    <option>Operações</option>
                    <option>Rede</option>
                </Form.Control>
             </Form.Group>
             <Form.Group>
                <Form.Label>Gravidade do problema</Form.Label>
                <Form.Control required as='select'>
                    <option>Baixo</option>
                    <option>Normal</option>
                    <option>Grave</option>
                    <option>Urgente</option>
                </Form.Control>
             </Form.Group>
             <Form.Group>
                <Form.Label>Detalhes</Form.Label>
                <Form.Control required as="textarea" rows={5} style={{"resize":"none"}}/>
             </Form.Group>
             <Form.Group>
                 <Button type='submit'>
                     Criar novo chamado
                 </Button>
             </Form.Group>
        </Form>
        </>
    );
}
export default ChamadoForm;