export interface Account {
  id: string;
  name: string;
  type: "checking" | "savings" | "credit" | "cash";
  balance: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
