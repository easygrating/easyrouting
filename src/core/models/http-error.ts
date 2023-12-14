import { StatusCodes } from "http-status-codes";

/**
 * Error wrapper with an http status property
 */
export class HttpError extends Error {
  private _status: StatusCodes;
  constructor(message: string, statusCode: StatusCodes) {
    super(message);
    this._status = statusCode;
  }

  /**
   * Return the http status for this error
   */
  get status(): StatusCodes {
    return this._status;
  }
}
