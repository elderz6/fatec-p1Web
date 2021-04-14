import React from 'react';
import { Alert } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';

export function pwValidation(pwValid, valuePw){
    let alerts = [];
    if(valuePw.search(/[A-Z+]/) < 0) alerts.push("Caracter maíusculo");
    if(valuePw.search(/[a-z+]/) < 0) alerts.push("Caracter minusculo");
    if(valuePw.search(/[0-9+]/) < 0) alerts.push("Numero");
    if(valuePw.search(/[!@#$%¨&*()?<>]/) <0) alerts.push("Caracter especial");
    if(pwValid !== valuePw) alerts.push("As senhas devem ser iguais");
    
    let res = alerts.length > 0 ?
        <Alert> As Senhas devem Conter:
            {alerts.map( (alert, index) => {
            return <Alert key={index} variant="warning">{alert}</Alert>})}
        </Alert> : '';
        return(res);
}

export function duplicateValidation(duplicateUser){
    if(duplicateUser)
        return(
        <Alert variant="danger"> Usuário já cadastrado </Alert>
    );
}

export function successForm(cadastroSucesso) {
    if(cadastroSucesso === true){
        return(
            <>
                <Alert variant="success"> Cadastrado com Sucesso </Alert>
                <Redirect to='/'/>
            </>
    )}
}

export function emailValidation() {
    
}