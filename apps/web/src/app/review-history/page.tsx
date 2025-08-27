'use client';

import AppHeaderLayout from '@/components/app-header-layout';
import { Skeleton } from '@/components/ui/skeleton';
import type { BreadcrumbItem } from '@/types/nav';
import AppSidebarLayout from '@/components/app-sidebar-layout';
import { usePrivy } from '@privy-io/react-auth';
import { useUser } from '@/hooks/use-user';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { actionUIMap } from '@/types/proposal';
import { Badge } from '@/components/ui/badge';
import { useDebounce } from 'use-debounce';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { useProposalReviews } from '@/hooks/use-review-history';
import { getTimeFromBlockchainTimestamp } from '@/lib/utils';
import ProtectedRoute from '@/components/routing/protected-route';
import { Role } from '@/generated/graphql';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Review History', href: '#' },
];

export default function ReviewHistoryPage() {
  const { user: privyUser } = usePrivy();
  const address = privyUser?.smartWallet?.address;
  const { data: user, isLoading: isUserLoading } = useUser(address);
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 300);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isReviewsLoading,
  } = useProposalReviews({
    auditor: user?.id,
    name: debouncedSearch || undefined,
  });

  return (
    <ProtectedRoute allowedRoles={[Role.Auditor]}>
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
                  <h1 className='text-3xl font-bold tracking-tight'>
                    Review History
                  </h1>
                  <p className='text-muted-foreground'>
                    View your past projects and proposal reviews
                  </p>
                </React.Fragment>
              )}
            </div>
          </div>
          <div className='flex flex-wrap gap-3 items-center'>
            {/* Search bar */}
            <div className='flex-1 min-w-[250px]'>
              {isUserLoading ? (
                <Skeleton className='h-10 w-full' />
              ) : (
                <Input
                  placeholder='Search by name'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className='w-full'
                />
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
                      <th className='px-4 py-3 font-medium'>Project Title</th>
                      <th className='px-4 py-3 font-medium w-[350px]'>
                        Submission Date
                      </th>
                      <th className='px-4 py-3 font-medium'>Review Date</th>
                      <th className='px-4 py-3 font-medium'>Decision</th>
                      <th className='px-4 py-3 font-medium'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.pages.flatMap((page) =>
                      page.flatMap((auditorNode) =>
                        auditorNode.auditor.reviews.map((review, idx) => (
                          <tr
                            className='border-t'
                            key={auditorNode.id + '-' + idx}
                          >
                            <td className='px-4 py-2'>
                              {review.proposal.name}
                            </td>
                            <td className='px-4 py-2'>
                              {new Date(
                                review.proposal.submittedAt * 1000
                              ).toLocaleDateString()}
                            </td>
                            <td className='px-4 py-2'>
                              {new Date(
                                review.timestamp * 1000
                              ).toLocaleDateString()}
                            </td>
                            <td className='px-4 py-2'>
                              <Badge
                                variant={actionUIMap[review.action].variant}
                              >
                                {(() => {
                                  const Icon = actionUIMap[review.action].icon;
                                  return <Icon className='w-4 h-4 mr-1' />;
                                })()}
                                {actionUIMap[review.action].text}
                              </Badge>
                            </td>
                            <td className='px-4 py-2'>
                              <Button
                                variant='outline'
                                onClick={() =>
                                  router.push(
                                    `/audit/proposal/${review.proposal.id}`
                                  )
                                }
                              >
                                View Details
                              </Button>
                            </td>
                          </tr>
                        ))
                      )
                    )}
                    {/* {data?.pages.flat().map((p, index) => (
                    <tr className='border-t' key={index}>
                      <td className='px-4 py-2'>{p.auditor.reviews.name}</td>
                      <td className='px-4 py-2'>
                        {getTimeFromBlockchainTimestamp(
                          p
                        ).toLocaleDateString()}
                      </td>
                      <td className='px-4 py-2'>
                        {getTimeFromBlockchainTimestamp(
                          p.timestamp
                        ).toLocaleDateString()}
                      </td>{' '}
                      <td className='px-4 py-2'>
                        <Badge variant={actionUIMap[p.].variant}>
                          {(() => {
                            const Icon = actionUIMap[p.action].icon;
                            return <Icon className='w-4 h-4 mr-1' />;
                          })()}
                          {actionUIMap[p.action].text}
                        </Badge>
                      </td>
                      <td className='px-4 py-2'>
                        <Button
                          variant='outline'
                          onClick={() =>
                            router.push(`/audit/proposal/${p.proposal.id}`)
                          }
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))} */}
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
    </ProtectedRoute>
  );
}
