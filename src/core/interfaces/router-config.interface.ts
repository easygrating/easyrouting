import { Handler, Router } from "express";

/**
 * Route configuration
 */
export interface RouterConfigInterface {
  path: string;
  order?: number;
  middlewares?: Handler[];
  router: Router;
  name?: string;
}
