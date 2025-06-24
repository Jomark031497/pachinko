export class ApiError extends Error {
  statusCode: number;
  details?: Record<string, unknown>;

  constructor(message: string, statusCode: number, details?: Record<string, unknown>) {
    super(message);
    this.name = "CustomApiError"; // Good practice for custom errors
    this.statusCode = statusCode;
    this.details = details;
  }
}
