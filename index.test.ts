import request from "supertest";

import app from "./index";
import { describe, expect, test } from "@jest/globals";

describe("Test index.ts", () => {
  test("Cath-all route", async () => {
    const res = await request(app).get("/");
    expect(res.body).toEqual({ name: "Express + TypeScript Server" });
  });
});
