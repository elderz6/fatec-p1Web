import { Navbar } from "react-bootstrap";
import SecretNav from "./SecretNav";
import React, { useContext } from 'react'
import { AuthApi } from "../AuthApi";

const Navs = () => {
    const { auth, role } = useContext(AuthApi); 
    return(
    <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Consulta de Chamados</Navbar.Brand>
        {auth ? <SecretNav role={role}/> : '' }
    </Navbar>
);}

export default Navs;