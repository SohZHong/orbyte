'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Factory,
  Leaf,
  ShoppingCart,
  Coins,
  ArrowLeftRightIcon,
} from 'lucide-react';
import React, { useMemo } from 'react';
import { usePublicStats } from '@/hooks/use-daily-stats.';
import DashboardCard from '../dashboard-card';
import type { PublicStats } from '@/types/stats';
import { Skeleton } from '../ui/skeleton';

export default function PublicDashboard() {
  const { data, isLoading } = usePublicStats();

  const stats: PublicStats | null = useMemo(() => {
    if (!data) return null;

    const creditStats = data.dailyCreditStats ?? [];
    const retirementStats = data.dailyRetirementStats ?? [];
    const marketStats = data.dailyMarketplaceStats ?? [];
    const txStats = data.dailyTransactionStats ?? [];

    return {
      totalCreditsIssued: creditStats.reduce(
        (sum, d) => sum + Number(d.total),
        0
      ),
      retiredCredits: retirementStats.reduce(
        (sum, d) => sum + Number(d.total),
        0
      ),
      totalMarketplaceVolume: marketStats.reduce(
        (sum, d) => sum + Number(d.dailyVolume),
        0
      ),
      totalTransactions: txStats.reduce((sum, d) => sum + Number(d.count), 0),

      creditStats,
      retirementStats,
      marketStats,
      txStats,
    };
  }, [data]);

  return (
    <React.Fragment>
      {/* Key Metrics */}
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
        {/* Credits Issued */}
        <DashboardCard
          isLoading={isLoading}
          title='Total Credits Issued'
          value={stats?.totalCreditsIssued ?? 0}
          description='Since inception'
          icon={<Factory className='h-4 w-4 text-muted-foreground' />}
        />

        {/* Credits Retired */}
        <DashboardCard
          isLoading={isLoading}
          title='Credits Retired'
          value={stats?.retiredCredits ?? 0}
          description='Environmental impact'
          icon={<Leaf className='h-4 w-4 text-green-500' />}
        />

        {/* Marketplace Volume */}
        <DashboardCard
          isLoading={isLoading}
          title='Marketplace Volume'
          value={stats?.totalMarketplaceVolume ?? 0}
          description='Total traded credits'
          icon={<ShoppingCart className='h-4 w-4 text-muted-foreground' />}
        />

        {/* Transactions */}
        <DashboardCard
          isLoading={isLoading}
          title='Total Transactions'
          value={stats?.totalTransactions ?? 0}
          description='On-chain transfers'
          icon={
            <ArrowLeftRightIcon className='h-4 w-4 text-muted-foreground' />
          }
        />
      </div>

      {/* Charts */}
      <div className='grid gap-6 lg:grid-cols-2'>
        {/* Credits Issued vs Retired */}
        <Card>
          <CardHeader>
            <CardTitle>Credits Issued vs Retired</CardTitle>
            <CardDescription>
              Daily issuance and retirements over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className='h-72 w-full' />
            ) : (
              <ResponsiveContainer width='100%' height={300}>
                <LineChart data={stats?.creditStats}>
                  <XAxis dataKey='timestamp' />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type='monotone'
                    dataKey='total'
                    name='Issued'
                    stroke='#8884d8'
                  />
                  <Line
                    type='monotone'
                    dataKey={(d: any) =>
                      stats?.retirementStats?.find(
                        (r) => r.timestamp === d.timestamp
                      )?.total ?? 0
                    }
                    name='Retired'
                    stroke='#82ca9d'
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Marketplace Volume */}
        <Card>
          <CardHeader>
            <CardTitle>Marketplace Activity</CardTitle>
            <CardDescription>Daily trade volume (credits)</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className='h-72 w-full' />
            ) : (
              <ResponsiveContainer width='100%' height={300}>
                <LineChart data={stats?.marketStats}>
                  <XAxis dataKey='timestamp' />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type='monotone'
                    dataKey='dailyVolume'
                    name='Volume'
                    stroke='#8884d8'
                  />
                  <Line
                    type='monotone'
                    dataKey='dailyPurchases'
                    name='Purchases'
                    stroke='#82ca9d'
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </React.Fragment>
  );
}
