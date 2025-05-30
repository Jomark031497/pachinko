export type Category = {
  createdAt: Date;
  id: string;
  name: string;
  type: "income" | "expense" | "transfer";
  updatedAt: Date;
  userId: string;
};
