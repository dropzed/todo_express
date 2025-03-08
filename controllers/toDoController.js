import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllTodos = async (req, res) => {
    try {
        const todos = await prisma.todo.findMany()
        res.status(200).json(todos)
    } catch (e) {
        res.status(500).json({message: 'Cannot resolve todos', error: e})
    }
}

export const getTodoById = async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await prisma.todo.findUnique({
            where: { id: parseInt(id) }
        })

        res.status(200).json(todo)
    } catch (e) {
        res.status(500).json({message: 'Cannot resolve todo',error: e})
    }
}

export const createTodo = async (req, res) => {
    const { title, description } = req.body;

    try {
        const newTodo = await prisma.todo.create({
            data: {
                title,
                description
            }
        })

        res.status(201).json(newTodo)
    } catch (error) {
        res.status(500).json({message: 'Cannot create todo', error: error})
    }
}

export const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const existingTodo = await prisma.todo.findUnique({
            where: { id: parseInt(id) }
        })

        if (!existingTodo) {
            return res.status(404).json({ error: 'Задача не найдена' });
        }

        const updatedTodo = await prisma.todo.update({
            where: { id: parseInt(id) },
            data: {
                title: title || existingTodo.title,
                description: description || existingTodo.description
            }
        });

        res.status(200).json(updatedTodo)
    } catch (e) {
        res.status(500).json({message: 'Cannot update todo', error: e})
    }
}

export const deleteTodo = async (req, res) => {
    const { id } = req.params;

    try {
        const existingTodo = await prisma.todo.delete({
            where: { id: parseInt(id) }
        })

        res.status(200).json({message: 'Exercise deleted'})
    } catch (e) {
        res.status(500).json({ message: 'Cannot delete todo', error: e})
    }
}