export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
        Error.captureStackTrace(this, this.constructor);
    }
}

export class UnauthorizedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UnauthorizedError';
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ConflictError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ConflictError';
        Error.captureStackTrace(this, this.constructor);
    }
}
