import { useState } from "react";

function App(){
    const [todoList, setTodoList] = useState(null);

    fetch('http://localhost:3001/api/todo')
    .then((response) => response.json())
    .then((data) => console.log(data));
    return (
        <div className='App'>
        </div>
    )
}

export default App;