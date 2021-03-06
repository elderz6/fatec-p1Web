import { Form, Button } from "react-bootstrap";
import React, { useState } from 'react';
import axios from 'axios';
import  {pwValidation, duplicateValidation, successForm} from './utils.js';

const CadastroAnalista = () => {
    const [valueNome, setValueNome] = useState('');
    const [valueEmail, setValueEmail] = useState('');
    const [valuePw, setValuePw] = useState('');
    const [pwValid, setpwValid] = useState('');
    const [valueTelefone, setValueTelefone] = useState('');
    const [roleValue] = useState('Analista');
    const [duplicateUser, setDuplicateUser] = useState(false);
    const [cadastroSucesso, setCadastroSucesso] = useState(false);

    const handleCadastro = async e => {
        e.preventDefault();
        if(pwValidation(pwValid, valuePw) !== '') return;
        if (!valueEmail || !valuePw) return;
        const filteredMail = valueEmail.replace(/\s/g, '');
        const newUser = {
            nome:valueNome,
            email:filteredMail,
            password:valuePw,
            telefone:valueTelefone,
            role: roleValue
        }
        await axios.post('/user', newUser)
            .then(res => {
                if(res.data.erro === 1062) {
                    setDuplicateUser(true);
                    setCadastroSucesso(false);
            }else setCadastroSucesso(true);
        });
    }

    return (
        <div className='loginForm '>
            {successForm(cadastroSucesso)}
            <div className='p-3'></div>
            <h3>Cadastro de Analista</h3>
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
                    {duplicateValidation(duplicateUser)}
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
                    <Form.Group>
                        <Form.Label> Tipo de Usuario </Form.Label>
                        <Form.Control as='select' disabled>
                            <option>Analista</option>
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

export default CadastroAnalista;