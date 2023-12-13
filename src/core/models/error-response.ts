import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { ResponseTypes } from "../enums";

/**
 * ErrorResponse class for handling error responses.
 * @usage
```
let errorResponse = ErrorResponse.createError(StatusCodes.INTERNAL_SERVER_ERROR, ['Name is required']);
```
 */
export class ErrorResponse {
  responseType: ResponseTypes;
  statusCode: StatusCodes;
  message: string;
  errors: string[];

  /**
   * ErrorResponse constructor.
   * @param {number} statusCode - The HTTP status code of the error.
   * @param {string} message - The error message.
   * @param {string[]} errors - The array of validation errors.
   */
  constructor(statusCode: StatusCodes, message: string, errors: string[]) {
    this.responseType = ResponseTypes.ERROR;
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
  }

  /**
   * Factory method for creating a request error response.
   * @param {StatusCodes} statusCode - The error status code.
   * @param {string} message - The error message.
   * @param {string[]} errors - The array of validation errors.
   * @returns {ErrorResponse} A new ErrorResponse instance.
   */
  static createError(statusCode: StatusCodes, errors: string[]): ErrorResponse {
    const message = getReasonPhrase(statusCode);
    return new ErrorResponse(statusCode, message, errors);
  }
}
