import { EasyRoutingConfig } from "../../../src";

describe("easy-routing-config", () => {
  const config = EasyRoutingConfig.getConfig();

  it("must create a configuration with default values", () => {
    expect(config.routeDir).toEqual("./routes");
    expect(config.useGenerics).toBe(true);
    expect(config.defaultErrorHandler).toBe(true);
  });

  it("must be singleton", () => {
    expect(config).toBe(EasyRoutingConfig.getConfig());
  });

  it("must be configurable", () => {
    config.configure({
      defaultErrorHandler: false,
      useGenerics: false,
      routerPath: "somePath",
    });
    expect(config.routeDir).toEqual("somePath");
    expect(config.useGenerics).toBe(false);
    expect(config.defaultErrorHandler).toBe(false);
  });
});
