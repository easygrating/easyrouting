import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { EasyRoutingConfig, ErrorResponse, HttpError } from "../core/models";

/**
 * Default error handler
 *
 * Send an error response with status code from error, or 500 if none is provided
 * @param error Error object resulting from call next(error)
 * @param req express request
 * @param res express response
 * @param next next function
 */
export function defaultErrorHandler(
  error: ErrorResponse | HttpError | Error | unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let errorResponse: ErrorResponse;

  if (error instanceof ErrorResponse) errorResponse = error;
  else if (error instanceof HttpError)
    errorResponse = ErrorResponse.createFromHttpError(error);
  else if (error instanceof Error)
    errorResponse = ErrorResponse.createFromError(error);
  else
    errorResponse = ErrorResponse.createError(
      StatusCodes.INTERNAL_SERVER_ERROR
    );

  const printError = EasyRoutingConfig.getConfig().printStackTrace;
  if (printError) console.error(error);

  if (!EasyRoutingConfig.getConfig().sendStackTrace) delete errorResponse.stack;

  res.status(errorResponse.code).send(errorResponse);
}

/**
 * Default 404 error handler
 *
 * Send an error response with a 404
 * @param req express request
 * @param res express response
 * @param next next function
 */
export function default404ErrorHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res
    .status(StatusCodes.NOT_FOUND)
    .send(ErrorResponse.createError(StatusCodes.NOT_FOUND));
}
