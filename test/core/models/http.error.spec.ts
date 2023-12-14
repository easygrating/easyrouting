import { HttpError } from "../../../src";

describe("HttpError", () => {
  it("should create an http error with a staus code", () => {
    const message = "custom http error";
    const code = 400;
    const error = new HttpError(message, code);
    expect(error.code).toBe(code);
    expect(error.message).toBe(message);
  });
});
