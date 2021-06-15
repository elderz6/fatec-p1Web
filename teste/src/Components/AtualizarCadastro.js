import { Form, Button } from "react-bootstrap";
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { pwValidation } from './utils.js';
import { AuthApi } from '../AuthApi';

const AtualizarCadastro = () => {
    const api = useContext(AuthApi);
    const [valueNome, setValueNome] = useState(api.nome);
    const [valuePw, setValuePw] = useState('');
    const [pwValid, setpwValid] = useState('');
    const [valueTelefone, setValueTelefone] = useState('');

    const handleDados = async e => {
        console.log('dados');
        const user = {
            email:api.email,
            nome:valueNome,
            telefone:valueTelefone
        }
        const newDados = await axios.post('/updateDados', user);
    }

    const handleSenha = async e => {
        const user = {
            email:api.email,
            password:valuePw
        }
        const newDados = await axios.post('/updateDados', user);
    }

    return (
        <div className='loginForm '>
            <div className='p-3'></div>
            <h3>Atualizar Dados</h3>
            <div className='p-6'>
                <Form onSubmit={handleDados}>
                    <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            onChange={e => setValueNome(e.target.value)}
                            pattern="[A-z, ' ']{3,50}"
                            value={valueNome}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control
                            value={valueTelefone}
                            onChange={e => setValueTelefone(e.target.value)}
                            maxLength="12"
                            pattern="[0-9]{12}"
                            required placeholder='11912345678'
                        />
                    </Form.Group>
                    <Button variant="primary" type='submit'>
                        Atualizar
                    </Button>
                </Form>
                <br/><br/>
                <Form onSubmit={handleSenha}>
                    <h3>Atualizar Senha</h3>
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
                    {pwValidation(pwValid, valuePw)}
                    <Button variant="primary" type='submit'>
                        Atualizar Senha
                    </Button>
                </Form>
            </div>
            <div className='col-3'></div>
        </div>
    )
}

export default AtualizarCadastro;