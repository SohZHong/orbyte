import { Standard } from '@/types/proposal';
import z from 'zod/v3';

export const CreditListingSchema = z
  .object({
    quantity: z.coerce.number().positive('Must be greater than 0'),
    price: z.coerce.number().positive('Must be greater than 0'),
    startTime: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Date.parse(val)), {
        message: 'Invalid start time',
      }),
    endTime: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Date.parse(val)), {
        message: 'Invalid end time',
      }),
  })
  .refine(
    (data) => {
      if (data.startTime && data.endTime) {
        return Date.parse(data.endTime) > Date.parse(data.startTime);
      }
      return true;
    },
    {
      message: 'End time must be later than start time',
      path: ['endTime'],
    }
  );

export const CreditTransferSchema = z.object({
  to: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Address'),
  amount: z.coerce.number().positive('Must be greater than 0'),
});

export const CreditRetireSchema = z.object({
  quantity: z.coerce.number().positive('Must be greater than 0'),
  file: z.instanceof(File).optional(),
});

export type CreditListingForm = z.infer<typeof CreditListingSchema>;
export type CreditTransferForm = z.infer<typeof CreditTransferSchema>;
export type CreditRetireForm = z.infer<typeof CreditRetireSchema>;
