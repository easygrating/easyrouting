import { Application, Handler } from "express";
import { EasyRoutingConfig } from "../src/core/models";
import { RoutingInitializer } from "../src/routing-initializer";
import { RouterConfigInterface } from "../src/core/interfaces";
import petRouter from "../example/routes/pets.routes";

describe("routing-initializer", () => {
  EasyRoutingConfig.getConfig().configure({
    defaultErrorHandler: false,
    useGenerics: false,
    default404Handler: false,
    routerPath: "./example/routes",
  });

  let app: Partial<Application>;

  beforeEach(() => {
    app = {
      use: jest.fn(),
    };
  });

  it("must initialize routes", async () => {
    const mockFn = app.use as jest.Mock;
    await RoutingInitializer(app as Application);
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it("must use routes in the right order", async () => {
    const mockFn = app.use as jest.Mock;
    await RoutingInitializer(app as Application);
    expect(mockFn).toHaveBeenNthCalledWith(1, "/users", {});
    expect(mockFn).toHaveBeenNthCalledWith(2, "/pets", {});
  });

  it("must set middlewares to router", async () => {
    const fakeMiddleware: Handler = jest.fn();
    (petRouter as RouterConfigInterface).middlewares = [fakeMiddleware];
    const mockFn = app.use as jest.Mock;
    await RoutingInitializer(app as Application);
    expect(mockFn).toHaveBeenNthCalledWith(2, "/pets", fakeMiddleware, {});
    (petRouter as RouterConfigInterface).middlewares = [];
  });
});
