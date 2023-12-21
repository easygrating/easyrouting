import { PagedDataResponseInterface } from "../interfaces";
import { AbstractApiResponse } from "./abstract-api-response";

/**
 * Api paged response definition
 */
export class PagedResponse extends AbstractApiResponse<PagedDataResponseInterface> {
  constructor(data: unknown[], total: number, pageSize: number, page: number) {
    super();
    this.data = { data, total, page, pageSize, totalPages: 0 };
    this.updateTotalPages();
  }

  /**
   * Update total pages from total data and pageSize
   * Use this method whenever total and/or pageSize changes
   */
  updateTotalPages() {
    this.data.totalPages = Math.ceil(this.data.total / this.data.pageSize);
  }
}
