import { z } from 'zod';

export const signUpSchema = z.object({
    email: z.email('Enter a valid email'),
    password: z.string().min(8, 'Use at least 8 characters'),
});

export type SignUpDTO = z.infer<typeof signUpSchema>;
