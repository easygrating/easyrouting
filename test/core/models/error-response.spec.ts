import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { ErrorResponse } from "../../../src/core/models/error-response";
import { HttpError } from "../../../src";

describe("ErrorResponse", () => {
  it("should correctly set properties in constructor", () => {
    const errors = ["Error 1", "Error 2"];
    const errorResponse = new ErrorResponse(
      StatusCodes.BAD_REQUEST,
      getReasonPhrase(StatusCodes.BAD_REQUEST),
      errors
    );

    expect(errorResponse.responseType).toEqual("error");
    expect(errorResponse.code).toEqual(StatusCodes.BAD_REQUEST);
    expect(errorResponse.message).toEqual(
      getReasonPhrase(StatusCodes.BAD_REQUEST)
    );
    expect(errorResponse.errors).toEqual(errors);
  });

  it("should create error response with factory method", () => {
    const errors = ["Error 1", "Error 2"];
    const errorResponse = ErrorResponse.createError(
      StatusCodes.BAD_REQUEST,
      errors
    );

    expect(errorResponse.responseType).toEqual("error");
    expect(errorResponse.code).toEqual(StatusCodes.BAD_REQUEST);
    expect(errorResponse.message).toEqual(
      getReasonPhrase(StatusCodes.BAD_REQUEST)
    );
    expect(errorResponse.errors).toEqual(errors);
  });

  it("should create error response from a standard js error", () => {
    const errorMessage = "custom error message";
    const errorResponse = ErrorResponse.createFromError(
      new Error(errorMessage)
    );

    expect(errorResponse.responseType).toEqual("error");
    expect(errorResponse.code).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(errorResponse.message).toBe(errorMessage);
    expect(errorResponse.errors).toBe(undefined);
  });

  it("should create error response from a http error", () => {
    const errorMessage = "custom error message";
    const errorCode = StatusCodes.NOT_ACCEPTABLE;
    const errorResponse = ErrorResponse.createFromHttpError(
      new HttpError(errorMessage, errorCode)
    );

    expect(errorResponse.responseType).toEqual("error");
    expect(errorResponse.code).toEqual(errorCode);
    expect(errorResponse.message).toBe(errorMessage);
    expect(errorResponse.errors).toBe(undefined);
  });

  it("should create a bad request error response with custom message", () => {
    const errors = ["Name is required"];
    const message = "Validation error";
    const errorResponse = ErrorResponse.badRequest(message, errors);

    expect(errorResponse.responseType).toBe("error");
    expect(errorResponse.code).toBe(StatusCodes.BAD_REQUEST);
    expect(errorResponse.message).toBe(message);
    expect(errorResponse.errors).toEqual(errors);
  });
});
