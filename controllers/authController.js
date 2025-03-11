import * as argon2 from "argon2"
import {PrismaClient} from "@prisma/client";
import {verify} from "argon2";
import jwt from "jsonwebtoken";
import UserService from "../services/userService.js";
import TokenService from "../services/tokenService.js";
import TokensService from "../services/userService.js";
import tokenService from "../services/tokenService.js";
import {validationResult} from "express-validator";
import APIError from "../exceptions/apiError.js";


const prisma = new PrismaClient();

class AuthController {
    static async registration(req, res, next) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(APIError.BadRequest('Error with validation result', errors.array()));
            }

            const { username, email, password } = req.body;

            const user = await UserService.register(username, email, password);

            if (!user) {
                res.status(401).json({message: "Bad with registration user in api"});
            }
            const tokens = TokenService.generateTokens({id: user.id});

            if (!tokens) {
                res.status(401).json({message: "Bad with generate tokens in api"});
            }
            const tokenSave = await TokenService.saveToken(user.id, tokens.refreshToken);

            if (!tokenSave) {
                res.status(401).json({message: "Bad with saving tokens in api"});
            }
            res.json({...tokens, user, message: "Registration successfully"});
        } catch (e) {
            next(e);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const user = await UserService.authenticate(email, password);

            if (!user) {
                res.status(401).json({message: "Bad with authentication in api"});
            }

            const tokens = TokenService.generateTokens({id: user.id})

            if (!tokens) {
                res.status(401).json({message: "Bad with generate tokens in api"});
            }
            const saveToken = await TokenService.saveToken(user.id, tokens.refreshToken);

            if (!saveToken) {
                res.status(401).json({message: "Bad with save token in api"});
            }

            res.json({...tokens, user, message: "Login successfully"});
        } catch (e) {
            next(e);
        }
    }

    static async logout(req, res, next) {
        try {
            const { refreshToken } = req.body;

            const token = await TokenService.removeToken(refreshToken);

            if (!token) {
                return res.status(400).json({message: 'Token not found'});
            }

            res.json({message: 'Token removed, you are logout'})
        } catch (e) {
            next(e);
        }
    }

    static async refresh(req, res, next) {
        try {
            const { refreshToken } = req.body;

            const userData = tokenService.validateRefreshToken(refreshToken);

            if (!userData) {
                return res.status(401).json({message: 'Token is not valid'});
            }

            const user = await prisma.user.findUnique({
                where: { id: userData.id },
            })

            if (!user) {
                return res.status(404).json({message: 'User not found'});
            }

            const tokens = TokenService.generateTokens({
                id: user.id,
            })

            if (!tokens) {
                return res.status(401).json({message: 'Token not found'});
            }

            const saveToken = await TokenService.saveToken(user.id, tokens.refreshToken);

            if (!saveToken) {
                res.status(401).json({message: 'Bad with save token in api'});
            }

            res.json({...tokens, user, message: "Refresh token successfully"});
        } catch (e) {
            next(e);
        }
    }
}

export default AuthController;