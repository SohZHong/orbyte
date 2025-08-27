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
import { ProposalStatus, Role, Standard } from '@/generated/graphql';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useProposals } from '@/hooks/use-proposal';
import { graphQLStandardMap, statusMap } from '@/types/proposal';
import { Badge } from '@/components/ui/badge';
import { useDebounce } from 'use-debounce';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import ProtectedRoute from '@/components/routing/protected-route';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/' },
  { title: 'Proposal Audit', href: '#' },
];

export default function AuditsPage() {
  const { user: privyUser } = usePrivy();
  const address = privyUser?.smartWallet?.address;
  const { data: user, isLoading: isUserLoading } = useUser(address);
  const router = useRouter();
  const [search, setSearch] = React.useState('');
  const [status, setStatus] = React.useState<ProposalStatus | undefined>(
    undefined
  );
  const [standard, setStandard] = React.useState<Standard | undefined>(
    undefined
  );
  const [debouncedSearch] = useDebounce(search, 300);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isProposalLoading,
  } = useProposals({
    name: debouncedSearch || undefined,
    status,
    standard,
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
                  <h1 className='text-3xl font-bold tracking-tight'>Audits</h1>
                  <p className='text-muted-foreground'>
                    Manage and review proposal submissions
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
                  placeholder='Search project proposals'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className='w-full'
                />
              )}
            </div>

            {/* Filters (Tabs) */}
            <Select
              onValueChange={(value) => setStatus(value as ProposalStatus)}
            >
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
              </SelectContent>
            </Select>

            {/* Filters (Tabs) */}
            <Select onValueChange={(value) => setStandard(value as Standard)}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Standard' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Standard.GoldStandard}>
                  Gold Standard
                </SelectItem>
                <SelectItem value={Standard.Vcs}>VCS</SelectItem>
                <SelectItem value={Standard.Shariah}>Shariah</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Table */}
          <div className='overflow-x-auto rounded-lg border'>
            {isProposalLoading ? (
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
                        Developer
                      </th>
                      <th className='px-4 py-3 font-medium'>Standard</th>
                      <th className='px-4 py-3 font-medium'>Status</th>
                      <th className='px-4 py-3 font-medium'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.pages.flat().map((p, index) => (
                      <tr className='border-t' key={index}>
                        <td className='px-4 py-2'>{p.name}</td>
                        <td className='px-4 py-2 text-muted-foreground truncate max-w-[200px]'>
                          <div className='overflow-x-auto'>
                            {p.developer.id}
                          </div>
                        </td>
                        <td className='px-4 py-2'>
                          {graphQLStandardMap[p.standard]}
                        </td>
                        <td className='px-4 py-2'>
                          <Badge variant={statusMap[p.status].variant}>
                            {(() => {
                              const Icon = statusMap[p.status].icon;
                              return <Icon className='w-4 h-4 mr-1' />;
                            })()}
                            {statusMap[p.status].text}
                          </Badge>
                        </td>
                        <td className='px-4 py-2'>
                          <Button
                            variant='outline'
                            onClick={() =>
                              router.push(`/proposal-audit/${p.id}`)
                            }
                          >
                            Review
                          </Button>
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
    </ProtectedRoute>
  );
}
