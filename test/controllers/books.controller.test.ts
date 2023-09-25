import { describe, expect, test, it, jest } from "@jest/globals";
import bookscontroller from "../../src/controllers/books.controller";
import bookRepo from "../../src/repositories/book.repository";


let req, res, next;

describe("BooksController", () => {
  it("create", () => {
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
    bookscontroller.create(req, res, next);
    expect(res.send).toHaveBeenCalledTimes(0);
    expect(next).toHaveBeenCalledTimes(0);
  });

  // it("getall",()=>{
  //    const req = {  };  
  //    const  res ={
      
  //    };

  // })
});

