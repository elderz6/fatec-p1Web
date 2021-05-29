import { useState, useEffect } from "react";
import Todo from './Todo';
import axios from 'axios'
import { Redirect } from 'react-router-dom';

const Dashboard = () => {
    const [todos, setTodos] = useState('');

    const addTodo = obj => {
        const newTodos = obj;
        setTodos(newTodos);
    }

    const completeTodo = async index => {
        const update = await axios.patch('/chamados', {id:index});
        const newChamados = await getChamados();
        addTodo(newChamados);
    }

    const removeTodo = index => {

    }

    const getChamados = async () => {
        const teste = await axios.get('/chamados');
        const result = teste.data
        return result
    }
    useEffect( async () => {
       let teste = await getChamados();
       addTodo(teste);
    }, []);
    return (
        <div className='cardContainer d-flex flex-wrap'>
            {todos ? todos.map((todo, index) => {
                return <Todo
                    key={index}
                    index={index}
                    todo={todo}
                    completeTodo={completeTodo}
                    removeTodo={removeTodo}
                />
            }) : ''}
        </div>
    )
}

export default Dashboard;