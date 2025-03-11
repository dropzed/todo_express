import express from 'express';
import {createTodo, deleteTodo, getAllTodos, getTodoById, updateTodo} from "../controllers/toDoController.js";
import {body, validationResult} from "express-validator";
import authController from "../controllers/authController.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";


const router = express.Router();


const validate = (req, res, next) => {
    const errors  = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors});
    }
    next()
}


// jwt auth
router.post('/register',
    body('username').isLength({ min: 5, max: 12 }),
    body('email').isEmail(),
    body('password').isLength({ min: 7, max: 15 }),
    validate,
    authController.registration)

router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/refresh', authController.refresh)



// todos
router.post('/todos', authMiddleware, createTodo);
router.get('/all', authMiddleware, getAllTodos)
router.get('/:id', authMiddleware, getTodoById)
router.put('/:id', authMiddleware, updateTodo)
router.delete('/:id', authMiddleware, deleteTodo)

export default router;