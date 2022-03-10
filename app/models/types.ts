// Generated by ts-to-zod
import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const passwordSchema = z.object({
  hash: z.string(),
  userId: z.string(),
});

export const noteSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
});
