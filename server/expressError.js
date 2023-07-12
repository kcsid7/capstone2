
class ExpressError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}


// 400 BAD REQUEST
class BadRequestError extends ExpressError {
    constructor(message="Bad Request") {
        super(message, 400);
    }
}


// 401 UNAUTHORIZED
class UnauthorizedError extends ExpressError {
    constructor(message="Unauthorized") {
        super(message, 401);
    }
}

// 404 NOT FOUND
class NotFoundError extends ExpressError {
    constructor(message="Not Found!") {
        super(message, 404)
    }
}



module.exports = {
    ExpressError,
    NotFoundError,
    UnauthorizedError,
    BadRequestError
}