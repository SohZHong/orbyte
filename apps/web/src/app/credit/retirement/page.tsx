'use client';

import { Skeleton } from '@/components/ui/skeleton';
import type { BreadcrumbItem } from '@/types/nav';
import { usePrivy } from '@privy-io/react-auth';
import { useUser } from '@/hooks/use-user';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { getTimeFromBlockchainTimestamp } from '@/lib/utils';
import { ipfsGateway, txHashExplorerLink } from '@/constants';
import Link from 'next/link';
import { DownloadIcon } from 'lucide-react';
import AppLayout from '@/components/app-layout';
import { useUserRetiredCredits } from '@/hooks/use-credit';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/' },
  { title: 'Credits', href: '/credit' },
  { title: 'Credit Retirements', href: '#' },
];

export default function CreditRetirementPage() {
  const { user: privyUser } = usePrivy();
  const address = privyUser?.smartWallet?.address;
  const { isLoading: isUserLoading } = useUser(address);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isCreditsLoading,
  } = useUserRetiredCredits(address?.toLowerCase());

  return (
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
                  Credit Retirements
                </h1>
                <p className='text-muted-foreground'>
                  View retirement records and proofs
                </p>
              </React.Fragment>
            )}
          </div>
        </div>
        {/* Table */}
        <div className='overflow-x-auto rounded-lg border'>
          {isCreditsLoading || isUserLoading ? (
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
                    <th className='px-4 py-3'>ID</th>
                    <th className='px-4 py-3'>Credit ID</th>
                    <th className='px-4 py-3'>Amount</th>
                    <th className='px-4 py-3'>Retired At</th>
                    <th className='px-4 py-3 font-medium w-[300px]'>
                      Transaction Hash
                    </th>
                    <th className='px-4 py-3'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.pages.flat().map((c, index) => {
                    return (
                      <tr className='border-t' key={index}>
                        <td className='px-4 py-2'>{c?.id}</td>
                        <td className='px-4 py-2'>{c?.tokenId}</td>
                        <td className='px-4 py-2'>{c?.amount}</td>
                        <td className='px-4 py-2'>
                          {getTimeFromBlockchainTimestamp(
                            String(c?.timestamp / 1000)
                          ).toLocaleString()}
                        </td>
                        <td className='px-4 py-2 text-muted-foreground truncate max-w-[300px]'>
                          <div className='overflow-x-auto'>
                            <Link
                              href={`${txHashExplorerLink}/${c?.transactionHash}`}
                              target='_blank'
                              rel='noopener noreferrer'
                            >
                              <Button
                                variant='link'
                                className='p-0 cursor-pointer'
                              >
                                {c?.transactionHash}
                              </Button>
                            </Link>
                          </div>
                        </td>
                        <td className='px-4 py-2 flex flex-wrap items-center flex-row gap-3'>
                          <Link
                            href={`${ipfsGateway}/${c?.retirementCID}`}
                            target='_blank'
                            rel='noopener noreferrer'
                            download
                          >
                            <Button
                              variant='outline'
                              className='cursor-pointer'
                            >
                              <DownloadIcon />
                              Download Proof
                            </Button>
                          </Link>
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
  );
}
