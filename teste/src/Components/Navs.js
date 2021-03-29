import { Navbar } from "react-bootstrap";
import SecretNav from "./SecretNav";
const Navs = ({isAuthenticated}) => {
    return(
    <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Consulta de Chamados</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {isAuthenticated ? <SecretNav /> : '' }
    </Navbar>
);}

export default Navs;