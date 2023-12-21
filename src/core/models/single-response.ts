import { SingleDataResponseInterface } from "../interfaces";
import { AbstractApiResponse } from "./abstract-api-response";

/**
 * Api single response definition
 */
export class SingleObjectResponse extends AbstractApiResponse<SingleDataResponseInterface> {
  constructor(data: unknown) {
    super();
    this.data = { data };
  }
}
