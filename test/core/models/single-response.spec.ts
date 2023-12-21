import { ResponseTypes, SingleObjectResponse } from "../../../src";

describe("SingleResponse", () => {
  it("should create a single response object", () => {
    const payload = "some data";
    const response = new SingleObjectResponse(payload);
    expect(response.responseType).toBe(ResponseTypes.DEFAULT);
    expect(response.data).toHaveProperty("data");
    expect(response.data.data).toBe(payload);
  });
});
