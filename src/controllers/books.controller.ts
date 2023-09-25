import { Request, Response } from "express";
import repo from "../repositories/book.repository";
import book from "../models/book";

export default class {
  static async getAll(req: Request, res: Response, next: Function) {
    let items = await repo.getAllBooks();
    return res.send({ items });
  }

  static async getById(req: Request, res: Response, next: Function) {
    let item = await repo.getBookById(req.params.id);
    if (!item) {
      return res.status(404).send(item);
    }
    return res.send({ item });
  }

  static async create(req: Request, res: Response, next: Function) {
    if (!req.body.name || !req.body.price) {
      const err: Error = new Error("Item name and price are required.");
      return next(err);
    }
    const newItem = new book(req.body.name, req.body.price);
    const success = await repo.createBook(newItem);
    return res.send({ success, item: newItem });
  }

  static async update(req: Request, res: Response, next: Function) {
    if (!req.params.id || !req.body.name || !req.body.price) {
      const err: Error = new Error("Item id, name and price are required.");
      return next(err);
    }
    req.body = {
        ...req.body,
        id:req.params.id
    };
    let success = await repo.updateBook(req.body);
    return res.send({ success, item: req.body });
  }

  static async delete(req: Request, res: Response, next: Function) {
    if (!req.params.id) {
      const err: Error = new Error("Item id is required.");
      return next(err);
    }
    let deleted = await repo.deleteBook(Number(req.params.id));
    return res.send({ success: deleted });
  }
}
