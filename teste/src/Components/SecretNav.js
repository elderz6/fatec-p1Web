import { Nav, NavDropdown } from "react-bootstrap";

const SecretNav = () => (
        <Nav className="mr-auto">
            <Nav.Link href="/dashboard">Ver Chamados</Nav.Link>
            <Nav.Link href="#">Abrir Chamado</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
        </Nav>
);

export default SecretNav;