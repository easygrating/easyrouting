import { ListDataResponseInterface } from "../interfaces";
import { AbstractApiResponse } from "./abstract-api-response";

/**
 * Api list response definition
 */
export class ListResponse extends AbstractApiResponse<ListDataResponseInterface> {
  constructor(data: unknown[], total: number, limit: number, offset: number) {
    super();
    this.data = {
      data,
      total,
      offset,
      limit,
    };
  }
}
