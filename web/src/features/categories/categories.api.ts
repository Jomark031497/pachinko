import { __API_URL__ } from "~/constants";
import type { Category } from "~/features/categories/categories.schema";

export const getCategoriesByUserId = async (
  userId: Category["userId"],
  type: Category["type"],
): Promise<Category[]> => {
  const url = new URL(`/api/categories/users/${userId}`, __API_URL__);

  url.searchParams.set("type", type);

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message);

  return data;
};
