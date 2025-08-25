import z from 'zod/v3';

export const ReviewSchema = z.object({
  comment: z.string(),
});

export type ReviewForm = z.infer<typeof ReviewSchema>;
