import { z } from 'zod';

export const asinSchema = z.object({
    asin: z
        .string()
        .regex(/^[A-Z0-9]{10}$/, "ASINは10桁の英数字で入力してください")
})