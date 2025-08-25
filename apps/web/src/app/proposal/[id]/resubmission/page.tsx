'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import AppSidebarLayout from '@/components/app-sidebar-layout';
import ProposalFormSkeleton from '@/components/proposal-form-skeleton';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  ProposalMetaSchema,
  ProposalResubmitMetaSchema,
  type ProposalMetaFormOutput,
  type ProposalResubmitMetaFormInput,
  type ProposalResubmitMetaFormOutput,
} from '@/schema/proposal';
import { generatedToProjectStandardMap, Standard } from '@/types/proposal';
import type { BreadcrumbItem } from '@/types/nav';
import api from '@/config/axios';
import { useProjectRegistryContract } from '@/hooks/use-project-registry-contract';
import { usePrivy } from '@privy-io/react-auth';
import { useUser } from '@/hooks/use-user';
import React from 'react';
import { useProposal } from '@/hooks/use-proposal';
import { Spinner } from '@/components/ui/shadcn-io/spinner';

export default function ProposalResubmissionPage() {
  const router = useRouter();
  const { id: proposalId } = useParams<{ id: string }>();
  const { data: proposal, isLoading: isProposalLoading } =
    useProposal(proposalId);

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Proposals', href: '/proposal' },
    { title: proposal?.name ?? 'Loading...', href: `/proposal/${proposalId}` },
    {
      title: proposal ? 'Resubmission' : 'Loading...',
      href: `#`,
    },
  ];

  const { user: privyUser } = usePrivy();
  const address = privyUser?.smartWallet?.address;
  const { isLoading } = useUser(address);
  const { resubmitProposal } = useProjectRegistryContract();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProposalResubmitMetaFormInput>({
    resolver: zodResolver(ProposalResubmitMetaSchema),
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

  useEffect(() => {
    if (!proposal) return;

    form.reset({
      name: proposal.name,
      description: proposal.description,
      location: proposal.location,
      estimatedCredits: Number(proposal.estimatedCredits),
      standard: generatedToProjectStandardMap[proposal.standard],
      vintage: proposal.vintage,
      methodology: proposal.methodology,
    });
  }, [proposal, form]);

  const onSubmit = async (data: ProposalResubmitMetaFormOutput) => {
    try {
      setIsSubmitting(true);

      const formData = new FormData();

      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('location', data.location);
      formData.append('estimatedCredits', String(data.estimatedCredits));
      formData.append('standard', String(data.standard));
      formData.append('vintage', String(data.vintage));
      formData.append('methodology', data.methodology);

      // Append only files that were re-uploaded
      if (data.projectPlan) formData.append('projectPlan', data.projectPlan);
      if (data.eia) formData.append('eia', data.eia);
      if (data.otherDocs) formData.append('otherDocs', data.otherDocs);

      // Call backend only if any file was uploaded
      let uploadedCids = {
        projectPlanCid: proposal?.projectPlanCID,
        eiaCid: proposal?.eiaCID,
        otherDocsCid: proposal?.otherDocsCID,
        metadataCid: proposal?.metadataCID,
      };

      if (data.projectPlan || data.eia || data.otherDocs) {
        const res = await api.post('/proposal/submit', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        uploadedCids = res.data.data;
      }

      // Resubmit Proposal
      const tx = await resubmitProposal(BigInt(proposalId!), {
        name: data.name,
        description: data.description,
        location: data.location,
        estimatedCredits: BigInt(data.estimatedCredits),
        standard: data.standard,
        vintage: data.vintage,
        methodology: data.methodology,
        projectPlanCID: uploadedCids.projectPlanCid!,
        eiaCID: uploadedCids.eiaCid!,
        otherDocsCID: uploadedCids.otherDocsCid!,
        metadataCID: uploadedCids.metadataCid!,
      });

      toast.success('Proposal Resubmitted', {
        description: `Tx Hash: ${tx.hash}`,
        action: {
          label: 'Close',
          onClick: () => toast.dismiss(),
        },
      });

      setTimeout(() => router.replace('/proposal'), 1000);
    } catch (error) {
      console.error(error);
      toast.error('Proposal Resubmission Failed', {
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
                  Resubmit Project Proposal
                </h1>
                <p className='text-muted-foreground'>
                  Update your project proposal and resubmit for evaluation
                </p>
              </React.Fragment>
            )}
          </div>
        </div>

        {isLoading || isProposalLoading ? (
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
                      <Input placeholder='Methodology' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Document Uploads (IPFS CIDs) */}
              <div className='space-y-4'>
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
                {isSubmitting ? (
                  <span className='inline-flex gap-1 items-center'>
                    <Spinner variant='circle' /> Submitting
                  </span>
                ) : (
                  <span>Resubmit Proposal</span>
                )}
              </Button>
            </form>
          </Form>
        )}
      </div>
    </AppSidebarLayout>
  );
}
