import todoService from '../services/todoService.js';

class TodoPrivateController {
    static async createTodo(req, res, next) {
        try {
            const todo = await todoService.createTodo(req.body, req.user.id);
            res.status(201).json(todo);
        } catch (error) {
            next(error);
        }
    }

    static async getMyTodos(req, res, next) {
        try {
            const todos = await todoService.getUserTodos(req.user.id);
            res.json(todos);
        } catch (error) {
            next(error);
        }
    }

    static async getTodo(req, res, next) {
        try {
            const todo = await todoService.getTodoById(req.params.id, req.user.id);
            if (!todo) return res.status(404).json({ error: 'Todo not found' });
            res.json(todo);
        } catch (error) {
            next(error);
        }
    }

    static async updateTodo(req, res, next) {
        try {
            const updatedTodo = await todoService.updateTodo(
                req.params.id,
                req.body,
                req.user.id
            );
            res.json(updatedTodo);
        } catch (error) {
            next(error);
        }
    }

    static async deleteTodo(req, res, next) {
        try {
            await todoService.deleteTodo(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default TodoPrivateController;