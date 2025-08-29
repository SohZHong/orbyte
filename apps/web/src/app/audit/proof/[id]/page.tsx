'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import type { BreadcrumbItem } from '@/types/nav';

import DetailRow from '@/components/detail-row';
import { Role } from '@/generated/graphql';
import { getTimeFromBlockchainTimestamp } from '@/lib/utils';
import ProtectedRoute from '@/components/routing/protected-route';
import { useProof } from '@/hooks/use-proof';
import FileRow from '@/components/file-row';
import { useProjectRegistryContract } from '@/hooks/use-project-registry-contract';
import { Button } from '@/components/ui/button';
import { ReviewAction } from '@/types/proposal';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { ReviewConfirmationDialog } from '@/components/dialog/review-confirmation-dialog';
import AppLayout from '@/components/app-layout';

export default function ProofDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: proof, isLoading } = useProof(id);
  const { auditProof, isPending } = useProjectRegistryContract();

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Audit', href: '#' },
    { title: 'Proof', href: '/audit/proof' },
    { title: 'Proof Review', href: '#' },
  ];

  const [dialogOpen, setDialogOpen] = useState(false);
  const [action, setAction] = useState<ReviewAction | null>(null);

  const handleActionClick = (selectedAction: ReviewAction) => {
    setAction(selectedAction);
    setDialogOpen(true);
  };

  const handleConfirm = async (action: ReviewAction, comment: string) => {
    // Submit Transaction
    await auditProof(BigInt(id), action, comment)
      .then((tx) => {
        toast('Reviewed Submitted Successfully', {
          description: `Transaction Hash: ${tx.hash}`,
          action: {
            label: 'Close',
            onClick: () => toast.dismiss(),
          },
        });

        setTimeout(() => {
          router.replace('/audit/proof');
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

  if (isLoading || !proof) {
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <div className='p-6 space-y-4'>
          <Skeleton className='h-10 w-1/3' />
          <Skeleton className='h-6 w-1/4' />
          <Skeleton className='h-[200px] w-full' />
        </div>
      </AppLayout>
    );
  }

  return (
    <ProtectedRoute allowedRoles={[Role.Auditor]}>
      {action !== null && (
        <ReviewConfirmationDialog
          open={dialogOpen}
          action={action}
          onOpenChange={setDialogOpen}
          onConfirm={handleConfirm}
        />
      )}
      <AppLayout breadcrumbs={breadcrumbs}>
        <div className='flex flex-col gap-6 p-6'>
          {/* Title */}
          <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
            <div>
              <h1 className='text-3xl font-bold tracking-tight'>
                Project Review Proof
              </h1>
              <p className='text-muted-foreground'>
                Review the proof of completion and decide if you wish to approve
                or decline the claim
              </p>
            </div>
          </div>

          {/* Project Details */}
          <h2 className='text-xl font-bold'>Project Overview</h2>
          <div className='grid grid-cols-[20%_1fr] gap-x-6'>
            <DetailRow
              label='Project Name'
              value={proof.project.proposal.name}
            />
            <DetailRow
              label='Submitted at'
              value={getTimeFromBlockchainTimestamp(
                proof.submittedAt
              ).toLocaleString()}
            />
            <DetailRow
              label='Location'
              value={proof.project.proposal.location}
            />
            <DetailRow
              label='Expected Emission Reduction (tonnes)'
              value={proof.project.proposal.estimatedCredits}
            />
          </div>

          {/* Methodology */}
          <h3 className='text-lg font-bold leading-tight tracking-[-0.015em]'>
            Methodology
          </h3>
          <p className='text-base font-normal leading-normal'>
            {proof.project.proposal.methodology}
          </p>

          {/* Submitted Information */}
          <h2 className='text-xl font-bold'>Evidence</h2>
          <FileRow fileCID={proof.proofCID} value='Proof of Submission' />

          {/* Actions */}
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
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}
