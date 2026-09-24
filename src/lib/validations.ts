import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const registerSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
  })

export const courseSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  cover_url: z.string().url().optional().or(z.literal("")),
})

export const lessonSchema = z.object({
  course_id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  video_url: z.string().min(1),
  order: z.number().int().nonnegative(),
})

export const ebookSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.string().optional(),
  cover_url: z.string().optional(),
  file_url: z.string().min(1),
})
