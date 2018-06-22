const express = require('express');
const app = express();

const Todo = require('./db');          // returns the module.exports functions from db.js


//* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 

app.get('/', (req, res) => {
    Todo.getAll()
        .then((data) => {
            console.log(data);          //stringing http and database info together
            res.send(data);
        })
        .catch((error) => {console.log(error); 
    });
});

app.listen(3000, () => {
    console.log('Your server is running Port 3000');
});





