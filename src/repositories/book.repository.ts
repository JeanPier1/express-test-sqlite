import db from "./../config/db";
import Book from "./../models/book";

export default class {
  static async getAllBooks(): Promise<Book[]> {
    const books = await db.all("SELECT * FROM books", []);
    return <Book[]>books;
  }

  static async getBookById(id: string): Promise<Book> {
    const book = await db.get("SELECT * FROM books WHERE id = ?", [id]);
    return <Book>book;
  }

  static async createBook(item: Book): Promise<boolean> {
    const stmt = `INSERT INTO books (name, price) VALUES (?,?);`;
    try {
      await db.run(stmt, [item.name, item.price]);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  static async updateBook(item: Book): Promise<boolean> {
    const stmt = `UPDATE books SET name = ?, price= ? WHERE id = ?;`;
    try {
      await db.run(stmt, [item.name, item.price, item.id]);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  static async deleteBook(itemId: number) {
    const stmt = `DELETE FROM books WHERE id = ?;`;
    try {
      await db.run(stmt, [itemId]);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
