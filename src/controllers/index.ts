import { eq } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../database";
import { User, users } from "../schemas/users";

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const usersResponse: User[] = await db.select().from(users);
    return res.status(200).json(usersResponse);
  } catch (e) {
    return res.status(500).json("Internal server error");
  }
};
export const getUserById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  const user = await db.select().from(users).where(eq(users.id, id));
  return res.json(user);
};
export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, email } = req.body;
  await db.insert(users).values({ name, email });
  return res.json({
    message: "User created",
    body: {
      name,
      email,
    },
  });
};
export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  await db.update(users).set({ name, email }).where(eq(users.id, id));
  return res.json("Updated");
};
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  await db.delete(users).where(eq(users.id, id));
  return res.json(`User ${id} deleted`);
};
