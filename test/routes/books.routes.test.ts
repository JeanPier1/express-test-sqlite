import { describe, expect, test, it, jest } from "@jest/globals";
import request from "supertest";
import app from "../../index";

import njwt from "njwt";
// we statically generate the token
const encodeToken = (tokenData: any) => {
  const token = njwt.create(tokenData, <string>process.env["APP_SECRET"]);
  return token.compact();
};
const accessToken = encodeToken({ userId: 1 });

describe("Test Book routes", () => {
  test("It getallbook", async () => {
    request(app)
      .get("/api/book")
      .set({ Authorization: accessToken, Accept: "application/json" })
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("It create book", async () => {
    await request(app)
      .post("/api/book")
      .set({ Authorization: accessToken, Accept: "application/json" })
      .send({
        name: "El copito de nieve",
        price: 123,
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("It update book", async () => {
    await request(app)
      .put("/api/book/4")
      .set({ Authorization: accessToken, Accept: "application/json" })
      .send({
        name: "El copito",
        price: 123,
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });
  test("It getbook by Id", async () => {
    await request(app)
      .get("/api/book/1")
      .set({ Authorization: accessToken, Accept: "application/json" })
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });
  test("It delete book it", async () => {
    await request(app)
      .delete("/api/book/4")
      .set({ Authorization: accessToken, Accept: "application/json" })
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });
});
