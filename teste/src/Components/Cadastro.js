import { Form, Button, Alert } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const Cadastro = () => {
    const [valueNome, setValueNome] = useState('');
    const [valueEmail, setValueEmail] = useState('');
    const [valuePw, setValuePw] = useState('');
    const [pwValid, setpwValid] = useState('');
    const [valueTelefone, setValueTelefone] = useState('');
    const [roleValue, setRole] = useState('Cliente');

    const [duplicateUser, setDuplicateUser] = useState(false);
    const [cadastroSucesso, setCadastroSucesso] = useState(false);

    const pwValidation = () => {
        if (pwValid !== valuePw) {
            return (
                <Alert variant="danger"> As senhas devem ser iguais </Alert>
        )}
    }
    const duplicateValidation = () => {
        if(duplicateUser)
            return(
            <Alert variant="danger"> Usuário já cadastrado </Alert>
        );
    }
    const successForm = () => {
        if(cadastroSucesso === true){
            return(
                <>
                    <Alert variant="success"> Cadastrado com Sucesso </Alert>
                    <Redirect to='/'/>
                </>
            )}
    }

    const handleCadastro = async e => {
        e.preventDefault();
        if (!valueEmail || !valuePw) return;
        const newUser = {
            nome:valueNome,
            email:valueEmail,
            password:valuePw,
            telefone:valueTelefone,
            role: roleValue
        }
        await axios.post('/user', newUser)
            .then(res => {
                if(res.data.erro === 1062) {
                    setDuplicateUser(true);
                    setCadastroSucesso(false);
            }});
        }

    return (
        <div className='loginForm '>
            {successForm()}
            <div className='p-3'></div>
            <div className='p-6'>
                <Form onSubmit={handleCadastro}>
                    <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            onChange={e => setValueNome(e.target.value)}
                            pattern="[A-z, ' ']{6,50}"
                            value={valueNome}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            onChange={e => setValueEmail(e.target.value)}
                            value={valueEmail}
                            required type="email"
                        />
                    </Form.Group>
                    {duplicateValidation()}
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                            onChange={e => setValuePw(e.target.value)}
                            value={valuePw}
                            maxLength="20"
                            required type="password"
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPasswordValidation">
                        <Form.Label>Confirmar Senha</Form.Label>
                        <Form.Control
                            onChange={e => setpwValid(e.target.value)}
                            value={pwValid}
                            maxLength="20"
                            required type="password"
                        />
                    </Form.Group>
                        {pwValidation()}
                    <Form.Group>
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control
                            value={valueTelefone}
                            onChange={e => setValueTelefone(e.target.value)}
                            maxLength="12"
                            required placeholder='(11)91111-1111'
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> Tipo de Usuario </Form.Label>
                        <Form.Control as='select' disabled>
                            <option>Cliente</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type='submit'>
                        Cadastrar
                    </Button>
                </Form>
            </div>
            <div className='col-3'></div>
        </div>
    )
}

export default Cadastro;