import { __API_URL__ } from "~/constants";
import type { UpdateUserInput, User } from "~/features/users/users.schema";

export const updateUser = async (userId: User["id"], payload: UpdateUserInput) => {
  const url = new URL(`/api/users/${userId}`, __API_URL__);

  const response = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(payload),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data);

  return data;
};
