import { Nav } from "react-bootstrap";

const SecretNav = ({role}) => (
        <Nav className="mr-auto">
            <Nav.Link href="/dashboard">Ver Chamados</Nav.Link>
            <Nav.Link href="/novoChamado">Abrir Chamado</Nav.Link>
            {role === 'Gestor'? <Nav.Link href="/cadastrarAnalista"> Cadastrar Analista</Nav.Link>
            : '' }
        </Nav>
);

export default SecretNav;