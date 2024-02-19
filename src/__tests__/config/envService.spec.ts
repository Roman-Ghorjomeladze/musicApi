import { EnvService } from "@src/config/EnvService";

describe("EnvService", () => {
  it(`Should have getAppPort property`, () => {
    expect(EnvService.getAppPort()).toBeDefined();
  });
  it(`Should have getJwtSecret property`, () => {
    expect(EnvService.getJwtSecret()).toBeDefined();
  });
  it(`Should have getSearchMusicUrl property`, () => {
    expect(EnvService.getSearchMusicUrl()).toBeDefined();
  });
});
