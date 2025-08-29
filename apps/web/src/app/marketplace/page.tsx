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
import AppLayout from '@/components/app-layout';
import { usePublicMarketplaceListings } from '@/hooks/use-marketplace';
import {
  MarketplaceListing_OrderBy,
  OrderDirection,
} from '@/generated/graphql';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PAGE_SIZE } from '@/constants';
import { MarketplaceCard } from '@/components/marketplace-listing';
import { ListingBuyDialog } from '@/components/dialog/listing-buy-dialog';
import { formatEther } from 'viem';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/' },
  { title: 'Marketplace', href: '#' },
];

export default function MarketplacePage() {
  const { user: privyUser } = usePrivy();
  const address = privyUser?.smartWallet?.address;
  const { data: user, isLoading: isUserLoading } = useUser(address);

  // Filters
  const [orderBy, setOrderBy] = useState<MarketplaceListing_OrderBy>(
    MarketplaceListing_OrderBy.CreatedAt
  );
  const [orderDirection, setOrderDirection] = useState<OrderDirection>(
    OrderDirection.Desc
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePublicMarketplaceListings({
      seller: user?.id,
      orderBy,
      orderDirection,
    });
  const [listingId, setListingId] = useState('');
  const { buy, isPending: isBuyingPending } = useMarketplaceContract();

  const [currentRemaining, setCurrentRemaining] = useState(0);
  const [currentPricePerUnit, setCurrentPricePerUnit] = useState(0);
  const [buyDialogOpen, setBuyDialogOpen] = useState(false);

  const allListings = data?.pages.flat() ?? [];

  const handleBuy = (
    listingId?: string,
    remaining?: number,
    pricePerUnit?: number
  ) => {
    if (!listingId || !remaining || !pricePerUnit) return;

    setListingId(listingId);
    setCurrentRemaining(remaining);
    setCurrentPricePerUnit(Number(formatEther(BigInt(pricePerUnit))));
    setBuyDialogOpen(true);
  };

  const handleBuyConfirm = async (quantity: number) => {
    if (!address || !quantity || !currentPricePerUnit) return;

    const totalValueWei = quantity * currentPricePerUnit;

    await buy(BigInt(listingId), BigInt(quantity), String(totalValueWei))
      .then((tx) => {
        toast('Credit Purchased', {
          description: `Transaction Hash: ${tx.hash}`,
          action: {
            label: 'Close',
            onClick: () => toast.dismiss(),
          },
        });
      })
      .catch((error) => {
        console.error(error);
        toast('Purchase Failed', {
          description: (error as Error).message,
          action: {
            label: 'Close',
            onClick: () => toast.dismiss(),
          },
        });
      })
      .finally(() => {
        setBuyDialogOpen(false);
        setListingId('');
        setCurrentRemaining(0);
        setCurrentPricePerUnit(0);
      });
  };

  return (
    <React.Fragment>
      <ListingBuyDialog
        open={buyDialogOpen}
        onOpenChange={setBuyDialogOpen}
        onConfirm={handleBuyConfirm}
        isBuying={isBuyingPending}
        currentRemaining={currentRemaining}
        pricePerUnit={currentPricePerUnit}
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
                    Marketplace
                  </h1>
                  <p className='text-muted-foreground'>
                    Explore a diverse range of carbon credits from verified
                    projects, each representing a unique environmental impact
                  </p>
                </React.Fragment>
              )}
            </div>
            {/* Right column: selects */}
            <div className='flex gap-3 flex-wrap md:flex-nowrap items-center'>
              {/* Order By */}
              <Select
                onValueChange={(value) =>
                  setOrderBy(value as MarketplaceListing_OrderBy)
                }
              >
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Order By' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={MarketplaceListing_OrderBy.CreatedAt}>
                    Time Listed
                  </SelectItem>
                  <SelectItem value={MarketplaceListing_OrderBy.PricePerUnit}>
                    Price Per Unit
                  </SelectItem>
                  <SelectItem value={MarketplaceListing_OrderBy.Purchases}>
                    Number of Purchases
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Order Direction */}
              <Select
                onValueChange={(value) =>
                  setOrderDirection(value as OrderDirection)
                }
              >
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Order Direction' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={OrderDirection.Asc}>Ascending</SelectItem>
                  <SelectItem value={OrderDirection.Desc}>
                    Descending
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {isUserLoading ? (
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <Skeleton key={i} className='h-80 w-full rounded-lg' />
              ))}
            </div>
          ) : allListings.length === 0 ? (
            <div className='text-center text-muted-foreground py-20'>
              No listings available at the moment.
            </div>
          ) : (
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {allListings.map((listing, index) => (
                <MarketplaceCard
                  key={index}
                  listing={listing!}
                  onBuy={handleBuy}
                />
              ))}
            </div>
          )}

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
        </div>
      </AppLayout>
    </React.Fragment>
  );
}
