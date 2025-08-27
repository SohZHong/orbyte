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
import { ProposalStatus, Role, Standard } from '@/generated/graphql';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useProposals } from '@/hooks/use-proposal';
import { graphQLStandardMap, statusMap } from '@/types/proposal';
import { Badge } from '@/components/ui/badge';
import { useDebounce } from 'use-debounce';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import ProtectedRoute from '@/components/routing/protected-route';
import { useProofs } from '@/hooks/use-proof';
import { getTimeFromBlockchainTimestamp } from '@/lib/utils';
import Link from 'next/link';
import { ipfsGateway } from '@/constants';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/' },
  { title: 'Proof Audit', href: '#' },
];

export default function ProofAuditPage() {
  const { user: privyUser } = usePrivy();
  const address = privyUser?.smartWallet?.address;
  const { isLoading: isUserLoading } = useUser(address);
  const router = useRouter();
  const [nameSearch, setNameSearch] = useState('');
  const [developerSearch, setDeveloperSearch] = useState('');
  const [standard, setStandard] = useState<Standard | undefined>(undefined);
  const [debouncedNameSearch] = useDebounce(nameSearch, 300);
  const [debouncedDeveloperSearch] = useDebounce(developerSearch, 300);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isProofLoading,
  } = useProofs({
    name: debouncedNameSearch || undefined,
    developer: debouncedDeveloperSearch || undefined,
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
                  <h1 className='text-3xl font-bold tracking-tight'>
                    Proof Audits
                  </h1>
                  <p className='text-muted-foreground'>
                    Manage and review proof submissions
                  </p>
                </React.Fragment>
              )}
            </div>
          </div>
          <div className='flex flex-wrap gap-3 items-center'>
            {/* Search bar */}
            <div className='flex-1 min-w-[250px]'>
              {isUserLoading && isProofLoading ? (
                <Skeleton className='h-10 w-full' />
              ) : (
                <Input
                  placeholder='Search project names'
                  value={nameSearch}
                  onChange={(e) => setNameSearch(e.target.value)}
                  className='w-full'
                />
              )}
            </div>
            {/* Search bar */}
            <div className='flex-1 min-w-[250px]'>
              {isUserLoading && isProofLoading ? (
                <Skeleton className='h-10 w-full' />
              ) : (
                <Input
                  placeholder='Search developer address'
                  value={developerSearch}
                  onChange={(e) => setDeveloperSearch(e.target.value)}
                  className='w-full'
                />
              )}
            </div>

            {/* Filters (Tabs) */}
            {isUserLoading && isProofLoading ? (
              <Skeleton className='h-10 w-[180px]' />
            ) : (
              //
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
            )}
          </div>
          {/* Table */}
          <div className='overflow-x-auto rounded-lg border'>
            {isProofLoading ? (
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
                      <th className='px-4 py-3 font-medium'>Name</th>
                      <th className='px-4 py-3 font-medium'>Standard</th>
                      <th className='px-4 py-3 font-medium'>
                        Estimated Emission (tonnes)
                      </th>
                      <th className='px-4 py-3 font-medium'>Submitted At</th>
                      <th className='px-4 py-3 font-medium'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.pages.flat().map((p, index) => (
                      <tr className='border-t' key={index}>
                        <td className='px-4 py-2'>{p.proposal.name}</td>
                        <td className='px-4 py-2'>
                          {graphQLStandardMap[p.proposal.standard]}
                        </td>
                        <td className='px-4 py-2'>
                          {p.proposal.estimatedCredits}
                        </td>
                        <td className='px-4 py-2'>
                          {getTimeFromBlockchainTimestamp(
                            p.proofs[0].submittedAt
                          ).toLocaleDateString()}
                        </td>
                        <td className='px-4 py-2'>
                          <Button variant='default'>
                            <Link
                              href={`${ipfsGateway}/${p.proofs[0].proofCID}`}
                              target='_blank'
                              rel='noopener noreferrer'
                              download
                            >
                              View Proof
                            </Link>
                          </Button>
                          <Button
                            variant='outline'
                            onClick={() =>
                              router.push(`/proof-audit/${p.proofs[0].id}`)
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
