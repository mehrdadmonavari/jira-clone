import { z } from "zod";

export const signInSchema = z.object({
   email: z.string().email(),
   password: z.string().min(8, "Minimum of 8 characters requered"),
});

export const signUpSchema = z.object({
   name: z.string().trim().min(1, "Requered"),
   email: z.string().email(),
   password: z.string().min(8, "Minimum of 8 characters requered"),
});
