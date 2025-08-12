import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_SECRET!;

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, ACCESS_SECRET, (err, decoded) => {
    if (err) {
      res.sendStatus(403);
      return;
    }

    if (
      typeof decoded === "object" &&
      decoded !== null &&
      "id" in decoded &&
      "username" in decoded
    ) {
      req.user = {
        id: (decoded as any).id,
        username: (decoded as any).username,
      };
      next();
    } else {
      res.sendStatus(403); // invalid token payload
      return;
    }
  });
}
