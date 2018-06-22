const pgp = require('pg-promise')();// pulling in the module pg-promise. (); is used to run the function provided by the module
const cn = {                        //setting up db info
    host: 'localhost',
    port: 5432,
    database: 'super-todo-app',
    user: 'postgres',
    password: ''
};
const db = pgp(cn);                //connect! const db is saving that connection to a variable


function getOne(id) {
    return db.oneOrNone('SELECT * FROM todos WHERE id=$1', [id])     // value in brackets gets substituted into $1. This is pg-promise syntax used to prevent hackers
        //can have db.any, db.one, db.query, db.oneOrNone, db.many, etc.
}
// An examle:
// getOne(2)
//         .then(function(data) {
//             // success;
//             console.log(data);
//         })
//         .catch(function(error) {
//             // error;
//             console.log(error);
//         });


function getAll() {
    return db.any('SELECT * FROM todos');
}
//An example:  lists all the todos into in array. alltodos promise
// getAll()
//     .then((data) => { console.log(data); })
//     .catch((error) => { console.log(error); });


function getPending() {
    return db.any('SELECT * FROM todos WHERE isDone=false');
}
//An example: returns all pending todos
// getPending()
//     .then((data) => { console.log(data); })
//     .catch((error) => { console.log(error); });


function getFinished() {
    return db.any('SELECT * FROM todos WHERE isDone=true');
}
//An example: returns all completed todos
// getFinished()
//     .then((data) => { console.log(data); })
//     .catch((error) => { console.log(error); });


function searchByTitle(searchString) {
    return db.any("SELECT * FROM todos WHERE title ilike '%$1:value%'", 
    [searchString]);
}
//An example: returns todo with matching title
// searchByTitle('scoop')
//     .then((data) => { console.log(data); })
//     .catch((error) => { console.log(error); });

function deleteById(id) {
    return db.result('DELETE FROM todos WHERE id=$1', [id])
}
//An example: deletes todo by id specified
deleteById(7)
    .then((data) => { console.log(data); })
    .catch((error) => { console.log(error); });

module.exports = {
  getOne: getOne,
  getAll: getAll,
  getPending: getPending,
  getFinished: getFinished,
  searchByTitle: searchByTitle,
  deleteById: deleteById
};