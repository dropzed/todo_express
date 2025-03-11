import {PrismaClient} from "@prisma/client";
import * as argon2 from "argon2";


const prisma = new PrismaClient()


class UserService {
    static async register(username, email, password) {
        const existingUser = await prisma.user.findUnique({
            where: {email}
        })
        if (existingUser) {
            throw new Error('User already exists')
        }

        const hashedPassword = await argon2.hash(password)

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,

            }
        })

        return newUser;
    }

    static async authenticate(email, password) {
        const user = await prisma.user.findUnique({
            where: {email}
        })

        if (!user) {
            throw new Error('User does not exist')
        }

        const isPasswordValid = await argon2.verify(user.password, password);

        if (!isPasswordValid) {
            throw new Error('Invalid password')
        }

        return user;
    }
}

export default UserService;