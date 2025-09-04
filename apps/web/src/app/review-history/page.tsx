'use client';

import { Skeleton } from '@/components/ui/skeleton';
import type { BreadcrumbItem } from '@/types/nav';
import { usePrivy } from '@privy-io/react-auth';
import { useUser } from '@/hooks/use-user';
import React from 'react';
import { Button } from '@/components/ui/button';
import { actionUIMap } from '@/types/proposal';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { useReviewHistory } from '@/hooks/use-review-history';
import { getTimeFromBlockchainTimestamp } from '@/lib/utils';
import ProtectedRoute from '@/components/routing/protected-route';
import { Role } from '@/generated/graphql';
import AppLayout from '@/components/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/' },
  { title: 'Review History', href: '#' },
];

export default function ReviewHistoryPage() {
  const { user: privyUser } = usePrivy();
  const address = privyUser?.smartWallet?.address;
  const { data: user, isLoading: isUserLoading } = useUser(address);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isReviewsLoading,
  } = useReviewHistory({
    auditor: user?.id,
  });

  return (
    <ProtectedRoute allowedRoles={[Role.Auditor]}>
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
                    Review History
                  </h1>
                  <p className='text-muted-foreground'>
                    View your past reviews and decisions
                  </p>
                </React.Fragment>
              )}
            </div>
          </div>
          {/* Table */}
          <div className='overflow-x-auto rounded-lg border'>
            {isReviewsLoading ? (
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
                      <th className='px-4 py-3 font-medium'>Type</th>
                      <th className='px-4 py-3 font-medium'>Project Title</th>
                      <th className='px-4 py-3 font-medium w-[350px]'>
                        Submission Time
                      </th>
                      <th className='px-4 py-3 font-medium'>Review Time</th>
                      <th className='px-4 py-3 font-medium'>Decision</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.pages.flatMap((page) =>
                      page.map((item, idx) => (
                        <tr className='border-t' key={item.id + '-' + idx}>
                          <td className='px-4 py-2'>
                            <Badge variant='secondary'>
                              {item.type === 'proposal'
                                ? 'Proposal Audit'
                                : 'Proof Audit'}
                            </Badge>
                          </td>
                          <td className='px-4 py-2'>{item.name}</td>
                          <td className='px-4 py-2'>
                            {getTimeFromBlockchainTimestamp(
                              item.submittedAt
                            ).toLocaleString()}
                          </td>
                          <td className='px-4 py-2'>
                            {getTimeFromBlockchainTimestamp(
                              item.timestamp
                            ).toLocaleString()}
                          </td>
                          <td className='px-4 py-2'>
                            <Badge variant={actionUIMap[item.action].variant}>
                              {(() => {
                                const Icon = actionUIMap[item.action].icon;
                                return <Icon className='w-4 h-4 mr-1' />;
                              })()}
                              {actionUIMap[item.action].text}
                            </Badge>
                          </td>
                        </tr>
                      ))
                    )}
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
      </AppLayout>
    </ProtectedRoute>
  );
}
