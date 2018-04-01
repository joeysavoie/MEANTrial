const express = require('express');
const router = express.Router();

// Getting the Todo Controller that we just created
const todoController = require('../../controllers/todo.controller');

// Map each API to the Controller FUnctions

router.get('/', todoController.getTodos)

router.post('/', todoController.createTodo)

router.put('/', todoController.updateTodo)

router.delete('/:id',todoController.removeTodo)

// Export the Router
module.exports = router;