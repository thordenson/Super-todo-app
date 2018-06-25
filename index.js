const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const Todo = require('./db');          // returns the module.exports functions from db.js

const expressHbs = require('express-handlebars');
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

const static = express.static;
app.use(static('public'));

//* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 

app.get('/', (req, res) => {            //.get Homepage
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


app.get('/new', (req, res) => {             //.get/add new todo
    console.log('This is the /new route');
    res.render('todo-create-page')
  });
  
app.post('/new', (req, res) => {           //.post the newley addded todo
  console.log(req.body);

    Todo.add(req.body.title)               
      .then((data) => {
        //   console.log(data);
        //   res.send(data);
        res.redirect(`/${data.id}`);
      })

});


app.get('/:id', (req, res) => {             //.get detail page for specified todo
    console.log('This is the /:id route');
    Todo.getOne(req.params.id)
        .then((data) => {
            console.log(data);         
            // res.send(data);
            res.render('todo-detail-page', data);
        })
        .catch((error) => {console.log(error); 
    });
});


app.get('/edit', (req, res) => {               //.get detail page for specified todo
    console.log('This is the /edit route');
    Todo.setTitle(req.params.id)
        .then((data) => {
            console.log(data);
            res.render('todo-edit-page', data);
    });
});

app.post('/edit', (req, res) => {           
    console.log(req.body);
  
    Todo.setTitle(req.body.title)               
        .then((data) => {
          res.redirect(`/${data.id}`);
        });
  });



app.listen(3000, () => {
    console.log('Your server is running Port 3000');
});




