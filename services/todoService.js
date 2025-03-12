import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()


class TodoService {
    static async createTodo(data, userId) {
        return prisma.todo.create({
            data: {
                ...data,
                userId
            }
        });
    }

    static async getUserTodos(userId) {
        return prisma.todo.findMany({
            where: { userId }
        });
    }

    static async getTodoById(id, userId) {
        return prisma.todo.findFirst({
            where: {
                id: parseInt(id),
                userId
            }
        });
    }

    static async updateTodo(id, data, userId) {
        return prisma.todo.update({
            where: { id: parseInt(id) },
            data,
            include: { user: false }
        });
    }

    static async deleteTodo(id) {
        return prisma.todo.delete({
            where: { id: parseInt(id) }
        });
    }
}

export default TodoService;