import {
  ProjectStatus,
  ProposalStatus,
  ReviewAction,
  type User,
  type UserQuery,
} from '@/generated/graphql';
import {
  FileText,
  CheckCircle,
  XCircle,
  TrendingUp,
  Calendar,
} from 'lucide-react';
import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '../ui/card';
import { Button } from '../ui/button';
import renderCard from '../render-card';
import { useAuditorStats } from '@/hooks/use-auditor-stats';
import { useRouter } from 'next/navigation';

export default function AuditorDashboard({
  user,
}: {
  user: UserQuery['user'];
}) {
  const auditorAddress = user?.id;
  const router = useRouter();
  const { data, isLoading } = useAuditorStats(auditorAddress?.toLowerCase());
  // Totals
  const totalProposals = data?.proposals?.length ?? 0;
  const pendingProposals =
    data?.proposals?.filter(
      (p) =>
        p.status === ProposalStatus.PendingReview ||
        p.status === ProposalStatus.ChangesRequested
    ).length ?? 0;

  const totalProofs = data?.proofs?.length ?? 0;
  const pendingProofs =
    data?.proofs?.filter(
      (p) => p.project.status === ProjectStatus.ProofSubmitted
    ).length ?? 0;

  // Aggregated past actions
  const totalReviews = data?.proposalReviews?.length ?? 0;
  const approvals =
    data?.proposalReviews?.filter((p) => p.action === ReviewAction.Approve)
      .length ?? 0;
  const rejections =
    data?.proposalReviews?.filter((p) => p.action === ReviewAction.Reject)
      .length ?? 0;

  const proofApprovals =
    data?.proofAudits?.filter((p) => p.action === ReviewAction.Approve)
      .length ?? 0;

  const handleProposalCardClick = () => {
    router.push('/proposal-audit');
  };

  const handleProofCardClick = () => {
    router.push('/proof-audit');
  };

  const handleReviewCardClick = () => {
    router.push('/review-history');
  };

  return (
    <React.Fragment>
      {/* Stats Grid */}
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {renderCard(
          isLoading,
          'Total Proposals',
          totalProposals,
          `${pendingProposals} pending`,
          <FileText className='h-4 w-4 text-muted-foreground' />,
          handleProposalCardClick,
          'Manage'
        )}
        {renderCard(
          isLoading,
          'Total Proofs',
          totalProofs,
          `${pendingProofs} pending`,
          <TrendingUp className='h-4 w-4 text-muted-foreground' />,
          handleProofCardClick,
          'Manage'
        )}
        {renderCard(
          isLoading,
          'Total Reviews',
          totalReviews,
          'All-time proposal reviews',
          <FileText className='h-4 w-4 text-muted-foreground' />,
          handleReviewCardClick,
          'View'
        )}
        {renderCard(
          isLoading,
          'Approvals',
          approvals,
          'Approved proposals',
          <CheckCircle className='h-4 w-4 text-green-500' />
        )}
        {renderCard(
          isLoading,
          'Rejections',
          rejections,
          'Rejected proposals',
          <XCircle className='h-4 w-4 text-red-500' />
        )}
        {renderCard(
          isLoading,
          'Proof Audits',
          proofApprovals,
          'Proofs audited & approved',
          <TrendingUp className='h-4 w-4 text-muted-foreground' />
        )}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Perform your auditing tasks quickly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <Button variant='outline' className='h-auto justify-start py-4'>
              <FileText className='mr-2 h-4 w-4' />
              Review Proposals
            </Button>
            <Button variant='outline' className='h-auto justify-start py-4'>
              <TrendingUp className='mr-2 h-4 w-4' />
              Audit Proofs
            </Button>
            <Button variant='outline' className='h-auto justify-start py-4'>
              <Calendar className='mr-2 h-4 w-4' />
              View Review History
            </Button>
            <Button variant='outline' className='h-auto justify-start py-4'>
              <CheckCircle className='mr-2 h-4 w-4' />
              Approvals Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
