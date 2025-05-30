import { eq } from "drizzle-orm";
import { db } from "../../db/database.js";
import { NewUser, User, users } from "./users.schema.js";
import { AppError } from "../../utils/errors.js";
import { hash } from "argon2";
import { categories, NewCategory } from "../categories/categories.schema.js";
import { defaultCategories } from "../categories/categories.utils.js";
import { createTransaction } from "../transactions/transactions.service.js";

export const getUser = async (field: keyof User, value: string) => {
  const [user] = await db.select().from(users).where(eq(users[field], value)).limit(1);
  return user;
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

  const user = await db.transaction(async (tx) => {
    const [createdUser] = await tx
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

    if (!createdUser) throw new AppError(400, "user creation failed");

    const categoriesToInsert: NewCategory[] = defaultCategories.map((item) => {
      return { ...item, userId: createdUser.id };
    });

    await tx.insert(categories).values(categoriesToInsert);

    return createdUser;
  });

  return user;
};
