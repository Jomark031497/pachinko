import { verify } from "argon2";
import { AppError } from "../../utils/errors.js";
import { excludeFields } from "../../utils/exclude-fields.js";
import { NewUser, User } from "../users/users.schema.js";
import { createUser, getUser } from "../users/users.service.js";

export const getAuthenticatedUser = async (id: User["id"]) => {
  const user = await getUser("id", id);
  if (!user) throw new AppError(404, "authenticated user not found");
  return excludeFields(user, ["password"]);
};

export const loginUser = async (payload: Pick<User, "username" | "password">) => {
  const user = await getUser("username", payload.username);
  if (!user) throw new AppError(400, "invalid username/password");

  const isPasswordValid = await verify(user.password, payload.password);
  if (!isPasswordValid) throw new AppError(400, "invalid username/password");

  return excludeFields(user, ["password"]);
};

export const signUpUser = async (payload: NewUser) => {
  const user = await createUser(payload);
  return user;
};
