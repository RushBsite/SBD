const express = require('express');
const app = express();
const user_inform = require('./routes/user_inform');
 
app.use('/user_inform', user_inform);
 
const port = 3001;
app.listen(port, () => console.log(`Node.js Server is running on port ${port}...`));
