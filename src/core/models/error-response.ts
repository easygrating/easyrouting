import { StatusCodes } from "http-status-codes";

/**
 * ErrorResponse class for handling error responses.
 * @usage
```
let errorResponse = ErrorResponse.badRequest('Invalid input', ['Name is required']);
```
 */
export class ErrorResponse {
  responseType: string;
  statusCode: number;
  message: string;
  errors: string[];

  /**
   * ErrorResponse constructor.
   * @param {number} statusCode - The HTTP status code of the error.
   * @param {string} message - The error message.
   * @param {string[]} errors - The array of validation errors.
   */
  constructor(statusCode: number, message: string, errors: string[]) {
    this.responseType = "error";
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
  }

  /**
   * Factory method for creating a bad request error response.
   * @param {string} message - The error message.
   * @param {string[]} errors - The array of validation errors.
   * @returns {ErrorResponse} A new ErrorResponse instance.
   */
  static badRequest(message: string, errors: string[]) {
    return new ErrorResponse(StatusCodes.BAD_REQUEST, message, errors);
  }

  // TODO: more static methods for other status codes can be added as needed or through inheritance.
}
