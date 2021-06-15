import { Form, Button } from "react-bootstrap";
import React, { useState } from 'react';
import axios from 'axios';

const Recover = () => {
    const [valueEmail, setValueEmail] = useState('');

    const handleReset = e => {
        e.preventDefault();
        axios.post('/recover', {email:valueEmail});
    }

    return(
        <>
        <Form onSubmit={handleReset}>
        <Form.Group>
            <Form.Label>E-mail</Form.Label>
                <Form.Control onChange={e => setValueEmail(e.target.value)} required/>
            </Form.Group>
            <Form.Group>
                 <Button type='submit'>
                     Solicitar Reset de Senha
                 </Button>
             </Form.Group>
        </Form>
        </>
    );
}

export default Recover;