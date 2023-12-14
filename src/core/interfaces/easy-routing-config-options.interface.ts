/**
 * Global settings options
 *
 * Used to pass values EasyRoutingConfig singleton class
 */
export interface EasyRoutingConfigOptionsInterface {
  default404Handler: boolean;
  routerPath: string;
  useGenerics: boolean;
  defaultErrorHandler: boolean;
  printRouteTable: boolean;
  sendStackTrace: boolean;
}
