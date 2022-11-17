const express = require('express');
const app = express();
const user_inform = require('./routes/user_inform');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());

let id = 2;
const todoList = [{
    id: 1,
    text: '할일 1',
    done: false,
}];

app.get('/api/todo', (req, res) => {
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
app.listen(port, () => {
    console.log(`Node.js Server is running on port ${port}...`);
});
