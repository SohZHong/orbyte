'use client';

import AppHeaderLayout from '@/components/app-header-layout';
import { Skeleton } from '@/components/ui/skeleton';
import type { BreadcrumbItem } from '@/types/nav';
import AppSidebarLayout from '@/components/app-sidebar-layout';
import { usePrivy } from '@privy-io/react-auth';
import { useUser } from '@/hooks/use-user';
import React from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProposalStatus } from '@/generated/graphql';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Proposal', href: '#' },
];

export default function ProposalSubmissionPage() {
  const { user: privyUser } = usePrivy();
  const address = privyUser?.smartWallet?.address;
  const { data: user, isLoading } = useUser(address);
  const router = useRouter();
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
                  Project Proposals
                </h1>
                <p className='text-muted-foreground'>
                  Manage your submitted project proposals and track their
                  progress
                </p>
              </React.Fragment>
            )}
          </div>
          <Button onClick={() => router.push('/proposal/submission')}>
            Submit a Proposal
          </Button>
        </div>
        <div className='flex flex-wrap gap-3 items-center'>
          {/* Search bar */}
          <div className='flex-1 min-w-[250px]'>
            {isLoading ? (
              <Skeleton className='h-10 w-full' />
            ) : (
              <Input
                placeholder='Search project proposals'
                className='w-full'
              />
            )}
          </div>

          {/* Filters (Tabs) */}
          <Select>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ProposalStatus.PendingReview}>
                Pending Review
              </SelectItem>
              <SelectItem value={ProposalStatus.ChangesRequested}>
                Changes Requested
              </SelectItem>
              <SelectItem value={ProposalStatus.Approved}>Approved</SelectItem>
              <SelectItem value={ProposalStatus.Rejected}>Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Table */}
        <div className='overflow-x-auto rounded-lg border'>
          {isLoading ? (
            <div className='flex flex-col gap-2 p-4'>
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className='h-10 w-full' />
              ))}
            </div>
          ) : (
            <table className='min-w-[900px] w-full text-sm'>
              <thead>
                {/* <div class="grid grid-cols-[2fr_2fr_2fr_2fr_1fr_3fr] items-center bg-muted text-sm font-semibold text-muted-foreground"> */}
                <tr className='bg-muted font-semibold text-muted-foreground text-left'>
                  <th className='px-4 py-3 font-medium'>Project Title</th>
                  <th className='px-4 py-3 font-medium'>Submission Date</th>
                  <th className='px-4 py-3 font-medium'>Status</th>
                  <th className='px-4 py-3 font-medium'>Summary</th>
                </tr>
              </thead>
              <tbody>
                <tr className='border-t'>
                  <td className='px-4 py-2'>Eco-Friendly Farming Initiative</td>
                  <td className='px-4 py-2 text-muted-foreground'>
                    2023-08-15
                  </td>
                  <td className='px-4 py-2'>
                    <Button size='sm' variant='secondary'>
                      In Review
                    </Button>
                  </td>
                  <td className='px-4 py-2 text-muted-foreground'>
                    Sustainable farming practices to reduce emissions.
                  </td>
                </tr>
                <tr className='border-t'>
                  <td className='px-4 py-2'>Renewable Energy Expansion</td>
                  <td className='px-4 py-2 text-muted-foreground'>
                    2023-07-22
                  </td>
                  <td className='px-4 py-2'>
                    <Button size='sm' variant='secondary'>
                      Approved
                    </Button>
                  </td>
                  <td className='px-4 py-2 text-muted-foreground'>
                    Expanding solar and wind energy capacity.
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AppSidebarLayout>
  );
}
