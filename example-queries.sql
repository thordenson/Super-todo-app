--get all the todos
SELECT * FROM todos;

	
--get one todo by id
SELECT * FROM todos
	WHERE id=2;
	

--get all the pending todos
SELECT * FROM todos
	WHERE isDone=false;

--get all the completed todos
SELECT * FROM todos
	WHERE isDone=true;

--search by title, should have 0 results
SELECT * FROM todos
	WHERE title ilike '%zzzzzz%';


--search by title, should have 1 result
SELECT * FROM todos
	WHERE title ilike '%scoop%';
	
--"uncheck" a todo
UPDATE todos
    SET isDone= false
    WHERE id=1;

--"check off" a todo
UPDATE todos
    SET isDone= true
    WHERE id=2;

--change title of a todo
UPDATE todos
    SET title='cook amazing dinner'
    WHERE id=3;

--change title AND isDONE
UPDATE todos
    SET title='cook amazing dinner',
    isDone= true
    WHERE id=3;

--delete by ID
DELETE FROM todos
    WHERE id=4;

--delete all finished todos where isDone is true
DELETE FROM todos
    WHERE isDone= true;



	

	
