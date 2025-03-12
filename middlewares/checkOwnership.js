import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

export const checkTodoOwnership = async (req, res, next) => {
    try {
        const todo = await prisma.todo.findUnique({
            where: { id: Number(req.params.id) }
        });

        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        if (todo.userId !== req.user.id) {
            return res.status(403).json({ error: 'Forbidden: Not your todo' });
        }

        req.todo = todo
        next();
    } catch (error) {
        next(error);
    }
};