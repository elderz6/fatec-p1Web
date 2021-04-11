import { Nav } from "react-bootstrap";
import { AuthApi } from "../AuthApi";
import { Redirect } from 'react-router-dom';
import { useContext } from "react";

const SecretNav = ({role}) => {
    const {doLogout} = useContext( AuthApi );
    const logout = async () => {
        await doLogout();
        return(
            <Redirect to='/login'/>
        )
    }
    return(
        <Nav className="mr-auto">
            <Nav.Link href="/dashboard">Ver Chamados</Nav.Link>
            <Nav.Link href="/novoChamado">Abrir Chamado</Nav.Link>
            {role === 'Gestor'? <Nav.Link href="/cadastrarAnalista"> Cadastrar Analista</Nav.Link>
            : '' }
            <Nav.Link onClick={() => logout()} className='text-left'>
                  Logout
            </Nav.Link>
        </Nav>
);}

export default SecretNav;