import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import dao from "./src/config/db";

import {
  authenticated,
  authMiddleware,
} from "./src/controllers/auth.controller";
import authRoutes from "./src/routes/auth.routes";
import booksRoutes from "./src/routes/books.routes";

dotenv.config();

const app: Express = express();

dao.db();

app.get("/", (req: Request, res: Response) => {
  res.json({
    name: "Express + TypeScript Server",
  });
});

app.use(express.json());
app.use(authMiddleware);
app.use("/api/auth", authRoutes);
app.use("/api/book", authenticated ,booksRoutes);

export default app;
