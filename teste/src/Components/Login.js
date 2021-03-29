import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import AuthApi from '../AuthApi';
import React from 'react';

const Login = () => {
    const [valueEmail, setValueEmail] = useState('');
    const [valuePw, setValuePw] = useState('');
    const authApi = React.useContext(AuthApi);
    const handleLogin = e => {
        e.preventDefault();
        if (!valueEmail || !valuePw) return;
        authApi.setAuth(true);
        setValueEmail('');
        setValuePw('');
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
                        required type="email" 
                        placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        onChange={e => setValuePw(e.target.value)}
                        value={valuePw}
                        required type="password" 
                        placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
            <div className='col-3'></div>
        </div>
    )
}

export default Login;