import CustomError from "./custom.errors";
export class ResourceNotFoundError extends CustomError {
  constructor(message: string) {
    super(message);
  }
}
