import { useEffect, useState } from "react";
import axios from 'axios';

const Server_URL = 'http://localhost:3001/api/todo';
function App(){
    const [todoList, setTodoList] = useState(null);

    const fetchData = async () => {
        const response = await axios.get(Server_URL);
        setTodoList(response.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const text = e.target.text.value;
        const done = e.target.done.checked;
        await axios.post(Server_URL, { text, done });
        fetchData();
        // fetch('http://localhost:3001/api/todo', {
        //     method: 'POST',
        //     headers:{
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         text,
        //         done,
        //     }),
        // });
    };

    return (
    
        <div className="App">
            <h1>
                Todo list
            </h1>
            <form onSubmit={onSubmitHandler}>
                <input name="text"/>
                <input name="done" type="checkbox"/>
                <input type="submit" value='추가'/>
            </form>
            {todoList?.map((todo) => (
                <div key={todo.id}>
                    <div>{todo.id}</div>
                    <div>{todo.text}</div>
                    <div>{todo.done ? 'Y' : 'N'}</div>
                </div>
            ))}
        </div>
        
    )

}

export default App;