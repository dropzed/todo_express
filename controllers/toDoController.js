import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class TodoController {
    static async getAllTodos(req, res) {
        try {
            const todos = await prisma.todo.findMany()

            if (!todos) {
                return res.status(401).json({ message: "Bad with prisma in api" })
            }

            return res.status(200).json(todos)
        } catch (e) {
            return res.status(500).json({ message: 'Cannot resolve todos', error: e })
        }
    }

    static async getTodoById(req, res) {
        const { id } = req.params

        try {
            const todo = await prisma.todo.findUnique({
                where: { id: parseInt(id) }
            })

            if (!todo) {
                return res.status(401).json({ message: "Bad with prisma in api" })
            }

            return res.status(200).json(todo)
        } catch (e) {
            return res.status(500).json({ message: 'Cannot resolve todo', error: e })
        }
    }

    static async createTodo(req, res) {
        const { title, description } = req.body

        try {
            const newTodo = await prisma.todo.create({
                data: { title, description }
            })

            if (!newTodo) {
                return res.status(401).json({ message: "Bad with create todo prisma in api" })
            }

            return res.status(201).json(newTodo)
        } catch (error) {
            return res.status(500).json({ message: 'Cannot create todo', error })
        }
    }

    static async updateTodo(req, res) {
        const { id } = req.params
        const { title, description } = req.body

        try {
            const existingTodo = await prisma.todo.findUnique({
                where: { id: parseInt(id) }
            })

            if (!existingTodo) {
                return res.status(404).json({ error: 'Задача не найдена' })
            }

            const updatedTodo = await prisma.todo.update({
                where: { id: parseInt(id) },
                data: {
                    title: title || existingTodo.title,
                    description: description || existingTodo.description
                }
            })

            if (!updatedTodo) {
                return res.status(401).json({ message: "Bad with update todo prisma in api" })
            }

            return res.status(200).json(updatedTodo)
        } catch (e) {
            return res.status(500).json({ message: 'Cannot update todo', error: e })
        }
    }

    static async deleteTodo(req, res) {
        const { id } = req.params

        try {
            const existingTodo = await prisma.todo.delete({
                where: { id: parseInt(id) }
            })

            if (!existingTodo) {
                return res.status(401).json({ message: "Bad with delete todo prisma in api" })
            }

            return res.status(200).json({ message: 'Exercise deleted' })
        } catch (e) {
            return res.status(500).json({ message: 'Cannot delete todo', error: e })
        }
    }
}

export default TodoController