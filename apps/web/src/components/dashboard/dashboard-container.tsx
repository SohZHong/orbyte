'use client';

import AppHeaderLayout from '@/components/app-header-layout';
import { Skeleton } from '@/components/ui/skeleton';
import type { BreadcrumbItem } from '@/types/nav';
import type { User, UserQuery } from '@/generated/graphql'; // if using codegen

import DeveloperDashboard from './developer-dashboard';
import AuditorDashboard from './auditor-dashboard';
import PublicDashboard from './public-dashboard';
import React from 'react';

interface DashboardContainerProps {
  breadcrumbs: BreadcrumbItem[];
  isLoading: boolean;
  user?: UserQuery['user'] | null;
}

export default function DashboardContainer({
  breadcrumbs,
  isLoading,
  user,
}: DashboardContainerProps) {
  return (
    <AppHeaderLayout breadcrumbs={breadcrumbs}>
      <div className='flex flex-col gap-6 p-6'>
        {isLoading ? (
          <React.Fragment>
            <Skeleton className='h-8 w-[200px]' />
            <Skeleton className='h-4 w-[300px]' />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
            <p className='text-muted-foreground'>Welcome back!</p>
            {/* Role-based rendering */}
            {user?.role === 'Developer' && <DeveloperDashboard user={user} />}
            {user?.role === 'Auditor' && <AuditorDashboard user={user} />}
            {!user?.role && <PublicDashboard />}
          </React.Fragment>
        )}
      </div>
    </AppHeaderLayout>

    // <AppHeaderLayout breadcrumbs={breadcrumbs}>
    //   <div className='flex flex-col gap-6 p-6'>
    //     <div>
    //       {isLoading ? (
    //         <React.Fragment>
    //           {/* Title skeleton */}
    //           <Skeleton className='h-8 w-[200px]' />

    //           {/* Subtitle skeleton */}
    //           <Skeleton className='h-4 w-[300px]' />
    //         </React.Fragment>
    //       ) : (
    //         <React.Fragment>
    //           <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
    //           <p className='text-muted-foreground'>
    //             Welcome Back! Here's an overview of your projects and proposals
    //           </p>
    //         </React.Fragment>
    //       )}
    //     </div>
    //   </div>
    // </AppHeaderLayout>
  );
}
