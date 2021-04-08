import { Form } from "react-bootstrap";

const ChamadoForm = () =>{
    return(
        <>
        <Form>
            <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control />
            </Form.Group>
            <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control />
            </Form.Group>
            <Form.Group>
                <Form.Label>Tipo de problema</Form.Label>
                <Form.Control as='select'>
                    <option>Hardware</option>
                    <option>Software</option>
                    <option>Operações</option>
                    <option>Rede</option>
                </Form.Control>
             </Form.Group>
             <Form.Group>
                <Form.Label>Gravidade do problema</Form.Label>
                <Form.Control as='select'>
                    <option>Baixo</option>
                    <option>Normal</option>
                    <option>Grave</option>
                    <option>Urgente</option>
                </Form.Control>
             </Form.Group>
        </Form>
        </>
    );
}
export default ChamadoForm;