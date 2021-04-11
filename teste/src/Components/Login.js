import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import {AuthApi} from '../AuthApi';
import React, { useContext } from 'react';
import axios from "axios";

const Login = () => {
    const [valueEmail, setValueEmail] = useState('');
    const [valuePw, setValuePw] = useState('');
    const [role, setRole] = useState('Cliente');
    const [userError, setUserError] = useState(false);
    const { doAuth } = useContext(AuthApi);

    const userFoundAlert = () => {
        if(userError) return<Alert variant='danger'> Usuário não encontrado </Alert>
    }

    const handleLogin = async e => {
        e.preventDefault();
        if (!valueEmail || !valuePw) return;
        await axios.post('/login', {email:valueEmail, password:valuePw, role:role})
            .then(res => {
                if(res.data.auth === 'ok') {
                    doAuth({
                        auth:true, 
                        role:res.data.role, 
                        email:res.data.email, 
                        nome:res.data.nome
                    });
                }else setUserError(true);
            });
    }
    return (
        <div className='loginForm row'>
            <div className='col-3'></div>
            <div className='col-6'>
                <Form onSubmit={handleLogin}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                        onChange={e => setValueEmail(e.target.value)} 
                        value={valueEmail}
                        maxLength="60"
                        required type="email" 
                        placeholder="Email" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control 
                        onChange={e => setValuePw(e.target.value)}
                        value={valuePw}
                        required type="password"
                        maxLength="20"
                        placeholder="Senha" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> Tipo de Usuario </Form.Label>
                        <Form.Control onChange={e => setRole(e.target.value)} as='select'>
                            <option>Cliente</option>
                            <option>Analista</option>
                            <option>Gestor</option>
                        </Form.Control>
                    </Form.Group>
                    <div className='row'>
                        <div className='col-4'>
                        <Button variant="success" type="submit">
                            Entrar
                        </Button>
                        </div>
                        <div className='col-4'></div>
                        <div className='col-4 text-right'>
                        <Button variant="primary" href='/cadastro'>
                            Cadastrar
                        </Button>
                        </div>
                    </div>
                </Form>
                {userFoundAlert()}
            </div>
            <div className='col-3'></div>
        </div>
    )
}

export default Login;