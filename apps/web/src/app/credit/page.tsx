'use client';

import AppHeaderLayout from '@/components/app-header-layout';
import { Skeleton } from '@/components/ui/skeleton';
import type { BreadcrumbItem } from '@/types/nav';
import AppSidebarLayout from '@/components/app-sidebar-layout';
import { usePrivy } from '@privy-io/react-auth';
import { useUser, useUserCredits } from '@/hooks/use-user';
import React, { useState } from 'react';
import { Role } from '@/generated/graphql';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import ProtectedRoute from '@/components/routing/protected-route';
import { useMarketplaceContract } from '@/hooks/use-marketplace-contract';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/' },
  { title: 'Credits', href: '#' },
];

export default function CreditsPage() {
  const { user: privyUser } = usePrivy();
  const address = privyUser?.smartWallet?.address;
  const { data: user, isLoading: isUserLoading } = useUser(address);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isBatchesLoading,
  } = useUserCredits(user?.id);
  const {} = useMarketplaceContract();

  const [listDialogOpen, setListDialogOpen] = useState(false);
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
  const [retireDialogOpen, setRetireDialogOpen] = useState(false);

  const handleListClick = () => {
    setListDialogOpen(true);
  };

  const handleTransferClick = () => {
    setTransferDialogOpen(true);
  };

  const handleRetireClick = () => {
    setRetireDialogOpen(true);
  };

  // const handleListConfirm = async (qty: number, price: number) => {
  //   // Submit Transaction
  //   await auditProof(BigInt(id), action, comment)
  //     .then((tx) => {
  //       toast('Reviewed Submitted Successfully', {
  //         description: `Transaction Hash: ${tx.hash}`,
  //         action: {
  //           label: 'Close',
  //           onClick: () => toast.dismiss(),
  //         },
  //       });

  //       setTimeout(() => {
  //         router.replace('/proof-audit');
  //       }, 1000);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       toast('Review Submission Failed', {
  //         description: (error as Error).message,
  //         action: {
  //           label: 'Close',
  //           onClick: () => toast.dismiss(),
  //         },
  //       });
  //     });
  // };

  return (
    <ProtectedRoute allowedRoles={[Role.Developer]}>
      <AppSidebarLayout breadcrumbs={breadcrumbs}>
        <div className='flex flex-col gap-6 p-6'>
          <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
            <div>
              {isUserLoading ? (
                <React.Fragment>
                  <Skeleton className='h-8 w-[200px] my-2' />
                  <Skeleton className='h-4 w-[300px] my-2' />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <h1 className='text-3xl font-bold tracking-tight'>Credits</h1>
                  <p className='text-muted-foreground'>
                    Manage your available carbon credits
                  </p>
                </React.Fragment>
              )}
            </div>
          </div>
          {/* Table */}
          <div className='overflow-x-auto rounded-lg border'>
            {isBatchesLoading || isUserLoading ? (
              <div className='flex flex-col gap-2 p-4'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className='h-10 w-full' />
                ))}
              </div>
            ) : (
              <>
                <table className='min-w-[900px] w-full text-sm'>
                  <thead>
                    <tr className='bg-muted font-semibold text-muted-foreground text-left'>
                      <th className='px-4 py-3 font-medium'>ID</th>
                      <th className='px-4 py-3 font-medium w-[300px]'>
                        Project
                      </th>
                      <th className='px-4 py-3 font-medium'>Balance</th>
                      <th className='px-4 py-3 font-medium'>Vintage</th>
                      <th className='px-4 py-3 font-medium'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.pages.flat().map((c, index) => (
                      <tr className='border-t' key={index}>
                        <td className='px-4 py-2'>{c?.batch.id}</td>
                        <td className='px-4 py-2 text-muted-foreground truncate max-w-[300px]'>
                          <div className='overflow-x-auto'>
                            {c?.batch.project?.proposal.name}
                          </div>
                        </td>
                        <td className='px-4 py-2'>{c?.balance}</td>
                        <td className='px-4 py-2'>
                          {c?.batch.project?.proposal.vintage}
                        </td>
                        <td className='px-4 py-2 flex flex-wrap items-center flex-row gap-3'>
                          <Button variant='default'>List</Button>
                          <Button variant='secondary'>Transfer</Button>
                          <Button variant='destructive'>Retire</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Load More */}
                {hasNextPage && (
                  <div className='flex justify-center p-4'>
                    <Button
                      variant='outline'
                      onClick={() => fetchNextPage()}
                      disabled={isFetchingNextPage}
                    >
                      {isFetchingNextPage ? (
                        <span className='inline-flex gap-1 items-center'>
                          <Spinner variant='circle' /> Loading
                        </span>
                      ) : (
                        <span>Load more</span>
                      )}{' '}
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </AppSidebarLayout>
    </ProtectedRoute>
  );
}
