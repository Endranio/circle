import { z } from 'zod';

export const registerSchema = z.object({
  fullName: z.string().min(4).max(100),
  email: z.string().email(),
  password: z.string().min(6),
});

export type RegisterSchemaDTO = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginSchemaDTO = z.infer<typeof loginSchema>;

export const forgotSchema = z.object({
  email: z.string().email(),
});

export type ForgotPasswordSchemaDTO = z.infer<typeof forgotSchema>;

export const resetSchema = z
  .object({
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords don't match",
    path: ['confirmPassword'],
  });
export type ResetPasswordSchemaDTO = z.infer<typeof resetSchema>;
