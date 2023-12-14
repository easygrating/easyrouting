import { NextFunction, Request, Response } from "express";
import {
  EasyRoutingConfig,
  ErrorResponse,
  HttpError,
} from "../../src/core/models";
import { default404ErrorHandler, defaultErrorHandler } from "../../src/routes";
import { StatusCodes } from "http-status-codes";

describe("error-handler", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  const config = EasyRoutingConfig.getConfig();
  config.configure({
    defaultErrorHandler: false,
    useGenerics: false,
    default404Handler: false,
    routerPath: "./example/routes",
    sendStackTrace: true,
  });

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    next = jest.fn();
  });

  it("should set 404 status to request and send a response error with a default message", () => {
    const errorCode = StatusCodes.NOT_FOUND;
    const notFoundResponse = ErrorResponse.createError(errorCode);
    default404ErrorHandler(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(errorCode);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith(notFoundResponse);
  });

  it("should send an error response", () => {
    const errorCode = StatusCodes.NOT_IMPLEMENTED;
    const errorResponse = ErrorResponse.createError(errorCode);
    defaultErrorHandler(errorResponse, req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(errorCode);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith(errorResponse);
  });

  it("should send an error response from an error object", () => {
    const errorMessage = "standard error";
    const errorObj = new Error(errorMessage);
    const errorResponse = ErrorResponse.createFromError(errorObj);
    defaultErrorHandler(errorObj, req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith(errorResponse);
  });

  it("should send an error response from an http error object", () => {
    const errorMessage = "standard error";
    const errorCode = StatusCodes.BAD_REQUEST;
    const errorObj = new HttpError(errorMessage, errorCode);
    const errorResponse = ErrorResponse.createFromHttpError(errorObj);
    defaultErrorHandler(errorObj, req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(errorObj.code);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith(errorResponse);
  });

  it("should send an error response from an unknown error property", () => {
    const unknownErrorProp = "unknown error prop";
    const errorResponse = ErrorResponse.createError(
      StatusCodes.INTERNAL_SERVER_ERROR
    );
    defaultErrorHandler(
      unknownErrorProp,
      req as Request,
      res as Response,
      next
    );
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith(errorResponse);
  });

  it("should not send stack trace to client", () => {
    const errorMessage = "error with stack trace";
    const errorObj = new Error(errorMessage);
    const errorResponse = ErrorResponse.createFromError(errorObj);
    config.configure({
      sendStackTrace: false,
    });
    defaultErrorHandler(errorObj, req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.send).toHaveBeenCalledTimes(1);
    delete errorResponse.stack;
    expect(res.send).toHaveBeenCalledWith(errorResponse);
    config.configure({
      sendStackTrace: true,
    });
  });
});
