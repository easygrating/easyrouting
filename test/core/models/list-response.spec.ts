import { ListResponse, ResponseTypes } from "../../../src";

describe("ListResponse", () => {
  it("should create a list response object", () => {
    const payload = {
      data: [],
      total: 53,
      offset: 3,
      limit: 10,
    };
    const response = new ListResponse(
      payload.data,
      payload.total,
      payload.limit,
      payload.offset
    );
    expect(response.responseType).toBe(ResponseTypes.DEFAULT);
    expect(response.data).toEqual(payload);
  });
});
