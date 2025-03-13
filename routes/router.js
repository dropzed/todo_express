import express from 'express';
import todoController from "../controllers/toDoController.js";
import {body, validationResult} from "express-validator";
import authController from "../controllers/authController.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";
// import {todoPrivateController} from "../controllers/toDoPrivateController.js";
import {checkTodoOwnership} from "../middlewares/checkOwnership.js";
import todoPrivateController from "../controllers/toDoPrivateController.js";
import { PrismaClient} from "@prisma/client";


const prisma = new PrismaClient();

const router = express.Router();


const validate = (req, res, next) => {
    const errors  = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors});
    }
    next()
}


router.get('/health', async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.status(200).json({status: "OK", database: 'connected'})
    } catch (e) {
        res.status(500).json({status: "error", error: e});
    }
})

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
router.post('/todos', authMiddleware, todoController.createTodo);
router.get('/all', authMiddleware, todoController.getAllTodos)
router.get('/:id', authMiddleware, todoController.getTodoById)
router.put('/:id', authMiddleware, todoController.updateTodo)
router.delete('/:id', authMiddleware, todoController.deleteTodo)




// private todos
router.post('/me/todos', authMiddleware, todoPrivateController.createTodo);
router.get('/me/todos/my', authMiddleware, todoPrivateController.getMyTodos);
router.get('/me/todos/:id', authMiddleware, checkTodoOwnership, todoPrivateController.getTodo);
router.put('/me/todos/:id', authMiddleware, checkTodoOwnership, todoPrivateController.updateTodo);
router.delete('/me/todos/:id', authMiddleware, checkTodoOwnership, todoPrivateController.deleteTodo);




export default router;