import { Standard } from '@/types/proposal';
import z from 'zod';

export const ProposalMetaSchema = z.object({
  name: z.string().min(3, 'Project name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  location: z.string().min(2, 'Location is required'),
  estimatedCredits: z.coerce.number().positive(),
  standard: z.enum(Standard, 'Please select a standard'),
  vintage: z.coerce.number().int().gte(1900).lte(2100),
  methodology: z.string().min(3, 'Methodology is required'),
  projectPlan: z
    .instanceof(File)
    .refine((file) => file instanceof File, 'Project Plan is required'),
  eia: z
    .instanceof(File)
    .refine((file) => file instanceof File, 'EIA is required'),
  otherDocs: z.instanceof(File).optional(),
  cover: z.instanceof(File).optional(),
});

export const ProposalResubmitMetaSchema = z.object({
  name: z.string().min(3, 'Project name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  location: z.string().min(2, 'Location is required'),
  estimatedCredits: z.coerce.number().positive(),
  standard: z.enum(Standard, 'Please select a standard'),
  vintage: z.coerce.number().int().gte(1900).lte(2100),
  methodology: z.string().min(3, 'Methodology is required'),
  projectPlan: z.instanceof(File).optional(),
  eia: z.instanceof(File).optional(),
  otherDocs: z.instanceof(File).optional(),
  cover: z.instanceof(File).optional(),
});

export type ProposalMetaFormInput = z.input<typeof ProposalMetaSchema>;
export type ProposalMetaFormOutput = z.output<typeof ProposalMetaSchema>;
export type ProposalMetaForm = z.infer<typeof ProposalMetaSchema>;

export type ProposalResubmitMetaFormInput = z.input<
  typeof ProposalResubmitMetaSchema
>;
export type ProposalResubmitMetaFormOutput = z.output<
  typeof ProposalResubmitMetaSchema
>;
export type ProposalResubmitMetaForm = z.infer<
  typeof ProposalResubmitMetaSchema
>;
