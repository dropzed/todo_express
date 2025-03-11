export default class APIError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new APIError(401, 'Unauthorized user');
    }

    static BadRequest(message, errors = []) {
        return new APIError(400, message, errors);
    }
}