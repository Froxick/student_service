export class HttpError extends Error {
    constructor(
        public readonly statusCode : number,
        message: string,
        public readonly details? : any
    ) {
        super(message)
        Object.setPrototypeOf(this,HttpError.prototype)
    }
     


}