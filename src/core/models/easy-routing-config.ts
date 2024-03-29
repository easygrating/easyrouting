import { EasyRoutingConfigOptionsInterface } from "../interfaces";

/**
 * Singleton class for library setup
 */
export class EasyRoutingConfig {
  private static instance: EasyRoutingConfig | undefined = undefined;
  private config: EasyRoutingConfigOptionsInterface;

  private constructor() {
    this.config = {
      defaultErrorHandler: true,
      default404Handler: true,
      routerPath: "./routes",
      useGenerics: true,
      printRouteTable: false,
      sendStackTrace: false,
      printStackTrace: false,
    };
  }

  /**
   *
   * Get library configuration instance
   *
   * @returns configuration instance
   */
  static getConfig() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new EasyRoutingConfig();
    return this.instance;
  }

  /**
   * Routes directory path
   */
  get routeDir(): string {
    return this.config.routerPath;
  }

  /**
   * Use generic router
   */
  get useGenerics() {
    return this.config.useGenerics;
  }

  /**
   * Use default route handler
   */
  get defaultErrorHandler() {
    return this.config.defaultErrorHandler;
  }

  /**
   * Use default 404 handler
   */
  get default404Handler() {
    return this.config.default404Handler;
  }

  /**
   * Print route table in console
   */
  get printRouteTable() {
    return this.config.printRouteTable;
  }

  /**
   * Send error stack trace to client
   */
  get sendStackTrace() {
    return this.config.sendStackTrace;
  }

  /**
   * Print error stack trace in console
   */
  get printStackTrace() {
    return this.config.printStackTrace;
  }

  /**
   * Update library configuration values
   *
   * @param options configuration options
   */
  configure(options: Partial<EasyRoutingConfigOptionsInterface>) {
    this.config = { ...this.config, ...options };
  }
}
