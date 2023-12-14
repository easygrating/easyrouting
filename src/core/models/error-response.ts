import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { ResponseTypes } from "../enums";
import { HttpError } from "./http-error";

/**
 * ErrorResponse class for handling error responses.
 * @usage
```
let errorResponse = ErrorResponse.createError(StatusCodes.INTERNAL_SERVER_ERROR, ['Name is required']);
```
 */
export class ErrorResponse {
  responseType: ResponseTypes;
  code: StatusCodes;
  message: string;
  errors?: string[];
  stack?: string;

  /**
   * ErrorResponse constructor.
   * @param {number} statusCode - The HTTP status code of the error.
   * @param {string} message - The error message.
   * @param {string[]} errors - The array of validation errors.
   * @param {string} stack - Error stack trace.
   */
  constructor(
    statusCode: StatusCodes,
    message: string,
    errors?: string[],
    stack?: string
  ) {
    this.responseType = ResponseTypes.ERROR;
    this.code = statusCode;
    this.message = message;
    this.errors = errors;
    this.stack = stack;
  }

  /**
   * Factory method for creating a request error response with a default message from the http status.
   * @param {StatusCodes} statusCode - The error status code.
   * @param {string[]} errors - The array of validation errors.
   * @returns {ErrorResponse} A new ErrorResponse instance.
   */
  static createError(
    statusCode: StatusCodes,
    errors?: string[]
  ): ErrorResponse {
    const message = getReasonPhrase(statusCode);
    return new ErrorResponse(statusCode, message, errors);
  }

  /**
   * Factory method for creating a request error response from an http error object.
   *
   * This method set a custom http status from the error object and the error stack trace
   * @param {HttpError} error - The error object.
   * @returns {ErrorResponse} A new ErrorResponse instance.
   */
  static createFromHttpError(error: HttpError): ErrorResponse {
    return new ErrorResponse(
      error.code,
      error.message,
      undefined,
      error.stack
    );
  }

  /**
   * Factory method for creating a request error response from an error object.
   *
   * This method set a status 500 and the error stack trace
   * @param {Error} error - The error object.
   * @returns {ErrorResponse} A new ErrorResponse instance.
   */
  static createFromError(error: Error): ErrorResponse {
    return new ErrorResponse(
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.message,
      undefined,
      error.stack
    );
  }

  /**
   * Factory method for creating a bad request error response.
   * @param {string} message - The error message.
   * @param {string[]} errors - The array of validation errors.
   * @returns {ErrorResponse} A new ErrorResponse instance.
   */
  static badRequest(message: string, errors: string[]): ErrorResponse {
    return new ErrorResponse(StatusCodes.BAD_REQUEST, message, errors);
  }
}
