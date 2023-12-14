import { StatusCodes } from "http-status-codes";

/**
 * Error wrapper with an http status code property
 */
export class HttpError extends Error {
  private _code: StatusCodes;
  constructor(message: string, statusCode: StatusCodes) {
    super(message);
    this._code = statusCode;
    this.name = "HttpError";
  }

  /**
   * Return the http status code for this error
   */
  get code(): StatusCodes {
    return this._code;
  }
}
