class CustomError extends Error {
  status?: number;

  constructor(message: string, status: number = 500) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
  }
}

export class DuplicateUserError extends CustomError {
  constructor() {
    super("Username or email already exists", 409);
  }
}

export class InsertFailedError extends CustomError {
  constructor() {
    super("Failed to create user", 500);
  }
}