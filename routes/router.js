import express from 'express';
import {createTodo, deleteTodo, getAllTodos, getTodoById, updateTodo} from "../controllers/toDoController.js";

const router = express.Router();

router.post('/todos', createTodo);
router.get('/all', getAllTodos)
router.get('/:id', getTodoById)
router.put('/:id', updateTodo)
router.delete('/:id', deleteTodo)

export default router;