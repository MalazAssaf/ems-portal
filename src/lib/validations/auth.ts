import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(2, "Password must be at least 2 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
