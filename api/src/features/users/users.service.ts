import { eq } from "drizzle-orm";
import { db } from "../../db/database.js";
import { NewUser, User, users } from "./users.schema.js";
import { AppError } from "../../utils/errors.js";
import { hash } from "argon2";

export const getUser = async (field: keyof User, value: string) => {
  const query = await db.select().from(users).where(eq(users[field], value));

  return query[0];
};

export const createUser = async (payload: NewUser) => {
  const errors: Record<string, unknown> = {};

  // Check for unique fields
  const usernameExists = await getUser("username", payload.username);
  const emailExists = await getUser("email", payload.email);

  if (usernameExists) errors.username = "username is already taken";
  if (emailExists) errors.email = "email is already taken";

  if (Object.keys(errors).length) throw new AppError(400, "create user failed", errors);

  const hashedPassword = await hash(payload.password);

  const query = await db
    .insert(users)
    .values({
      ...payload,
      password: hashedPassword,
    })
    .returning({
      id: users.id,
      username: users.username,
      email: users.email,
      fullName: users.fullName,
    });

  if (!query[0]) throw new AppError(400, "user creation failed");

  return query[0];
};
