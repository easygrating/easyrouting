/**
 * Single data response
 */
export interface SingleDataResponseInterface {
  data: unknown;
}

/**
 * List data response
 */
export interface ListDataResponseInterface {
  data: unknown[];
  total: number;
  limit: number;
  offset: number;
}

/**
 * List response in page format
 */
export interface PagedDataResponseInterface {
  data: unknown[];
  total: number;
  pageSize: number;
  totalPages: number;
  page: number;
}
