import { Application } from "express";
import * as loader from "@easygrating/nmodules-loader";
import { EasyRoutingConfig } from "./core/models";
import { RouterConfigInterface } from "./core/interfaces";
import _ from "lodash";
import { EventEmitter } from "events";
import { RouterInitEvents } from "./core/enums";

/**
 * Library init events
 */
export const routerEvents = new EventEmitter();

/**
 * EasyRouting initialization function
 *
 * @param app express application object
 */
export async function RoutingInitializer(app: Application) {
  const config: EasyRoutingConfig = EasyRoutingConfig.getConfig();

  routerEvents.emit(RouterInitEvents.BEFORE_INIT, app);

  const routes = await setupRoutes(app, config);

  routerEvents.emit(RouterInitEvents.AFTER_INIT, app, routes);
}

/**
 * Load routes from a given path
 *
 * @param app express application
 * @param config global library configuration
 */
async function setupRoutes(app: Application, config: EasyRoutingConfig) {
  const routesConfig: RouterConfigInterface[] = await loader.loadModules(
    config.routeDir,
    {
      recursive: true,
      exclude: ["index.js"],
    }
  );

  const routeConsole: RouterConfigInterface[] = [];
  const routes = _.orderBy(routesConfig, ["order"]);

  for (let routeConfig of routes) {
    if (!!routeConfig.middlewares && routeConfig.middlewares.length)
      app.use(routeConfig.path, ...routeConfig.middlewares, routeConfig.router);
    else app.use(routeConfig.path, routeConfig.router);
    routeConsole.push(routeConfig);
  }

  if (config.printRouteTable)
    console.table(routeConsole, ["order", "path", "name"]);
}
