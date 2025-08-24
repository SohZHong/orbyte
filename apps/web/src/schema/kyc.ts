import { UserRole } from '@/types/user';
import z from 'zod/v3';

export const KycSchema = z.object({
  role: z.nativeEnum(UserRole, {
    errorMap: () => ({ message: 'Please select a user role' }),
  }),
  document: z
    .instanceof(File)
    .refine((file) => file instanceof File, 'Document is required'),
  proofOfAddress: z
    .instanceof(File)
    .refine((file) => file instanceof File, 'Proof of address is required'),
  certification: z.instanceof(File).optional(),
});

export type KycForm = z.infer<typeof KycSchema>;
