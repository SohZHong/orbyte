'use client';

import AppHeaderLayout from '@/components/app-header-layout';
import { Skeleton } from '@/components/ui/skeleton';
import type { BreadcrumbItem } from '@/types/nav';
import AppSidebarLayout from '@/components/app-sidebar-layout';
import { usePrivy } from '@privy-io/react-auth';
import { useUser } from '@/hooks/use-user';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProjectStatus, Role } from '@/generated/graphql';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { useDebounce } from 'use-debounce';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { useProjects } from '@/hooks/use-project';
import { getTimeFromBlockchainTimestamp } from '@/lib/utils';
import { statusMap } from '@/types/project';
import ProtectedRoute from '@/components/routing/protected-route';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Project', href: '#' },
];

export default function ProjectsPage() {
  const { user: privyUser } = usePrivy();
  const address = privyUser?.smartWallet?.address;
  const { data: user, isLoading: isUserLoading } = useUser(address);
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<ProjectStatus | undefined>(undefined);
  const [debouncedSearch] = useDebounce(search, 300);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isProposalLoading,
  } = useProjects({
    developer: user?.id,
    name: debouncedSearch || undefined,
    status,
  });
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
                  <h1 className='text-3xl font-bold tracking-tight'>
                    Projects
                  </h1>
                  <p className='text-muted-foreground'>
                    Manage your projects and track their progress. Select a
                    project to view details or submit completion proof
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
                  placeholder='Search projects'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className='w-full'
                />
              )}
            </div>

            {/* Filters (Tabs) */}
            <Select
              onValueChange={(value) => setStatus(value as ProjectStatus)}
            >
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ProjectStatus.None}>None</SelectItem>
                <SelectItem value={ProjectStatus.InProgress}>
                  In Progress
                </SelectItem>
                <SelectItem value={ProjectStatus.ProofSubmitted}>
                  Proof Submitted
                </SelectItem>
                <SelectItem value={ProjectStatus.AuditRejected}>
                  Audit Rejected
                </SelectItem>
                <SelectItem value={ProjectStatus.Finalized}>
                  Finalized
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Table */}
          <div className='overflow-x-auto rounded-lg border'>
            {isProposalLoading || isUserLoading ? (
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
                      <th className='px-4 py-3 font-medium'>Start Date</th>
                      <th className='px-4 py-3 font-medium'>Status</th>
                      <th className='px-4 py-3 font-medium w-[300px]'>
                        Summary
                      </th>
                      <th className='px-4 py-3 font-medium'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.pages.flat().map((p, index) => (
                      <tr className='border-t' key={index}>
                        <td className='px-4 py-2'>{p.proposal.name}</td>
                        <td className='px-4 py-2'>
                          {getTimeFromBlockchainTimestamp(
                            p.createdAt
                          ).toLocaleDateString()}
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
                        <td className='px-4 py-2 text-muted-foreground truncate max-w-[300px]'>
                          <div className='overflow-x-auto'>
                            {p.proposal.description}
                          </div>
                        </td>
                        <td className='px-4 py-2'>
                          <Button
                            variant='outline'
                            onClick={() => router.push(`/project/${p.id}`)}
                          >
                            View
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
