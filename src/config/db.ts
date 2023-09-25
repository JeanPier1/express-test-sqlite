import * as sqlite from "sqlite3";
const sqlite3 = sqlite.verbose();
import * as bcrypt from "bcrypt";
const saltRounds = 10;
const db = new sqlite3.Database("./src/db/sqlite.db");

export default class {
  static db() {
    db.serialize(function () {
      // Drop tables:
      const dropUsersTable = "DROP TABLE IF EXISTS users";
      db.run(dropUsersTable);
      const dropBooksTable = "DROP TABLE IF EXISTS books";
      db.run(dropBooksTable);
      // Create Tables:
      const createUsersTable =
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,email TEXT, password text)";
      db.run(createUsersTable);
      const createBooksTable =
        "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price NUMERIC)";
      db.run(createBooksTable);

      let password = "123";
      const hashSync = bcrypt.hashSync(password, saltRounds) 
      const insertUsers = `INSERT INTO users (email, password) VALUES ('foo@bar.com', '${hashSync}');`;
      db.run(insertUsers);
      const insertItems = `INSERT INTO books (name, price) VALUES ('book-poo', 12.99), ('book-master', 15.99), ('book-milk', 3.99);`;
      db.run(insertItems);
    });
  }

  static all(stmt: string, params: any) {
    return new Promise((res, rej) => {
      db.all(stmt, params, (error, result) => {
        if (error) {
          return rej(error.message);
        }
        return res(result);
      });
    });
  }
  static get(stmt: string, params: any) {
    return new Promise((res, rej) => {
      db.get(stmt, params, (error, result) => {
        if (error) {
          return rej(error.message);
        }
        return res(result);
      });
    });
  }

  static run(stmt: string, params: any) {
    return new Promise((res, rej) => {
      db.run(stmt, params, (error: any, result: any) => {
        if (error) {
          return rej(error.message);
        }
        return res(result);
      });
    });
  }
}
