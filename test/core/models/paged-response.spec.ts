import { ListResponse, PagedResponse, ResponseTypes } from "../../../src";

describe("PagedtResponse", () => {
  it("should create a paged response object", () => {
    const payload = {
      data: [],
      total: 53,
      pageSize: 10,
      page: 3,
      totalPages: 6,
    };
    const response = new PagedResponse(
      payload.data,
      payload.total,
      payload.pageSize,
      payload.page
    );
    expect(response.responseType).toBe(ResponseTypes.DEFAULT);
    expect(response.data).toEqual(payload);
  });
});
