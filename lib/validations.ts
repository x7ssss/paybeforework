import { z } from 'zod';

export const supportedCurrencies = ['EUR', 'USD', 'GBP', 'BGN'] as const;

export const createContractSchema = z
  .object({
    freelancerName: z
      .string()
      .trim()
      .min(2, 'Freelancer name must be at least 2 characters')
      .max(100, 'Freelancer name must be under 100 characters'),
    freelancerTaxId: z
      .string()
      .trim()
      .max(50, 'Tax/Business ID must be under 50 characters')
      .optional()
      .or(z.literal('')),
    paymentUrl: z
      .string()
      .trim()
      .url('Please enter a valid payment URL')
      .refine(
        (url) => url.startsWith('http://') || url.startsWith('https://'),
        'Payment URL must use http or https protocol'
      ),
    title: z
      .string()
      .trim()
      .min(3, 'Project title must be at least 3 characters')
      .max(150, 'Project title must be under 150 characters'),
    scopeSummary: z
      .string()
      .trim()
      .min(10, 'Scope summary must be at least 10 characters')
      .max(3000, 'Scope summary cannot exceed 3000 characters'),
    deliverables: z
      .array(
        z
          .string()
          .trim()
          .min(1, 'Deliverable item cannot be empty')
          .max(300, 'Deliverable item cannot exceed 300 characters')
      )
      .min(1, 'At least one deliverable item is required')
      .max(50, 'Maximum 50 deliverables allowed'),
    revisionLimit: z.coerce
      .number()
      .int('Revision limit must be an integer')
      .min(0, 'Revision limit cannot be negative')
      .max(100, 'Revision limit cannot exceed 100')
      .default(2),
    outOfScopeHourlyRate: z.coerce
      .number()
      .min(0, 'Out-of-scope hourly rate cannot be negative')
      .max(100000, 'Hourly rate is too high'),
    totalAmount: z.coerce
      .number()
      .positive('Total contract amount must be greater than 0')
      .max(10000000, 'Contract amount is too high'),
    depositAmount: z.coerce
      .number()
      .positive('Deposit amount must be greater than 0')
      .max(10000000, 'Deposit amount is too high'),
    currency: z.enum(supportedCurrencies, {
      errorMap: () => ({ message: 'Currency must be EUR, USD, GBP, or BGN' }),
    }),
  })
  .refine((data) => data.depositAmount <= data.totalAmount, {
    message: 'Deposit amount cannot exceed the total contract value',
    path: ['depositAmount'],
  });

export const signContractSchema = z.object({
  contractId: z
    .string()
    .trim()
    .length(12, 'Contract ID must be a 12-character identifier'),
  signerName: z
    .string()
    .trim()
    .min(2, 'Client name must be at least 2 characters')
    .max(100, 'Client name must be under 100 characters'),
  signerEmail: z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .max(150, 'Email is too long'),
  consentAccepted: z
    .boolean()
    .refine((val) => val === true, 'You must accept the terms and agreement to proceed'),
});

export type CreateContractInput = z.infer<typeof createContractSchema>;
export type SignContractInput = z.infer<typeof signContractSchema>;
