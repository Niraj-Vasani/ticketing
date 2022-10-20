import { CustomeError } from "./custome-error";

export class BadRequestError extends CustomeError {
    statusCode = 400;

    constructor(public message: string) {
        super(message);

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }]
    }
}