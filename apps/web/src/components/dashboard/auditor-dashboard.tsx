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
  MessageCircleMoreIcon,
  ShieldCheckIcon,
} from 'lucide-react';
import React, { useMemo } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '../ui/card';
import { Button } from '../ui/button';
import DashboardCard from '../dashboard-card';
import { useAuditorStats } from '@/hooks/use-auditor-stats';
import { useRouter } from 'next/navigation';
import type { AuditorStats } from '@/types/stats';

export default function AuditorDashboard({
  user,
}: {
  user: UserQuery['user'];
}) {
  const auditorAddress = user?.id;
  const router = useRouter();
  const { data, isLoading } = useAuditorStats(auditorAddress?.toLowerCase());

  const stats: AuditorStats | null = useMemo(() => {
    if (!data) return null;

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

    return {
      totalProposals,
      pendingProposals,
      totalProofs,
      pendingProofs,
      totalReviews,
      approvals,
      rejections,
      proofApprovals,
    };
  }, [data]);

  const handleProposalCardClick = () => {
    router.push('/audit/proposal');
  };

  const handleProofCardClick = () => {
    router.push('/audit/proof');
  };

  const handleReviewCardClick = () => {
    router.push('/review-history');
  };

  return (
    <React.Fragment>
      {/* Stats Grid */}
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        <DashboardCard
          isLoading={isLoading}
          title='Total Proposals'
          value={stats?.totalProposals ?? 0}
          description={`${stats?.pendingProposals ?? 0} pending`}
          icon={<FileText className='h-4 w-4 text-muted-foreground' />}
          handleClick={handleProposalCardClick}
          buttonText='Manage'
        />

        <DashboardCard
          isLoading={isLoading}
          title='Total Proofs'
          value={stats?.totalProofs ?? 0}
          description={`${stats?.pendingProofs ?? 0} pending`}
          icon={<TrendingUp className='h-4 w-4 text-muted-foreground' />}
          handleClick={handleProofCardClick}
          buttonText='Manage'
        />

        <DashboardCard
          isLoading={isLoading}
          title='Total Reviews'
          value={stats?.totalReviews ?? 0}
          description='All-time proposal reviews'
          icon={
            <MessageCircleMoreIcon className='h-4 w-4 text-muted-foreground' />
          }
          handleClick={handleReviewCardClick}
          buttonText='View'
        />

        <DashboardCard
          isLoading={isLoading}
          title='Approvals'
          value={stats?.approvals ?? 0}
          description='Approved proposals'
          icon={<CheckCircle className='h-4 w-4 text-green-500' />}
        />

        <DashboardCard
          isLoading={isLoading}
          title='Rejections'
          value={stats?.rejections ?? 0}
          description='Rejected proposals'
          icon={<XCircle className='h-4 w-4 text-red-500' />}
        />

        <DashboardCard
          isLoading={isLoading}
          title='Proof Audits'
          value={stats?.proofApprovals ?? 0}
          description='Proofs audited & approved'
          icon={<ShieldCheckIcon className='h-4 w-4 text-muted-foreground' />}
        />
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
