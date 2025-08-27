'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AppSidebarLayout from '@/components/app-sidebar-layout';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { BreadcrumbItem } from '@/types/nav';
import { useProposal } from '@/hooks/use-proposal';
import DetailRow from '@/components/detail-row';
import { graphQLStandardMap, statusMap } from '@/types/proposal';
import { ipfsGateway } from '@/constants';
import Link from 'next/link';
import { AuditorFeedbackList } from '@/components/auditor-feedback-list';
import api from '@/config/axios';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { ProposalStatus, Role } from '@/generated/graphql';
import { getTimeFromBlockchainTimestamp } from '@/lib/utils';
import ProtectedRoute from '@/components/routing/protected-route';
import FileRow from '@/components/file-row';

export default function ProposalDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: proposal, isLoading } = useProposal(id);
  const [isDownload, setIsDownloading] = useState<boolean>(false);

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Proposals', href: '/proposal' },
    { title: proposal?.name ?? 'Loading...', href: '#' },
  ];

  const downloadProposal = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsDownloading(true);
    await api
      .get(`/proposal/pdf/download?id=${proposal?.id}`, {
        responseType: 'blob',
      })
      .then(async (res) => {
        const blob = new Blob([res.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `proposal-${proposal?.id}.pdf`;
        document.body.appendChild(a);
        a.click();

        a.remove();
        window.URL.revokeObjectURL(url);

        toast('Proposal downloaded', {
          description: `Please check your files`,
          action: {
            label: 'Close',
            onClick: () => toast.dismiss(),
          },
        });
      })
      .catch((err) => {
        console.error('Failed to download proposal', err);
        toast('Download failed', {
          description: (err as Error).message,
          action: {
            label: 'Close',
            onClick: () => toast.dismiss(),
          },
        });
      })
      .finally(() => {
        setIsDownloading(false);
      });
  };

  if (isLoading || !proposal) {
    return (
      <AppSidebarLayout breadcrumbs={breadcrumbs}>
        <div className='p-6 space-y-4'>
          <Skeleton className='h-10 w-1/3' />
          <Skeleton className='h-6 w-1/4' />
          <Skeleton className='h-[200px] w-full' />
        </div>
      </AppSidebarLayout>
    );
  }

  return (
    <ProtectedRoute allowedRoles={[Role.Developer]}>
      <AppSidebarLayout breadcrumbs={breadcrumbs}>
        <div className='flex flex-col gap-6 p-6'>
          {/* Title */}
          <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
            <div>
              <h1 className='text-3xl font-bold tracking-tight'>
                {proposal.name}
              </h1>
              <p className='text-muted-foreground'>
                Submitted on{' '}
                {getTimeFromBlockchainTimestamp(
                  proposal.submittedAt
                ).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Project Details */}
          <h2 className='text-xl font-bold'>Project Details</h2>
          <div className='grid grid-cols-[20%_1fr] gap-x-6'>
            <DetailRow label='Project Name' value={proposal.name} />
            <DetailRow
              label='Project Description'
              value={proposal.description}
            />
            <DetailRow label='Location' value={proposal.location} />
            <DetailRow
              label='Estimated Credits'
              value={proposal.estimatedCredits?.toString()}
            />
            <DetailRow
              label='Status'
              value={
                <Badge>
                  {(() => {
                    const Icon = statusMap[proposal.status].icon;
                    return <Icon className='w-4 h-4 mr-1' />;
                  })()}
                  {statusMap[proposal.status].text}
                </Badge>
              }
            />
            <DetailRow
              label='Standard'
              value={graphQLStandardMap[proposal.standard]}
            />
          </div>

          {/* Submitted Information */}
          <h2 className='text-xl font-bold'>Submitted Information</h2>
          <FileRow fileCID={proposal.projectPlanCID} value='Project Plan' />
          <FileRow
            fileCID={proposal.eiaCID}
            value='Environmental Impact Assessment'
          />

          {proposal.otherDocsCID && (
            <FileRow fileCID={proposal.otherDocsCID} value='Other Documents' />
          )}

          {/* Auditor Feedback */}
          <AuditorFeedbackList reviews={proposal.reviews} />

          {/* Actions */}
          <div className='flex justify-end gap-3 px-4 py-6'>
            {proposal.status === ProposalStatus.ChangesRequested && (
              <Button
                variant='secondary'
                onClick={() =>
                  router.push(`/proposal/${proposal.id}/resubmission`)
                }
              >
                Resubmit
              </Button>
            )}
            <Button disabled={isDownload} onClick={(e) => downloadProposal(e)}>
              {isDownload ? (
                <span className='inline-flex gap-1 items-center'>
                  <Spinner variant='circle' /> Downloading
                </span>
              ) : (
                <span>Download Proposal</span>
              )}
            </Button>
          </div>
        </div>
      </AppSidebarLayout>
    </ProtectedRoute>
  );
}
