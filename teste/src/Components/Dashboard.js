import { useState, useEffect, useContext } from "react";
import Todo from './Todo';
import axios from 'axios'
import { AuthApi } from "../AuthApi";

const Dashboard = () => {
    const [todos, setTodos] = useState('');
    const  api  = useContext(AuthApi);

    const addTodo = obj => {
        const newTodos = obj;
        setTodos(newTodos);
    }

    const updateTodo = async (id, descricao) => {
        const update = await axios.patch('/chamados', { id: id, descricao:descricao });
        const newChamados = await getChamados();
        addTodo(newChamados);
    }

    const getChamados = async () => {
        const chamados = await axios.get('/chamados');
        const result = chamados.data;
        return result
    }

    const getChamadosUser = async (email) => {
        const chamados = await axios.post('/chamadosUser', {id:email});
        const result = chamados.data;
        return result
    }

    useEffect(() => {
        async function fetchChamados() {
            if(api.role !== 'Cliente'){
                const chamados = await getChamados();
                addTodo(chamados);
            }
            else{
                const chamados = await getChamadosUser(api.email);
                addTodo(chamados);
        }}
        fetchChamados()
    }, [api.role, api.email]);

    return (
        <div className='cardContainer d-flex flex-wrap'>
            {todos ? todos.map((todo, index) => {
                return <Todo
                    key={index}
                    index={index}
                    todo={todo}
                    updateTodo={updateTodo}
                />
            }) : ''}
        </div>
    )
}

export default Dashboard;