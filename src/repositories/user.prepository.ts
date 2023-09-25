import User from "../models/users";
import db from "./../config/db";
import * as bcrypt from "bcrypt";
const saltRounds = 10;

export default class {
  static async getUserByEmail(email: string): Promise<User> {
    const user = await db.get("SELECT * FROM users WHERE email =?", [email]);
    return <User>user;
  }

  static async getUserById(id: string): Promise<User> {
    const user = await db.get("SELECT * FROM users WHERE id = ?", [id]);
    return <User>user;
  }

  static async createUser(user: User): Promise<boolean> {
    await bcrypt.hash(user.password, saltRounds, async function(err, hash) {
      if (err) {
        return false;
      }
      const insertUsers = `INSERT INTO users (email, password) VALUES (?,?);`;
      try {
        await db.run(insertUsers, [user.email, hash]);
        return true;
      } catch (ex) {
        console.error(ex);
        return false;
      }
    });
    return true;
  }
}
