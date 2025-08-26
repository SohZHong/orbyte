'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AppSidebarLayout from '@/components/app-sidebar-layout';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import type { BreadcrumbItem } from '@/types/nav';
import { useProposal } from '@/hooks/use-proposal';
import DetailRow from '@/components/detail-row';
import { graphQLStandardMap, ReviewAction } from '@/types/proposal';
import { AuditorFeedbackList } from '@/components/auditor-feedback-list';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { Separator } from '@/components/ui/separator';
import { useProjectRegistryContract } from '@/hooks/use-project-registry-contract';
import { ProposalReviewConfirmationDialog } from '@/components/dialog/proposal-review-confirmation-dialog';
import { ProposalStatus } from '@/generated/graphql';

export default function ProposalDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: proposal, isLoading: isProposalLoading } = useProposal(id);
  const { reviewProposal, isPending } = useProjectRegistryContract();

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Audit', href: '/audit' },
    { title: 'Proposal', href: '/audit/proposal' },
    { title: proposal?.name ?? 'Loading...', href: '#' },
  ];

  const [dialogOpen, setDialogOpen] = useState(false);
  const [action, setAction] = useState<ReviewAction | null>(null);

  const handleActionClick = (selectedAction: ReviewAction) => {
    setAction(selectedAction);
    setDialogOpen(true);
  };

  const handleConfirm = async (action: ReviewAction, comment: string) => {
    console.log('Confirmed:', action, comment);

    // Submit Transaction
    await reviewProposal(BigInt(id), action, comment)
      .then((tx) => {
        toast('Reviewed Submitted Successfully', {
          description: `Transaction Hash: ${tx.hash}`,
          action: {
            label: 'Close',
            onClick: () => toast.dismiss(),
          },
        });

        setTimeout(() => {
          router.replace('/audit');
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
        toast('Review Submission Failed', {
          description: (error as Error).message,
          action: {
            label: 'Close',
            onClick: () => toast.dismiss(),
          },
        });
      });
  };

  if (isProposalLoading || !proposal) {
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
    <React.Fragment>
      {action !== null && (
        <ProposalReviewConfirmationDialog
          open={dialogOpen}
          action={action}
          onOpenChange={setDialogOpen}
          onConfirm={handleConfirm}
        />
      )}
      <AppSidebarLayout breadcrumbs={breadcrumbs}>
        <div className='flex flex-col gap-6 p-6'>
          {/* Title */}
          <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
            <div>
              <h1 className='text-3xl font-bold tracking-tight'>
                {proposal.status === ProposalStatus.Approved
                  ? 'Project Proposal Details'
                  : 'Project Proposal Review'}
              </h1>
              <p className='text-muted-foreground'>
                {proposal.status === ProposalStatus.Approved
                  ? 'View project proposal details'
                  : 'Review the project proposal details and take necessary actions'}
              </p>
            </div>
          </div>

          {/* Project Details */}
          <h2 className='text-xl font-bold'>Project Overview</h2>
          <div className='grid grid-cols-[20%_1fr] gap-x-6'>
            <DetailRow label='Project Name' value={proposal.name} />
            <DetailRow label='Developer' value={proposal.developer.id} />
            <DetailRow label='Location' value={proposal.location} />
            <DetailRow label='Status' value={proposal.status} />
            <DetailRow
              label='Estimated Credits'
              value={proposal.estimatedCredits?.toString()}
            />
            <DetailRow
              label='Standard'
              value={graphQLStandardMap[proposal.standard]}
            />
          </div>

          {/* Project Description */}
          <h3 className='text-lg font-bold leading-tight tracking-[-0.015em]'>
            Project Description
          </h3>
          <p className='text-base font-normal leading-normal'>
            {proposal.description}
          </p>

          {/* Methodology */}
          <h3 className='text-lg font-bold leading-tight tracking-[-0.015em]'>
            Methodology
          </h3>
          <p className='text-base font-normal leading-normal'>
            {proposal.methodology}
          </p>

          <Separator className='bg-accent' />
          {/* Auditor Feedback */}
          <AuditorFeedbackList reviews={proposal.reviews} />

          {/* Actions */}
          {proposal.status === ProposalStatus.PendingReview && (
            <div className='flex justify-end gap-3 px-4 py-6'>
              <Button
                disabled={isPending}
                onClick={() => handleActionClick(ReviewAction.APPROVE)}
              >
                {isPending ? (
                  <span className='inline-flex gap-1 items-center'>
                    <Spinner variant='circle' /> Submitting
                  </span>
                ) : (
                  <span>Approve</span>
                )}
              </Button>
              <Button
                disabled={isPending}
                variant='destructive'
                onClick={() => handleActionClick(ReviewAction.REJECT)}
              >
                {isPending ? (
                  <span className='inline-flex gap-1 items-center'>
                    <Spinner variant='circle' /> Submitting
                  </span>
                ) : (
                  <span>Decline</span>
                )}
              </Button>
              <Button
                disabled={isPending}
                variant='outline'
                onClick={() => handleActionClick(ReviewAction.REQUEST_CHANGES)}
              >
                {isPending ? (
                  <span className='inline-flex gap-1 items-center'>
                    <Spinner variant='circle' /> Submitting
                  </span>
                ) : (
                  <span>Request Changes</span>
                )}
              </Button>
            </div>
          )}
        </div>
      </AppSidebarLayout>
    </React.Fragment>
  );
}
