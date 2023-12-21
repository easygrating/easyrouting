import { ResponseTypes } from "../enums";
/**
 * Api response definition
 */
export abstract class AbstractApiResponse<T = undefined> {
  responseType: ResponseTypes;
  data!: T;

  constructor() {
    this.responseType = ResponseTypes.DEFAULT;
  }
}
