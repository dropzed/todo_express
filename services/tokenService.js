import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()


class TokenService {
    static generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_EXPIRES_ACCESS });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_EXPIRES_REFRESH });
        return { accessToken, refreshToken };
    }

    static async saveToken(userId, refreshToken) {
        const existingToken = await prisma.token.findFirst({
            where: { userId }
        })

        if (existingToken) {
            await prisma.token.update({
                where: { id: existingToken.id },
                data: {
                    refreshToken
                }
            })
        } else {
            await prisma.token.create({
                data: {
                    userId,
                    refreshToken,
                }
            })
        }
    }

    static async removeToken(refreshToken) {
        const token = await prisma.token.findUnique({
            where: { refreshToken }
        })

        if (!token) {
            return null
        }

        await prisma.token.delete({
            where: { refreshToken }
        })

        return token
    }

    static validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)

            return userData;
        } catch (e) {
            return null;
        }
    }

    static validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)

            return userData
        } catch (e) {
            return null
        }
    }
}

export default TokenService;