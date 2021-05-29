import { Form, Button } from "react-bootstrap";
import { AuthApi } from '../AuthApi';
import React, { useContext, useState } from 'react';
import axios from 'axios';

const ChamadoForm = () =>{
    const api = useContext(AuthApi);
    const [valueTipo, setValueTipo] = useState('Hardware');
    const [valueGravidade, setValueGravidade] = useState('Baixo');
    const [valueDesc, setValueDesc] = useState('');

    const handleChamado = async e => {
        e.preventDefault();
        const chamado = {
            nome: api.nome,
            email: api.email,
            tipo: valueTipo,
            gravidade: valueGravidade,
            desc: valueDesc
        }
        console.log(chamado);
        await axios.post('/chamados', chamado)
    }

    return(
        <>
        <Form onSubmit={handleChamado}>
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
                <Form.Control required as='select' 
                onChange={e => setValueTipo(e.target.value)}>
                    <option>Hardware</option>
                    <option>Software</option>
                    <option>Operações</option>
                    <option>Rede</option>
                </Form.Control>
             </Form.Group>
             <Form.Group>
                <Form.Label>Gravidade do problema</Form.Label>
                <Form.Control required as='select' 
                onChange={e => setValueGravidade(e.target.value)}>
                    <option>Baixo</option>
                    <option>Normal</option>
                    <option>Grave</option>
                    <option>Urgente</option>
                </Form.Control>
             </Form.Group>
             <Form.Group>
                <Form.Label>Detalhes</Form.Label>
                <Form.Control required as="textarea" rows={5} style={{"resize":"none"}}
                onChange={e => setValueDesc(e.target.value)}/>
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