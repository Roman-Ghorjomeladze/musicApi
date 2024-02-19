import { app } from "@src/app";
import request from "supertest";

describe("app", () => {
  it(`Should return not found response when someone access not registered endpoint`, async () => {
    const res = await request(app).get("/*");
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({
      description: "Unsupported API endpoint.",
      name: "NOT_FOUND",
      httpCode: 404,
    });
  });
  it(`Should render swagger docs on /api-docs endpoint`, async () => {
    const res = await request(app).get("/api-docs");
    expect(res.statusCode).toBe(301);
  });
});
