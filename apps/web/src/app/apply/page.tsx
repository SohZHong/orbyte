'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import api from '@/config/axios';
import { useKycContract } from '@/hooks/use-kyc-contract';
import { usePrivy } from '@privy-io/react-auth';
import { KycSchema, type KycForm } from '@/schema/kyc';
import { UserRole } from '@/types/user';

import PublicOnlyRoute from '@/components/routing/public-only-route';
import AppLayout from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Spinner } from '@/components/ui/shadcn-io/spinner';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

export default function ApplyAsProfessionalPage() {
  const { submitKYC } = useKycContract();
  const { user: privyUser } = usePrivy();
  const address = privyUser?.smartWallet?.address;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<KycForm>({
    resolver: zodResolver(KycSchema),
    defaultValues: {
      role: UserRole.AUDITOR,
    },
  });

  const { watch, handleSubmit } = form;

  const role = watch('role');
  const document = watch('document');
  const proofOfAddress = watch('proofOfAddress');
  const certification = watch('certification');

  const completedSteps = [role, document, proofOfAddress, certification].filter(
    Boolean
  ).length;
  const totalSteps = 4;
  const progress = (completedSteps / totalSteps) * 100;

  const onSubmit = async (data: KycForm) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('role', String(data.role));
      formData.append('document', data.document);
      formData.append('proofOfAddress', data.proofOfAddress);
      if (data.certification)
        formData.append('certification', data.certification);

      const res = await api.post('/kyc/submit', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { role, documentCid, proofOfAddressCid, certificationCid } =
        res.data.data;

      const tx = await submitKYC(
        role,
        documentCid,
        proofOfAddressCid,
        certificationCid
      );

      await api.post('/role/mint', { role, address });

      toast('KYC Submitted & Role Minted', {
        description: `Transaction Hash: ${tx.hash}`,
        action: { label: 'Close', onClick: () => toast.dismiss() },
      });

      router.replace('/');
    } catch (error) {
      console.error(error);
      toast('Submission failed', {
        description: (error as Error).message,
        action: { label: 'Close', onClick: () => toast.dismiss() },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicOnlyRoute>
      <AppLayout>
        <div className='flex flex-col gap-6 p-6'>
          <h1 className='text-3xl font-bold tracking-tight'>
            Professional Application
          </h1>
          <p className='text-muted-foreground'>
            Apply as an Auditor or Project Developer through KYC Verification
          </p>

          <Card>
            <CardHeader>
              <CardTitle>KYC Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='h-2 w-full rounded bg-accent'>
                <div
                  className='h-2 rounded bg-[#14b881] transition-all'
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className='mt-2 text-sm text-muted-foreground'>
                Step {completedSteps} of {totalSteps}
              </p>
            </CardContent>
          </Card>

          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
              {/* Role Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Role Selection</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <FormField
                    control={form.control}
                    name='role'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <RadioGroup
                          value={String(field.value)}
                          onValueChange={(val) => field.onChange(Number(val))}
                          className='space-y-3'
                        >
                          <Label
                            htmlFor='auditor'
                            className={`flex w-full items-center space-x-3 rounded-lg border p-4 cursor-pointer ${field.value === UserRole.AUDITOR ? 'border-accent' : ''}`}
                          >
                            <RadioGroupItem
                              value={String(UserRole.AUDITOR)}
                              id='auditor'
                            />
                            <div className='flex flex-col'>
                              <span className='font-medium'>Auditor</span>
                              <span className='text-sm text-muted-foreground'>
                                Verify and validate carbon offset projects.
                              </span>
                            </div>
                          </Label>
                          <Label
                            htmlFor='developer'
                            className={`flex w-full items-center space-x-3 rounded-lg border p-4 cursor-pointer ${field.value === UserRole.DEVELOPER ? 'border-accent' : ''}`}
                          >
                            <RadioGroupItem
                              value={String(UserRole.DEVELOPER)}
                              id='developer'
                            />
                            <div className='flex flex-col'>
                              <span className='font-medium'>
                                Project Developer
                              </span>
                              <span className='text-sm text-muted-foreground'>
                                Create and manage carbon offset projects.
                              </span>
                            </div>
                          </Label>
                        </RadioGroup>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Document Submission</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  {['document', 'proofOfAddress', 'certification'].map(
                    (fieldName, i) => (
                      <FormField
                        key={fieldName}
                        control={form.control}
                        name={fieldName as keyof KycForm}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {fieldName === 'document'
                                ? 'ID Document'
                                : fieldName === 'proofOfAddress'
                                  ? 'Proof of Address'
                                  : 'Professional Certification (if applicable)'}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type='file'
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) field.onChange(file);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )
                  )}
                </CardContent>
              </Card>

              <Button type='submit' disabled={loading} className='w-full'>
                {loading ? (
                  <span className='inline-flex gap-1 items-center'>
                    <Spinner variant='circle' /> Submitting
                  </span>
                ) : (
                  <span>Submit Documents</span>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </AppLayout>
    </PublicOnlyRoute>
  );
}
