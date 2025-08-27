'use client';

import AppHeaderLayout from '@/components/app-header-layout';
import { Skeleton } from '@/components/ui/skeleton';
import type { BreadcrumbItem } from '@/types/nav';
import AppSidebarLayout from '@/components/app-sidebar-layout';
import { usePrivy } from '@privy-io/react-auth';
import { useUser } from '@/hooks/use-user';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import {
  ProposalMetaSchema,
  type ProposalMetaFormOutput,
} from '@/schema/proposal';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import ProposalFormSkeleton from '@/components/proposal-form-skeleton';
import { Standard } from '@/types/proposal';
import { toast } from 'sonner';
import api from '@/config/axios';
import { useProjectRegistryContract } from '@/hooks/use-project-registry-contract';
import { useRouter } from 'next/navigation';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Proposal', href: '/proposal' },
  { title: 'Submission', href: '/proposa/submission' },
];

export default function ProposalSubmissionPage() {
  const { user: privyUser } = usePrivy();
  const address = privyUser?.smartWallet?.address;
  const { isLoading } = useUser(address);
  const { submitProposal } = useProjectRegistryContract();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(ProposalMetaSchema),
    defaultValues: {
      name: '',
      description: '',
      location: '',
      estimatedCredits: 0,
      standard: Standard.GOLD_STANDARD,
      vintage: 0,
      methodology: '',
    },
  });

  const onSubmit = async (data: ProposalMetaFormOutput) => {
    try {
      setIsSubmitting(true);

      // Build FormData for Proposal Submission
      const formData = new FormData();

      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('location', data.location);
      formData.append('estimatedCredits', String(data.estimatedCredits));
      formData.append('standard', String(data.standard));
      formData.append('vintage', String(data.vintage));
      formData.append('methodology', data.methodology);
      formData.append('projectPlan', data.projectPlan);
      formData.append('eia', data.eia);
      if (data.otherDocs) formData.append('otherDocs', data.otherDocs);
      if (data.cover) formData.append('cover', data.cover);

      await api
        .post('/proposal/submit', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(async (res) => {
          const { projectPlanCid, eiaCid, metadataCid, otherDocsCid } =
            res.data.data;

          // Submit Transaction
          const tx = await submitProposal({
            name: data.name,
            description: data.description,
            location: data.location,
            estimatedCredits: BigInt(data.estimatedCredits),
            standard: data.standard,
            vintage: data.vintage,
            methodology: data.methodology,
            projectPlanCID: projectPlanCid,
            eiaCID: eiaCid,
            otherDocsCID: otherDocsCid,
            metadataCID: metadataCid,
          });

          toast('Proposal Submitted', {
            description: `Transaction Hash: ${tx.hash}`,
            action: {
              label: 'Close',
              onClick: () => toast.dismiss(),
            },
          });

          setTimeout(() => {
            router.replace('/proposal');
          }, 1000);
        });
    } catch (error) {
      console.error(error);
      toast('Proposal Submission Failed', {
        description: (error as Error).message,
        action: {
          label: 'Close',
          onClick: () => toast.dismiss(),
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppSidebarLayout breadcrumbs={breadcrumbs}>
      <div className='flex flex-col gap-6 p-6'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div>
            {isLoading ? (
              <React.Fragment>
                <Skeleton className='h-8 w-[200px] my-2' />
                <Skeleton className='h-4 w-[300px] my-2' />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <h1 className='text-3xl font-bold tracking-tight'>
                  Submit Project Proposal
                </h1>
                <p className='text-muted-foreground'>
                  Provide detailed information about your carbon reduction
                  project for evaluation and potential listing
                </p>
              </React.Fragment>
            )}
          </div>
        </div>
        {isLoading ? (
          <ProposalFormSkeleton />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              {/* Basic Info */}
              <div className='space-y-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Project Name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Project Description'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='location'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder='Location' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Numbers */}
              <div className='flex flex-col md:flex-row gap-4'>
                <FormField
                  control={form.control}
                  name='estimatedCredits'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>Estimated Credits</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='Estimated Credits (tons CO2e)'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='vintage'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>Vintage</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='Vintage (e.g., 2025)'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Standard */}
              <FormField
                control={form.control}
                name='standard'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Standard</FormLabel>
                    <Select
                      onValueChange={(val) => field.onChange(Number(val))}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Select Standard' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={Standard.GOLD_STANDARD.toString()}>
                          Gold Standard
                        </SelectItem>
                        <SelectItem value={Standard.VCS.toString()}>
                          VCS
                        </SelectItem>
                        <SelectItem value={Standard.SHARIAH.toString()}>
                          Shariah
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Methodology */}
              <FormField
                control={form.control}
                name='methodology'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Methodology</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Methodology' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Document Uploads (IPFS CIDs) */}
              <div className='space-y-4'>
                <FormField
                  control={form.control}
                  name='cover'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover Image (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type='file'
                          placeholder='Upload your cover image'
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            field.onChange(file);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='projectPlan'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Plan</FormLabel>
                      <FormControl>
                        <Input
                          type='file'
                          placeholder='Upload your project plan'
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            field.onChange(file);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='eia'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Environmental Impact Assessment (EIA)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type='file'
                          placeholder='Upload your EIA'
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            field.onChange(file);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='otherDocs'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supporting Documents</FormLabel>
                      <FormControl>
                        <Input
                          type='file'
                          placeholder='Upload other supporting documents'
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            field.onChange(file);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <Button disabled={isSubmitting} type='submit' className='w-full'>
                Submit Proposal
              </Button>
            </form>
          </Form>
        )}
      </div>
    </AppSidebarLayout>
  );
}
