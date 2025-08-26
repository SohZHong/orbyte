import z from 'zod/v3';

export const ProofSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file instanceof File, 'Project Plan is required'),
});

export type ProofForm = z.infer<typeof ProofSchema>;
