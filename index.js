const express = require('express');
const app = express();

const Todo = require('./db');          // returns the module.exports functions from db.js

const expressHbs = require('express-handlebars');
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');


//* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 

app.get('/', (req, res) => {
    Todo.getAll()
        .then((data) => {
            console.log(data);          //stringing http and database info together
            // res.send(data);
            res.render('homepage', {
                todos: data
            });
        })
        .catch((error) => {console.log(error); 
    });
});

app.get('/:id', (req, res) => {
    Todo.getOne(req.params.id)
        .then((data) => {
            console.log(data);         
            res.send(data);
            // res.render('todo-render-page', data);
        })
        .catch((error) => {console.log(error); 
    });
});


app.listen(3000, () => {
    console.log('Your server is running Port 3000');
});




