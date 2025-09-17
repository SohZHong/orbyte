import z from 'zod';

export const ReviewSchema = z.object({
  comment: z.string(),
});

export type ReviewForm = z.infer<typeof ReviewSchema>;
