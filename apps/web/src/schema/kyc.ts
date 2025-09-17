import { UserRole } from '@/types/user';
import z from 'zod';

export const KycSchema = z.object({
  role: z.enum(UserRole, 'Please select a user role'),
  document: z
    .instanceof(File)
    .refine((file) => file instanceof File, 'Document is required'),
  proofOfAddress: z
    .instanceof(File)
    .refine((file) => file instanceof File, 'Proof of address is required'),
  certification: z.instanceof(File).optional(),
});

export type KycForm = z.infer<typeof KycSchema>;
