export type Category = {
  createdAt: Date;
  id: string;
  name: string;
  type: "income" | "expense";
  updatedAt: Date;
  userId: string;
};
