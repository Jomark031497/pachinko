import { useQuery } from "@tanstack/react-query";
import { __QUERY_KEYS__ } from "~/constants";
import { getCategoriesByUserId } from "~/features/categories/categories.api";
import type { Category } from "~/features/categories/categories.schema";

const useUserCategories = (userId: Category["userId"], type: Category["type"]) => {
  return useQuery({
    queryKey: [__QUERY_KEYS__.USER_CATEGORIES, userId, type],
    queryFn: () => getCategoriesByUserId(userId, type),
  });
};

export default useUserCategories;
