const express = require('express');
const app = express();
const user_inform = require('./routes/user_inform');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const todoList = [{
    id: 1,
    text: '할일 1',
    done: false,
}];

app.get('/', function (req, res) {
    res.send('Hello World');
})

app.get('api/todo', () => {
    res.json(todoList);
})

app.post('/api/todo', (req, res) => {
    const { text, done } = req.body;
    todoList.push({
        id: id++,
        text,
        done,
    });
    return res.send('success');
});

 
app.use('/user_inform', user_inform);
 
const port = 3001;
app.listen(port, () => console.log(`Node.js Server is running on port ${port}...`));
