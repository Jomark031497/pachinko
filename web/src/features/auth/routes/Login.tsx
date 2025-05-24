// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "~/components/ui/Input";

// const loginSchema = z.object({
//   username: z
//     .string()
//     .min(3, "username must be atleast 3 characters long")
//     .max(256, "username must not exceed 256 characters"),

//   password: z
//     .string()
//     .min(6, "password must be atleast 6 characters long")
//     .max(256, "password must not exceed 256 characters"),
// });

// export type LoginCredentials = z.infer<typeof loginSchema>;

export const Login = () => {
  return (
    <main className="h-screen bg-background flex items-center justify-center rounded p-4 border">
      <form className="bg-white w-md shadow p-4">
        <h1 className="text-2xl">Login</h1>

        <Input />
      </form>
    </main>
  );
};
