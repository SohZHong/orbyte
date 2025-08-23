'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppHeaderLayout from '@/components/app-header-layout';
import { z } from 'zod';
import { UserRole } from '@/types/role';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import api from '@/config/axios';

export default function ApplyAsProfessionalPage() {
  const FormSchema = z.object({
    role: z.enum(UserRole).nonoptional('Please select a user role'),
    document: z
      .instanceof(File)
      .refine((file) => file instanceof File, 'Document is required'),
    proofOfAddress: z
      .instanceof(File)
      .refine((file) => file instanceof File, 'Proof of address is required'),
    certification: z.instanceof(File).optional(),
  });

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      role: UserRole.AUDITOR,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      // Build FormData for KYC + event
      const formData = new FormData();
      formData.append('role', data.role);
      formData.append('document', data.document);
      formData.append('proofOfAddress', data.proofOfAddress);
      if (data.certification) {
        formData.append('certification', data.certification);
      }

      await api
        .post('/kyc/submit', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          console.log(res.data);
          toast.success('KYC submitted!');

          // Smart contract here later
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } catch (error) {
      console.error(error);
      toast.error('Submission failed');
      toast('SUbmission failed', {
        description: (error as Error).message,
        action: {
          label: 'Close',
          onClick: () => console.log('Closed'),
        },
      });
    }
  };

  return (
    <AppHeaderLayout>
      <div className='flex flex-col gap-6 p-6'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>
            Professional Application
          </h1>
          <p className='text-muted-foreground'>
            Apply as an Auditor or Project Developer through KYC Verification
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>KYC Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='h-2 w-full rounded bg-accent'>
              <div
                className='h-2 rounded bg-[#14b881]'
                style={{ width: '25%' }}
              />
            </div>
            <p className='mt-2 text-sm text-muted-foreground'>Step 1 of 4</p>
          </CardContent>
        </Card>

        {/* Role Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Role Selection</CardTitle>
          </CardHeader>
          <CardContent>
            <Controller
              control={form.control}
              name='role'
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className='space-y-3'
                >
                  <Label
                    htmlFor='auditor'
                    className={`flex w-full items-center space-x-3 rounded-lg border p-4 cursor-pointer ${
                      field.value === UserRole.AUDITOR && 'border-accent'
                    }`}
                  >
                    <RadioGroupItem value={UserRole.AUDITOR} id='auditor' />

                    <div className='flex flex-col'>
                      <span className='font-medium'>Auditor</span>
                      <span className='text-sm text-muted-foreground'>
                        Verify and validate carbon offset projects.
                      </span>
                    </div>
                  </Label>
                  <Label
                    htmlFor='developer'
                    className={`flex w-full items-center space-x-3 rounded-lg border p-4 cursor-pointer ${
                      field.value === UserRole.DEVELOPER && 'border-accent'
                    }`}
                  >
                    <RadioGroupItem value={UserRole.DEVELOPER} id='developer' />

                    <div className='flex flex-col'>
                      <span className='font-medium'>Project Developer</span>
                      <span className='text-sm text-muted-foreground'>
                        Create and manage carbon offset projects.
                      </span>
                    </div>
                  </Label>
                </RadioGroup>
              )}
            />
          </CardContent>
        </Card>

        {/* Document Uploads */}
        <Card className=''>
          <CardHeader>
            <CardTitle>Document Submission</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <Label>ID Document</Label>
              <Input
                type='file'
                onChange={(e) =>
                  form.setValue('document', e.target.files?.[0] as File)
                }
                className='mt-2 border-accent text-muted-foreground'
              />
            </div>
            <div>
              <Label>Proof of Address</Label>
              <Input
                type='file'
                onChange={(e) =>
                  form.setValue('proofOfAddress', e.target.files?.[0] as File)
                }
                className='mt-2 border-accent text-muted-foreground'
              />
            </div>
            <div>
              <Label>Professional Certification (if applicable)</Label>
              <Input
                type='file'
                onChange={(e) =>
                  form.setValue('certification', e.target.files?.[0] as File)
                }
                className='mt-2 border-accent text-muted-foreground'
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className='flex justify-end'>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Documents'}
          </Button>
        </div>
      </div>
    </AppHeaderLayout>
  );
}
