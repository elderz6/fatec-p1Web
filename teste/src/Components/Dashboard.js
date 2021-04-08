import { useState } from "react";
import Todo from './Todo';
import TodoForm from './TodoForm';
const Dashboard = () => {
    const [todos, setTodos] = useState([
        {
            text: 'Authentication',
            isCompleted: true
        },
        {
            text: 'Authorization',
            isCompleted: true
        },
        {
            text: 'Backend',
            isCompleted: true
        },
        {
            text: 'Open a modal to view ticket details',
            isCompleted: false
        },
    ]);

    const addTodo = text => {
        const newTodos = [...todos, { text, isCompleted: false }];
        setTodos(newTodos);
    }
    const completeTodo = index => {
        const newTodos = [...todos];
        newTodos[index].isCompleted = true;
        setTodos(newTodos);
    }
    const removeTodo = index => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos)
    }
    return (
        <div className='cardContainer d-flex flex-wrap'>
            {todos.map((todo, index) => {
                return <Todo
                    key={index}
                    index={index}
                    todo={todo}
                    completeTodo={completeTodo}
                    removeTodo={removeTodo}
                />
            })}
        </div>
    )
}

export default Dashboard;