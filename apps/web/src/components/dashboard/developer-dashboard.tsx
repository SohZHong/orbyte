'use client';

import React, { useMemo } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  FileText,
  Coins,
  Heart,
  TrendingUp,
  Timer,
  Calendar,
} from 'lucide-react';
import { useDeveloperStats } from '@/hooks/use-developer-stats';
import { ProposalStatus, type UserQuery } from '@/generated/graphql';
import { Skeleton } from '@/components/ui/skeleton';
import type { DeveloperStats } from '@/types/stats';
import DashboardCard from '../dashboard-card';
import { useRouter } from 'next/navigation';
import QuickActionCard from '../quick-action-card';

export default function DeveloperDashboard({
  user,
}: {
  user: UserQuery['user'];
}) {
  const developerAddress = user?.id;
  const { data, isLoading } = useDeveloperStats(developerAddress);
  const router = useRouter();
  const stats: DeveloperStats | null = useMemo(() => {
    if (!data) return null;

    const totalProjects = data.proposals.length;
    const approvedProjects = data.proposals.filter(
      (p) => p.status === ProposalStatus.Approved
    ).length;
    const pendingProjects = data.proposals.filter(
      (p) => p.status === ProposalStatus.PendingReview
    ).length;

    const totalCreditsIssued = data.creditsIssueds.reduce(
      (sum, c) => sum + Number(c.amount),
      0
    );
    const retiredCredits = data.creditBatches.reduce(
      (sum, c) => sum + Number(c.retiredAmount),
      0
    );

    // Marketplace stats
    const activeListings = data.marketplaceListings.length;
    const totalSales = data.marketplacePurchases.reduce(
      (sum, p) => sum + Number(p.totalPaid),
      0
    );
    const totalUnitsSold = data.marketplacePurchases.reduce(
      (sum, p) => sum + Number(p.quantity),
      0
    );

    return {
      totalProjects,
      approvedProjects,
      pendingProjects,
      totalCreditsIssued,
      retiredCredits,
      activeListings,
      totalSales,
      totalUnitsSold,
    };
  }, [data]);

  const handleProjectCardClick = () => {
    router.push('/project');
  };

  const handleCreditCardClick = () => {
    router.push('/credit');
  };

  const handleSubmitProposalClick = () => {
    router.push('/proposal/submission');
  };
  return (
    <React.Fragment>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        <DashboardCard
          isLoading={isLoading}
          title='My Projects'
          value={stats?.totalProjects ?? null}
          description={`${stats?.approvedProjects ?? 0} approved / ${
            stats?.pendingProjects ?? 0
          } pending`}
          icon={<FileText className='h-4 w-4 text-muted-foreground' />}
        />
        <DashboardCard
          isLoading={isLoading}
          title='Credits Issued'
          value={stats?.totalCreditsIssued ?? null}
          description={'Carbon credits minted'}
          icon={<Coins className='h-4 w-4 text-muted-foreground' />}
        />
        <DashboardCard
          isLoading={isLoading}
          title='Credits Retired'
          value={stats?.retiredCredits ?? null}
          description={'Credits retired by holders'}
          icon={<Heart className='h-4 w-4 text-muted-foreground' />}
        />
        <DashboardCard
          isLoading={isLoading}
          title='Active Listings'
          value={stats?.retiredCredits ?? null}
          description={'Current tokens listed on marketplace'}
          icon={<TrendingUp className='h-4 w-4 text-muted-foreground' />}
        />
        <DashboardCard
          isLoading={isLoading}
          title='Total Sales'
          value={stats?.totalSales ?? null}
          description={'Revenue from sold credits'}
          icon={<Coins className='h-4 w-4 text-green-500' />}
        />
        <DashboardCard
          isLoading={isLoading}
          title='Units Sold'
          value={stats?.totalUnitsSold ?? null}
          description={'Total credits sold'}
          icon={<TrendingUp className='h-4 w-4 text-blue-500' />}
        />
      </div>
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Timer className='h-5 w-5 text-blue-500' />
            Quick Actions
          </CardTitle>
          <CardDescription>Manage your developer workflow</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <QuickActionCard
              isLoading={isLoading}
              icon={FileText}
              handleClick={handleSubmitProposalClick}
              title='Propose Project'
              description='Submit a new project proposal'
            />
            <QuickActionCard
              isLoading={isLoading}
              icon={FileText}
              handleClick={handleProjectCardClick}
              title='Projects'
              description='Manage project progress'
            />
            <QuickActionCard
              isLoading={isLoading}
              icon={Coins}
              handleClick={handleCreditCardClick}
              title='Credits'
              description='Manage issued credits'
            />

            <QuickActionCard
              isLoading={isLoading}
              icon={TrendingUp}
              // handleClick={handleSubmitProposalClick}
              title='Reports'
              description='View analytics'
            />
          </div>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
