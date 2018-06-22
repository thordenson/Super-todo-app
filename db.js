const pgp = require('pg-promise')();// pulling in the module pg-promise. (); is used to run the function provided by the module
const cn = {                        //setting up db info
    host: 'localhost',
    port: 5432,
    database: 'super-todo-app',
    user: 'postgres',
    password: ''
};
const db = pgp(cn);                //connect! const db is saving that connection to a variable

function getTodo(id) {
    db.any('SELECT * FROM todos WHERE id=$1', [id])      // value in brackets gets substituted into $1. This is pg-promise syntax used to prevent hackers
        .then(function(data) {
            // success;
            console.log(data);
        })
        .catch(function(error) {
            // error;
            console.log(error);
        });
}
//getTodo(2);


module.exports = {
  getTodo: getTodo
};