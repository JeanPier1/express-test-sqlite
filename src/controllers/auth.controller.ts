import njwt from "njwt";
import repo from "../repositories/user.prepository";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../models/users";
import { JwtBody } from "../models/jwt";
// import * as crypto from "crypto";

const APP_SECRET = <string>process.env["APP_SECRET"];

const encodeToken = (tokenData: any) => {
  // const signingKey: Buffer = crypto.randomBytes(256);
  const token = njwt.create(tokenData, <string>process.env["APP_SECRET"]);
  token.setExpiration(new Date().getTime() + 60 * 60 * 1000 * 24 * 7); // One week from now
  return token.compact();
};

const decodeToken = (token: string) => {
  return njwt.verify(token, <string>process.env["APP_SECRET"]);
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const token = req.header("Authorization");
  if (!token) {
    return next();
  }
  try {
    const decoded = decodeToken(token);
    const { userId } = decoded?.body as unknown as JwtBody;
    const user: User = <User>await repo.getUserById(userId.toString());
    
    if (user) {
      req.body.userId = userId;
    }
  } catch (e) {
    return next();
  }
  next();
};

export const authenticated = (req: Request, res: Response, next: any) => {
  if (req.body.userId) {
    return next();
  }

  res.status(401);
  res.json({ error: "User not authenticated" });
};

const returnInvalidCredentials = (res: Response) => {
  res.status(401);
  return res.json({ error: "Invalid username or password" });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = <User>await repo.getUserByEmail(email);
  if (!user) {
    return returnInvalidCredentials(res);
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      const accessToken = encodeToken({ userId: user.id });
      return res.json({ accessToken });
    } else {
      return returnInvalidCredentials(res);
    }
  });
};

export const signup = async (req: Request, res: Response) => {
  const user: User = req.body;
  const created: boolean = await repo.createUser(user);

  if (created) {
    return res.send(
      "Success! You have successfully signed up. Please login to continue."
    );
  } else {
    const error: Error = new Error(
      "Oh no! There was an error signing up. Please try again."
    );
    return res.status(500).send({ error: error.message });
  }
};
