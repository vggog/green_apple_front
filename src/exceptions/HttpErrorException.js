export class UnauthorizedError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
       }
}


export class MasterNotFoundError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
       }
}


export class MasterWhorstPasswordError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
       }
}
