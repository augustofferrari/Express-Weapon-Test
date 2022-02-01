import CustomError from "./custom.errors";

export class AuthenticationError extends CustomError {
  constructor(message: string) {
    super(message);
  }
}

export class InvalidTokenError extends CustomError {
  constructor(message: string) {
    super(message);
  }
}
