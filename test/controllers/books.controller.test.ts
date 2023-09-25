import { describe, expect, test, it, jest } from "@jest/globals";
import bookscontroller from "../../src/controllers/books.controller";
let req, res, next;

describe("BooksController", () => {
  it("create", async () => {
    req = {
      body: {
        price: 12,
        name: "book",
      },
    };

    res = {
      send: jest.fn(),
    };
    next = jest.fn();
    await bookscontroller.create(req, res, next);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledTimes(0);
  });

  it("list", async () => {
    req = {};
    res = {
      send: jest.fn(),
    };
    next = jest.fn();
    await bookscontroller.getAll(req, res, next);
    expect(res.send).toHaveBeenCalledTimes(1)
    // console.log(res.send.mock.lastCall[0]);
    expect(res.send.mock.calls.length).toBe(1);
    expect(next).toHaveBeenCalledTimes(0);
  });
  it("update", async () => {
    req = {
      body: {
        price: 12,
        name: "book",
      },
      params: {
        id: 5,
      },
    };
    res = {
      send: jest.fn(),
    };
    next = jest.fn();
    await bookscontroller.update(req, res, next);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledTimes(0);
  });

  it("getById",async ()=>{
     req = {
      body: {
      },
      params: {
        id: 5,
      },
    };
    res = {
      send: jest.fn(),
    };
    next = jest.fn();
    await bookscontroller.getById(req, res, next);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledTimes(0);
  });
    it("delete",async ()=>{
     req = {
      body: {
      },
      params: {
        id: 5,
      },
    };
    res = {
      send: jest.fn(),
    };
    next = jest.fn();
    await bookscontroller.delete(req, res, next);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledTimes(0);
  });
});
