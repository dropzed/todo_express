import ApiError from '../exceptions/apiError.js'
import TokenService from '../services/tokenService.js'


export const authMiddleware = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization

        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError())
        }

        const accessToken = authorizationHeader.split(' ')[1]

        if (!accessToken) {
            return next(ApiError.UnauthorizedError())
        }

        const UserData = TokenService.validateAccessToken(accessToken);

        if (!UserData) {
            return next(ApiError.UnauthorizedError())
        }

        req.user = UserData;
        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}