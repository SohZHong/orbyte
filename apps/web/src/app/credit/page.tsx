'use client';

import AppHeaderLayout from '@/components/app-header-layout';
import { Skeleton } from '@/components/ui/skeleton';
import type { BreadcrumbItem } from '@/types/nav';
import AppSidebarLayout from '@/components/app-sidebar-layout';
import { usePrivy } from '@privy-io/react-auth';
import { useUser, useUserCredits } from '@/hooks/use-user';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { useMarketplaceContract } from '@/hooks/use-marketplace-contract';
import { CreditTransferDialog } from '@/components/dialog/credit-transfer-dialog';
import { CreditListingDialog } from '@/components/dialog/credit-listing-dialog';
import { useProjectRegistryContract } from '@/hooks/use-project-registry-contract';
import { useCarbonCreditTokenContract } from '@/hooks/use-carbon-credit-token-contract';
import { toast } from 'sonner';
import { toBlockchainTimestamp } from '@/lib/utils';
import { CreditRetireDialog } from '@/components/dialog/credit-retire-confirmation-dialog';
import api from '@/config/axios';

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
  const { list, isPending: isListingPending } = useMarketplaceContract();
  const { retireCredits, isPending: isRetirePending } =
    useProjectRegistryContract();
  const { transfer, isPending: isTransferPending } =
    useCarbonCreditTokenContract();

  const [tokenId, setTokenId] = useState('');
  const [listDialogOpen, setListDialogOpen] = useState(false);
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
  const [retireDialogOpen, setRetireDialogOpen] = useState(false);

  const handleListClick = (tokenId: string | undefined) => {
    if (!tokenId) return;
    setTokenId(tokenId);
    setListDialogOpen(true);
  };

  const handleTransferClick = (tokenId: string | undefined) => {
    if (!tokenId) return;
    setTokenId(tokenId);
    setTransferDialogOpen(true);
  };

  const handleRetireClick = (tokenId: string | undefined) => {
    if (!tokenId) return;
    setTokenId(tokenId);
    setRetireDialogOpen(true);
  };

  const handleListingConfirm = async (
    quantity: number,
    price: number,
    startTime: string,
    endTime: string
  ) => {
    if (!address || tokenId === '') return;
    await list({
      tokenId: BigInt(tokenId),
      amount: BigInt(quantity),
      pricePerUnitWei: String(price),
      startTime: BigInt(toBlockchainTimestamp(startTime)),
      endTime: BigInt(toBlockchainTimestamp(endTime)),
    })
      .then((tx) => {
        toast('Credit Listed Successfully', {
          description: `Transaction Hash: ${tx.hash}`,
          action: {
            label: 'Close',
            onClick: () => toast.dismiss(),
          },
        });
      })
      .catch((error) => {
        console.error(error);
        toast('Listing Failed', {
          description: (error as Error).message,
          action: {
            label: 'Close',
            onClick: () => toast.dismiss(),
          },
        });
      })
      .finally(() => {
        setListDialogOpen(false);
        setTokenId('');
      });
  };

  const handleTransferConfirm = async (to: string, amount: number) => {
    if (!address || tokenId === '') return;
    await transfer(address, to, BigInt(tokenId), BigInt(amount))
      .then((tx) => {
        toast('Credit Transferred Successfully', {
          description: `Transaction Hash: ${tx.hash}`,
          action: {
            label: 'Close',
            onClick: () => toast.dismiss(),
          },
        });
      })
      .catch((error) => {
        console.error(error);
        toast('Transfer Failed', {
          description: (error as Error).message,
          action: {
            label: 'Close',
            onClick: () => toast.dismiss(),
          },
        });
      })
      .finally(() => {
        setTransferDialogOpen(false);
        setTokenId('');
      });
  };

  const handleRetireConfirm = async (quantity: number, file?: File) => {
    if (!address || tokenId === '') return;
    let retirementData: string = '';
    try {
      if (file) {
        const formData = new FormData();
        formData.append('retirementDoc', file);

        await api
          .post(`/credit/retire/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          .then(async (res) => {
            const { retirementCID } = res.data.data;
            retirementData = retirementCID;
          });
      }

      await retireCredits(
        BigInt(tokenId),
        BigInt(quantity),
        retirementData
      ).then((tx) => {
        toast('Credit Retired Successfully', {
          description: `Transaction Hash: ${tx.hash}`,
          action: {
            label: 'Close',
            onClick: () => toast.dismiss(),
          },
        });
      });
    } catch (error) {
      console.error(error);
      toast('Retirement Failed', {
        description: (error as Error).message,
        action: {
          label: 'Close',
          onClick: () => toast.dismiss(),
        },
      });
    } finally {
      setRetireDialogOpen(false);
      setTokenId('');
    }
  };

  return (
    <React.Fragment>
      <CreditListingDialog
        open={listDialogOpen}
        onOpenChange={setListDialogOpen}
        onConfirm={handleListingConfirm}
        isListing={isListingPending}
      />
      <CreditTransferDialog
        open={transferDialogOpen}
        onOpenChange={setTransferDialogOpen}
        onConfirm={handleTransferConfirm}
        isTransferring={isTransferPending}
      />
      <CreditRetireDialog
        open={retireDialogOpen}
        onOpenChange={setRetireDialogOpen}
        onConfirm={handleRetireConfirm}
        isRetiring={isRetirePending}
      />
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
                        <td className='px-4 py-2'>{c?.id}</td>
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
                          {Number(c?.balance) !== 0 && (
                            <React.Fragment>
                              <Button
                                variant='default'
                                onClick={() => handleListClick(c?.batch.id)}
                              >
                                List
                              </Button>
                              <Button
                                variant='secondary'
                                onClick={() => handleTransferClick(c?.batch.id)}
                              >
                                Transfer
                              </Button>
                              <Button
                                variant='destructive'
                                onClick={() => handleRetireClick(c?.batch.id)}
                              >
                                Retire
                              </Button>
                            </React.Fragment>
                          )}
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
                      )}
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </AppSidebarLayout>
    </React.Fragment>
  );
}
