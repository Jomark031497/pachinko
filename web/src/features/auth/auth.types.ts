export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
