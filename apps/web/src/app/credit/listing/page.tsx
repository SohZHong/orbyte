'use client';

import { Skeleton } from '@/components/ui/skeleton';
import type { BreadcrumbItem } from '@/types/nav';
import { usePrivy } from '@privy-io/react-auth';
import { useUser } from '@/hooks/use-user';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { useMarketplaceContract } from '@/hooks/use-marketplace-contract';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { formatEther } from 'viem';
import { getTimeFromBlockchainTimestamp } from '@/lib/utils';
import { useMarketplaceListings } from '@/hooks/use-marketplace';
import { ListingStatus } from '@/generated/graphql';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ListingUpdateDialog } from '@/components/dialog/listing-update-dialog';
import { statusMap } from '@/types/marketplace';
import { Badge } from '@/components/ui/badge';
import { ListingCancelDialog } from '@/components/dialog/listing-cancel-dialog';
import AppLayout from '@/components/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/' },
  { title: 'Credits', href: '/credit' },
  { title: 'Credit Listings', href: '#' },
];

export default function CreditListingPage() {
  const { user: privyUser } = usePrivy();
  const address = privyUser?.smartWallet?.address;
  const { data: user, isLoading: isUserLoading } = useUser(address);
  const [status, setStatus] = useState<ListingStatus>();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isListingsLoading,
  } = useMarketplaceListings({ seller: user?.id, status: status });

  const router = useRouter();
  const [listingId, setListingId] = useState('');
  const [currentRemaining, setCurrentRemaining] = useState(0);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const { updateListing, cancelListing, isPending } = useMarketplaceContract();

  const handleUpdateClick = (
    listingId: string | undefined,
    remaining: number | undefined
  ) => {
    if (!listingId || !remaining) return;
    setListingId(listingId);
    setCurrentRemaining(remaining);
    setUpdateDialogOpen(true);
  };

  const handleCancelClick = (listingId: string | undefined) => {
    if (!listingId) return;
    setListingId(listingId);
    setCancelDialogOpen(true);
  };

  const handleListingUpdateConfirm = async (
    newPrice: number,
    newRemaining: number
  ) => {
    await updateListing({
      listingId: BigInt(listingId),
      newPricePerUnitWei: String(newPrice),
      newRemaining: BigInt(newRemaining),
    })
      .then((tx) => {
        toast('Listing Updated', {
          description: `Transaction Hash: ${tx.hash}`,
          action: {
            label: 'Close',
            onClick: () => toast.dismiss(),
          },
        });
        router.refresh();
      })
      .catch((error) => {
        console.error(error);
        toast('Listing Update Failed', {
          description: (error as Error).message,
          action: {
            label: 'Close',
            onClick: () => toast.dismiss(),
          },
        });
      })
      .finally(() => {
        router.refresh();
        setUpdateDialogOpen(false);
        setListingId('');
        setCurrentRemaining(0);
      });
  };

  const handleListingCancelConfirm = async () => {
    await cancelListing(BigInt(listingId))
      .then((tx) => {
        toast('Listing Cancelled', {
          description: `Transaction Hash: ${tx.hash}`,
          action: {
            label: 'Close',
            onClick: () => toast.dismiss(),
          },
        });
      })
      .catch((error) => {
        console.error(error);
        toast('Listing Cancellation Failed', {
          description: (error as Error).message,
          action: {
            label: 'Close',
            onClick: () => toast.dismiss(),
          },
        });
      })
      .finally(() => {
        router.refresh();
        setCancelDialogOpen(false);
        setListingId('');
      });
  };

  return (
    <React.Fragment>
      <ListingUpdateDialog
        open={updateDialogOpen}
        onOpenChange={setUpdateDialogOpen}
        onConfirm={handleListingUpdateConfirm}
        isUpdating={isPending}
        currentRemaining={currentRemaining}
      />
      <ListingCancelDialog
        open={cancelDialogOpen}
        onOpenChange={setCancelDialogOpen}
        onConfirm={handleListingCancelConfirm}
        isCancelling={isPending}
      />
      <AppLayout breadcrumbs={breadcrumbs}>
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
                  <h1 className='text-3xl font-bold tracking-tight'>
                    Marketplace Listings
                  </h1>
                  <p className='text-muted-foreground'>Manage your listings</p>
                </React.Fragment>
              )}
            </div>
          </div>
          <div className='flex flex-wrap gap-3 items-center'>
            {/* Filters (Tabs) */}
            <Select
              onValueChange={(value) => setStatus(value as ListingStatus)}
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ListingStatus.Active}>Active</SelectItem>
                <SelectItem value={ListingStatus.Filled}>Filled</SelectItem>
                <SelectItem value={ListingStatus.Cancelled}>
                  Cancelled
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Table */}
          <div className='overflow-x-auto rounded-lg border'>
            {isListingsLoading || isUserLoading ? (
              <div className='flex flex-col gap-2 p-4'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className='h-10 w-full' />
                ))}
              </div>
            ) : (
              <React.Fragment>
                <table className='min-w-[900px] w-full text-sm'>
                  <thead>
                    <tr className='bg-muted font-semibold text-muted-foreground text-left'>
                      <th className='px-4 py-3 font-medium w-[300px]'>
                        Project
                      </th>
                      <th className='px-4 py-3'>Initial Amount</th>
                      <th className='px-4 py-3'>Remaining</th>
                      <th className='px-4 py-3'>Price</th>
                      <th className='px-4 py-3'>Status</th>
                      <th className='px-4 py-3'>Period</th>
                      <th className='px-4 py-3'>Sales</th>
                      <th className='px-4 py-3'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.pages.flat().map((l, index) => {
                      const sold = l.purchases.reduce(
                        (sum, p) => sum + Number(p.quantity),
                        0
                      );
                      return (
                        <tr className='border-t' key={index}>
                          <td className='px-4 py-2 text-muted-foreground truncate max-w-[300px]'>
                            <div className='overflow-x-auto'>
                              {l?.token.project?.proposal.name}
                            </div>
                          </td>
                          <td className='px-4 py-2'>{l?.amount}</td>
                          <td className='px-4 py-2'>{l?.remaining}</td>
                          <td className='px-4 py-2'>
                            {formatEther(l?.pricePerUnit)}
                          </td>
                          <td className='px-4 py-2'>
                            <Badge variant={statusMap[l.status].variant}>
                              {(() => {
                                const Icon = statusMap[l.status].icon;
                                return <Icon className='w-4 h-4 mr-1' />;
                              })()}
                              {statusMap[l.status].text}
                            </Badge>
                          </td>
                          <td className='px-4 py-2'>
                            {getTimeFromBlockchainTimestamp(
                              l.startTime
                            ).toLocaleString()}{' '}
                            →{' '}
                            {getTimeFromBlockchainTimestamp(
                              l.endTime
                            ).toLocaleString()}
                          </td>
                          <td className='px-4 py-2'>{sold}</td>
                          <td className='px-4 py-2 flex flex-wrap items-center flex-row gap-3'>
                            {l.status === ListingStatus.Active && (
                              <React.Fragment>
                                <Button
                                  variant='default'
                                  onClick={() =>
                                    handleUpdateClick(l?.id, l.remaining)
                                  }
                                >
                                  Update
                                </Button>
                                <Button
                                  variant='secondary'
                                  onClick={() => handleCancelClick(l?.id)}
                                >
                                  Cancel
                                </Button>
                              </React.Fragment>
                            )}
                          </td>
                        </tr>
                      );
                    })}
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
              </React.Fragment>
            )}
          </div>
        </div>
      </AppLayout>
    </React.Fragment>
  );
}
